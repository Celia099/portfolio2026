import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const visualAssets = [
  "hero-background-v2.jpg",
  "rose-garden.jpg",
  "little-prince-planet.jpg",
  "comic-grid.jpg",
  "project-sweeping.jpg",
  "project-portrait.jpg",
  "project-king.jpg",
  "project-flowers.jpg",
  "project-cliff.jpg",
];

test("keeps portfolio illustration payload within a fast-loading budget", async () => {
  const sizes = await Promise.all(
    visualAssets.map(async (name) => (await stat(new URL(`../public/${name}`, import.meta.url))).size),
  );
  const totalBytes = sizes.reduce((sum, size) => sum + size, 0);
  const heroBytes = sizes[0];

  assert.ok(heroBytes <= 90 * 1024, `hero background is ${heroBytes} bytes; expected at most 90 KiB`);
  assert.ok(totalBytes <= 1200 * 1024, `portfolio illustrations total ${totalBytes} bytes; expected at most 1.2 MiB`);
});

test("prioritizes the hero and lazy-loads below-the-fold illustrations", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const pagesHtml = await readFile(new URL("../github-pages-src/index.html", import.meta.url), "utf8");

  assert.match(pagesHtml, /rel="preload"[^>]+hero-background-v2\.jpg[^>]+fetchpriority="high"/);
  assert.ok((source.match(/loading="lazy"/g) ?? []).length >= 3, "expected below-the-fold illustrations to use native lazy loading");
  assert.doesNotMatch(source, /backgroundImage:/);
  assert.doesNotMatch(css, /url\('\/(?:rose-garden|little-prince-planet)\.jpg'\)/);
});
