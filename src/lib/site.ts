import {
  Airplane01Icon,
  AnchorIcon,
  Call02Icon,
  DeliveryTruck01Icon,
  Facebook01Icon,
  GlobalIcon,
  InstagramIcon,
  Linkedin01Icon,
  Location01Icon,
  Mail01Icon,
  Shield01Icon,
  ShippingTruck01Icon,
  Time04Icon,
  WarehouseIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";

/** Unsplash CDN helper — builds an optimized, stable URL for a photo id. */
export const img = (id: string, w = 1200, q = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const PHOTOS = {
  heroPort: "photo-1605902711622-cfb43c4437b5",
  carLoading: "photo-1519003722824-194d4455a60c",
  shipRamp: "photo-1587293852726-70cdb56c2866",
  carSingle: "photo-1568605117036-5fe5e7bab0b7",
  truck: "photo-1578575437130-527eed3abbec",
  containers: "photo-1494412574643-ff11b0a5c1c3",
  warehouse: "photo-1558618666-fcd25c85cd64",
  logistics: "photo-1553413077-190dd305871c",
  carCarrier: "photo-1586528116311-ad8dd3c8310d",
  port2: "photo-1601584115197-04ecc0da31d7",
} as const;

export const site = {
  name: "ALN",
  fullName: "Automobile Logistics Network",
  tagline: "Handpicked freight forwarders & logistics providers worldwide",
  email: "info@autologisticsnetwork.com",
  phone: "+94 75 543 2089",
  address: "No 88, Level 03, Justice Akbar Mawatha, Colombo 02, Sri Lanka",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Network", href: "#network" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
] as const;

export const stats = [
  { value: 42, suffix: "+", label: "Member countries" },
  { value: 180, suffix: "+", label: "Vetted partners" },
  { value: 15, suffix: "K", label: "Vehicles moved / yr" },
  { value: 12, suffix: "", label: "Years of trust" },
] as const;

export const services = [
  {
    icon: AnchorIcon,
    title: "Ocean & Ro-Ro Shipping",
    description:
      "End-to-end sea freight for brand new and used units — from single vehicles to full RoRo and container loads across every major trade lane.",
    photo: PHOTOS.shipRamp,
  },
  {
    icon: DeliveryTruck01Icon,
    title: "Road & Rail Haulage",
    description:
      "Specialised car-carrier fleets and multimodal rail links deliver door-to-door inland transport with real-time tracking.",
    photo: PHOTOS.truck,
  },
  {
    icon: Airplane01Icon,
    title: "Air Freight & Express",
    description:
      "Time-critical automotive parts and high-value units flown worldwide with prioritised customs clearance.",
    photo: PHOTOS.containers,
  },
  {
    icon: WarehouseIcon,
    title: "Warehousing & PDI",
    description:
      "Secure yard storage, pre-delivery inspection and value-added handling managed by trusted local specialists.",
    photo: PHOTOS.warehouse,
  },
] as const;

export const advantages = [
  {
    icon: GlobalIcon,
    title: "One trusted partner per country",
    description:
      "ALN admits a single, handpicked member in each major automotive market — no internal competition, just seamless cooperation.",
  },
  {
    icon: Shield01Icon,
    title: "Vetted & experienced",
    description:
      "Every member is qualified in local and international policies, procedures and regulations for automobile import and export.",
  },
  {
    icon: ShippingTruck01Icon,
    title: "End-to-end coverage",
    description:
      "From 2-wheelers to oversized units, road, rail, sea and air — total solutions regardless of the size of the requirement.",
  },
  {
    icon: Time04Icon,
    title: "Low cost, high return",
    description:
      "Members share operational and marketing insight to move vehicles at low cost with a high, mutually beneficial return.",
  },
] as const;

export const objectives = [
  {
    title: "ALN Objectives",
    body: "To build a global network that supports end-to-end logistics solutions for the automobile industry — delivering brand new and used units from 2-wheelers up to oversized automobiles from manufacturer to end-user via road, rail, sea or air.",
  },
  {
    title: "Why ALN",
    body: "An automobile is a global product that moves across every country. Manufacturers, traders, dealers and end-users all look for reliable service providers in their region — and that is exactly where ALN partners step in.",
  },
  {
    title: "Service Scope",
    body: "Members cooperate to offer complete logistics services: ocean and RoRo shipping, inland haulage, air freight, customs clearance, warehousing, pre-delivery inspection and value-added handling.",
  },
  {
    title: "The Specialty",
    body: "Automobile logistics is a specialised, high-revenue sector few forwarders master. ALN members are strengthened by sharing market sizes, opportunities and operational hints to become true specialists in the trade.",
  },
] as const;

export const clients = [
  "AutoMove",
  "PortLink",
  "CargoWorx",
  "RoRo Global",
  "DriveShip",
  "TransAxis",
  "MotorFreight",
  "HarborLine",
] as const;

export const footerLinks = {
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Membership", href: "#membership" },
    { label: "Member Directory", href: "#network" },
    { label: "Conference", href: "#membership" },
  ],
  Services: [
    { label: "Ocean Shipping", href: "#services" },
    { label: "Road & Rail", href: "#services" },
    { label: "Air Freight", href: "#services" },
    { label: "Warehousing", href: "#services" },
  ],
  Support: [
    { label: "Join Us", href: "#membership" },
    { label: "Service & Quote", href: "#contact" },
    { label: "Gallery", href: "#network" },
    { label: "Contact Us", href: "#contact" },
  ],
} as const;

export const socials = [
  { icon: Facebook01Icon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: Linkedin01Icon, href: "#", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
] as const;

export const contactIcons = { Location01Icon, Call02Icon, Mail01Icon };
