"use client";

import { useState, type FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";

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

const emptyForm = {
  member: "",
  country: null as CountryOption | null,
  company: "",
  url: "",
  email: "",
  phone: "",
};

export function AddMemberDialog({
  onAdd,
}: {
  onAdd: (member: Omit<NetworkMember, "id">) => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setForm(emptyForm);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.country) return;

    onAdd({
      member: form.member.trim(),
      country: form.country.name,
      countryCode: form.country.code,
      company: form.company.trim(),
      url: form.url.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="gap-1.5 rounded-full bg-brand text-white hover:bg-brand/90" />
        }
      >
        <HugeiconsIcon icon={UserAdd01Icon} />
        Add Member
      </DialogTrigger>
      <DialogContent className="bg-white text-neutral-900 ring-neutral-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base text-neutral-900">
            Add network member
          </DialogTitle>
          <DialogDescription className="text-neutral-500">
            Add a new logistics partner to the network directory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
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
              Add member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
