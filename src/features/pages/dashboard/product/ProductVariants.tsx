"use client";
import { HeaderDashboard } from "@/components/layout/header/HeaderDashboard";
import { useGetProductById } from "@/lib/api/products/product.query";
import { LoadingSkeletons } from "@/components/ui/skeleton/CardProductSkeleton";
import { ProductInfo } from "./ProductId";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BasicInformationStep } from "@/components/dialog/variants/varianst-form/BasicInformation";

export function ProductVariantPage({ productId }: { productId: string }) {
  const {data : product,isLoading}  = useGetProductById(productId)

  if (isLoading){
    return <LoadingSkeletons />
  }

  return (
    <main className="p-6 space-y-6 ">
      <HeaderDashboard
        title="Variants"
        subTitle="Manage your Product  Variants here">
       <ButtonCreate props={{
        id : productId
       }}/>
      </HeaderDashboard>
      {
        product && (
          <ProductInfo product={product}/>
        )
      }
    </main>
  );
}


function ButtonCreate({props}  : {props : { id : string}}){
  const [open,setOpen]  = useState<boolean>(false)
  return (
    <>
    <Button onClick={()  => setOpen(true)}>
      Create Variants
    </Button>
      {
        open && (
          <BasicInformationStep open={open}  setOpen={() => setOpen(false)} product_id={props.id}/>
        )
      }
    </>
  )
}