import { EmployeeSidebar } from "./EmployeeSidebar"
import { AdminSidebar } from "./AdminSidebar"

export function RoleSidebar({ role }: { role: "admin" | "employee" }) {
  return role === "admin" ? <AdminSidebar /> : <EmployeeSidebar />
}
