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
 * All content here — webinar flyers, achievement photos/videos, the real
 * shipment/meeting photos and the 19 country video clips — comes from the
 * actual ALN media in `public/gallery/`, mirroring the legacy
 * autologisticsnetwork.com gallery pages. The `poster` on each country video
 * is still a stock photo (used as the <video> poster attribute and as the
 * modal fallback if a clip ever goes missing) since a matching still wasn't
 * cut from the footage.
 */

/** Encodes a filename (which may contain spaces/parens) into a public URL. */
const gimg = (folder: string, filename: string) =>
  `/gallery/${folder}/${encodeURIComponent(filename)}`;

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
    cover: gimg("webinar", "webinar1.jpg"),
    count: "4 sessions",
  },
  {
    slug: "photos",
    label: "Photos",
    href: "/gallery/photos",
    icon: Camera,
    tagline: "Moments across the network",
    description:
      "Real shipments, port operations and member meetings captured across the ALN network.",
    cover: gimg("images", "3.jpg"),
    count: "36 photos",
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
    cover: gimg("videos", "ALN Benin Agent.jpg"),
    count: "4 milestones",
  },
];

export const galleryCategoryBySlug = Object.fromEntries(
  galleryCategories.map((c) => [c.slug, c]),
) as Record<GallerySlug, GalleryCategory>;

/* -------------------------------------------------------------------------- */
/*  Webinars                                                                    */
/* -------------------------------------------------------------------------- */

export interface WebinarImage {
  src: string;
  label: string;
}

export interface Webinar {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  images: WebinarImage[];
  host: string;
  featured?: boolean;
}

export const webinars: Webinar[] = [
  {
    id: "aln-free-webinar-business-opportunities",
    title: "ALN Free Webinar — Business Opportunities",
    date: "30 November 2023",
    description:
      "Global automotive logistics market trends (including electric vehicles), demand for global automotive logistics and the current state of the global automotive manufacturing market — an exclusive session for ALN members with morning and evening sittings.",
    tags: ["Market trends", "Electric vehicles", "Members only"],
    images: [
      { src: gimg("webinar", "webinar1.jpg"), label: "Flyer" },
      { src: gimg("webinar", "webinar2.jpg"), label: "Program" },
    ],
    host: "Mr. Mohan D. Meehitiya",
    featured: true,
  },
  {
    id: "aln-3rd-webinar-beyond-2023",
    title: "ALN 3rd Webinar — Automobile Logistics Beyond 2023",
    date: "13–14 June 2023",
    description:
      "Welcome remarks, member introductions, ALN objectives and open member presentations — run as two live sessions over Zoom so every timezone across the network could join.",
    tags: ["Two sessions", "Via Zoom", "Member presentations"],
    images: [
      {
        src: gimg("webinar", "WhatsApp Image 2023-06-12 at 11.07.44 AM.jpeg"),
        label: "Session times",
      },
      {
        src: gimg("webinar", "WhatsApp Image 2023-06-12 at 11.07.54 AM.jpeg"),
        label: "Flyer",
      },
    ],
    host: "ALN Network",
  },
  {
    id: "evolution-of-automobile-logistics",
    title: "The Evolution of Automobile Logistics",
    date: "11 August 2022",
    description:
      "A look at the future of automobile logistics, the challenges of the time, and life after the COVID-19 outbreak — hosted with morning and evening Zoom sessions for members worldwide.",
    tags: ["Post-COVID outlook", "Future of logistics"],
    images: [
      { src: gimg("images", "ALN Webinar final.jpg"), label: "Flyer" },
      { src: gimg("images", "ALN Webinar Program.jpg"), label: "Program" },
    ],
    host: "Mr. Mohan D. Meehitiya",
  },
  {
    id: "discover-new-business-opportunities",
    title: "Discover New Business Opportunities",
    date: "25 August 2021",
    description:
      "An ALN Conference/Webinar introducing the network's objectives, the responsibilities of members and the future business development plan — exclusive to all ALN members.",
    tags: ["Conference webinar", "Member onboarding"],
    images: [
      { src: gimg("webinar", "image01.jpg"), label: "Flyer" },
      { src: gimg("webinar", "image02.jpg"), label: "Agenda" },
    ],
    host: "Mr. Mohan Meehitiya",
  },
];

