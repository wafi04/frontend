"use client";
import { Button } from "@/components/ui/button";
import { HeaderMainPage } from "@/components/layout/header/HeaderMainPage";
import Link from "next/link";
import { Slider } from "./Slider";

export function ProductSection() {
  const { data: product } = useGetAllProductsBySearch();
  return (
    <section className="px-[72px]  w-full h-full ">
      <HeaderMainPage title={"Featured Products"}>
        <Link href="/p">
          <Button>All Products</Button>
        </Link>
      </HeaderMainPage>

      <Slider data={product} />
    </section>
  );
}
