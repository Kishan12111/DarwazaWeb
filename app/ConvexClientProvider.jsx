"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import Provider from "./Provider";

/** @type {import('react').ReactNode} */
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export function ConvexClientProvider({ children }) {
  return (
    <ConvexProvider client={convex}>
      <Provider>{children}</Provider>
    </ConvexProvider>
  );
}