/* -------------------------------------------------------------------------- */
/*  Photos                                                                       */
/* -------------------------------------------------------------------------- */

export type PhotoAlbum = "Operations" | "Events & Meetings";
export type PhotoAspect = "portrait" | "landscape" | "square";

export interface Photo {
  id: string;
  src: string;
  full: string;
  caption: string;
  album: PhotoAlbum;
  aspect: PhotoAspect;
}

// Aspect ratios cycle to keep the masonry grid visually varied; every source
// image is served at full quality since these are real, modest-sized photos.
const aspectCycle: PhotoAspect[] = ["landscape", "portrait", "square", "portrait", "landscape"];

const operationsFiles = [
  "1 (1).jpg",
  "1.jpg",
  "2 (1).jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
];

const eventsFiles = ["web1.jpg", "web2.jpg", "web3.jpg", "web4.jpg"];

const operationsPhotos: Photo[] = operationsFiles.map((file, i) => ({
  id: `ops-${file}`,
  src: gimg("images", file),
  full: gimg("images", file),
  caption: `ALN shipment — Operations ${i + 1}`,
  album: "Operations",
  aspect: aspectCycle[i % aspectCycle.length],
}));

const eventsPhotos: Photo[] = eventsFiles.map((file, i) => ({
  id: `evt-${file}`,
  src: gimg("images", file),
  full: gimg("images", file),
  caption: `ALN member session ${i + 1}`,
  album: "Events & Meetings",
  aspect: aspectCycle[(i + 2) % aspectCycle.length],
}));

export const photos: Photo[] = [...operationsPhotos, ...eventsPhotos];

export const photoAlbums: PhotoAlbum[] = ["Operations", "Events & Meetings"];

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
  /** Local file under `public/`, for self-hosted clips. */
  src?: string;
  /** Seconds into `src` to seek for the grid thumbnail frame (skips any intro slate). */
  posterTime?: number;
  poster: string;
  featured?: boolean;
}

/** A short-form clip with no country/region tag of its own. */
export interface VideoClip {
  id: string;
  title: string;
  src: string;
}

const posters = [
  "photo-1601584115197-04ecc0da31d7",
  "photo-1605902711622-cfb43c4437b5",
  "photo-1587293852726-70cdb56c2866",
  "photo-1586528116311-ad8dd3c8310d",
  "photo-1494412574643-ff11b0a5c1c3",
  "photo-1578575437130-527eed3abbec",
];

const rawVideos: {
  title: string;
  region: VideoRegion;
  file: string;
  posterTime?: number;
}[] = [
  { title: "ALN - Maldives", region: "Asia", file: "ALN Maldives final.mp4" },
  { title: "ALN - Australia", region: "Oceania", file: "ALN Australia Final.mp4" },
  { title: "ALN - Fiji", region: "Oceania", file: "ALN Fiji - Final.mp4" },
  { title: "ALN - Indonesia", region: "Asia", file: "ALN Indonesia - Final.mp4" },
  {
    title: "ALN - Japan",
    region: "Asia",
    file: "ALN Japan Final for Approval Final.mp4",
  },
  { title: "ALN - Kenya", region: "Africa", file: "ALN Kenya Final.mp4" },
  // This export is a much lower-bitrate proxy than the others and goes black
  // past the first second or two, so it can't use the shared 16s offset.
  {
    title: "ALN - Malaysia",
    region: "Asia",
    file: "ALN Malaysia Final.mp4",
    posterTime: 1,
  },
  { title: "ALN - Nigeria", region: "Africa", file: "ALN NIgeria Final.mp4" },
  {
    title: "ALN Participants - Pakistan",
    region: "Asia",
    file: "ALN Participants - Pakistan Final.mp4",
  },
  {
    title: "ALN Participants - UK",
    region: "Europe",
    file: "ALN Participants - Uk Final.mp4",
  },
  { title: "ALN - Qatar", region: "Middle East", file: "ALN Qatar Final.mp4" },
  { title: "ALN - Russia", region: "Europe", file: "ALN Russia - Final.mp4" },
  {
    title: "ALN - South Africa",
    region: "Africa",
    file: "ALN South Africa Final.mp4",
  },
  {
    title: "ALN - South Korea",
    region: "Asia",
    file: "ALN South Korea - Final.mp4",
  },
  { title: "ALN - Spain", region: "Europe", file: "ALN Spain - Final.mp4" },
  { title: "ALN - Taiwan", region: "Asia", file: "ALN taiwan - Final.mp4" },
  { title: "ALN - Tanzania", region: "Africa", file: "ALN Tanzania - Final.mp4" },
  { title: "ALN - Thailand", region: "Asia", file: "ALN Thailand Final.mp4" },
  { title: "ALN - UAE", region: "Middle East", file: "ALN UAE Final.mp4" },
];

