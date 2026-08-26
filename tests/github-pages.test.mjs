import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const outputDir = join(process.cwd(), "dist-pages");

test("builds a GitHub Pages bundle for the portfolio2026 project path", () => {
  const html = readFileSync(join(outputDir, "index.html"), "utf8");
  const assetNames = readdirSync(join(outputDir, "assets"));
  const cssName = assetNames.find((name) => name.endsWith(".css"));

  assert.match(html, /https:\/\/celia099\.github\.io\/portfolio2026\//);
  assert.match(html, /\/portfolio2026\/assets\/index-[^"']+\.js/);
  assert.match(html, /\/portfolio2026\/assets\/index-[^"']+\.css/);
  assert.ok(cssName, "expected a generated CSS bundle");

  const css = readFileSync(join(outputDir, "assets", cssName), "utf8");
  assert.match(css, /\/portfolio2026\/hero-background-v2\.jpg/);
  assert.match(html, /rel="preload"[^>]+\/portfolio2026\/hero-background-v2\.jpg/);
  assert.ok(existsSync(join(outputDir, ".nojekyll")));
  assert.ok(existsSync(join(outputDir, "og.jpg")));
  assert.ok(existsSync(join(outputDir, "previews", "rfm", "page-27.jpg")));
  assert.equal(existsSync(join(outputDir, "previews", "rfm", "page-01.jpg")), false);
  assert.ok(existsSync(join(outputDir, "previews", "rfm", "page-02.jpg")));
  assert.ok(existsSync(join(outputDir, "previews", "law-planet", "page-15.jpg")));
  assert.ok(existsSync(join(outputDir, "previews", "hydrogen-wheel", "page-22.jpg")));
});
