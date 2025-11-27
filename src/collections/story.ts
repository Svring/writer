import type { CollectionConfig } from "payload";

export const Story: CollectionConfig = {
  slug: "story",
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "series",
      "seriesOrder",
      "world",
      "isPublished",
      "publishedAt",
      "updatedAt",
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      admin: {
        description:
          "Story title (e.g., 'Chapter 1: The Beginning' or 'The Last Wish')",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug",
      admin: {
        description:
          "URL-friendly identifier (unique within series, or within world if standalone)",
        readOnly: true,
      },
    },
    {
      name: "world",
      type: "relationship",
      relationTo: "world",
      required: true,
      label: "World",
      admin: {
        description:
          "The world/universe this story belongs to (required - story always belongs to exactly one world)",
      },
    },
    {
      name: "series",
      type: "relationship",
      relationTo: "series",
      required: false,
      label: "Series",
      admin: {
        description:
          "The series this story belongs to (omit for standalone/one-shot stories)",
      },
    },
    {
      name: "seriesOrder",
      type: "number",
      required: false,
      label: "Series Order",
      admin: {
        description:
          "Ordering within the series (1, 2, 3...). Only set when part of a series. Single source of truth for ordering.",
      },
    },
    {
      name: "content",
      type: "json",
      required: false,
      label: "Content",
      admin: {
        description: "Markdown / full chapter text (required when published)",
      },
    },
    {
      name: "tagline",
      type: "text",
      required: false,
      label: "Tagline",
      admin: {
        description:
          "Short hook shown in chapter list (e.g., 'Everything changes tonight'). Omit if not used.",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Cover Image",
      admin: {
        description: "Optional chapter illustration. Omit if not used.",
      },
    },
    {
      name: "gallery",
      type: "array",
      required: false,
      label: "Gallery",
      admin: {
        description:
          "Extra images that belong only to this chapter. Omit if not used.",
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
      name: "authorNote",
      type: "textarea",
      required: false,
      label: "Author Note",
      admin: {
        description:
          "Optional author note at the end of the chapter. Omit if not used.",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      label: "Author",
      admin: {
        description: "Who created this story",
      },
    },
    {
      name: "isPublished",
      type: "checkbox",
      required: true,
      defaultValue: false,
      label: "Is Published",
      admin: {
        description: "Whether this story is published (false = draft)",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      required: false,
      label: "Published At",
      admin: {
        description: "When the story was published. Omit if not published yet.",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "scheduledAt",
      type: "date",
      required: false,
      label: "Scheduled At",
      admin: {
        description: "For scheduled drops. Omit if not scheduled.",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
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
          name: "viewCount",
          type: "number",
          defaultValue: 0,
          label: "View Count",
        },
        {
          name: "likeCount",
          type: "number",
          defaultValue: 0,
          label: "Like Count",
        },
        {
          name: "commentCount",
          type: "number",
          defaultValue: 0,
          label: "Comment Count",
        },
        {
          name: "wordCount",
          type: "number",
          defaultValue: 0,
          label: "Word Count",
          admin: {
            description: "Auto-filled on save",
          },
        },
      ],
    },
    {
      name: "characters",
      type: "join",
      collection: "character",
      on: "story",
      label: "Characters",
      admin: {
        description:
          "Characters in this story (automatically joined from character collection)",
      },
    },
  ],
  timestamps: true,
};
