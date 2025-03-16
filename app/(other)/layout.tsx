import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OtherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen px-2">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
