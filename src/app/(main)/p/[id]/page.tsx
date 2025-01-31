import ProductDetailsPage from "@/features/pages/product-details/product-details";

interface IParams {
  params: {
    id: string;
  };
}

export default async function ProductIdPage({ params }: IParams) {
  return <ProductDetailsPage id={params.id} />;
}
