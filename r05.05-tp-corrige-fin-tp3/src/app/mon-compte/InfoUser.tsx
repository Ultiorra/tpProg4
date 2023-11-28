
import {Button, Card} from "tp-kit/components";
import {createClientComponentClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {getUser} from "../../utils/supabase";
//j'utilise pas getUser psq ca marche pas mais je fais la mm chose donc jsp
export default  async function InfoUser () {
    const supabase = createServerComponentClient({cookies})
    const { data, error } = await supabase.auth.getSession()
    console.log(data);
     const user = data.session.user;



    return (
        <Card >
            <h2>Mon compte</h2>
            <p> Bonjour {user.user_metadata.name}</p>
            <br/>
            <p> Nom : {user.user_metadata.name}</p>
            <p> Email : {user.email}</p>

            <br/>
            <Button variant="outline" color="brand">
                Se déconnecter
            </Button>
        </Card>
    )

}

