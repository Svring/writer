"use client";

import { useForm } from "@tanstack/react-form";
import { type WorldInsert, WorldInsertSchema } from "@/collections/world";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function WorldForm({
  onSubmit,
}: {
  onSubmit?: (values: WorldInsert) => void | Promise<void>;
}) {
  const form = useForm({
    defaultValues: {
      name: "",
      tagline: null as string | null,
    },
    validators: {
      onSubmit: (values) => {
        WorldInsertSchema.pick({ name: true, tagline: true }).parse(
          values.value
        );
      },
    },
    onSubmit: async ({ value }) => {
      await onSubmit?.(value as WorldInsert);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Naruto Verse"
                  value={(field.state.value as string | null | undefined) ?? ""}
                />
                <FieldDescription>
                  Display name for the world (e.g., &apos;Naruto Verse&apos;,
                  &apos;Cyberpunk 2077&apos;)
                </FieldDescription>
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="tagline">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Tagline</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Magic is real. So is homework."
                  value={(field.state.value as string | null | undefined) ?? ""}
                />
                <FieldDescription>
                  Ultra-short, punchy one-liner that appears right under the
                  title
                </FieldDescription>
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button type="submit">Create World</Button>
      </div>
    </form>
  );
}
