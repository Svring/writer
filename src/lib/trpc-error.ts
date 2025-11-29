/**
 * Creates a TRPC error formatter configuration with customShape
 * @returns Error formatter configuration object for TRPC create function
 */
export function createErrorFormatter() {
  return {
    errorFormatter({ shape }: { shape: unknown }) {
      const isRecord = (value: unknown): value is Record<string, unknown> =>
        typeof value === "object" && value !== null;

      const base = isRecord(shape) ? shape : {};
      const data = isRecord(base.data) ? base.data : {};

      const status =
        typeof data.httpStatus === "number" ? data.httpStatus : 500;
      const path = typeof data.path === "string" ? data.path : undefined;
      const message =
        typeof base.message === "string"
          ? base.message
          : base.message != null
            ? String(base.message)
            : "Unknown error";

      return {
        ...base,
        data: {
          ...data,
          customShape: {
            status,
            path,
            message,
          },
        },
      } as unknown;
    },
  };
}
