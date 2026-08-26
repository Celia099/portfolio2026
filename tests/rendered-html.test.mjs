import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://portfolio.example/", { headers: { accept: "text/html", host: "portfolio.example" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete personal portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>姚岩岩 \| AI 产品与策略产品<\/title>/);
  assert.match(html, /一本关于“如何做决定”的实习故事/);
  assert.match(html, /瞬息全宇宙：逃离贝果/);
  assert.match(html, /需求洞察/);
  assert.match(html, /用户产品/);
  assert.match(html, /yanyanyao6049@163\.com/);
  assert.match(html, /180-7901-8389/);
  assert.match(html, /github\.com\/celia099/);
  assert.match(html, /https:\/\/portfolio\.example\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(html, /增长产品|口径待确认|采用该版本单一口径|人工金标准|评测金标准|未包装为已上线产品/);
});

test("exposes the playable project and all four internship stops", async () => {
  const html = await (await render()).text();
  assert.match(html, /celia099\.github\.io\/Everything-Everywhere-All-at-Once/);
  for (const company of ["快手", "小米", "百度", "脉脉"]) {
    assert.match(html, new RegExp(company));
  }
});
