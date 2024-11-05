//dashboard/index.tsx
"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    ArrowUpRight,
    CreditCard,
    Edit,
    Eye,
    MoreVertical,
    Users,
    XCircle
} from "lucide-react";
import {Table,TableCell, TableHead, TableHeader, TableRow, TableBody, TableFooter, TableCaption} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {getDashboard} from "@/actions/use-dashboard";
import {useEffect, useState} from "react";

export type Client = {
    id: number;
    fullname: string;
    phone: string;
    totalBalance: number;
    email: string;
    "address": string,
    "accountTypes": string[],
    "joinDate": string,
}


const Dashboard = () => {
    const [data, setData] = useState(
        {
            metadata: {
                totalClients: 0,
                totalAccounts: 0,
                operationsToday: 0,
            },
            data: []
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDashboard();
            setData(response);
        }
        fetchData();
    }, []);




    return (
        <>
            {/* Statistics Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.metadata.totalClients}</div>
                        <p className="text-xs text-muted-foreground">+10.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.metadata.totalAccounts}</div>
                        <p className="text-xs text-muted-foreground">+5.4% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Daily Transactions</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.metadata.operationsToday}</div>
                        <p className="text-xs text-muted-foreground">+12.3% from yesterday</p>
                    </CardContent>
                </Card>
            </div>
            {/* Client Management Table */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Recent Clients</CardTitle>
                    <CardDescription>A list of the 10 most recent clients.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Balance Total</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.data.map((client: Client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${client.fullname}`} />
                                                <AvatarFallback>{client.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div>{client.fullname}</div>
                                                <div className="text-sm text-muted-foreground">{client.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>${client.totalBalance.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Deactivate
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}

export default Dashboard;
