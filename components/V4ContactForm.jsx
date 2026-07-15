"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "@/app/v4.module.css";

export function V4ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  /** @param {import("react").FormEvent<HTMLFormElement>} event */
  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't reach the server. Try again, or email hi@vickydurel.me.");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.contactConfirmation} role="status">
        <span>Message sent</span>
        <strong>Thanks, it’s in my inbox.</strong>
        <p>I read every message myself, so I’ll get back to you personally. If it’s urgent, you can also reach me at hi@vickydurel.me.</p>
        <button type="button" onClick={() => setStatus("idle")}>Send another</button>
      </div>
    );
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        <span>What are you working on?</span>
        <textarea name="context" rows={4} required />
      </label>
      <input
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <div className={styles.formFooter}>
        <small>{status === "error" ? errorMsg : "Goes straight to my inbox. I reply personally."}</small>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : (<>Send it over <ArrowUpRight aria-hidden="true" /></>)}
        </button>
      </div>
    </form>
  );
}
