'use client';

import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

import styles from './ContactForm.module.scss';

export default function ContactForm() {
  const [state, formspreeSubmit] = useForm('mvgqleqb');
  const [confirmError, setConfirmError] = useState('');

  const handleSubmit = (e) => {
    setConfirmError('');
    const form = e.currentTarget;
    const email = form.email.value.trim();
    const confirmEmail = form.confirmEmail.value.trim();

    if (email !== confirmEmail) {
      e.preventDefault();
      setConfirmError('Emails do not match.');
      return;
    }

    // Let Formspree handle the actual POST
    formspreeSubmit(e);
  };

  if (state.succeeded) {
    return <p className={styles.successMsg}>Thanks! We’ll be in touch shortly.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form || ''} contact-form`} noValidate>
      {/* Honeypot for bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

        <label htmlFor="firstName">
          <span>First Name (Required):</span>
          <input id="firstName" name="firstName" type="text" required />
        </label>

        <label htmlFor="lastName">
          <span>Last Name (Required):</span>
          <input id="lastName" name="lastName" type="text" required />
        </label>

        <label htmlFor="email">
          <span>Email (Required):</span>
          <input id="email" name="email" type="email" required />
        </label>

        <label htmlFor="confirmEmail">
          <span>Confirm Email (Required):</span>
          <input id="confirmEmail" name="confirmEmail" type="email" required />
        </label>

      {/* Formspree field-level errors (email/message) */}
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      {confirmError && <p className={styles.errorMsg}>• {confirmError}</p>}

      <label htmlFor="message" className="row">
        <span>Message:</span>
        <textarea id="message" name="message" rows={5} />
      </label>
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button type="submit" disabled={state.submitting} className={styles.submitBtn}>
        {state.submitting ? 'Submitting…' : 'Submit'}
      </button>

    </form>
  );
}
