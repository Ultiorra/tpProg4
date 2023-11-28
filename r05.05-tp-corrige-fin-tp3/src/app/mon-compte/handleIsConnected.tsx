"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {getUser} from "../../utils/supabase";

export default function handleIsConnected() {
    const supabase = createClientComponentClient()
    const  data = getUser(supabase)
    const router = useRouter();




    return null;

}