import nodemailer from 'nodemailer'

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env

const isConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS)

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null

if (!isConfigured) {
  console.warn('SMTP is not configured: contact messages will be logged to the console instead of emailed.')
}

export async function sendContactEmail({ name, email, message }) {
  if (!transporter) {
    console.log('New contact message (not emailed, SMTP not configured):', { name, email, message })
    return
  }

  await transporter.sendMail({
    // Send from your own account (most providers reject other senders) and
    // set replyTo so hitting "Reply" goes to the visitor.
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    to: CONTACT_TO_EMAIL ?? SMTP_USER,
    replyTo: `"${name}" <${email}>`,
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })
}
