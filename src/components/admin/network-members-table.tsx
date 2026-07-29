"use client";

import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  Delete02Icon,
  Edit02Icon,
  Image02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

import { AddMemberDialog } from "@/components/admin/add-member-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { networkMembers as initialMembers, type NetworkMember } from "@/lib/network-members";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

function initialsFor(member: NetworkMember) {
  const source = member.member || member.company;
  const initials = source
    .replace(/^(Mr|Mrs|Ms|Mr\.|Mrs\.|Ms\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return initials || "—";
}

export function NetworkMembersTable() {
  const [members, setMembers] = useState<NetworkMember[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleAdd = (newMember: Omit<NetworkMember, "id">) => {
    setMembers((prev) => {
      const nextId = prev.reduce((max, m) => Math.max(max, m.id), 0) + 1;
      return [{ ...newMember, id: nextId }, ...prev];
    });
    setSearch("");
    setPageIndex(0);
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return members;
    return members.filter((member) =>
      [member.member, member.country, member.company, member.email, member.phone]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [members, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(pageIndex, pageCount - 1);

  const rows = useMemo(() => {
    const start = currentPage * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-sm shadow-neutral-200/50">
      <div className="flex flex-col gap-3 border-b border-neutral-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">
            {filtered.length} member{filtered.length === 1 ? "" : "s"}
          </p>
          <p className="text-xs text-neutral-400">
            Freight forwarders and logistics providers in the ALN network.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <HugeiconsIcon
              icon={Search01Icon}
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
            />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPageIndex(0);
              }}
              placeholder="Search members, companies, countries..."
              className="h-9 rounded-full pl-9 text-sm"
            />
          </div>
          <AddMemberDialog onAdd={handleAdd} />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-neutral-100 bg-neutral-50/70 hover:bg-neutral-50/70">
            <TableHead className="text-neutral-400">Member</TableHead>
            <TableHead className="text-neutral-400">Country</TableHead>
            <TableHead className="text-neutral-400">Company Details</TableHead>
            <TableHead className="text-neutral-400">Contact Details</TableHead>
            <TableHead className="text-neutral-400">Images</TableHead>
            <TableHead className="text-right text-neutral-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((member) => (
              <TableRow
                key={member.id}
                className="border-neutral-100 transition-colors hover:bg-neutral-50/80"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {member.logoUrl && <AvatarImage src={member.logoUrl} alt="" />}
                      <AvatarFallback className="bg-brand/10 text-xs font-semibold text-brand">
                        {initialsFor(member)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold whitespace-nowrap text-neutral-900">
                      {member.member || "—"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span
                      aria-hidden
                      className={`fi fi-${member.countryCode.toLowerCase()} h-4 w-6 shrink-0 rounded-[3px] shadow-sm ring-1 ring-black/10`}
                    />
                    <span className="text-neutral-700">{member.country}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium whitespace-nowrap text-neutral-900">
                      {member.company}
                    </span>
                    {member.url ? (
                      <a
                        href={member.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-fit truncate text-xs text-neutral-400 underline-offset-2 hover:text-brand hover:underline"
                      >
                        {member.url.replace(/^https?:\/\//, "")}
                      </a>
                    ) : (
                      <span className="text-xs text-neutral-300">No website</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-fit whitespace-nowrap text-neutral-800 hover:text-brand hover:underline"
                      >
                        {member.email}
                      </a>
                    ) : (
                      <span className="text-neutral-300">No email</span>
                    )}
                    {member.phone ? (
                      <span className="text-xs whitespace-nowrap text-neutral-400">
                        {member.phone}
                      </span>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  {member.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not a static asset
                    <img
                      src={member.imageUrl}
                      alt=""
                      className="size-9 rounded-lg object-cover ring-1 ring-black/10"
                    />
                  ) : (
                    <span className="flex size-9 items-center justify-center rounded-lg bg-neutral-50 text-neutral-300">
                      <HugeiconsIcon icon={Image02Icon} className="size-4" />
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                    >
                      <HugeiconsIcon icon={Edit02Icon} />
                      <span className="sr-only">Edit {member.member || member.company}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <HugeiconsIcon icon={Delete02Icon} />
                      <span className="sr-only">Delete {member.member || member.company}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6} className="h-32 text-center text-neutral-400">
                No members found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-4 border-t border-neutral-100 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>Rows per page</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0);
            }}
            className="h-8 rounded-lg border border-neutral-200 bg-white px-2.5 text-xs text-neutral-700 outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-neutral-500">
            Page {currentPage + 1} of {pageCount}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              type="button"
              className="rounded-lg border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              onClick={() => setPageIndex(0)}
              disabled={currentPage === 0}
            >
              <HugeiconsIcon icon={ArrowLeftDoubleIcon} />
              <span className="sr-only">Go to first page</span>
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              type="button"
              className="rounded-lg border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} />
              <span className="sr-only">Go to previous page</span>
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              type="button"
              className="rounded-lg border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
              disabled={currentPage >= pageCount - 1}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} />
              <span className="sr-only">Go to next page</span>
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              type="button"
              className="rounded-lg border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              onClick={() => setPageIndex(pageCount - 1)}
              disabled={currentPage >= pageCount - 1}
            >
              <HugeiconsIcon icon={ArrowRightDoubleIcon} />
              <span className="sr-only">Go to last page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
