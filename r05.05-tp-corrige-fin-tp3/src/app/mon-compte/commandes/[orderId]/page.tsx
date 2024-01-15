import { OrderDetailsLayout } from "tp-kit/components";
import { NextPageProps } from "../../../../types";
import prisma from "../../../../utils/prisma";
import { notFound } from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import RealTimeOrderDetails from "../../../../components/RealTimeOrderDetails";

type Props = {
  orderId: string;
}

export default async function OrderDetailsPage({params}: NextPageProps<Props>) {
  const orderId = parseInt(params.orderId);
  const order = await prisma.order.findUnique({
    where: {id: orderId},
    include: {
      lines: {
        include: { product: true }
      }
    }
  });

  const supabase = createClientComponentClient();

  const channel = supabase
      .channel('update-order')
      .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
          },
          (payload) => console.log(payload)
      )
      .subscribe()

  if (!order) notFound();

  return (
      <RealTimeOrderDetails order={order} />
  )
}