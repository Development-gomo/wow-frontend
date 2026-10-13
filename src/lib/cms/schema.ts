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
    roomsTabLabel: z.string().optional(),
    apartmentsTabLabel: z.string().optional(),
    roomsActionLabel: z.string().optional(),
    apartmentsActionLabel: z.string().optional(),
    viewAllLabel: z.string().optional(),
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
    items: z.array(faqSchema).optional().default([]),
    description: z.string().optional(),
    className: z.string().optional(),
  }),

  why_wow: z.object({
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
  }),

  relocation_firms: z.object({
    heading: z.string(),
    description: z.string().optional().default(""),
    points: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
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
  }),

  sirvoy_booking: z.object({
    formId: z.string(),
    lang: z.string().optional(),
  }),

  welcoming_locations: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    showViewAll: z.boolean().optional(),
    viewAllLabel: z.string().optional(),
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
                href: z.string().optional(),
              }),
            )
            .default([]),
        }),
      )
      .optional()
      .default([]),
  }),

  external_guide_callout: z.object({
    eyebrow: z.string().optional().default(""),
    title: z.string().optional().default(""),
    description: z.string().optional().default(""),
    ctaLabel: z.string().optional().default(""),
    ctaHref: z.string().optional().default(""),
    image: z.string().optional().default(""),
    imageAlt: z.string().optional().default(""),
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
    title: z.string(),
    label: z.string().optional().default(""),
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
          href: z.string().optional(),
        }),
      )
      .optional()
      .default([]),
  }),

  room_information: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
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
