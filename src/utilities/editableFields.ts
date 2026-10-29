/**
 * Whitelist of fields that edit mode is allowed to change, keyed by the
 * GraphQL __typename of the record. This is the security boundary for writes:
 * the publish route rejects any edit whose (typename, apiKey) pair is not here,
 * so a tampered client payload can never write to arbitrary fields/models.
 *
 * Each field declares a kind:
 *   - "text": plain string (saved as-is)
 *   - "html": rich-text / WYSIWYG HTML (sanitized server-side before saving)
 *
 * apiKey values are DatoCMS snake_case field api_keys.
 */
export type FieldKind = "text" | "html";

export const EDITABLE_FIELDS: Record<string, Record<string, FieldKind>> = {
  HerobannerRecord: {
    title: "text",
    eyebrow_text: "text",
    availability_text: "text",
    bodycopy: "html",
  },
  PageHeadingRecord: {
    eyebrow_text: "text",
    title: "text",
  },
  ServiceCardRecord: {
    service_title: "text",
    service_description: "html",
  },
  AdvantageCardRecord: {
    advantage_title: "text",
  },
  PortfolioRecord: {
    professional_work_heading: "text",
    professional_work_description: "text",
    personal_project_heading: "text",
    personal_project_description: "text",
  },
  FooterRecord: {
    title: "text",
    copyright_text: "text",
    bodycopy: "html",
  },
  ContactUsSectionRecord: {
    bodycopy: "html",
  },
};

/** Returns the field kind if editable, otherwise null. */
export function getFieldKind(typename: string, apiKey: string): FieldKind | null {
  return EDITABLE_FIELDS[typename]?.[apiKey] ?? null;
}

export function isEditableField(typename: string, apiKey: string): boolean {
  return getFieldKind(typename, apiKey) !== null;
}
