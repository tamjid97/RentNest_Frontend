import { getMe } from "@/components/service/getMe";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";


export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <div className="flex min-h-screen flex-col w-full z-10">
      <Navbar user={user} />
      
      <main className="flex-1 w-full pb-0 overflow-hidden">
        {children}
      </main>
      

      <Footer />
    </div>
  );
}