/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    name: "unit",
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
    include: ["src/**/*.test.ts"],
    globals: true,
  },
});
