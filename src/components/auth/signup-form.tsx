"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { AuthShell } from "@/components/auth/auth-panel";
import { Field, PasswordField, inputStyles } from "@/components/auth/form-field";
import { cn } from "@/lib/utils";

export function SignupHeader() {
  return (
    <section className="bg-white pt-36 text-black sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <a href="/login" className="transition-colors hover:text-brand">
            Member Directory
          </a>
          <span>/</span>
          <span className="text-neutral-700">Sign up</span>
        </Reveal>
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <Reveal delay={0.05} className="flex justify-center">
            <Eyebrow>Create Account</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text="Join the ALN member portal"
            highlight={["Join", "member"]}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              Set up your username and password to get access to the ALN
              member directory, resources and conference updates.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const initialFields = {
  fullName: "",
  companyName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

type Fields = typeof initialFields;

export function SignupForm() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [agree, setAgree] = useState(false);

  const setField =
    (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const passwordsMismatch =
    fields.confirmPassword.length > 0 &&
    fields.password !== fields.confirmPassword;

  return (
    <AuthShell>
      <h2 className="font-heading text-2xl font-extrabold tracking-tight text-neutral-900">
        Create your account
      </h2>
      <p className="mt-1 text-sm text-neutral-500">
        A few details to set up your member login.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 flex flex-col gap-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" required>
            <input
              required
              autoComplete="name"
              placeholder="Full name"
              className={inputStyles}
              value={fields.fullName}
              onChange={setField("fullName")}
            />
          </Field>
          <Field label="Company name" required>
            <input
              required
              autoComplete="organization"
              placeholder="Company name"
              className={inputStyles}
              value={fields.companyName}
              onChange={setField("companyName")}
            />
          </Field>
        </div>

        <Field label="Email" required>
          <input
            required
            type="email"
            autoComplete="email"
            placeholder="Email address"
            className={inputStyles}
            value={fields.email}
            onChange={setField("email")}
          />
        </Field>

        <Field label="Username" required>
          <input
            required
            autoComplete="username"
            placeholder="Choose a username"
            className={inputStyles}
            value={fields.username}
            onChange={setField("username")}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Password" required>
            <PasswordField
              value={fields.password}
              onChange={setField("password")}
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
            />
          </Field>
          <Field label="Confirm password" required>
            <PasswordField
              value={fields.confirmPassword}
              onChange={setField("confirmPassword")}
              placeholder="Re-enter password"
              autoComplete="new-password"
              minLength={8}
            />
          </Field>
        </div>

        <AnimatePresence>
          {passwordsMismatch && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="-mt-2 text-xs font-medium text-brand"
            >
              Passwords do not match.
            </motion.p>
          )}
        </AnimatePresence>

        <label className="flex items-start gap-2.5 text-xs text-neutral-600">
          <input
            required
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand"
          />
          I agree to the terms and conditions (rules) of the network.
        </label>

        <motion.button
          type="submit"
          disabled={passwordsMismatch}
          whileHover={passwordsMismatch ? undefined : { scale: 1.02, y: -2 }}
          whileTap={passwordsMismatch ? undefined : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className={cn(
            "group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/30",
            passwordsMismatch
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer",
          )}
        >
          Create account
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </span>
        </motion.button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-500">
        Already a member?{" "}
        <a
          href="/login"
          className="font-semibold text-brand transition-colors duration-300 hover:text-brand/70"
        >
          Login here
        </a>
      </p>
    </AuthShell>
  );
}
