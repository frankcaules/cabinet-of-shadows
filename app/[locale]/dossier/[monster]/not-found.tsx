import Link from "next/link";

export default function DossierNotFound() {
  return (
    <main id="main" style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: "32rem" }}>
        <p style={{ letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "0.75rem", opacity: 0.7 }}>
          Case file
        </p>
        <h1 style={{ fontStyle: "italic", marginTop: "0.5rem" }}>
          This monster has not yet been catalogued.
        </h1>
        <p style={{ marginTop: "1.25rem", opacity: 0.8 }}>
          The alienist&rsquo;s drawer for this name is empty. Perhaps the file was destroyed; perhaps the patient never sat for examination.
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/">Return to the Cabinet →</Link>
        </p>
      </div>
    </main>
  );
}
