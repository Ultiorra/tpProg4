import './globals.css'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import { Providers } from '../components/providers';
import { Footer } from 'tp-kit/components/footer';
import { Menu } from '../components/menu';
import {getUser} from "../utils/supabase";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

const font = Lexend({
  subsets: ['latin'],
  weight: ['400', '600']
});

export const metadata: Metadata = {
  title: {
    default: 'Starbucks',
    template: '%s - Starbucks',
  },
  robots: {
    index: false,
    follow: false
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase  = createServerComponentClient({cookies})
  const user = await getUser(supabase)

  return (
    <html lang="fr">
      <body className={font.className}>
        <Providers font={font}>
          <Menu user={user} />
          
          {children}
        </Providers>

        <Footer />
      </body>
    </html>
  )
}
