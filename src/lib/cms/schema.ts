import { z } from "zod";

/**
 * Runtime validation for everything coming out of WordPress.
 *
 * The CMS is an external system edited by humans, so its output is untrusted
 * input. Validating at the fetch boundary means a malformed section fails here,
 * with a useful message, instead of crashing a component three layers deep.
 *
 * Section props are validated leniently with `.passthrough()`: the fields the
 * renderer depends on are enforced, while extra fields added later in the CMS
 * flow through without needing a frontend release.
 */

/* -------------------------------------------------------------------------- */
/* Shared primitives                                                          */
/* -------------------------------------------------------------------------- */

const nonEmpty = z.string().min(1);

/** Optional CMS text. WordPress omits empty fields, so absent means "show nothing". */
const text = z.string().optional().default("");
const paragraphs = z.array(z.string()).optional().default([]);

const statItem = z.object({
  value: z.string(),
  label: z.string(),
});

const iconItem = z.object({
  icon: z.string().nullable().optional(),
  label: z.string(),
});

const step = z.object({
  icon: z.string().nullable().optional(),
  label: z.string(),
  text: z.string().optional(),
});

const priceSchema = z.object({
  prefix: z.string(),
  amount: z.string(),
  unit: z.string(),
});

const accommodationSchema = z
  .object({
    id: z.number().optional(),
    slug: z.string().optional(),
    type: z.string().nullable().optional(),
    title: z.string(),
    kicker: z.string().optional().default(""),
    sub: z.string().optional().default(""),
    location: z.string().optional(),
    image: z.string().optional().default(""),
    images: z.array(z.string()).optional(),
    chips: z.array(z.string()).optional().default([]),
    price: priceSchema.optional(),
    note: z.string().optional(),
    variations: z.array(z.object({ name: z.string(), detail: z.string() })).optional(),
    detailPath: z.string().optional(),
    bookingPath: z.string().optional(),
    wide: z.boolean().optional(),
  })
  .passthrough();

const reviewSchema = z.object({
  quote: z.string(),
  name: z.string(),
  stay: z.string(),
  location: z.string(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const locationSchema = z
  .object({
    id: z.number().optional(),
    slug: z.string().optional(),
    name: z.string(),
    area: z.string(),
    stay: z.string(),
    desc: z.string(),
    detail: z.string(),
    imgs: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().optional().default(""),
          width: z.number().optional(),
          height: z.number().optional(),
        }),
      )
      .default([]),
  })
  .passthrough();

/* -------------------------------------------------------------------------- */
/* Section props, by layout name                                              */
/* -------------------------------------------------------------------------- */

