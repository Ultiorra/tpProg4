import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { ProductList } from "../components/product-list";
import { Metadata } from "next";
import prisma from "../utils/prisma";
import {createServerComponentSupabaseClient} from "@supabase/auth-helpers-nextjs/src/deprecated";
import {cookies} from "next/headers";
import AuthUrlHandler from "./auth-url-handler";

export const metadata:Metadata = {
  title: `Page d’accueil - Starbucks`,
  description: "Commandez de délicieuses boissons préparées avec soin par nos baristas"
}

export default async function Home() {
  const categories = await prisma.productCategory.findMany({
    include: {
      products: true
    }
  });


  return (<SectionContainer>
    <BreadCrumbs items={[
      {
        label: "Accueil",
        url: "/"
      }
    ]} />

    <AuthUrlHandler />

    <ProductList categories={categories} showFilters />
  </SectionContainer>);
}
