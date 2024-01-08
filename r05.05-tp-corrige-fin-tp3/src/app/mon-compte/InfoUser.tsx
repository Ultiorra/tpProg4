"use client"
import {Button, Card} from "tp-kit/components";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import { useEffect } from 'react';
//j'utilise pas getUser psq ca marche pas mais je fais la mm chose donc jsp
type props = {
    user : any
}

export default function InfoUser ({user}) {

    const supabase = createClientComponentClient()
    const router = useRouter()


    const handleSignOut = async() => {
        await supabase.auth.signOut()
        router.refresh()
    }

    if (!user.user_metadata || !user.user_metadata.name ) {
        router.push('/connexion');
    }
    return (
        <Card >
            <h2>Mon compte</h2>
            <p> Bonjour {user.user_metadata.name}</p>
            <br/>
            <p> Nom : {user.user_metadata.name}</p>
            <p> Email : {user.email}</p>

            <br/>
            <Button variant="outline" color="brand" onClick={handleSignOut}>
                Se déconnecter
            </Button>
        </Card>
    )

}

