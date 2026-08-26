import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
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

async function listFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const child = new URL(entry.name + (entry.isDirectory() ? "/" : ""), root);
      return entry.isDirectory() ? listFiles(child) : child.pathname;
    }),
  );
  return files.flat();
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
  assert.match(html, /173-1071-9609/);
  assert.match(html, /github\.com\/celia099/);
  assert.match(html, />Everything-Everywhere-All-at-Once ↗</);
  assert.match(html, /如果你对我的经历感兴趣\/正在尝试打造AI-Native的工作方式，欢迎来畅聊🤝/);
  assert.match(html, /https:\/\/portfolio\.example\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(html, /增长产品|口径待确认|采用该版本单一口径|人工金标准|评测金标准|未包装为已上线产品|背景：|动作：|分析：|结果：/);
  assert.doesNotMatch(html, /180-7901-8389|Universe Leap/);
});

test("keeps the updated Tide Load evidence in the interactive book", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /潮汐 Load/);
  assert.match(source, /PID 动态调控/);
  assert.match(source, /保障分天 Load 达到 11\.5%/);
  assert.match(source, /发现页整体消耗 \+7%/);
  assert.doesNotMatch(source, /UE 实验复盘|180-7901-8389/);
});

test("exposes the playable project and all four internship stops", async () => {
  const html = await (await render()).text();
  assert.match(html, /celia099\.github\.io\/Everything-Everywhere-All-at-Once/);
  for (const company of ["快手", "小米", "百度", "脉脉"]) {
    assert.match(html, new RegExp(company));
  }
});

test("keeps project illustrations tall and top-aligned", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(css, /\.panel-art \{[^}]*height: clamp\(250px, 24vw, 310px\)/);
  assert.match(css, /\.panel-art \{[^}]*background-position: center, center top/);
  assert.doesNotMatch(css, /\.panel-[125] \.panel-art \{ background-position:/);
  assert.doesNotMatch(source, /image: "\/project-|image: "\/comic-grid/);
});

test("offers image-only, on-site reading for the three portfolio documents", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const documentCases = [
    { slug: "rfm", pages: 27, title: "基于 RFM 的会员留存策略研究" },
    { slug: "law-planet", pages: 15, title: "法学星球——专注 20 万法学生的素质教育" },
    { slug: "hydrogen-wheel", pages: 22, title: "氢轮工作室“互联网+”答辩材料" },
  ];

  assert.match(source, /站内阅览材料/);
  assert.match(source, /原始 PDF 未公开/);
  assert.match(source, /不提供 PDF 下载/);
  assert.doesNotMatch(source, /\.pdf/i);

  for (const documentCase of documentCases) {
    assert.match(source, new RegExp(`slug: "${documentCase.slug}"`));
    assert.match(source, new RegExp(`pageCount: ${documentCase.pages}`));
    assert.match(source, new RegExp(documentCase.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

    const pages = await readdir(new URL(`../public/previews/${documentCase.slug}/`, import.meta.url));
    assert.equal(pages.filter((name) => /^page-\d{2}\.jpg$/.test(name)).length, documentCase.pages);
  }

  const publicFiles = await listFiles(new URL("../public/", import.meta.url));
  assert.equal(publicFiles.filter((path) => path.toLowerCase().endsWith(".pdf")).length, 0);
});
