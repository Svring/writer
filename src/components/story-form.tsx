"use client";

import { useForm } from "@tanstack/react-form";
import { useMemo } from "react";
import useSWR from "swr";
import type { StoryInsert } from "@/collections/story";
import { StoryInsertSchema } from "@/collections/story";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { World } from "@/payload-types";

export function StoryForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit?: (values: Partial<StoryInsert>) => Promise<void>;
  defaultValues: Partial<StoryInsert>;
}) {
  // Fetch worlds using useSWR
  const worldsKey = useMemo(
    () => ({
      path: "/api/world",
      select: (data: { docs: World[] }) => data.docs,
    }),
    []
  );

  const { data: worlds } = useSWR<World[]>(worldsKey);

  const form = useForm({
    defaultValues: {
      title: defaultValues?.title || "",
      world: defaultValues?.world || "",
    },
    validators: {
      onSubmit: (values) => {
        StoryInsertSchema.pick({ title: true }).parse(values.value);
      },
    },
    onSubmit: async ({ value }) => {
      const storyData: Partial<StoryInsert> = {
        title: value.title,
        content: defaultValues.content,
        ...(value.world ? { world: value.world } : {}),
      };

      await onSubmit?.(storyData);
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
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Chapter 1: The Beginning"
                  value={(field.state.value as string | null | undefined) ?? ""}
                />
                <FieldDescription>
                  Story title (e.g., &apos;Chapter 1: The Beginning&apos; or
                  &apos;The Last Wish&apos;)
                </FieldDescription>
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="world">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>World</FieldLabel>
                <Select
                  onValueChange={(value) => field.handleChange(value)}
                  value={field.state.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a world (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {worlds?.map((world) => (
                      <SelectItem key={world.id} value={world.id}>
                        {world.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  The world/universe this story belongs to (optional)
                </FieldDescription>
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <div className="mt-6">
        <Button className="w-full" type="submit">Create Story</Button>
      </div>
    </form>
  );
}
