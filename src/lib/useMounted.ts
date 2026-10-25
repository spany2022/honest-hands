"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// True only after hydration — used for UI that depends on the persisted cart.
export function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
