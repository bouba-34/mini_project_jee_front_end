"use client"

import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  LayoutDashboard,
  Users,
  Wallet,
  HandCoins
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader, SidebarInset,
  SidebarRail, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar"

// This is sample data.
const data = [
    {
      title: "Dashboard",
      url: "",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Clients",
      url: "",
      icon: Users,
      isActive: false,
    },
    {
      title: "Accounts",
      url: "",
      icon: Wallet,
      isActive: false,
    },
    {
      title: "withdrawals",
      url: "/",
      icon: HandCoins,
      isActive: false,
    },
    {
      title: "Deposits",
      url: "",
      icon: Inbox,
      isActive: false,
    },
  ]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">My Bank</h2>
      </SidebarHeader>
      <SidebarContent className="px-4 py-2">
        <NavMain items={data} />
      </SidebarContent>
      {/*<SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>*/}
      {/*<SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>*/}
      <SidebarRail/>
    </Sidebar>
  )
}
