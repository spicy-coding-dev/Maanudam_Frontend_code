export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* 🔝 Magazine common header */}
      <h1 className="text-2xl font-semibold text-[#1f3c88]">
        கட்டுரைகள்
      </h1>

      {/* 👇 This replaces <Outlet /> */}
      {children}
    </div>
  );
}
