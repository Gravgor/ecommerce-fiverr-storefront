import { getCategoriesList, getCollectionsList } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import { Github, FileText, Code } from "lucide-react"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <LocalizedClientLink href="/" className="text-2xl font-extrabold text-gray-900">
              Test shop
            </LocalizedClientLink>
            <p className="mt-2 text-sm text-gray-500">
              Your one-stop shop for all your needs. Quality products, great prices, and excellent service.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Categories</h3>
            <ul className="mt-4 space-y-2">
              {product_categories?.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <LocalizedClientLink
                    href={`/categories/${category.handle}`}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {category.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Collections</h3>
            <ul className="mt-4 space-y-2">
              {collections?.slice(0, 6).map((collection) => (
                <li key={collection.id}>
                  <LocalizedClientLink
                    href={`/collections/${collection.handle}`}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {collection.title}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 md:order-2">
            <a href="https://github.com/medusajs" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a href="https://docs.medusajs.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Documentation</span>
              <FileText className="h-6 w-6" />
            </a>
            <a href="https://github.com/medusajs/nextjs-starter-medusa" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Source code</span>
              <Code className="h-6 w-6" />
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} Test shop. All rights reserved.
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}