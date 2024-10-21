import { SideBar } from "@/components/SideBar";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}
export default function DashBoardLayout ({children}: DashBoardLayoutProps) {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
