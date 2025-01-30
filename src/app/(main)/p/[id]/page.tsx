import { ProductDetailsPage } from "@/pages/productDetails/productDetails";

interface IParams {
  params: {
    id: string;
  };
}

export default async function ProductIdPage({ params }: IParams) {
  return <ProductDetailsPage id={params.id} />;
}
