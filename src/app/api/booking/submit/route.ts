import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validacija obaveznih polja
    const required = [
      'studentName',
      'parentName',
      'grade',
      'phone',
      'email',
      'type',
      'consent',
    ];
    for (const k of required) {
      if (body?.[k] === undefined || body?.[k] === null || body?.[k] === '') {
        return NextResponse.json(
          { ok: false, error: `Nedostaje polje: ${k}` },
          { status: 400 }
        );
      }
    }
    if (typeof body.consent !== 'boolean' || !body.consent) {
      return NextResponse.json(
        { ok: false, error: 'Potrebna je saglasnost.' },
        { status: 400 }
      );
    }

    const toEmail = process.env.BOOKING_TO_EMAIL || 'you@example.com';
    // Ako nemaš verifikovan domen, koristi onboarding@resend.dev
    const fromEmail =
      process.env.BOOKING_FROM_EMAIL || 'Zakazivanje <onboarding@resend.dev>';

    const html = `
      <h2>Novi zahtev za zakazivanje</h2>
      <p><b>Učenik:</b> ${body.studentName}</p>
      <p><b>Razred/uzrast:</b> ${body.grade}</p>
      <p><b>Roditelj:</b> ${body.parentName}</p>
      <p><b>Telefon:</b> ${body.phone}</p>
      <p><b>Email:</b> ${body.email}</p>
      <p><b>Tip časa:</b> ${body.type}</p>
      <p><b>Oblasti:</b> ${body.topics || '-'}</p>
      <p><b>Preferirano vreme:</b> ${body.timePrefs || '-'}</p>
      <p><b>Napomene:</b> ${body.notes || '-'}</p>
    `;

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: 'Novi zahtev za zakazivanje časa',
      html,
      replyTo: body.email || undefined, // zgodno za direktan reply roditelju
    });

    if (result.error) {
      // vratimo jasan razlog u response i logujemo ga u server
      console.error('Resend error:', result.error);
      return NextResponse.json(
        {
          ok: false,
          error: `Resend error: ${result.error.message || 'nepoznata greška'}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (e: any) {
    console.error('Booking submit error:', e);
    return NextResponse.json(
      { ok: false, error: e?.message || 'Greška' },
      { status: 500 }
    );
  }
}
