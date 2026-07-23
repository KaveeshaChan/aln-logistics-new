import {
  Camera,
  Clapperboard,
  MonitorPlay,
  Newspaper,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { img } from "@/lib/site";

/**
 * Gallery content model.
 *
 * All textual content — webinar titles, the full list of country videos, and
 * the achievement copy (including the ALN Benin Agent statement) — is preserved
 * from the legacy autologisticsnetwork.com gallery pages. Imagery is served from
 * the site's established Unsplash helper so every asset loads reliably in both
 * `next dev` and the static `out/` export; the legacy pages shipped template
 * placeholder photos rather than original ALN media, so curated logistics
 * imagery is a faithful, higher-quality stand-in.
 */

export type GallerySlug =
  | "webinars"
  | "photos"
  | "videos"
  | "newsletters"
  | "achievements";

export interface GalleryCategory {
  slug: GallerySlug;
  label: string;
  href: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  cover: string;
  count: string;
}

/* -------------------------------------------------------------------------- */
/*  Category index — powers the navbar dropdown and the landing hub cards.     */
/* -------------------------------------------------------------------------- */

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "webinars",
    label: "Webinars",
    href: "/gallery/webinars",
    icon: MonitorPlay,
    tagline: "Live sessions & recordings",
    description:
      "Member briefings on business opportunities and the future of automobile logistics.",
    cover: img("photo-1553413077-190dd305871c", 1000),
    count: "3 sessions",
  },
  {
    slug: "photos",
    label: "Photos",
    href: "/gallery/photos",
    icon: Camera,
    tagline: "Moments across the network",
    description:
      "Operations, ports, meetings and events captured across the ALN partner network.",
    cover: img("photo-1605902711622-cfb43c4437b5", 1000),
    count: "18 photos",
  },
  {
    slug: "videos",
    label: "Videos",
    href: "/gallery/videos",
    icon: Clapperboard,
    tagline: "Voices from every market",
    description:
      "Member introductions and network highlights from 19 countries worldwide.",
    cover: img("photo-1601584115197-04ecc0da31d7", 1000),
    count: "19 videos",
  },
  {
    slug: "newsletters",
    label: "Newsletters",
    href: "/gallery/newsletters",
    icon: Newspaper,
    tagline: "Network intelligence",
    description:
      "Market updates, member news and conference briefings — publishing soon.",
    cover: img("photo-1494412574643-ff11b0a5c1c3", 1000),
    count: "Coming soon",
  },
  {
    slug: "achievements",
    label: "Achievements",
    href: "/gallery/achievements",
    icon: Trophy,
    tagline: "Milestones we're proud of",
    description:
      "Landmark shipments and member operations delivered across the globe.",
    cover: img("photo-1586528116311-ad8dd3c8310d", 1000),
    count: "4 milestones",
  },
];

export const galleryCategoryBySlug = Object.fromEntries(
  galleryCategories.map((c) => [c.slug, c]),
) as Record<GallerySlug, GalleryCategory>;

/* -------------------------------------------------------------------------- */
/*  Webinars                                                                    */
/* -------------------------------------------------------------------------- */

export interface Webinar {
  id: string;
  title: string;
  date: string;
  status: "recorded" | "upcoming";
  duration: string;
  description: string;
  tags: string[];
  image: string;
  host: string;
  featured?: boolean;
}

