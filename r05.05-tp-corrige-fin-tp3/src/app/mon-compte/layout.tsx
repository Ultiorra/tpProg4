import {ReactNode} from "react";
import {Card, SectionContainer} from "tp-kit/components";
import prisma from "../../utils/prisma";
import {OrderTable} from "../../components/order-table";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

export default async function Layout({children}: { children: ReactNode }) {
    const supabase = createServerComponentClient({ cookies });
    const {data} = await supabase.auth.getUser();

    const orders = await prisma.order.findMany({
        where: {
            userId: data.user?.id
        }
    });

    return (
        <div
            className="flex"
        >
            <div
                className="basis-2/6 bg-coffee-50 py-8 lg:px-8"
            >
                <div
                    className="py-24 min-h-[80vh]"
                >
                    <Card
                        className="w-full py-4"
                    >
                        {children}
                    </Card>
                </div>
            </div>
            {/* Orders list */}
            <SectionContainer wrapperClassName="py-24 min-h-[80vh]" className="basis-4/6">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                    <OrderTable orders={orders}/>
                </div>
            </SectionContainer>

            {/* Children */}
        </div>
    );
}
