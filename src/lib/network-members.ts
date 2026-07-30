// Data lives in the `network_members` MySQL table now, served by
// public/api/network-members.php — see database/schema.sql and
// database/seed-network-members.sql. This file only keeps the shared type.

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
