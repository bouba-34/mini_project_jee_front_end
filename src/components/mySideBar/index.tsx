"use client"
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb";
import {NavActions} from "@/components/nav-actions";
import Dashboard from "@/components/dashboard";
import {useSideBarStore} from "@/store";
import Clients from "@/components/clients";
import Accounts from "@/components/accounts";
import Withdrawals from "@/components/withdrawals";
import Deposits from "@/components/deposits";

const breadcrumbTitles = [
    "Dashboard",
    "Clients",
    "Accounts",
    "Withdrawals",
    "Deposits",
];

const MainContent = () => {
    const itemOpenIndex = useSideBarStore(state => state.itemOpenIndex);
    //console.log(itemOpenIndex);
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">
                                        {breadcrumbTitles[itemOpenIndex] || "Dashboard"}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    {/*<div className=" h-24 w-full max-w-3xl rounded-xl bg-red-400" />
                  <div className=" h-full w-full max-w-3xl rounded-xl bg-blue-600" />*/}
                    {itemOpenIndex === 0 && <Dashboard />}
                    {itemOpenIndex === 1 && <Clients />}
                    {itemOpenIndex === 2 && <Accounts />}
                    {itemOpenIndex === 3 && <Withdrawals />}
                    {itemOpenIndex === 4 && <Deposits />}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default MainContent;