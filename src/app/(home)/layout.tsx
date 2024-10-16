import { HeaderNav } from "@/components/HeaderNav"
import PageContainer from "@/components/layouts/PageContainer"

export default function LayoutHome({
  children
}:{
  children: React.ReactNode
}) {
  return (
    <PageContainer>
      <HeaderNav />
      {children}
    </PageContainer>
  )
}