const sectionProps = {
  hero_video: z.object({
    videoUrl: z.string().optional(),
    posterUrl: z.string().optional(),
    label: z.string().optional().default(""),
    title: z.string().optional().default(""),
    subtitle: z.string().optional().default(""),
    ctas: z
      .array(z.object({ label: z.string(), to: z.string(), variant: z.string().optional() }))
      .optional()
      .default([]),
  }),

  page_hero: z.object({
    title: z.string(),
    imageUrl: z.string(),
    imageAlt: z.string().optional().default(""),
    titleClassName: z.string().optional(),
    overlayClassName: z.string().optional(),
    className: z.string().optional(),
    stepsVariant: z.enum(["hero", "section"]).optional(),
    steps: z.array(step).optional(),
  }),

  intro_stats: z.object({
    eyebrow: z.string().optional().default(""),
    heading: z.string().optional().default(""),
    body: z.string().optional().default(""),
    stats: z.array(statItem).optional().default([]),
  }),

  stay_intro: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    paragraphs: z.array(z.string()).optional().default([]),
    stats: z.array(statItem).optional(),
    className: z.string().optional(),
  }),

  split_intro: z.object({
    eyebrow: text,
    heading: text,
    lead: z.string().optional(),
    paragraphs,
    className: z.string().optional(),
  }),

  stats_band: z.object({
    eyebrow: z.string().optional(),
    stats: z.array(statItem).optional().default([]),
    className: z.string().optional(),
  }),

  process_steps: z.object({
    eyebrow: z.string().nullable().optional(),
    heading: z.string().nullable().optional(),
    steps: z.array(step).optional().default([]),
    variant: z.enum(["hero", "section"]).optional(),
    className: z.string().optional(),
  }),

  accommodation_tabs: z.object({
    eyebrow: z.string().optional().default(""),
    heading: z.string().optional().default(""),
    description: z.string().optional().default(""),
    roomsTabLabel: text,
    apartmentsTabLabel: text,
    roomsActionLabel: text,
    apartmentsActionLabel: text,
    roomsActionTo: z.string().optional(),
    apartmentsActionTo: z.string().optional(),
    roomsViewAllLabel: z.string().optional(),
    roomsViewAllTo: z.string().optional(),
    apartmentsViewAllLabel: z.string().optional(),
    apartmentsViewAllTo: z.string().optional(),
    rooms: z.array(accommodationSchema).optional().default([]),
    apartments: z.array(accommodationSchema).optional().default([]),
  }),

  accommodation_listing: z.object({
    eyebrow: z.string().optional().default(""),
    heading: z.string().optional().default(""),
    description: z.string().optional().default(""),
    accommodations: z.array(accommodationSchema).optional().default([]),
    actionLabel: z.string().optional().default(""),
    actionTo: z.string().optional(),
    hideDivider: z.boolean().optional(),
    viewAllTo: z.string().optional(),
    viewAllLabel: z.string().optional(),
    className: z.string().optional(),
  }),

  included_benefits: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    benefits: z.array(z.object({ title: z.string(), copy: z.string() })).optional().default([]),
  }),

  guest_experiences: z.object({
    eyebrow: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    rating: z.number().optional(),
    outOf: z.number().optional(),
    reviewSource: z.string().optional(),
    reviewCount: z.number().optional(),
    reviews: z.array(reviewSchema).optional().default([]),
    className: z.string().optional(),
  }),

  faq_section: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    items: z.array(faqSchema).optional().default([]),
    description: z.string().optional(),
    className: z.string().optional(),
  }),

  why_wow: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().optional().default(""),
    description: z.string().optional().default(""),
    items: z
      .array(z.object({ icon: z.string().nullable().optional(), title: z.string(), text: z.string() }))
      .optional()
      .default([]),
    ctaLabel: z.string().optional(),
    ctaTo: z.string().optional(),
  }),

  stay_cta_banner: z.object({
    eyebrow: z.string().optional(),
    title: z.string(),
    titleClassName: z.string().optional(),
    description: z.string().optional(),
    primaryLabel: z.string().optional(),
    primaryTo: z.string().optional(),
    secondaryLabel: z.string().optional(),
    secondaryTo: z.string().optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
    className: z.string().optional(),
  }),

  relocation_firms: z.object({
    eyebrow: z.string().optional(),
    heading: text,
    description: text,
    points: z.array(z.object({ title: z.string(), text: z.string() })).optional().default([]),
    ctaLabel: z.string().optional(),
    ctaTo: z.string().optional(),
  }),

  enquiry_form: z.object({
    eyebrow: z.string().optional().default(""),
    heading: z.string().optional().default(""),
    description: z.string().optional().default(""),
    locked: z
      .object({
        label: z.string().optional().default(""),
        value: z.string().optional().default(""),
        hiddenName: z.string().optional().default(""),
        hiddenValue: z.string().optional().default(""),
        options: z.array(z.string()).optional(),
      })
      .optional()
      .default({ label: "", value: "", hiddenName: "", hiddenValue: "" }),
    lockedCaption: z.string().optional(),
    services: z.array(z.string()).optional().default([]),
    submitLabel: z.string().optional(),
    minStayNights: z.number().optional(),
    maxGuests: z.number().optional(),
    stayFields: z.boolean().optional(),
    servicesTitle: z.string().optional(),
    servicesNote: z.string().optional(),
    notesLabel: z.string().optional(),
    notesPlaceholder: z.string().optional(),
    formLabel: z.string().optional(),
    submitTo: z.enum(["gift_card"]).optional().catch(undefined),
    className: z.string().optional(),
  }),

  sirvoy_booking: z.object({
    formId: z.string(),
    lang: z.string().optional(),
  }),

  corporate_enquiry_form: z.object({
    eyebrow: text,
    heading: text,
    description: text,
    noteStrong: z.string().optional(),
    note: z.string().optional(),
    formLabel: text,
    fields: z.record(z.string(), z.object({ label: z.string().optional(), placeholder: z.string().optional() })).optional().default({}),
    accommodationOptions: z.array(z.string()).optional().default([]),
    pdf: z.record(z.string(), z.string()).optional().default({}),
    optionalSuffix: text,
    consent: text,
    submit: text,
    sending: text,
    success: z.record(z.string(), z.string()).optional().default({}),
    messages: z.record(z.string(), z.string()).optional().default({}),
  }),

  welcoming_locations: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    showViewAll: z.boolean().optional(),
    viewAllLabel: z.string().optional(),
    viewAllTo: z.string().optional(),
    locations: z.array(locationSchema).optional().default([]),
  }),

  gallery_marquee: z.object({
    eyebrow: z.string().optional().default(""),
    heading: z.string().optional().default(""),
    linkLabel: z.string().optional(),
    linkTo: z.string().optional(),
    photos: z.array(z.object({ src: z.string(), alt: z.string().optional().default("") })).optional().default([]),
  }),

  neighbourhood_explorer: z.object({
    eyebrow: z.string().optional().default(""),
    title: z.string().optional().default(""),
    description: z.string().optional().default(""),
    neighbourhoods: z
      .array(
        z.object({
          name: z.string(),
          intro: z.string(),
          places: z
            .array(
              z.object({
                kicker: z.string(),
                title: z.string(),
                description: z.string(),
                image: z.string().optional(),
                images: z.array(z.string()).optional(),
                href: z.string().optional(),
              }),
            )
            .default([]),
          heading: z.string().optional(),
        }),
      )
      .optional()
      .default([]),
    tabsLabel: z.string().optional(),
    linkLabel: z.string().optional(),
    cardHoverMotion: z.boolean().optional(),
    className: z.string().optional(),
    panelClassName: z.string().optional(),
  }),

  external_guide_callout: z.object({
    eyebrow: z.string().optional().default(""),
    title: z.string().optional().default(""),
    description: z.union([z.string(), z.array(z.string())]).optional().default(""),
    ctaLabel: z.string().optional().default(""),
    ctaHref: z.string().optional().default(""),
    ctaVariant: z.enum(["link", "button"]).optional(),
    image: z.string().optional().default(""),
    imageAlt: z.string().optional().default(""),
    className: z.string().optional(),
    contentClassName: z.string().optional(),
    imageClassName: z.string().optional(),
    titleClassName: z.string().optional(),
    descriptionClassName: z.string().optional(),
  }),

  rich_text: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    html: z.string().optional().default(""),
    width: z.enum(["narrow", "wide"]).optional(),
    className: z.string().optional(),
  }),

  room_detail_hero: z.object({
    breadcrumbParent: z.object({ label: z.string(), to: z.string() }),
    kicker: z.string().optional().default(""),
    title: z.string(),
    description: z.string().optional().default(""),
    location: z.string().optional().default(""),
    chips: z.array(z.string()).optional().default([]),
    optionsLabel: z.string().optional(),
    note: z.object({ label: z.string(), content: z.string() }).optional(),
    ctaLabel: z.string().optional().default(""),
    ctaHref: z.string().optional().default(""),
    images: z.array(z.object({ url: z.string(), alt: z.string().optional().default("") })).optional().default([]),
  }),

  room_variations: z.object({
    title: text,
    label: text,
    heading: text,
    pricePrefix: text,
    priceSuffix: text,
    ctaLabel: text,
    options: z
      .array(
        z.object({
          title: z.string(),
          size: z.string(),
          area: z.string(),
          price: z.string(),
          description: z.string(),
          image: z.string().optional().default(""),
          imageAlt: z.string().optional().default(""),
          features: z.array(z.string()).default([]),
          images: z.array(z.string()).optional(),
          guests: z.string().optional(),
          bed: z.string().optional(),
        }),
      )
      .optional()
      .default([]),
  }),

  similar_rooms: z.object({
    eyebrow: z.string().optional().default(""),
    heading: z.string().optional().default(""),
    subheading: z.string().optional().default(""),
    carouselLabel: z.string().optional().default(""),
    rooms: z
      .array(
        z.object({
          title: z.string(),
          meta: z.string(),
          description: z.string(),
          chips: z.array(z.string()).default([]),
          image: z.string().optional().default(""),
          imageAlt: z.string().optional().default(""),
          images: z.array(z.string()).optional(),
          href: z.string().optional(),
          bookingPath: z.string().optional(),
        }),
      )
      .optional()
      .default([]),
    actionLabel: z.string().optional(),
    actionTo: z.string().optional(),
  }),

  room_information: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    labels: z.record(z.string(), z.string()).optional().default({}),
    amenitiesHeading: z.string().optional().default(""),
    amenities: z.array(iconItem).optional().default([]),
    notIncluded: z.array(iconItem).optional().default([]),
    location: z.object({
      heading: z.string(),
      description: z.string(),
      address: z.string(),
      mapsHref: z.string(),
      nearby: z
        .array(
          z.object({
            category: z.string(),
            icon: z.string().nullable().optional(),
            place: z.string(),
            distance: z.string(),
          }),
        )
        .default([]),
    }),
    rules: z.object({
      intro: z.string(),
      items: z
        .array(
          z.object({
            icon: z.string().nullable().optional(),
            label: z.string(),
            detail: z.string(),
          }),
        )
        .default([]),
    }),
    cancellation: z
      .object({
        intro: z.string(),
        tiers: z.array(z.object({ window: z.string(), title: z.string(), detail: z.string() })),
        notes: z.array(z.string()).default([]),
      })
      .optional(),
  }),

  /* Bespoke page sections (about, contact, gift card, gallery, locations) */

  about_story: z.object({
    imageUrl: text,
    imageAlt: text,
    captionName: text,
    captionRole: text,
    eyebrow: text,
    lead: text,
    paragraphs,
    ctaLabel: z.string().nullable().optional(),
    ctaTo: z.string().nullable().optional(),
    className: z.string().optional(),
  }),

  quote_band: z.object({
    eyebrow: text,
    paragraphs,
    quote: text,
    attribution: text,
  }),

  location_cards: z.object({
    eyebrow: text,
    heading: text,
    description: z.string().optional(),
    className: z.string().optional(),
    linkLabel: z.string().optional(),
    linkTo: z.string().optional(),
    cards: z
      .array(z.object({ area: text, name: text, image: text, imageAlt: text, description: text }))
      .optional()
      .default([]),
  }),

  editorial_split: z.object({
    eyebrow: text,
    lead: text,
    text,
    linkLabel: z.string().optional(),
    linkTo: z.string().optional(),
    imageUrl: text,
    imageAlt: text,
    className: z.string().optional(),
  }),

  editorial_pillars: z.object({
    eyebrow: text,
    title: text,
    description: z.string().optional(),
    items: z.array(z.object({ number: text, eyebrow: text, title: text, description: text, note: z.string().optional() })).optional().default([]),
    className: z.string().optional(),
  }),

  location_facts: z.object({
    eyebrow: text,
    title: text,
    description: text,
    listLabel: z.string().optional(),
    cards: z
      .array(
        z.object({
          number: text,
          area: text,
          name: text,
          description: text,
          facts: z.array(z.object({ label: text, value: text })).optional().default([]),
          cta: z.object({ label: text, href: text }).optional().default({ label: "", href: "" }),
        }),
      )
      .optional()
      .default([]),
    className: z.string().optional(),
  }),

  careers_callout: z.object({
    imageUrl: text,
    imageAlt: text,
    eyebrow: text,
    heading: text,
    text,
    emailLabel: z.string().optional(),
    email: z.string().optional(),
    linkLabel: z.string().optional(),
    linkTo: z.string().optional(),
  }),

  guest_contact: z.object({
    className: z.string().optional(),
  }),

  contact_details: z.object({
    eyebrow: text,
    heading: text,
    text,
    contactHeading: text,
    contacts: z.array(z.object({ heading: text, name: text, email: text })).optional(),
    formEyebrow: text,
    formHeading: text,
  }),

  gift_card: z.object({
    eyebrow: text,
    heading: text,
    paragraphs,
    panelEyebrow: text,
    panelHeading: text,
    panelText: text,
    emailLabel: text,
    callLabel: text,
    emailSubject: text,
  }),

  page_intro: z.object({
    eyebrow: text,
    title: text,
    subtitle: text,
    text,
  }),

  gallery_grid: z.object({
    ariaLabel: text,
    photos: z
      .array(z.object({ src: z.string(), alt: text, shape: z.enum(["small", "feature", "portrait", "wide"]).catch("small") }))
      .optional()
      .default([]),
  }),

  booking_cta: z.object({
    eyebrow: text,
    heading: text,
    text,
  }),

  locations_map: z.object({
    eyebrow: text,
    heading: text,
    mapLabel: text,
    itemLabel: text,
    locations: z
      .array(
        z.object({
          number: text,
          area: text,
          address: text,
          descriptor: text,
          x: z.number(),
          y: z.number(),
          labelY: z.number().optional().default(-30),
        }),
      )
      .optional()
      .default([]),
    ctaLabel: z.string().optional(),
    ctaTo: z.string().optional(),
  }),

  statement_band: z.object({
    lead: text,
    statement: text,
  }),

  getting_around: z.object({
    eyebrow: text,
    heading: text,
    text,
    columns: z.array(z.object({ value: text, title: text, body: text })).optional().default([]),
    listLabel: z.string().optional(),
    className: z.string().optional(),
  }),

  editorial_discovery: z.object({
    eyebrow: text,
    title: text,
    description: text,
    quote: text,
    image: text,
    imageAlt: text,
  }),

  city_guide: z.object({
    eyebrow: text,
    title: text,
    entries: z.array(z.object({ number: text, eyebrow: text, title: text, description: text, highlights: paragraphs, image: text, imageAlt: text })).optional().default([]),
  }),

  editorial_map: z.object({
    eyebrow: text,
    title: text,
    description: text,
    image: text,
    imageAlt: text,
  }),

  seasonal_notes: z.object({
    eyebrow: text,
    title: text,
    description: z.string().optional(),
    bestForLabel: z.string().optional(),
    entries: z.array(z.object({ season: text, months: text, title: text, description: text, bestFor: text })).optional().default([]),
  }),

  stay_pathways: z.object({
    eyebrow: text,
    title: text,
    description: text,
    items: z.array(z.object({ number: text, label: text, title: text, description: text, linkLabel: text, targetId: text })).optional().default([]),
    className: z.string().optional(),
  }),

  offer_listing: z.object({
    eyebrow: text,
    title: text,
    description: text,
    offers: z
      .array(
        z.object({
          kicker: text,
          title: z.string(),
          description: text,
          image: z.string().optional(),
          images: z.array(z.string()).optional(),
          price: priceSchema.optional(),
          action: z.object({ label: z.string(), to: z.string() }).optional(),
        }),
      )
      .optional()
      .default([]),
    className: z.string().optional(),
    panelClassName: z.string().optional(),
  }),
} as const;

