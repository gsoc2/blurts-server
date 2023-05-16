/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { getLocale } from './functions/server/l10n'
import { getServerSession } from 'next-auth'
import { SessionProvider } from '../contextProviders/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout ({
  children
}: {
  children: ReactNode,
}) {
  const currentLocale = getLocale()
  const session = await getServerSession()

  return (
    <html lang={currentLocale}>
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
