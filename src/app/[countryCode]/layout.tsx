import React from 'react'

export default function CountryLayout({
  children,
  modal,
  params
}: {
  children: React.ReactNode
  modal: React.ReactNode
  params: { countryCode: string }
}) {
  return (
    <div>
      <main>{children}</main>
      {modal}
    </div>
  )
}