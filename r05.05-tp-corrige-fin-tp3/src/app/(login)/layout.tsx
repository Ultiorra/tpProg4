
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import { Providers } from '../../components/providers';
import { Footer } from 'tp-kit/components/footer';
import { Menu } from '../../components/menu';
import {ZodI18nProvider} from "tp-kit/components/providers";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {getUser} from "../../utils/supabase";
import {redirect} from "next/navigation";

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

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase  = createServerComponentClient({cookies})
  const user = await getUser(supabase)


  if (user && user.session ) {
    redirect('/')
  }


  return (

        <ZodI18nProvider>

          {children}
        </ZodI18nProvider>
  )
}
