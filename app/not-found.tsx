import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: "32rem" }}>
        <h1 style={{ fontStyle: "italic" }}>The shelf is bare.</h1>
        <p style={{ marginTop: "1rem", opacity: 0.8 }}>
          The page you sought is not among the alienist&rsquo;s collected papers.
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/">Return to the Cabinet →</Link>
        </p>
      </div>
    </main>
  );
}
