import ProductListing from "@/components/my-components/product-listing/ProductListing";
import products from "@/product-data/products.json";



export default function Home() {
  return (
    <div>
     <ProductListing products={products}  />;
      </div>
  );
}


