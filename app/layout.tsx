import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "فانوس | درنگ و آگاهی",
  description: "رفیقِ شب‌های تردید و جستجو",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* لود مستقیم فونت برای اطمینان ۱۰۰ درصد */}
        <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
        <style>{`
          body { 
            font-family: 'Vazirmatn', sans-serif !important; 
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color: #f9fafb;
          }
        `}</style>
      </head>
      <body className="antialiased min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}