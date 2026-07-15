"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "@/app/v4.module.css";

export function V4ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  /** @param {import("react").FormEvent<HTMLFormElement>} event */
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.contactConfirmation} role="status">
        <span>Preview complete</span>
        <strong>The interface works. No message was transmitted.</strong>
        <p>The production form will connect to the approved CRM or email workflow after the UI and data policy are finalized.</p>
        <button type="button" onClick={() => setSubmitted(false)}>Return to form</button>
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
        <span>What are you working through?</span>
        <textarea name="context" rows={4} required />
      </label>
      <div className={styles.formFooter}>
        <small>Private preview · this form does not transmit data.</small>
        <button type="submit">Send context <ArrowUpRight aria-hidden="true" /></button>
      </div>
    </form>
  );
}