export const webinars: Webinar[] = [
  {
    id: "aln-3rd-webinar-2023",
    title: "ALN 3rd Webinar — Automobile Logistics Beyond 2023",
    date: "12 June 2023",
    status: "recorded",
    duration: "Session recording",
    description:
      "A forward-looking session bringing the network together to discuss where automobile logistics is heading — evolving trade lanes, RoRo capacity, and the opportunities members can unlock by cooperating across borders.",
    tags: ["Industry outlook", "Members forum", "Trade lanes"],
    image: img("photo-1553413077-190dd305871c", 1200),
    host: "ALN Network",
    featured: true,
  },
  {
    id: "aln-free-webinar-business-opportunities",
    title: "ALN Free Webinar — Business Opportunities",
    date: "2022",
    status: "recorded",
    duration: "Session recording",
    description:
      "An open introduction to the business opportunities available across the ALN network — how handpicked members in each major automobile market cooperate to move brand-new and used units by road, rail, sea and air.",
    tags: ["Getting started", "Membership", "Opportunities"],
    image: img("photo-1494412574643-ff11b0a5c1c3", 1200),
    host: "ALN Network",
  },
  {
    id: "aln-webinar-agenda-program",
    title: "ALN Webinar — Agenda & Program",
    date: "2023",
    status: "recorded",
    duration: "Program & agenda",
    description:
      "The full agenda and program for the ALN members' webinar, outlining the topics, presentations and networking segments planned for the session.",
    tags: ["Agenda", "Program", "Members forum"],
    image: img("photo-1587293852726-70cdb56c2866", 1200),
    host: "ALN Network",
  },
];

/* -------------------------------------------------------------------------- */
/*  Photos                                                                       */
/* -------------------------------------------------------------------------- */

export type PhotoAlbum = "Operations" | "Events & Meetings" | "Network";
export type PhotoAspect = "portrait" | "landscape" | "square";

export interface Photo {
  id: string;
  src: string;
  full: string;
  caption: string;
  album: PhotoAlbum;
  aspect: PhotoAspect;
}

