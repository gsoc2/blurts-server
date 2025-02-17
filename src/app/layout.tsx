/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { getL10n, getL10nBundles } from "./functions/server/l10n";
import { getLocale } from "./functions/universal/getLocale";
import { SessionProvider } from "../contextProviders/session";
import { authOptions } from "./api/utils/auth";
import { metropolis } from "./fonts/Metropolis/metropolis";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export function generateMetadata(): Metadata {
  const l10n = getL10n();
  return {
    title: l10n.getString("brand-fx-monitor"),
    description: l10n.getString("meta-desc-2"),
    metadataBase:
      typeof process.env.SERVER_URL === "string"
        ? new URL(process.env.SERVER_URL)
        : undefined,
    twitter: {
      card: "summary_large_image",
      title: l10n.getString("brand-fx-monitor"),
      description: l10n.getString("meta-desc-2"),
      images: ["/images/og-image.webp"],
    },
    openGraph: {
      title: l10n.getString("brand-fx-monitor"),
      description: l10n.getString("meta-desc-2"),
      siteName: l10n.getString("brand-fx-monitor"),
      type: "website",
      url: process.env.SERVER_URL,
      images: ["/images/og-image.webp"],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentLocale = getLocale(getL10nBundles());
  const session = await getServerSession(authOptions);

  return (
    <html lang={currentLocale}>
      <body
        className={`${inter.className} ${inter.variable} ${metropolis.variable}`}
        // DO NOT ADD SECRETS HERE: The following data attributes expose
        // variables that are being used in the public analytics scripts
        data-ga4-measurement-id={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}
        data-node-env={process.env.NODE_ENV}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
