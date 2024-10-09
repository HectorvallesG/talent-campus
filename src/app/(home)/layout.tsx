import { HeaderNav } from "@/components/HeaderNav"

export default function LayoutHome({
  children
}:{
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderNav />
      {children}
    </>
  )
}
