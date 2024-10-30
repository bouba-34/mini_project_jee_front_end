"use client"
import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
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
import {Badge} from "@/components/ui/badge";


const Dashboard = () => {
    const [clients] = useState([
        { id: 1, name: 'Alice Johnson', status: 'Active', balance: 15000, email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', status: 'Inactive', balance: 5000, email: 'bob@example.com' },
        { id: 3, name: 'Charlie Brown', status: 'Active', balance: 25000, email: 'charlie@example.com' },
        { id: 4, name: 'Diana Prince', status: 'Active', balance: 50000, email: 'diana@example.com' },
        { id: 5, name: 'Ethan Hunt', status: 'Active', balance: 35000, email: 'ethan@example.com' },
        { id: 6, name: 'Fiona Gallagher', status: 'Inactive', balance: 100, email: 'fiona@example.com' },
        { id: 7, name: 'George Costanza', status: 'Active', balance: 7500, email: 'george@example.com' },
        { id: 8, name: 'Hermione Granger', status: 'Active', balance: 60000, email: 'hermione@example.com' },
        { id: 9, name: 'Ian Malcolm', status: 'Active', balance: 40000, email: 'ian@example.com' },
        { id: 10, name: 'Julia Child', status: 'Active', balance: 30000, email: 'julia@example.com' },
    ])


    const dailyTransactionData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Daily Transactions',
            data: [1200, 1900, 3000, 5000, 2000, 3000, 4000],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
    }

    const accountTypesData = {
        labels: ['Savings', 'Checking', 'Investment'],
        datasets: [{
            data: [300, 500, 200],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    }

    const monthlyRevenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Monthly Revenue',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    //console.log(clients)

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
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+10.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,567</div>
                        <p className="text-xs text-muted-foreground">+5.4% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Daily Transactions</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4,320</div>
                        <p className="text-xs text-muted-foreground">+12.3% from yesterday</p>
                    </CardContent>
                </Card>
                {/*<Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$89,432</div>
                        <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                    </CardContent>
                </Card>*/}
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
                                <TableHead>Status</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${client.name}`} />
                                                <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div>{client.name}</div>
                                                <div className="text-sm text-muted-foreground">{client.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                                            {client.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${client.balance.toLocaleString()}</TableCell>
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