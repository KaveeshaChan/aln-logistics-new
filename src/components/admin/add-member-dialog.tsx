"use client";

import { useRef, useState, type FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, ImageUpload01Icon, UserAdd01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { countries, type CountryOption } from "@/lib/countries";
import type { NetworkMember } from "@/lib/network-members";
import { cn } from "@/lib/utils";

const emptyForm = {
  member: "",
  country: null as CountryOption | null,
  company: "",
  url: "",
  email: "",
  phone: "",
  logoUrl: null as string | null,
  imageUrl: null as string | null,
};

type FormState = typeof emptyForm;

function formFromMember(member?: NetworkMember): FormState {
  if (!member) return emptyForm;
  const country =
    countries.find((c) => c.code === member.countryCode) ?? {
      code: member.countryCode,
      name: member.country,
    };
  return {
    member: member.member,
    country,
    company: member.company,
    url: member.url,
    email: member.email,
    phone: member.phone,
    logoUrl: member.logoUrl ?? null,
    imageUrl: member.imageUrl ?? null,
  };
}

function ImageUploadField({
  id,
  label,
  hint,
  value,
  onChange,
  shape = "square",
}: {
  id: string;
  label: string;
  hint: string;
  value: string | null;
  onChange: (file: File | null) => void;
  shape?: "circle" | "square";
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-neutral-700">
        {label}
      </Label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex size-16 shrink-0 items-center justify-center overflow-hidden border border-dashed border-neutral-200 bg-neutral-50 text-neutral-400 transition-colors hover:border-brand hover:text-brand",
            shape === "circle" ? "rounded-full" : "rounded-lg"
          )}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not a static asset
            <img
              src={value}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <HugeiconsIcon icon={ImageUpload01Icon} className="size-5" />
          )}
        </button>

        <div className="flex flex-col items-start gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-neutral-200 text-neutral-700 hover:bg-neutral-100"
            onClick={() => inputRef.current?.click()}
          >
            {value ? "Replace" : "Upload"}
          </Button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs text-neutral-400 hover:text-destructive"
            >
              Remove
            </button>
          ) : (
            <p className="text-xs text-neutral-400">{hint}</p>
          )}
        </div>

        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
}

export function AddMemberDialog({
  member,
  onAdd,
  onSave,
}: {
  member?: NetworkMember;
  onAdd?: (member: Omit<NetworkMember, "id">) => void;
  onSave?: (member: NetworkMember) => void;
}) {
  const isEdit = Boolean(member);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => formFromMember(member));
  // Object URLs created by this dialog instance that haven't been handed off
  // to a caller yet — only these are safe to revoke on cancel/replace, since
  // an edit's original logoUrl/imageUrl may still be in use by the table row.
  const pendingBlobUrls = useRef<Set<string>>(new Set());

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setForm(formFromMember(member));
    } else {
      pendingBlobUrls.current.forEach((url) => URL.revokeObjectURL(url));
      pendingBlobUrls.current.clear();
      setForm(emptyForm);
    }
  };

  const handleLogoChange = (file: File | null) => {
    setForm((f) => {
      if (f.logoUrl && pendingBlobUrls.current.has(f.logoUrl)) {
        URL.revokeObjectURL(f.logoUrl);
        pendingBlobUrls.current.delete(f.logoUrl);
      }
      if (!file) return { ...f, logoUrl: null };
      const url = URL.createObjectURL(file);
      pendingBlobUrls.current.add(url);
      return { ...f, logoUrl: url };
    });
  };

  const handleImageChange = (file: File | null) => {
    setForm((f) => {
      if (f.imageUrl && pendingBlobUrls.current.has(f.imageUrl)) {
        URL.revokeObjectURL(f.imageUrl);
        pendingBlobUrls.current.delete(f.imageUrl);
      }
      if (!file) return { ...f, imageUrl: null };
      const url = URL.createObjectURL(file);
      pendingBlobUrls.current.add(url);
      return { ...f, imageUrl: url };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.country) return;

    const payload = {
      member: form.member.trim(),
      country: form.country.name,
      countryCode: form.country.code,
      company: form.company.trim(),
      url: form.url.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      logoUrl: form.logoUrl ?? undefined,
      imageUrl: form.imageUrl ?? undefined,
    };

    // Ownership of any preview object URLs now belongs to the caller —
    // clear the pending set so close doesn't revoke them.
    pendingBlobUrls.current.clear();

    if (isEdit && member) {
      onSave?.({ ...payload, id: member.id });
    } else {
      onAdd?.(payload);
    }
    setForm(emptyForm);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          isEdit ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            />
          ) : (
            <Button className="gap-1.5 rounded-full bg-brand text-white hover:bg-brand/90" />
          )
        }
      >
        {isEdit ? (
          <>
            <HugeiconsIcon icon={Edit02Icon} />
            <span className="sr-only">
              Edit {member?.member || member?.company}
            </span>
          </>
        ) : (
          <>
            <HugeiconsIcon icon={UserAdd01Icon} />
            Add Member
          </>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white text-neutral-900 ring-neutral-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base text-neutral-900">
            {isEdit ? "Edit network member" : "Add network member"}
          </DialogTitle>
          <DialogDescription className="text-neutral-500">
            {isEdit
              ? "Update this logistics partner's directory details."
              : "Add a new logistics partner to the network directory."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <ImageUploadField
              id="member-logo"
              label="Company logo"
              hint="PNG or JPG"
              shape="circle"
              value={form.logoUrl}
              onChange={handleLogoChange}
            />
            <ImageUploadField
              id="member-image"
              label="Photo"
              hint="PNG or JPG"
              shape="square"
              value={form.imageUrl}
              onChange={handleImageChange}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="member-name" className="text-neutral-700">
              Member name
            </Label>
            <Input
              id="member-name"
              required
              value={form.member}
              onChange={(e) =>
                setForm((f) => ({ ...f, member: e.target.value }))
              }
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="country-input" className="text-neutral-700">
              Country
            </Label>
            <Combobox
              required
              name="country"
              items={countries}
              value={form.country}
              onValueChange={(value) =>
                setForm((f) => ({ ...f, country: value }))
              }
              itemToStringValue={(c: CountryOption) => c.name}
              itemToStringLabel={(c: CountryOption) => c.name}
            >
              <ComboboxInput
                id="country-input"
                placeholder="Type to search countries..."
              />
              <ComboboxContent>
                <ComboboxEmpty>No country found.</ComboboxEmpty>
                <ComboboxList>
                  {(c: CountryOption) => (
                    <ComboboxItem key={c.code} value={c}>
                      <span
                        aria-hidden
                        className={`fi fi-${c.code.toLowerCase()} h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-black/10`}
                      />
                      {c.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="company" className="text-neutral-700">
              Company
            </Label>
            <Input
              id="company"
              required
              value={form.company}
              onChange={(e) =>
                setForm((f) => ({ ...f, company: e.target.value }))
              }
              placeholder="e.g. Global Ocean Link"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="company-url" className="text-neutral-700">
              Company URL
            </Label>
            <Input
              id="company-url"
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              placeholder="www.example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="contact-email" className="text-neutral-700">
                Contact email
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="name@company.com"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="contact-number" className="text-neutral-700">
                Contact number
              </Label>
              <Input
                id="contact-number"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="+1 555 000 0000"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              className="bg-brand text-white hover:bg-brand/90"
            >
              {isEdit ? "Save changes" : "Add member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
