import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function Page() {

  const supabase = createServerComponentClient({cookies})
  const { data, error } = await supabase.auth.getSession()

  return null;
}