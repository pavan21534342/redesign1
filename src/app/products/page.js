import ProductListing from "@/components/my-components/product-listing/ProductListing";
import products from "@/product-data/products.json";

export default function ProudctPage() {
    return <ProductListing products={products}  />;
}