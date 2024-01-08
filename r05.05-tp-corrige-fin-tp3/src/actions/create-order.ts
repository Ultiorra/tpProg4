"use server";

import { computeCartTotal, computeLineSubtotal } from "../hooks/use-cart";
import { CartData } from "../types";
import prisma from "../utils/prisma";
import {createClientComponentClient, createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {getUser} from "../utils/supabase";
import { cookies } from "../../node_modules/next/headers";

export async function createOrder(cart: CartData) {
  const supabase = createServerActionClient({cookies})
  const user = await getUser(supabase)



  if (user && user.session && user.session.user) {
    console.log(await prisma.order.create({
      data: {
        userId: user.session.user.id,
        total: computeCartTotal(cart.lines),
        lines: {
          create: cart.lines.map(line => ({
            productId: line.product.id,
            qty: line.qty,
            subtotal: computeLineSubtotal(line)
          }))
        }
      }
    }));

    return {
      success: true
    }
  }
  else {
    console.log("here")
    return {
        success: false,
        error: "You must be logged in to create an order"
    }
  }
}