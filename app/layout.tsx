import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: "姚岩岩 | AI 产品与策略产品",
    description: "从商业化策略、可穿戴体验到 AI 应用的个人作品集。",
    openGraph: {
      title: "姚岩岩 | AI 产品 · 策略产品 · 增长产品",
      description: "实习、AI 项目、数据分析与创业实践的个人故事。",
      type: "website",
      images: [{ url: imageUrl, width: 1680, height: 945, alt: "姚岩岩个人作品集社交预览图" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "姚岩岩 | AI 产品 · 策略产品 · 增长产品",
      description: "实习、AI 项目、数据分析与创业实践的个人故事。",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
