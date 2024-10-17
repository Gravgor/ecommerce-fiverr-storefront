import { Region } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { ChevronLeft } from "lucide-react";
import { Breadcrumbs } from "./components/ProductBreadcrumbs";
import { ProductTitle } from "./components/ProductTitle";
import { ProductImages } from "./components/ProductImages";
import { RightSection } from "./components/RightSection";
import ProductActions from "../product-actions";
import { FavoriteButton } from "./components/FavoriteButton";
import { FaqSection } from "./components/FaqSection";
import { Suspense } from "react";
import { ReviewsSection } from "./components/ReviewsSection";

type ProductPageProps = {
    product: PricedProduct;
    region: Region;
    countryCode: string
}


export default function NewProductTemplate({product, region, countryCode}:ProductPageProps){
    const { title, description, variants } = product
    const price =
      variants[0]?.prices.find((p) => p.currency_code === region.currency_code)
        ?.amount || 0
    const formattedPrice = new Intl.NumberFormat(region.currency_code, {
      style: "currency",
      currency: region.currency_code,
    }).format(price / 100)

    const haveOnlyOneVariant = variants.length < 2
  
    
    if(!product) {
        return null
    }
    return (
        <div className="container relative mx-auto px-4 xl:px-0">
            <main className="container mx-auto mt-12">
            <Breadcrumbs className="mb-8" items={makeBreadcrumbs(product)} />
            <div className="grid grid-cols-1 gap-4 md:mx-auto md:max-w-screen-xl md:grid-cols-12 md:gap-8">
                <ProductTitle
                className="md:hidden"
                title={product.title !== undefined ? product.title : ''}
                price={formattedPrice}
                currency={region.currency_code}
                />
                <ProductImages images={product.images}/>
                <RightSection className="md:col-span-6 md:col-start-8 md:mt-0">
                    <ProductTitle
                    className="hidden md:col-span-4 md:col-start-9 md:block"
                    title={product.title !== undefined ? product.title : ''}
                    price={formattedPrice}
                    currency={region.currency_code}
                    />
                    {!haveOnlyOneVariant && <ProductActions product={product} region={region} disabled={false} />}
                    {haveOnlyOneVariant && <ProductActions product={product} region={region} disabled={false} />}
                    <FavoriteButton />
                    <FaqSection />
              </RightSection>
              <Suspense>
                <ReviewsSection productId={product.id} productHandle={product.handle} />
              </Suspense>
            </div>
            </main>
        </div>
    )
}

function makeBreadcrumbs(product: PricedProduct) {
    const lastCollection = product.collection
  
    return {
      Home: "/",
      [lastCollection?.handle ? lastCollection.handle : "Products"]: lastCollection?.handle ? `/category/${lastCollection.handle}` : "/search",
      //@ts-ignore
      [product.title]: "",
    }
  }
  