"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { AuthShell } from "@/components/auth/auth-panel";
import { Field, PasswordField, inputStyles } from "@/components/auth/form-field";

export function LoginHeader() {
  return (
    <section className="bg-white pt-36 text-black sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <span className="text-neutral-700">Member Directory</span>
        </Reveal>
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <Reveal delay={0.05} className="flex justify-center">
            <Eyebrow>Members Area</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text="Welcome back to the network"
            highlight={["back", "network"]}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              Sign in with your member username and password to access the
              ALN member directory, resources and conference updates.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthShell>
      <h2 className="font-heading text-2xl font-extrabold tracking-tight text-neutral-900">
        Sign in
      </h2>
      <p className="mt-1 text-sm text-neutral-500">
        Enter your ALN member credentials.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 flex flex-col gap-5"
      >
        <Field label="Username" required>
          <input
            required
            autoComplete="username"
            placeholder="Username"
            className={inputStyles}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>

        <Field label="Password" required>
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        <div className="flex justify-end">
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-brand transition-colors duration-300 hover:text-brand/70"
          >
            Forgot password?
          </button>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="group mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/30"
        >
          Login
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </span>
        </motion.button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-500">
        Not yet a member of ALN?{" "}
        <a
          href="/signup"
          className="font-semibold text-brand transition-colors duration-300 hover:text-brand/70"
        >
          Sign up here
        </a>
      </p>
    </AuthShell>
  );
}
