// storage-adapter-import-placeholder

import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Accounts } from "@/collections/auth/Accounts";
import { Sessions } from "@/collections/auth/Sessions";
import { Verifications } from "@/collections/auth/Verifications";
import { Users } from "./collections/auth/Users";
import { Media } from "./collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    routes: {
      login: "/auth/sign-in",
      createFirstUser: "/auth/sign-up",
      forgot: "/auth/forgot-password",
      reset: "/auth/reset-password",
      logout: "/auth/sign-out",
      // account: "/auth/settings" // Optional if you want to change Payload's account setting page in the admin dashboard
    },
  },
  collections: [
    // Auth
    Users,
    Sessions,
    Accounts,
    Verifications,

    Media,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    idType: "uuid",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
