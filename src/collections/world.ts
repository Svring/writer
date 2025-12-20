import slugify from "@sindresorhus/slugify";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type { CollectionConfig } from "payload";
import type { z } from "zod";
import { world } from "@/payload-generated-schema";

export const WorldSelectSchema = createSelectSchema(world);
export type WorldSelect = typeof WorldSelectSchema;
export const WorldInsertSchema = createInsertSchema(world);
export type WorldInsert = z.infer<typeof WorldInsertSchema>;
export const WorldUpdateSchema = createUpdateSchema(world);
export type WorldUpdate = typeof WorldUpdateSchema;

export const World: CollectionConfig = {
  slug: "world",
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "slug",
      "author",
      "isPublic",
      "series",
      "characters",
      "createdAt",
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      label: "Name",
      admin: {
        description:
          "Display name for the world (e.g., 'Naruto Verse', 'Cyberpunk 2077')",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug",
      admin: {
        description: "URL-friendly identifier (auto-generated from name)",
        readOnly: true,
      },
    },
    {
      name: "tagline",
      type: "text",
      required: false,
      label: "Tagline",
      admin: {
        description:
          "Ultra-short, punchy one-liner that appears right under the title (e.g., 'Magic is real. So is homework.')",
      },
    },
    {
      name: "description",
      type: "json",
      required: false,
      label: "Description",
      admin: {
        description:
          "Long-form text shown on world page (markdown supported, 0-2000 chars)",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Cover Image",
      admin: {
        description: "Main visual - square cover image for the world",
      },
    },
    {
      name: "bannerImage",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Banner Image",
      admin: {
        description: "Optional wide banner image for the world page header",
      },
    },
    {
      name: "gallery",
      type: "array",
      required: false,
      label: "Gallery",
      admin: {
        description: "Additional images for the world",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      label: "Author",
      admin: {
        description: "Who owns/created this world",
      },
    },
    {
      name: "isPublic",
      type: "checkbox",
      required: false,
      defaultValue: false,
      label: "Is Public",
      admin: {
        description:
          "Public worlds are visible to everyone. Private worlds are drafts or co-writing spaces.",
      },
    },
    {
      name: "tags",
      type: "array",
      required: false,
      label: "Tags",
      admin: {
        description:
          "Tags for discovery (e.g., 'high-fantasy', 'litrpg', 'romance')",
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "stats",
      type: "group",
      required: false,
      label: "Statistics",
      admin: {
        description: "Cached counts (updated by background jobs)",
      },
      fields: [
        {
          name: "seriesCount",
          type: "number",
          defaultValue: 0,
          label: "Series Count",
        },
        {
          name: "storyCount",
          type: "number",
          defaultValue: 0,
          label: "Story Count",
        },
        {
          name: "characterCount",
          type: "number",
          defaultValue: 0,
          label: "Character Count",
        },
      ],
    },
    {
      name: "series",
      type: "join",
      collection: "series",
      on: "world",
      label: "Series",
      admin: {
        description:
          "Series in this world (automatically joined from series collection)",
      },
    },
    {
      name: "characters",
      type: "join",
      collection: "character",
      on: "world",
      label: "Characters",
      admin: {
        description:
          "Characters associated with this world (automatically joined from character collection)",
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Auto-generate slug from name whenever name is provided
        if (data.name) {
          data.slug = slugify(data.name);
        }

        // Set author from authenticated user if not already set
        if (req.user && !data.author) {
          data.author = req.user.id;
        }

        return data;
      },
    ],
  },
  timestamps: true,
};
