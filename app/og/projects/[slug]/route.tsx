import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getProjectBySlug } from "@/data/projects";
import { getLocalized } from "@/lib/utils";

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

  if (!project) {
    return new Response("Project not found", { status: 404 });
  }

  // Determine locale based on slug or default to English
  const locale = project.slugs.fr === slug ? "fr" : "en";

  const rawTitle = project.title;
  const title =
    typeof rawTitle === "string" ? rawTitle : getLocalized(rawTitle, locale);

  const rawSummary = project.subtitle || project.summary;
  const summary =
    typeof rawSummary === "string"
      ? rawSummary
      : getLocalized(rawSummary, locale);
  const summaryText =
    summary.length > 140 ? `${summary.slice(0, 137)}…` : summary;

  const stackText = project.stack.slice(0, 5).join(" • ");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        background: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
        color: "white",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Accents */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "40%",
          height: "60%",
          background:
            "radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)",
          borderRadius: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "40%",
          height: "60%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          borderRadius: "100%",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            fontSize: "18px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#2dd4bf",
          }}
        >
          <span>Case Study</span>
          <div
            style={{ width: "40px", height: "1px", background: "#2dd4bf" }}
          />
        </div>

        <h1
          style={{
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "24px",
            background: "linear-gradient(to right, #ffffff, #94a3b8)",
            backgroundClip: "text",
            color: "transparent",
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: "28px",
            lineHeight: 1.5,
            color: "#94a3b8",
            maxWidth: "800px",
            marginBottom: "40px",
          }}
        >
          {summaryText}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "20px",
            color: "#5eead4",
            fontWeight: 500,
          }}
        >
          {stackText}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "40px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          <span style={{ color: "#2dd4bf" }}>wejan.dev</span>
          <span style={{ color: "#475569" }}>•</span>
          <span style={{ color: "#94a3b8" }}>Mohamed Ouijjane</span>
        </div>

        <div style={{ fontSize: "20px", color: "#475569" }}>
          Software Engineer Portfolio
        </div>
      </div>
    </div>,
    {
      width: size.width,
      height: size.height,
    },
  );
}
