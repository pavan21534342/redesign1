"use client"

import { useParams } from "next/navigation";
import ProductDetails from "@/components/my-components/product-single-page/ProductDetails";
import products from "@/product-data/products.json";
  

export default function ProductPage() {
  const params   = useParams();
  // console.log(params);

  const productName  = params.productName;
  const product = products.find((product) => product.slug === productName);

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
