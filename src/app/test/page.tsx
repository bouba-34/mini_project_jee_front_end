"use client"

import * as React from "react"
import { Bell, Home, Search, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function Component() {
    return (
        <SidebarProvider>
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
                <Sidebar className="hidden lg:flex">
                    <SidebarHeader className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">My App</h2>
                    </SidebarHeader>
                    <SidebarContent className="px-4 py-2">
                        <form className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="w-full bg-muted pl-8"
                                    placeholder="Search..."
                                    type="search"
                                />
                            </div>
                        </form>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a className="flex items-center gap-2" href="#">
                                        <Home className="h-4 w-4" />
                                        Home
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a className="flex items-center gap-2" href="#">
                                        <User className="h-4 w-4" />
                                        Profile
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a className="flex items-center gap-2" href="#">
                                        <Bell className="h-4 w-4" />
                                        Notifications
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a className="flex items-center gap-2" href="#">
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="border-t p-6">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage alt="User avatar" src="/placeholder-avatar.jpg" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">John Doe</span>
                                <span className="text-xs text-muted-foreground">john@example.com</span>
                            </div>
                        </div>
                    </SidebarFooter>
                    <SidebarRail />
                </Sidebar>
                <SidebarInset className="col-span-3 lg:col-span-1">
                    <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-6 lg:hidden">
                        <SidebarTrigger />
                        <h2 className="text-lg font-semibold">My App</h2>
                    </header>
                    <main className="flex-1 p-6">
                        <h1 className="text-2xl font-bold">Welcome to My App</h1>
                        <p className="mt-4 text-gray-600">This is the main content area. The sidebar is responsive and will collapse on smaller screens.</p>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}