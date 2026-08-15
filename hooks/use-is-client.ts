"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True only after client hydration — safe for persisted Zustand UI. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
