// next
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

// providers
import Providers from "../../providers/providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// fonts
const proximaNova = localFont({
  src: [
    {
      path: "./fonts/proximanova_regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/proximanova_bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/proximanova_extrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-proximanova",
});

export const metadata: Metadata = {
  title: "Winkwing - Easily find rental apartments near you",
  description:
    "Get instant alerts for new listings. Access apartments from 950+ websites directly on your phone.",
  openGraph: {
    type: "website",
    url: "https://www.winkwing.com/",
    title: "Winkwing - Easily find rental apartments near you",
    description:
      "Get instant alerts for new listings. Access apartments from 950+ websites directly on your phone.",
    images: [
      {
        url: "https://i.imgur.com/EEFpzot.png",
        width: 1200,
        height: 630,
        alt: "WinkWing preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Winkwing - Easily find rental apartments near you",
    description:
      "Get instant alerts for new listings. Access apartments from 950+ websites directly on your phone.",
    images: ["https://i.imgur.com/EEFpzot.png"],
  },
};
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={params.locale}>
      <head>
        {/* Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MKSSKEJENP"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MKSSKEJENP');
            `,
          }}
        ></script>
      </head>
      <body className={`${proximaNova.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