export type SectionType = keyof typeof sectionProps;

export const KNOWN_SECTION_TYPES = Object.keys(sectionProps) as SectionType[];

/** A section whose props failed validation, or whose type the frontend does not know. */
export type InvalidSection = {
  id: string;
  type: string;
  anchor: string | null;
  valid: false;
  reason: string;
};

export type ValidSection = {
  [K in SectionType]: {
    id: string;
    type: K;
    anchor: string | null;
    valid: true;
    props: z.infer<(typeof sectionProps)[K]>;
  };
}[SectionType];

export type Section = ValidSection | InvalidSection;

const sectionEnvelope = z.object({
  id: z.string(),
  type: z.string(),
  anchor: z.string().nullable().optional(),
  props: z.record(z.string(), z.unknown()).optional().default({}),
});

export const pageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  lang: z.string().optional(),
  /** Slug per language code (WPML translations), e.g. { sv: "rooms", en: "rooms" }. */
  translations: z.record(z.string(), z.string()).optional(),
  status: z.string().optional(),
  modified: z.string().optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      noindex: z.boolean().optional(),
    })
    .optional(),
  sections: z.array(sectionEnvelope).optional().default([]),
});

export const pageIndexSchema = z.object({
  count: z.number(),
  items: z.array(
    z.object({
      id: z.number(),
      slug: z.string(),
      title: z.string(),
      modified: z.string().nullable().optional(),
    }),
  ),
});

/**
 * Validate one section's props against its layout schema.
 *
 * An unknown or malformed section is returned as `valid: false` rather than
 * thrown, so one bad section never takes down the whole page.
 */
export function parseSection(raw: z.infer<typeof sectionEnvelope>): Section {
  const base = { id: raw.id, type: raw.type, anchor: raw.anchor ?? null };

  if (!(raw.type in sectionProps)) {
    return { ...base, valid: false, reason: `unknown section type "${raw.type}"` };
  }

  const schema = sectionProps[raw.type as SectionType];
  const result = schema.safeParse(raw.props);

  if (!result.success) {
    return {
      ...base,
      valid: false,
      reason: result.error.issues
        .slice(0, 3)
        .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("; "),
    };
  }

  return { ...base, valid: true, props: result.data } as ValidSection;
}

export { nonEmpty };
