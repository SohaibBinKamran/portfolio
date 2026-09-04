"use client";

import { useState } from "react";
import { contact } from "@/data/contact";

type Status = "idle" | "sending" | "success" | "error";

const f = contact.form;

/**
 * Contact form — submits straight to Web3Forms, which emails the entry to
 * Sohaib's inbox. No mail client opens. Set the access key in `.env.local`:
 *
 *   NEXT_PUBLIC_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *
 * The key is public by design (Web3Forms scopes it to the destination email),
 * so shipping it in the client bundle is fine.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ACCESS_KEY) {
      console.error("NEXT_PUBLIC_WEB3FORMS_KEY is not set — cannot send the form.");
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("from_name", "Portfolio contact form");
    data.append(
      "subject",
      `Portfolio enquiry${data.get("name") ? ` from ${data.get("name")}` : ""}`,
    );

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = (await res.json()) as { success?: boolean };
      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-[480px] rounded-[16px] border border-[rgba(33,33,33,0.06)] bg-bg-cream p-8 text-center">
        <p className="font-serif text-[22px] text-ink">Message sent</p>
        <p className="mt-2 text-[15px] text-ink/60">{f.success}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[480px] flex-col gap-[19px] rounded-[16px] border border-[rgba(33,33,33,0.06)] bg-bg-cream p-5"
    >
      {/* Web3Forms honeypot — bots fill it, humans never see it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="flex flex-col gap-5 sm:flex-row">
        <Field
          name="name"
          label={f.name.label}
          placeholder={f.name.placeholder}
          autoComplete="name"
        />
        <Field
          name="company"
          label={f.company.label}
          placeholder={f.company.placeholder}
          autoComplete="organization"
          required={false}
        />
      </div>

      <Field
        name="email"
        type="email"
        label={f.email.label}
        placeholder={f.email.placeholder}
        autoComplete="email"
      />

      <label className="flex flex-col gap-2.5">
        <span className="text-[13px] font-medium tracking-[-0.26px] text-black/55">
          {f.message.label}
        </span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={f.message.placeholder}
          className="min-h-[100px] resize-y rounded-[10px] border border-[rgba(136,136,136,0.1)] bg-[rgba(187,187,187,0.15)] px-3 py-3 text-[16px] text-ink outline-none placeholder:text-[#999] focus:border-ink/25"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-[10px] bg-bg-dark py-2.5 text-[16px] font-medium tracking-[-0.32px] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? f.sending : f.submit}
      </button>

      {status === "error" && (
        <p className="text-[13px] text-accent-alert">{f.error}</p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  autoComplete,
  type = "text",
  required = true,
}: {
  name: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-1 flex-col gap-2.5">
      <span className="text-[13px] font-medium tracking-[-0.26px] text-black/55">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 rounded-[10px] border border-[rgba(136,136,136,0.1)] bg-[rgba(187,187,187,0.15)] px-3 text-[16px] text-ink outline-none placeholder:text-[#999] focus:border-ink/25"
      />
    </label>
  );
}
