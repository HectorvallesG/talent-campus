interface GridProjectsProps {
  children: React.ReactNode
}
export const GirdProjects = ({children}:GridProjectsProps) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 ">
      {children}
    </section>
  )
}
