"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

export default function AuthUrlHandler() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    useEffect(() => {
       const params = new URLSearchParams(location.href.replace('#', '?').split('/').at(-1))
       //router.push(`/api/auth/callback?code=${params.get('access_token')}`);
        if (params.get('access_token')) {
            supabase.auth.exchangeCodeForSession(params.get('access_token')).then(console.log);
        }
    }, []);

    return null;

}