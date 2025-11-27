import type { CollectionConfig } from "payload";

export const Series: CollectionConfig = {
  slug: "series",
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "slug",
      "world",
      "author",
      "isPublic",
      "stories",
      "createdAt",
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
          "Series title (e.g., 'Demon Slayer', 'My Reincarnation as a Toaster')",
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
          "URL-friendly identifier (unique within world, auto-generated from title)",
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
          "The world/universe this series belongs to (required - series always belongs to exactly one world)",
      },
    },
    {
      name: "tagline",
      type: "text",
      required: false,
      label: "Tagline",
      admin: {
        description:
          "Ultra-short, punchy one-liner that appears right under the title on listings (e.g., 'Sharp wit, sharper blade.')",
      },
    },
    {
      name: "description",
      type: "json",
      required: false,
      label: "Description",
      admin: {
        description:
          "Long-form synopsis (100-1500 chars) - the blurb readers actually read. Readers decide in 8 seconds.",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Cover Image",
      admin: {
        description:
          "Main visual - vertical cover image (like a book/novel cover) - shown everywhere, #1 retention driver",
      },
    },
    {
      name: "bannerImage",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Banner Image",
      admin: {
        description: "Optional wide banner for series page header",
      },
    },
    {
      name: "gallery",
      type: "array",
      required: false,
      label: "Gallery",
      admin: {
        description: "Cover variants, volume covers, etc.",
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
        description: "Who created this series",
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
          "Public series are visible to everyone. False = still drafting the series.",
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
          name: "storyCount",
          type: "number",
          defaultValue: 0,
          label: "Story Count",
          admin: {
            description: "Published chapters",
          },
        },
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
          name: "followerCount",
          type: "number",
          defaultValue: 0,
          label: "Follower Count",
        },
      ],
    },
    {
      name: "stories",
      type: "join",
      collection: "story",
      on: "series",
      label: "Stories",
      admin: {
        description:
          "Stories in this series (automatically joined from story collection)",
      },
    },
  ],
  timestamps: true,
};
