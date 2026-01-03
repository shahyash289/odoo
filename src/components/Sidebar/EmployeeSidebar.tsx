"use client"

import {
  LayoutDashboard,
  User,
  Clock,
  CalendarDays,
  Wallet,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import clsx from "clsx"

const menu = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Profile", icon: User },
  { label: "Attendance", icon: Clock },
  { label: "Leave Requests", icon: CalendarDays },
  { label: "Payroll", icon: Wallet, active: true },
]

export function EmployeeSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-gradient-to-b from-[#0f172a] to-[#020617] text-slate-200">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
          D
        </div>
        <div>
          <p className="font-semibold leading-none">Dayflow</p>
          <span className="text-xs text-slate-400">HRMS</span>
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Menu */}
      <div className="flex-1 px-3 py-4">
        <p className="mb-3 px-3 text-xs uppercase text-slate-500">Menu</p>

        {menu.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={clsx(
              "w-full justify-start gap-3",
              item.active
                ? "bg-blue-600 text-white hover:bg-blue-600"
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
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">labdhi200</p>
            <span className="text-xs text-slate-400">Employee</span>
          </div>
        </div>

        <Button
          variant="ghost"
          className="mt-4 w-full justify-start gap-3 text-red-500 hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" />
          SignOut
        </Button>
      </div>
    </aside>
  )
}
