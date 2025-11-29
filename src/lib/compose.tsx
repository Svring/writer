import type { ComponentType, ReactNode } from "react";

type ProviderEntry = readonly [
  ComponentType<{ children?: ReactNode; [key: string]: unknown }>,
  Readonly<Record<string, unknown>>,
];

export function composeProviders(
  providers: readonly ProviderEntry[]
): ComponentType<{ children: ReactNode }> {
  return function ComposedProviders({ children }: { children: ReactNode }) {
    return providers.reduceRight(
      (acc, [Provider, props]) => (
        <Provider {...props}>{acc}</Provider>
      ),
      children as ReactNode
    );
  };
}

