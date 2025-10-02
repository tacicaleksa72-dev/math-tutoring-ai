import fg from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

type Issue = { file: string; msg: string };

const ROOT = path.resolve(process.cwd(), 'src/app');

/** Vrati listu lokalnih import putanja (apsolutne), samo za "@/..." i relativne "./../..." */
function extractLocalImports(src: string, fileDir: string): string[] {
  const regex = /import\s+[\w\{\},\s\*]+from\s+["']([^"']+)["']/g;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(src))) {
    const spec = m[1];
    // samo lokalni importi
    if (spec.startsWith('@/')) {
      out.push(path.resolve(process.cwd(), 'src', spec.slice(2)));
    } else if (spec.startsWith('./') || spec.startsWith('../')) {
      out.push(path.resolve(fileDir, spec));
    }
  }
  // Probaj ekstenzije i index fajlove
  const exts = ['.tsx', '.ts', '.jsx', '.js'];
  const resolved: string[] = [];
  for (const base of out) {
    if (fs.existsSync(base) && fs.statSync(base).isFile()) {
      resolved.push(base);
      continue;
    }
    for (const ext of exts) {
      const p = base + ext;
      if (fs.existsSync(p)) {
        resolved.push(p);
        break;
      }
      const idx = path.join(base, 'index' + ext);
      if (fs.existsSync(idx)) {
        resolved.push(idx);
        break;
      }
    }
  }
  // ukloni duplikate
  return Array.from(new Set(resolved));
}

/** Grubo izvlačenje string vrednosti iz metadata objekta */
function extractString(re: RegExp, src: string) {
  const m = src.match(re);
  if (!m) return null;
  const v = m[0].replace(/^[\s\S]*:\s*["'`]/, '').replace(/["'`]\s*$/, '');
  return v.trim();
}

(async function run() {
  const files = await fg(['src/app/**/page.tsx'], { dot: false });

  const issues: Issue[] = [];

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const rel = path.relative(process.cwd(), file);
    const fileDir = path.dirname(file);

    // ===== 0) Učitaj i prvi nivo lokalnih komponenti
    const imported = extractLocalImports(code, fileDir).slice(0, 12); // limit
    const importedCodes = imported
      .filter((p) => fs.existsSync(p))
      .map((p) => {
        try {
          return fs.readFileSync(p, 'utf8');
        } catch {
          return '';
        }
      });
    // Sjedini kod stranice + importovanih komponenti za provere 2–4
    const combined = [code, ...importedCodes].join(
      '\n\n/* --- imported --- */\n\n'
    );

    // ===== 1) metadata (title/description/canonical) – samo u page fajlu
    const hasMetadata = /export\s+const\s+metadata/.test(code);
    const hasTitle = /metadata[\s\S]*title\s*:\s*["'`][^"'`]+["'`]/.test(code);
    const hasDescription =
      /metadata[\s\S]*description\s*:\s*["'`][^"'`]+["'`]/.test(code);
    const hasCanonical =
      /metadata[\s\S]*alternates\s*:\s*{[\s\S]*canonical\s*:\s*["'`][^"'`]+["'`]/.test(
        code
      );

    if (!hasMetadata) {
      issues.push({
        file: rel,
        msg: 'Nedostaje `export const metadata` – dodaj title/description.',
      });
    } else {
      if (!hasTitle)
        issues.push({ file: rel, msg: 'U `metadata` nedostaje `title`.' });
      if (!hasDescription)
        issues.push({
          file: rel,
          msg: 'U `metadata` nedostaje `description`.',
        });
      if (!hasCanonical)
        issues.push({
          file: rel,
          msg: 'Razmisli o `alternates.canonical` u `metadata`.',
        });

      // (Opcionalno) dužine
      const titleVal = extractString(
        /metadata[\s\S]*title\s*:\s*["'`][^"'`]+["'`]/,
        code
      );
      const descVal = extractString(
        /metadata[\s\S]*description\s*:\s*["'`][^"'`]+["'`]/,
        code
      );
      if (titleVal && titleVal.length > 60) {
        issues.push({
          file: rel,
          msg: `Title ima ${titleVal.length} karaktera – skrati na ≤ 60.`,
        });
      }
      if (descVal && (descVal.length < 120 || descVal.length > 170)) {
        issues.push({
          file: rel,
          msg: `Description ima ${descVal.length} karaktera – ciljaj ~150–160.`,
        });
      }
    }

    // ===== 2) H1 – traži i u importovanim komponentama (plitko)
    const h1Count = (combined.match(/<h1[\s>]/g) || []).length;
    if (h1Count === 0) {
      issues.push({
        file: rel,
        msg: 'Nema `<h1>` – dodaj glavni naslov (ili u komponenti koja se renderuje).',
      });
    } else if (h1Count > 1) {
      issues.push({
        file: rel,
        msg: `Na strani/komponentama ima ${h1Count} × <h1> – preporučen je tačno jedan.`,
      });
    }

    // ===== 3) next/image – alt atribut (traži i u komponentama)
    const imageTags = combined.match(/<Image\b[^>]*>/g) || [];
    for (const tag of imageTags) {
      const hasAlt = /alt\s*=\s*{?["'`][^"'`]+["'`]}?/.test(tag);
      if (!hasAlt) {
        issues.push({
          file: rel,
          msg: 'Pronađen `<Image>` bez `alt` – dodaj opis (SEO + a11y).',
        });
      }
    }

    // ===== 4) Link anchor – generički tekst (traži i u komponentama)
    const linkTexts = Array.from(
      combined.matchAll(/<Link\b[^>]*>([\s\S]*?)<\/Link>/g)
    ).map((m) => m[1].trim());
    const badAnchors = [
      'kliknite ovde',
      'klikni ovde',
      'ovde',
      'saznaj više',
      'više',
      'detaljnije',
    ];
    for (const t of linkTexts) {
      const flat = t.replace(/\s+/g, ' ').toLowerCase();
      if (badAnchors.includes(flat)) {
        issues.push({
          file: rel,
          msg: `Generički anchor “${t}” – koristi opisniji (npr. “Program za 8. razred”).`,
        });
      }
      if (flat.length < 3) {
        issues.push({
          file: rel,
          msg: 'Veoma kratak link tekst – koristi deskriptivnije anker-e.',
        });
      }
    }

    // ===== 5) JSON-LD hint (samo informativno; traži i u komponentama)
    try {
      const ast = parse(combined, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      });
      let hasJsonLd = false;

      traverse(ast, {
        JSXOpeningElement(p) {
          const name = (p.node.name as any)?.name;
          if (name === 'script') {
            const attrs = p.node.attributes || [];
            for (const a of attrs) {
              // @ts-ignore
              const an = a.name?.name;
              // @ts-ignore
              const av = a.value?.value;
              if (
                an === 'type' &&
                typeof av === 'string' &&
                av.includes('application/ld+json')
              ) {
                hasJsonLd = true;
              }
            }
          }
        },
      });

      if (!hasJsonLd) {
        issues.push({
          file: rel,
          msg: 'Dodaj JSON-LD structured data (npr. LocalBusiness / Service).',
        });
      }
    } catch {
      // ako AST padne, preskoči – ostale heuristike rade
    }
  }

  // ===== Ispis rezultata (bez ERROR/WARN tagova, bez exit(1))
  if (issues.length === 0) {
    console.log('SEO audit: bez pronađenih problema ✅');
  } else {
    console.log('\n┌──────── SEO audit – predlozi ────────');
    for (const it of issues) {
      console.log(`│ ${it.file} → ${it.msg}`);
    }
    console.log('└──────────────────────────────────────\n');
  }

  process.exit(0);
})();
