export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#030712] flex flex-col items-center justify-center">
      {children}
    </div>
  );
}