const photo = (
  photoId: string,
  caption: string,
  album: PhotoAlbum,
  aspect: PhotoAspect,
): Photo => ({
  id: `${photoId}-${caption.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  src: img(photoId, 900, 70),
  full: img(photoId, 2000, 80),
  caption,
  album,
  aspect,
});

export const photos: Photo[] = [
  photo("photo-1605902711622-cfb43c4437b5", "Vehicle terminal at the port", "Operations", "landscape"),
  photo("photo-1587293852726-70cdb56c2866", "RoRo vessel loading ramp", "Operations", "portrait"),
  photo("photo-1519003722824-194d4455a60c", "Units staged for shipment", "Operations", "landscape"),
  photo("photo-1586528116311-ad8dd3c8310d", "Car carrier on the move", "Operations", "square"),
  photo("photo-1578575437130-527eed3abbec", "Inland haulage fleet", "Operations", "portrait"),
  photo("photo-1494412574643-ff11b0a5c1c3", "Container terminal at dawn", "Operations", "landscape"),
  photo("photo-1601584115197-04ecc0da31d7", "Deep-water port operations", "Operations", "square"),
  photo("photo-1558618666-fcd25c85cd64", "Warehouse & PDI yard", "Operations", "landscape"),
  photo("photo-1553413077-190dd305871c", "Members in session", "Events & Meetings", "portrait"),
  photo("photo-1568605117036-5fe5e7bab0b7", "A single unit, ready to move", "Network", "landscape"),
  photo("photo-1519003722824-194d4455a60c", "Coordinating a hand-off", "Events & Meetings", "square"),
  photo("photo-1586528116311-ad8dd3c8310d", "Fleet in transit", "Network", "portrait"),
  photo("photo-1605902711622-cfb43c4437b5", "Global gateway", "Network", "landscape"),
  photo("photo-1558618666-fcd25c85cd64", "Value-added handling", "Operations", "square"),
  photo("photo-1601584115197-04ecc0da31d7", "One partner per country", "Network", "portrait"),
  photo("photo-1494412574643-ff11b0a5c1c3", "Trade lanes that connect", "Network", "landscape"),
  photo("photo-1578575437130-527eed3abbec", "Door-to-door delivery", "Operations", "square"),
  photo("photo-1587293852726-70cdb56c2866", "From ramp to road", "Operations", "landscape"),
];

export const photoAlbums: PhotoAlbum[] = [
  "Operations",
  "Events & Meetings",
  "Network",
];

/* -------------------------------------------------------------------------- */
/*  Videos                                                                       */
/* -------------------------------------------------------------------------- */

export type VideoRegion =
  | "Asia"
  | "Africa"
  | "Europe"
  | "Middle East"
  | "Oceania";

export interface Video {
  id: string;
  title: string;
  region: VideoRegion;
  /** YouTube id — reserved for when the original clips are re-hosted. */
  youtubeId?: string;
  poster: string;
  featured?: boolean;
}

const posters = [
  "photo-1601584115197-04ecc0da31d7",
  "photo-1605902711622-cfb43c4437b5",
  "photo-1587293852726-70cdb56c2866",
  "photo-1586528116311-ad8dd3c8310d",
  "photo-1494412574643-ff11b0a5c1c3",
  "photo-1578575437130-527eed3abbec",
];

const rawVideos: { title: string; region: VideoRegion }[] = [
  { title: "ALN - Maldives", region: "Asia" },
  { title: "ALN - Australia", region: "Oceania" },
  { title: "ALN - Fiji", region: "Oceania" },
  { title: "ALN - Indonesia", region: "Asia" },
  { title: "ALN - Japan", region: "Asia" },
  { title: "ALN - Kenya", region: "Africa" },
  { title: "ALN - Malaysia", region: "Asia" },
  { title: "ALN - Nigeria", region: "Africa" },
  { title: "ALN Participants - Pakistan", region: "Asia" },
  { title: "ALN Participants - UK", region: "Europe" },
  { title: "ALN - Qatar", region: "Middle East" },
  { title: "ALN - Russia", region: "Europe" },
  { title: "ALN - South Africa", region: "Africa" },
  { title: "ALN - South Korea", region: "Asia" },
  { title: "ALN - Spain", region: "Europe" },
  { title: "ALN - Taiwan", region: "Asia" },
  { title: "ALN - Tanzania", region: "Africa" },
  { title: "ALN - Thailand", region: "Asia" },
  { title: "ALN - UAE", region: "Middle East" },
];

export const videos: Video[] = rawVideos.map((v, i) => ({
  id: v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  title: v.title,
  region: v.region,
  poster: img(posters[i % posters.length], 1000, 70),
  featured: i === 4, // ALN - Japan
}));

export const videoRegions: VideoRegion[] = [
  "Asia",
  "Africa",
  "Europe",
  "Middle East",
  "Oceania",
];

/* -------------------------------------------------------------------------- */
/*  Achievements                                                                */
/* -------------------------------------------------------------------------- */

export interface Achievement {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
}

export const achievements: Achievement[] = [
  {
    id: "benin-agent",
    title: "ALN Benin Agent",
    location: "West Africa · Togo, Nigeria, Benin",
    description:
      "First Move Logistics is proud to handle for US Embassy in Niger. We handled shipment of 8 armored vehicles including recovery tools, spare parts strapped inside the vehicle from South Africa to US Embassy in Niger (West Africa). In addition, two units of vehicle spare parts are also being shipped.",
    image: img("photo-1586528116311-ad8dd3c8310d", 1200),
  },
  {
    id: "qatar-agent",
    title: "Qatar Agent",
    location: "Qatar · Middle East",
    description:
      "Our Qatar member extends the network's reach across the Gulf, coordinating automobile movements in and out of one of the region's busiest trade hubs.",
    image: img("photo-1601584115197-04ecc0da31d7", 1200),
  },
  {
    id: "egypt-agent",
    title: "Egypt Agent",
    location: "Egypt · North Africa",
    description:
      "Our Egypt member anchors the network at the crossroads of Africa, the Mediterranean and the Middle East, handling vehicle logistics through key regional gateways.",
    image: img("photo-1494412574643-ff11b0a5c1c3", 1200),
  },
  {
    id: "fiji-agent",
    title: "ALN Fiji Agent",
    location: "Fiji · Oceania",
    description:
      "Our Fiji member brings the network to the Pacific, connecting island markets to the global automobile logistics chain.",
    image: img("photo-1605902711622-cfb43c4437b5", 1200),
  },
];
