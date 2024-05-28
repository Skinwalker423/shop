import { getProductById } from "@/actions/products";
import { ProductForm } from "../../_components/ProductForm";

const ProductEditPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  console.log("params", params.productId);

  const product = await getProductById(params.productId);

  console.log("product", product);

  return <ProductForm product={product} />;
};

export default ProductEditPage;
