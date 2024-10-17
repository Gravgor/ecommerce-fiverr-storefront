import { cn } from "@lib/util/cn"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@modules/layout/components/ui/breadcrumb"
import React from "react"

interface BreadcrumbsProps {
  items: Record<string, string>
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="no-scrollbar flex items-center gap-1.5 overflow-x-scroll  whitespace-nowrap text-xs  md:text-base/[18px]">
        {Object.entries(items).map(([title, href], idx) => {
          const isLast = idx + 1 === Object.keys(items).length

          return (
            <React.Fragment key={title + href}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  prefetch={false}
                  aria-current={isLast ? "page" : undefined}
                  className={cn("text-neutral-500 hover:underline", isLast && "font-medium underline")}
                  href={href}
                >
                  {title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
