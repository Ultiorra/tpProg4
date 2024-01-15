import { OrderDetailsLayout } from "tp-kit/components";
import { NextPageProps } from "../../../../types";
import prisma from "../../../../utils/prisma";
import { notFound } from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import RealTimeOrderDetails from "../../../../components/RealTimeOrderDetails";

type Props = {
  orderId: string;
}

export default async function OrderDetailsPage({params}: NextPageProps<Props>) {
  const supabase = createServerComponentClient({cookies})
  const channel = supabase
      .channel('schema-db-changes')
      .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
          },
          (payload) => {
            console.log('Received event on channel schema-db-changes', payload);

          }
      )
      .subscribe()
  const orderId = parseInt(params.orderId);
  const order = await prisma.order.findUnique({
    where: {id: orderId},
    include: {
      lines: {
        include: { product: true }
      }
    }
  });

  if (!order) notFound();

  return <RealTimeOrderDetails order={order} />;
}