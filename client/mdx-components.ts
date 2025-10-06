import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs"; // nextra-theme-blog or your custom theme

const themeComponents = getThemeComponents();

export function useMDXComponents(components?: MDXComponents) {
  return {
    ...themeComponents,
    ...components,
  };
}
