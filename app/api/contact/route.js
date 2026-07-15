// Contact form handler — sends submissions to hi@vickydurel.me via ZeptoMail.
// Runs server-side only; the token never reaches the browser.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = "noreply@vickydurel.me";
const TO = "hi@vickydurel.me";

function esc(s = "") {
  return String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const message = (body.context || body.message || "").toString().trim();
  const trap = (body.company || "").toString().trim(); // honeypot

  // A bot filled the hidden field: pretend success, send nothing.
  if (trap) return Response.json({ ok: true });

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "Please add your name, email, and a message." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "That email address doesn't look right." }, { status: 400 });
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return Response.json({ ok: false, error: "That's a little long. Please trim it down." }, { status: 400 });
  }

  const rawToken = (process.env.ZEPTOMAIL_API_TOKEN || "").trim();
  if (!rawToken) {
    return Response.json({ ok: false, error: "Email isn't set up yet. Please write to hi@vickydurel.me." }, { status: 500 });
  }
  const auth = rawToken.startsWith("Zoho-enczapikey") ? rawToken : `Zoho-enczapikey ${rawToken}`;

  const html =
    `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#111">` +
    `<p><strong>New message from vickydurel.me</strong></p>` +
    `<p><strong>Name:</strong> ${esc(name)}<br><strong>Email:</strong> ${esc(email)}</p>` +
    `<p style="white-space:pre-wrap;border-left:3px solid #ddd;padding-left:12px;margin-top:12px">${esc(message)}</p>` +
    `</div>`;
  const text = `New message from vickydurel.me\n\nName: ${name}\nEmail: ${email}\n\n${message}`;

  const payload = {
    from: { address: FROM, name: "vickydurel.me" },
    to: [{ email_address: { address: TO, name: "Vicky Durel" } }],
    reply_to: [{ address: email, name }],
    subject: `New message from ${name} via vickydurel.me`,
    htmlbody: html,
    textbody: text,
  };

  try {
    const res = await fetch("https://api.zeptomail.com/v1.1/email", {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.data) {
      console.error("ZeptoMail send failed:", res.status, data?.error?.code || "");
      return Response.json(
        { ok: false, error: "Something went wrong sending that. You can also reach me at hi@vickydurel.me." },
        { status: 502 }
      );
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error("ZeptoMail request error:", e?.message);
    return Response.json(
      { ok: false, error: "Something went wrong. You can also reach me at hi@vickydurel.me." },
      { status: 502 }
    );
  }
}
