"use client";

import { useState } from "react";

export function ContactForm({ recipientEmail }: { recipientEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact: ${name || "website"}`);
    const body = encodeURIComponent(
      `Naam: ${name}\nE-mail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      onSubmit={submit}
      className="mt-10 space-y-6 border-t border-neutral-200 pt-10 dark:border-neutral-700"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-sm font-medium"
        >
          Naam
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-black outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-600 dark:bg-neutral-950 dark:text-white dark:ring-neutral-500"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block text-sm font-medium"
        >
          E-mail <span className="text-red-600">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-black outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-600 dark:bg-neutral-950 dark:text-white dark:ring-neutral-500"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium"
        >
          Bericht <span className="text-red-600">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-2 text-black outline-none ring-neutral-400 focus:ring-2 dark:border-neutral-600 dark:bg-neutral-950 dark:text-white dark:ring-neutral-500"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Verstuur via e-mail
      </button>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Je e-mailprogramma opent met een conceptbericht. Verstuur het bericht
        vanuit je eigen mailbox.
      </p>
    </form>
  );
}

export function ContactFormPlaceholder() {
  return (
    <div className="mt-10 space-y-3 border-t border-neutral-200 pt-10 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
      <p>
        Om het formulier te gebruiken, voeg in{" "}
        <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">
          .env
        </code>{" "}
        <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">
          CONTACT_EMAIL
        </code>{" "}
        of{" "}
        <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">
          NEXT_PUBLIC_CONTACT_EMAIL
        </code>{" "}
        toe met het adres waar contactberichten naartoe moeten.
      </p>
    </div>
  );
}
