"use client";

import { createElement, type ComponentProps } from "react";
import { getIcon, type IconName } from "@/lib/icons";

type DynamicIconProps = {
  name: IconName | string;
  className?: string;
} & Omit<ComponentProps<"svg">, "name" | "ref">;

/**
 * Renders a Lucide icon by registry name without assigning a dynamic
 * component variable during parent render (avoids React Compiler lint).
 */
export function DynamicIcon({ name, className, ...props }: DynamicIconProps) {
  return createElement(getIcon(name), { className, "aria-hidden": true, ...props });
}
