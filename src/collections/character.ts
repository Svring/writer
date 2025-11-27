import type { CollectionConfig } from "payload";

export const Character: CollectionConfig = {
  slug: "character",
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "slug",
      "world",
      "author",
      "isPublic",
      "createdAt",
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Name",
      admin: {
        description: "Character name (e.g., 'Luffy', 'Severus Snape')",
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
          "URL-friendly identifier (unique within world, auto-generated from name)",
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
          "The world/universe this character belongs to (required - no cross-world characters)",
      },
    },
    {
      name: "story",
      type: "relationship",
      relationTo: "story",
      hasMany: true,
      required: false,
      label: "Stories",
      admin: {
        description: "Stories this character appears in",
      },
    },
    {
      name: "tagline",
      type: "text",
      required: false,
      label: "Tagline",
      admin: {
        description:
          "Ultra-short, punchy one-liner that appears right under the name (e.g., 'The sword that talks back.')",
      },
    },
    {
      name: "description",
      type: "json",
      required: false,
      label: "Description",
      admin: {
        description: "Long-form markdown biography (optional)",
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Cover Image",
      admin: {
        description:
          "Main visual - square thumbnail image (required in practice)",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Banner Image",
      admin: {
        description: "Optional banner or full-body art",
      },
    },
    {
      name: "gallery",
      type: "array",
      required: false,
      label: "Gallery",
      admin: {
        description: "Additional images for the character",
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
        description: "Who created this character",
      },
    },
    {
      name: "isPublic",
      type: "checkbox",
      required: true,
      defaultValue: true,
      label: "Is Public",
      admin: {
        description:
          "Public characters are visible to everyone. Private characters are drafts.",
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
          name: "likeCount",
          type: "number",
          defaultValue: 0,
          label: "Like Count",
        },
        {
          name: "viewCount",
          type: "number",
          defaultValue: 0,
          label: "View Count",
        },
      ],
    },
  ],
  timestamps: true,
};
