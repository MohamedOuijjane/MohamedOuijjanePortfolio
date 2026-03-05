import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? "Project";
  const summary =
    project?.summary ??
    "Selected work from the portfolio of software engineer Mohamed Ouijjane.";
  const summaryText =
    summary.length > 160 ? `${summary.slice(0, 157)}…` : summary;

  const stackText =
    project && project.stack.length > 0
      ? project.stack.slice(0, 4).join(" • ")
      : undefined;

  const brand = `${siteConfig.owner} • ${siteConfig.name}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "radial-gradient(circle at top left, #1f2937, #020617 55%)",
        color: "#f9fafb",
        fontSize: 32,
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.3,
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 14px",
            borderRadius: 999,
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            color: "#e5e7eb",
            fontSize: 20,
          }}
        >
          Case Study
        </div>

        <div
          style={{
            maxWidth: "900px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "#e5e7eb",
            }}
          >
            {summaryText}
          </p>
        </div>

        {stackText && (
          <div
            style={{
              display: "inline-flex",
              padding: "10px 16px",
              borderRadius: 999,
              border: "1px solid rgba(148, 163, 184, 0.5)",
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              color: "#cbd5f5",
              fontSize: 20,
            }}
          >
            {stackText}
          </div>
        )}
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          color: "#9ca3af",
        }}
      >
        <div>{brand}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 30%, #6ee7b7, #22c55e)",
            }}
          />
          <span>Software Engineering Portfolio</span>
        </div>
      </div>
    </div>,
    {
      width: size.width,
      height: size.height,
    },
  );
}
