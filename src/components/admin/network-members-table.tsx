"use client";

import { useEffect, useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  Delete02Icon,
  Image02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

import { AddMemberDialog } from "@/components/admin/add-member-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import type { NetworkMember } from "@/lib/network-members";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

async function parseJsonError(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    return typeof data?.error === "string" ? data.error : fallback;
  } catch {
    return fallback;
  }
}

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

export function NetworkMembersTable({ readOnly = false }: { readOnly?: boolean } = {}) {
  const [members, setMembers] = useState<NetworkMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/network-members.php", { credentials: "same-origin" })
      .then(async (res) => {
        if (!res.ok) throw new Error(await parseJsonError(res, "Failed to load members."));
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setMembers(data.members ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load members.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAdd = async (newMember: Omit<NetworkMember, "id">) => {
    setError(null);
    try {
      const res = await fetch("/api/network-members.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(newMember),
      });
      if (!res.ok) throw new Error(await parseJsonError(res, "Failed to add member."));
      const data = await res.json();
      setMembers((prev) => [data.member, ...prev]);
      setSearch("");
      setPageIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add member.");
    }
  };

  const handleSave = async (updated: NetworkMember) => {
    setError(null);
    try {
      const res = await fetch("/api/network-members.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error(await parseJsonError(res, "Failed to save member."));
      const data = await res.json();
      setMembers((prev) => prev.map((m) => (m.id === data.member.id ? data.member : m)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save member.");
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      const res = await fetch("/api/network-members.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error(await parseJsonError(res, "Failed to delete member."));
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete member.");
    }
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

  const columnCount = readOnly ? 5 : 6;

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
          {readOnly ? null : <AddMemberDialog onAdd={handleAdd} />}
        </div>
      </div>

      {error ? (
        <p className="border-b border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
          {error}
        </p>
      ) : null}

      <Table>
        <TableHeader>
          <TableRow className="border-neutral-100 bg-neutral-50/70 hover:bg-neutral-50/70">
            <TableHead className="text-neutral-400">Member</TableHead>
            <TableHead className="text-neutral-400">Country</TableHead>
            <TableHead className="text-neutral-400">Company Details</TableHead>
            <TableHead className="text-neutral-400">Contact Details</TableHead>
            <TableHead className="text-neutral-400">Images</TableHead>
            {readOnly ? null : (
              <TableHead className="text-right text-neutral-400">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columnCount} className="h-32 text-center text-neutral-400">
                Loading members...
              </TableCell>
            </TableRow>
          ) : rows.length ? (
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
                {readOnly ? null : (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <AddMemberDialog member={member} onSave={handleSave} />
                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              className="rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                            />
                          }
                        >
                          <HugeiconsIcon icon={Delete02Icon} />
                          <span className="sr-only">
                            Delete {member.member || member.company}
                          </span>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white text-neutral-900 ring-neutral-200 sm:max-w-sm">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-base text-neutral-900">
                              Delete network member
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-500">
                              This will remove{" "}
                              <strong className="font-semibold text-neutral-700">
                                {member.member || member.company}
                              </strong>{" "}
                              from the network directory. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(member.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columnCount} className="h-32 text-center text-neutral-400">
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
