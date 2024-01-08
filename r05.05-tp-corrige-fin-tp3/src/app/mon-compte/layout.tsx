import { ReactNode } from "react";
import { SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";
import InfoUser from "./InfoUser";
import HandleIsConnected from "./HandleIsConnected";
import { createServerComponentClient } from "../../../node_modules/@supabase/auth-helpers-nextjs/dist/index";
import { cookies } from "../../../node_modules/next/headers";
import { getUser } from "../../utils/supabase";
import {redirect} from "next/navigation";
export default async function Layout({ children }: { children: ReactNode }) {

  const supabase  = createServerComponentClient({cookies})
  const user = await getUser(supabase)
    if (!user || !user.session ) {
        redirect('/connexion')
    }
    const orders = await prisma.order.findMany({
        where: {
            userId: user.session.user.id
        }
    });


  return (
    <>
      {/* Orders list */}
        <InfoUser user={user.session.user}/>
        <HandleIsConnected/>
      <SectionContainer wrapperClassName="py-24 min-h-[80vh]">
        <div className="bg-white rounded-lg p-6 shadow-lg">

            <OrderTable orders={orders} />

        </div>
      </SectionContainer>

      {/* Children */}
      {children}
    </>
  );
}
