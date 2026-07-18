"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";

export const inputStyles =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-300 focus:border-brand/50 focus:bg-white focus:shadow-md focus:shadow-brand/[0.06]";

export function Field({
  label,
  required = false,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold text-neutral-700">
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </span>
      {children}
    </label>
  );
}

export function PasswordField({
  value,
  onChange,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  minLength,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  minLength?: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        required
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        className={cn(inputStyles, "pr-11")}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400 transition-colors duration-300 hover:text-neutral-600"
      >
        <HugeiconsIcon icon={visible ? ViewOffSlashIcon : ViewIcon} size={18} />
      </button>
    </div>
  );
}