/** Real ALN clips hosted on YouTube — shown as the featured strip above the country grid. */
const featuredRawVideos: {
  title: string;
  region: VideoRegion;
  youtubeId: string;
}[] = [
  {
    title: "R Rak Storage Procedure - ALN",
    region: "Middle East",
    youtubeId: "pSwcn8Ht7ww",
  },
  {
    title: "ALN | United Kingdom Member Auto Box Logistics (Pvt) Ltd",
    region: "Europe",
    youtubeId: "hxrsjXypCmc",
  },
  {
    title: "ALN Sri Lanka Member | Clarion Logistics (Pvt) Ltd",
    region: "Asia",
    youtubeId: "UGfTU4sVhKI",
  },
];

export const featuredVideos: Video[] = featuredRawVideos.map((v) => ({
  id: v.youtubeId,
  title: v.title,
  region: v.region,
  youtubeId: v.youtubeId,
  poster: `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`,
  featured: true,
}));

/** Self-hosted short clips — shown in the "More clips" strip below Featured. */
const clipNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "b1", "b2", "b3"];

export const videoClips: VideoClip[] = clipNames.map((name) => ({
  id: `clip-${name}`,
  title: `ALN Clip ${name.toUpperCase()}`,
  src: gimg("videos/vid", `${name}.mp4`),
}));

export const videos: Video[] = rawVideos.map((v, i) => ({
  id: v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  title: v.title,
  region: v.region,
  src: gimg("videos/vid", v.file),
  // Every clip opens with the same ~15s "ALN Annual Conference" intro slate —
  // seek past it so the grid thumbnail shows the member on camera instead.
  posterTime: v.posterTime ?? 16,
  poster: img(posters[i % posters.length], 1000, 70),
}));

export const videoRegions: VideoRegion[] = [
  "Asia",
  "Africa",
  "Europe",
  "Middle East",
  "Oceania",
];

/* -------------------------------------------------------------------------- */
/*  Achievements                                                               */
/* -------------------------------------------------------------------------- */

export interface Achievement {
  id: string;
  title: string;
  location: string;
  description: string;
  images: string[];
  videos: string[];
}

export const achievements: Achievement[] = [
  {
    id: "qatar-agent",
    title: "Qatar Agent",
    location: "Qatar · Middle East",
    description:
      "Our Qatar member extends the network's reach across the Gulf, coordinating automobile movements through one of the region's busiest trade hubs.",
    images: [],
    videos: [gimg("videos", "achievement.mp4")],
  },
  {
    id: "egypt-agent",
    title: "Egypt Agent",
    location: "Egypt · North Africa",
    description:
      "Mobile crane units handled and shipped through ALN's Egypt member — heavy-equipment logistics at the crossroads of Africa, the Mediterranean and the Middle East.",
    images: [gimg("videos", "Egyptagent.jpg")],
    videos: [gimg("videos", "1.mp4"), gimg("videos", "2.mp4")],
  },
  {
    id: "benin-agent",
    title: "ALN Benin Agent",
    location: "West Africa · Togo, Nigeria, Benin",
    description:
      "First Move Logistics is proud to handle for US Embassy in Niger. We handled shipment of 8 armored vehicles including recovery tools, spare parts strapped inside the vehicle from South Africa to US Embassy in Niger (West Africa). In addition, two units of vehicle spare parts are also being shipped.",
    images: [gimg("videos", "ALN Benin Agent.jpg")],
    videos: [],
  },
  {
    id: "fiji-agent",
    title: "ALN Fiji Agent",
    location: "Fiji · Oceania",
    description:
      "ALN's Fiji member, CGM Freights Pte Ltd, opened a $250,000 container freight station in Lautoka with support from the Fijian Government — a milestone covered in national press, profiling director Krishneel Kumar.",
    images: [gimg("videos", "FIJI.jpg"), gimg("videos", "Fiji Post.jpg")],
    videos: [],
  },
];
