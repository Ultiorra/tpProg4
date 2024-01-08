import { ReactNode } from "react";
import { SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";
import InfoUser from "./InfoUser";
import HandleIsConnected from "./HandleIsConnected";
import { createServerComponentClient } from "../../../node_modules/@supabase/auth-helpers-nextjs/dist/index";
import { cookies } from "../../../node_modules/next/headers";
import { getUser } from "../../utils/supabase";
export default async function Layout({ children }: { children: ReactNode }) {
  const orders = await prisma.order.findMany();
  const supabase  = createServerComponentClient({cookies})
  const user = await getUser(supabase)
  return (
    <>
      {/* Orders list */}
        <InfoUser user={user}/>
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
