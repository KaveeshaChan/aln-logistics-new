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
  heroPort: "photo-1774929103756-a46897cda71b",
  carLoading: "photo-1519003722824-194d4455a60c",
  shipRamp: "photo-1522674149721-b0191358dc5c",
  carSingle: "photo-1568605117036-5fe5e7bab0b7",
  truck: "photo-1742940796395-b2a614941353",
  containers: "photo-1494412574643-ff11b0a5c1c3",
  warehouse: "photo-1770319942638-a5989632f2ad",
  logistics: "photo-1553413077-190dd305871c",
  carCarrier: "photo-1761917904658-2a9ecb84a169",
  port2: "photo-1601584115197-04ecc0da31d7",
} as const;

export const site = {
  name: "ALN",
  fullName: "Automobile Logistics Network",
  tagline: "Handpicked freight forwarders & logistics providers worldwide",
  email: "admin1@autologisticsnetwork.com",
  phone: "+94762011272",
  address: "No 88, Level 03, Justice Akbar Mawatha, Colombo 02, Sri Lanka",
};

export const heroSlides = [
  {
    image: "/hero-1.jpg",
    kicker: "Become a Member",
    heading: "The Leading Automobile Logistics Network",
  },
  {
    image: "/hero-2.jpg",
    kicker: "Fastest Growing and Specialized",
    heading: "Automobile Logistics Network in the World",
  },
  {
    image: "/hero-3.jpg",
    kicker: "Freight Contact Business Leads",
    heading: "Secured Business and Maximized Profits",
  },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Member Directory", href: "/login" },
  { label: "Benefits", href: "/benefits" },
  { label: "Conference", href: "/conference" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
] as const;

export const stats = [
  { value: 90, suffix: "+", label: "Member countries" },
  { value: 180, suffix: "+", label: "Vetted partners" },
  { value: 15, suffix: "K", label: "Vehicles moved / yr" },
  { value: 9, suffix: "", label: "Years of trust" },
] as const;

export const services = [
  {
    icon: AnchorIcon,
    title: "Ocean & Ro-Ro Shipping",
    description:
      "End-to-end sea freight for brand new and used units — from single vehicles to full RoRo and container loads across every major trade lane.",
    photo: PHOTOS.shipRamp,
    tags: [
      "RoRo vessels",
      "Container loads",
      "Breakbulk",
      "Port handling",
      "Trade lanes",
    ],
  },
  {
    icon: DeliveryTruck01Icon,
    title: "Road & Rail Haulage",
    description:
      "Specialised car-carrier fleets and multimodal rail links deliver door-to-door inland transport with real-time tracking.",
    photo: PHOTOS.truck,
    tags: [
      "Car carriers",
      "Multimodal rail",
      "Door-to-door",
      "Live tracking",
    ],
  },
  {
    icon: Airplane01Icon,
    title: "Air Freight & Express",
    description:
      "Time-critical automotive parts and high-value units flown worldwide with prioritised customs clearance.",
    photo: PHOTOS.containers,
    tags: [
      "Time-critical",
      "High-value units",
      "Customs priority",
      "Worldwide",
    ],
  },
  {
    icon: WarehouseIcon,
    title: "Warehousing & PDI",
    description:
      "Secure yard storage, pre-delivery inspection and value-added handling managed by trusted local specialists.",
    photo: PHOTOS.warehouse,
    tags: [
      "Yard storage",
      "Pre-delivery inspection",
      "Value-added handling",
      "Local specialists",
    ],
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

export type MembershipCell =
  | true
  | false
  | { star: string }
  | { text: string };

export const membershipTiers = [
  {
    key: "trial",
    name: "Trial",
    price: "Free",
    period: "6 months complimentary",
    blurb: "Explore the network before you commit.",
    cta: "Start Trial",
    featured: false,
  },
  {
    key: "standard",
    name: "Standard",
    price: "$500",
    period: "per year",
    blurb: "Full membership access, year-round.",
    cta: "Join Standard",
    featured: false,
  },
  {
    key: "premium",
    name: "Premium",
    price: "$1,000",
    period: "per year",
    blurb: "Priority placement, front of the line.",
    cta: "Go Premium",
    featured: true,
  },
] as const;

export const membershipBenefits: {
  category: string;
  rows: {
    label: string;
    trial: MembershipCell;
    standard: MembershipCell;
    premium: MembershipCell;
  }[];
}[] = [
  {
    category: "Network & Community",
    rows: [
      {
        label: "Access to the ALN Member Community",
        trial: true,
        standard: true,
        premium: true,
      },
      {
        label: "Company Listing in the ALN Member Directory",
        trial: true,
        standard: true,
        premium: true,
      },
      {
        label: "Business Introductions within the ALN Network",
        trial: true,
        standard: true,
        premium: { star: "Priority" },
      },
      {
        label:
          "Business Opportunities through ALN's Outreach to Exporters, Importers & Automotive Companies",
        trial: true,
        standard: true,
        premium: { star: "Priority" },
      },
    ],
  },
  {
    category: "Events & Engagement",
    rows: [
      {
        label: "Participation in Webinars",
        trial: true,
        standard: true,
        premium: true,
      },
      {
        label: "Participation in Pocket Meetings",
        trial: true,
        standard: true,
        premium: true,
      },
      {
        label: "Eligibility to Attend ALN Annual Conferences*",
        trial: true,
        standard: true,
        premium: true,
      },
      {
        label: "Member Communication Channels",
        trial: true,
        standard: true,
        premium: true,
      },
    ],
  },
  {
    category: "Status & Visibility",
    rows: [
      {
        label: "Official ALN Member Status",
        trial: false,
        standard: true,
        premium: true,
      },
      {
        label: "Dedicated Company Profile on the ALN Website",
        trial: false,
        standard: true,
        premium: { star: "Featured" },
      },
      {
        label: "Promotion through ALN LinkedIn",
        trial: false,
        standard: true,
        premium: { star: "Featured" },
      },
      {
        label: "Inclusion in ALN Newsletters",
        trial: false,
        standard: true,
        premium: { star: "Priority Placement" },
      },
      {
        label: "Member-to-Member Referrals",
        trial: false,
        standard: true,
        premium: { star: "Priority" },
      },
    ],
  },
  {
    category: "Premium Privileges",
    rows: [
      {
        label: "Priority Support from ALN Administration",
        trial: false,
        standard: false,
        premium: true,
      },
      {
        label: "Premium Member / Elite Member Badge",
        trial: false,
        standard: false,
        premium: true,
      },
      {
        label: "Priority Visibility at Conferences & Events",
        trial: false,
        standard: false,
        premium: true,
      },
      {
        label: "Complimentary / Discounted Conference Registration",
        trial: false,
        standard: false,
        premium: true,
      },
      {
        label: "ALN Payment Protection Plan (PPP)",
        trial: false,
        standard: { text: "Optional (USD 350/year)" },
        premium: { text: "Included" },
      },
    ],
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
    { label: "Service & Quote", href: "/quote" },
    { label: "Gallery", href: "#network" },
    { label: "Contact Us", href: "/contact" },
  ],
} as const;

export const socials = [
  { icon: Facebook01Icon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: Linkedin01Icon, href: "#", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
] as const;

export const contactIcons = { Location01Icon, Call02Icon, Mail01Icon };
