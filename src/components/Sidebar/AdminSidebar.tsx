"use client"

import {
  Users,
  ClipboardList,
  CheckCircle,
  LayoutDashboard,
  LogOut,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import clsx from "clsx"

const adminMenu = [
  { label: "Admin Dashboard", icon: LayoutDashboard },
  { label: "Employee List", icon: Users },
  { label: "Attendance Records", icon: ClipboardList },
  { label: "Leave Approvals", icon: CheckCircle, active: true },
]

export function AdminSidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col bg-gradient-to-b from-[#020617] to-[#020617] text-slate-200">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-semibold leading-none">Dayflow</p>
          <span className="text-xs text-slate-400">Admin Panel</span>
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Switch Employee */}
      <div className="px-4 py-4">
        <p className="mb-2 text-xs uppercase text-slate-500">
          Switch Employee
        </p>

        <Select>
          <SelectTrigger className="bg-slate-900 border-slate-800">
            <SelectValue placeholder="Select employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="emp1">John Doe</SelectItem>
            <SelectItem value="emp2">Sarah Smith</SelectItem>
            <SelectItem value="emp3">Alex Brown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-slate-800" />

      {/* Menu */}
      <div className="flex-1 px-3 py-4">
        <p className="mb-3 px-3 text-xs uppercase text-slate-500">
          Administration
        </p>

        {adminMenu.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={clsx(
              "w-full justify-start gap-3",
              item.active
                ? "bg-purple-600 text-white hover:bg-purple-600"
                : "text-slate-300 hover:bg-slate-800"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>

      <Separator className="bg-slate-800" />

      {/* Footer */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <span className="text-xs text-slate-400">Administrator</span>
          </div>
        </div>

        <Button
          variant="ghost"
          className="mt-4 w-full justify-start gap-3 text-red-500 hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
