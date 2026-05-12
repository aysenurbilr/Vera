import { AdminSidebar } from "@/components/admin-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen bg-white">
        <div className="p-4 pt-20 lg:pt-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
