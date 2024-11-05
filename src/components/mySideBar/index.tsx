"use client"
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb";
import {NavActions} from "@/components/nav-actions";
import Dashboard from "@/components/dashboard";
import {useEmployeStore, useLoginStore, useSideBarStore} from "@/store";
import Accounts from "@/components/accounts";
import Withdrawals from "@/components/withdrawals";
import Deposits from "@/components/deposits";
import Workers from "@/components/workers";
import Groups from "@/components/groups";
import ClientSection from "@/components/clients";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";


const breadcrumbTitles = [
    "Dashboard",
    "Clients",
    "Accounts",
    "Withdrawals",
    "Deposits",
    "Workers",
    "Groups",
];

const MainContent = () => {
    const router = useRouter();
    const itemOpenIndex = useSideBarStore(state => state.itemOpenIndex);
    const email = useEmployeStore(state => state.email);
    if(!email) {
        router.push("/login");
        //toast.success("You need to login first");
        return null;
    }

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
                    {itemOpenIndex === 0 && <Dashboard />}
                    {itemOpenIndex === 1 && <ClientSection />}
                    {itemOpenIndex === 2 && <Accounts />}
                    {itemOpenIndex === 3 && <Withdrawals />}
                    {itemOpenIndex === 4 && <Deposits />}
                    {itemOpenIndex === 5 && <Workers />}
                    {itemOpenIndex === 6 && <Groups />}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default MainContent;