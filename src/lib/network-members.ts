// Data lives in Supabase's `network_members` table now — see
// database/schema.sql and database/seed-network-members.sql. Reads are open
// to any authenticated member; writes are restricted to Admins by the RLS
// policies in that schema (not by this client-side code).
import { supabase } from "@/lib/supabase/client";

export type NetworkMember = {
  id: number;
  /** Empty string when the sheet had no named contact for this row. */
  member: string;
  country: string;
  /** ISO 3166-1 alpha-2 code, used to render the country flag. */
  countryCode: string;
  company: string;
  url: string;
  email: string;
  phone: string;
  /** Member/company logo, set via the Add Member form. Not present in the source sheet. */
  logoUrl?: string;
  /** Member photo, set via the Add Member form. Not present in the source sheet. */
  imageUrl?: string;
};

type NetworkMemberRow = {
  id: number;
  member: string;
  country: string;
  country_code: string;
  company: string;
  url: string;
  email: string;
  phone: string;
  logo_url: string | null;
  image_url: string | null;
};

function rowToMember(row: NetworkMemberRow): NetworkMember {
  return {
    id: row.id,
    member: row.member,
    country: row.country,
    countryCode: row.country_code,
    company: row.company,
    url: row.url,
    email: row.email,
    phone: row.phone,
    logoUrl: row.logo_url ?? undefined,
    imageUrl: row.image_url ?? undefined,
  };
}

function memberToRow(member: Omit<NetworkMember, "id">) {
  return {
    member: member.member,
    country: member.country,
    country_code: member.countryCode,
    company: member.company,
    url: member.url,
    email: member.email,
    phone: member.phone,
    logo_url: member.logoUrl ?? null,
    image_url: member.imageUrl ?? null,
  };
}

export async function listNetworkMembers(): Promise<NetworkMember[]> {
  const { data, error } = await supabase
    .from("network_members")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as NetworkMemberRow[]).map(rowToMember);
}

export async function createNetworkMember(
  input: Omit<NetworkMember, "id">
): Promise<NetworkMember> {
  const { data, error } = await supabase
    .from("network_members")
    .insert(memberToRow(input))
    .select()
    .single();

  if (error) throw new Error(error.message);
  return rowToMember(data as NetworkMemberRow);
}

export async function updateNetworkMember(member: NetworkMember): Promise<NetworkMember> {
  const { data, error } = await supabase
    .from("network_members")
    .update(memberToRow(member))
    .eq("id", member.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return rowToMember(data as NetworkMemberRow);
}

export async function deleteNetworkMember(id: number): Promise<void> {
  const { error } = await supabase.from("network_members").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
