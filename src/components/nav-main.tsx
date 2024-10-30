"use client"

import { type LucideIcon } from "lucide-react"
import Link from "next/link"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useState} from "react";
import {useSideBarStore} from "@/store";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}) {

  const itemOpenIndex = useSideBarStore(state => state.itemOpenIndex);
  const setItemOpenIndex = useSideBarStore(state => state.setItemOpenIndex);
  const handleClick = (index: number) => {
    setItemOpenIndex(index); // Met à jour l'index actif lors du clic
  };

  return (
    <SidebarMenu>
      {items.map((item, index) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={itemOpenIndex === index} onClick={() => handleClick(index)}>
            <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
