export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Inter, sans-serif", background: "#0b1020", color: "#e5ecff" }}>{children}</body>
    </html>
  );
}
