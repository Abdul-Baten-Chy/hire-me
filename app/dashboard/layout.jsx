import SideBar from "@/components/dashboard/SideBar";

export default function DashBoard({ children }) {
  return (
    <div className="flex h-screen">
      <SideBar />
      {children}
    </div>
  );
}
