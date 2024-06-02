import {
  getNewestProducts,
  getPopularProducts,
} from "@/actions/products";

import { ProductsGridSection } from "@/components/products/ProductsGridSection";

const ClientHomePage = () => {
  return (
    <main className='space-y-12'>
      <ProductsGridSection
        productFetcher={getNewestProducts}
        title='Newest'
      />
      <ProductsGridSection
        productFetcher={getPopularProducts}
        title='Most Popular'
      />
    </main>
  );
};

export default ClientHomePage;

// interface ProductsListProps {
//   productFetcher: () => Promise<Product[]>;
// }

// const ProductsList = async ({
//   productFetcher,
// }: ProductsListProps) => {
//   const products = await productFetcher();
//   const productsList = products.map((product) => {
//     return (
//       <ProductCard key={product.id} product={product} />
//     );
//   });

//   return productsList;
// };
