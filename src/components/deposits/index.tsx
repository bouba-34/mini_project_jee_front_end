"use client"
import {
    Calendar, ArrowDownRight, Clock,
    DollarSign, Search, PlusCircle,
    Filter, Eye, ChevronDown,
    Check, X, Flag, ArrowUpRight
} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";
import {format} from "date-fns";
import {useState} from "react";

const Deposits = () => {
    const depositData = [
        { id: 'D001', clientName: 'Alice Johnson', accountNumber: 'ACC001', amount: 5000, date: '2023-06-01', status: 'Verified', verifiedBy: 'Admin1', initiatedBy: 'EMP001' },
        { id: 'D002', clientName: 'Bob Smith', accountNumber: 'ACC002', amount: 10000, date: '2023-06-02', status: 'Pending', verifiedBy: '-', initiatedBy: 'EMP002' },
        { id: 'D003', clientName: 'Charlie Brown', accountNumber: 'ACC003', amount: 15000, date: '2023-06-03', status: 'Flagged', verifiedBy: '-', initiatedBy: 'EMP003' },
        { id: 'D004', clientName: 'Diana Prince', accountNumber: 'ACC004', amount: 2000, date: '2023-06-04', status: 'Verified', verifiedBy: 'Admin2', initiatedBy: 'EMP001' },
        { id: 'D005', clientName: 'Ethan Hunt', accountNumber: 'ACC005', amount: 50000, date: '2023-06-05', status: 'Rejected', verifiedBy: 'Admin1', initiatedBy: 'EMP002' },
        { id: 'D006', clientName: 'Fiona Gallagher', accountNumber: 'ACC006', amount: 12000, date: '2023-06-06', status: 'Verified', verifiedBy: 'Admin3', initiatedBy: 'EMP003' },
        { id: 'D007', clientName: 'George Costanza', accountNumber: 'ACC007', amount: 8000, date: '2023-06-07', status: 'Pending', verifiedBy: '-', initiatedBy: 'EMP001' },
        { id: 'D008', clientName: 'Hannah Baker', accountNumber: 'ACC008', amount: 6000, date: '2023-06-08', status: 'Flagged', verifiedBy: '-', initiatedBy: 'EMP002' },
        { id: 'D009', clientName: 'Ian Malcolm', accountNumber: 'ACC009', amount: 3000, date: '2023-06-09', status: 'Verified', verifiedBy: 'Admin1', initiatedBy: 'EMP003' },
        { id: 'D010', clientName: 'Jasmine Lee', accountNumber: 'ACC010', amount: 7000, date: '2023-06-10', status: 'Rejected', verifiedBy: 'Admin2', initiatedBy: 'EMP001' },
        { id: 'D011', clientName: 'Kevin Hart', accountNumber: 'ACC011', amount: 25000, date: '2023-06-11', status: 'Verified', verifiedBy: 'Admin3', initiatedBy: 'EMP002' },
        { id: 'D012', clientName: 'Liam Neeson', accountNumber: 'ACC012', amount: 9000, date: '2023-06-12', status: 'Pending', verifiedBy: '-', initiatedBy: 'EMP003' },
        { id: 'D013', clientName: 'Megan Fox', accountNumber: 'ACC013', amount: 4000, date: '2023-06-13', status: 'Flagged', verifiedBy: '-', initiatedBy: 'EMP001' },
        { id: 'D014', clientName: 'Nina Dobrev', accountNumber: 'ACC014', amount: 11000, date: '2023-06-14', status: 'Verified', verifiedBy: 'Admin1', initiatedBy: 'EMP002' },
        { id: 'D015', clientName: 'Oscar Isaac', accountNumber: 'ACC015', amount: 14000, date: '2023-06-15', status: 'Rejected', verifiedBy: 'Admin2', initiatedBy: 'EMP003' },
        { id: 'D016', clientName: 'Paula Patton', accountNumber: 'ACC016', amount: 16000, date: '2023-06-16', status: 'Verified', verifiedBy: 'Admin3', initiatedBy: 'EMP001' },
        { id: 'D017', clientName: 'Quentin Tarantino', accountNumber: 'ACC017', amount: 18000, date: '2023-06-17', status: 'Pending', verifiedBy: '-', initiatedBy: 'EMP002' },
        { id: 'D018', clientName: 'Rihanna', accountNumber: 'ACC018', amount: 22000, date: '2023-06-18', status: 'Flagged', verifiedBy: '-', initiatedBy: 'EMP003' },
        { id: 'D019', clientName: 'Sam Smith', accountNumber: 'ACC019', amount: 30000, date: '2023-06-19', status: 'Verified', verifiedBy: 'Admin1', initiatedBy: 'EMP001' },
        { id: 'D020', clientName: 'Tina Fey', accountNumber: 'ACC020', amount: 35000, date: '2023-06-20', status: 'Rejected', verifiedBy: 'Admin2', initiatedBy: 'EMP002' },
    ];

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDeposit, setSelectedDeposit] = useState(null)
    const [isNewDepositDialogOpen, setIsNewDepositDialogOpen] = useState(false)

    const filteredDeposits = depositData.filter(deposit =>
        deposit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deposit.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deposit.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
    const indexOfLastDeposit = currentPage * itemsPerPage;
    const indexOfFirstDeposit = indexOfLastDeposit - itemsPerPage;
    const currentDeposits = filteredDeposits.slice(indexOfFirstDeposit, indexOfLastDeposit);

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Deposits Management</h1>

            {/* Deposits Overview Panel */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deposits Today</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$82,000</div>
                        <p className="text-xs text-muted-foreground">+18% from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deposits This Month</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,250,000</div>
                        <p className="text-xs text-muted-foreground">+8% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">3 urgent requests</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Deposit</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$5,750</div>
                        <p className="text-xs text-muted-foreground">+3% from last week</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search, Filters, and Initiate Deposit Button */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        placeholder="Search deposits..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4"/>
                            Filters
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Date Range</DropdownMenuItem>
                        <DropdownMenuItem>Amount Range</DropdownMenuItem>
                        <DropdownMenuItem>Status</DropdownMenuItem>
                        <DropdownMenuItem>Initiated By</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={isNewDepositDialogOpen} onOpenChange={setIsNewDepositDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Add Deposit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Initiate Deposit</DialogTitle>
                            <DialogDescription>
                                Enter the details for the new deposit. Click submit when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="client" className="text-right">
                                    Client
                                </Label>
                                <Input id="client" className="col-span-3" placeholder="Search client..."/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="accountNumber" className="text-right">
                                    Account
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select account"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="acc001">ACC001 - Savings</SelectItem>
                                        <SelectItem value="acc002">ACC002 - Checking</SelectItem>
                                        <SelectItem value="acc003">ACC003 - Investment</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Amount
                                </Label>
                                <Input id="amount" className="col-span-3" placeholder="Enter amount" type="number"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="source" className="text-right">
                                    Source
                                </Label>
                                <Input id="source" className="col-span-3" placeholder="Source of funds (optional)"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="initiatedBy" className="text-right">
                                    Initiated By
                                </Label>
                                <Input id="initiatedBy" className="col-span-3" value="EMP001" disabled/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Submit Deposit</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Deposits Table with Client Details */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Recent Deposits</CardTitle>
                    <CardDescription>Manage and review all deposit transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Account Number</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Verified By</TableHead>
                                <TableHead>Initiated By</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentDeposits.map((deposit) => (
                                <TableRow key={deposit.id}>
                                    <TableCell>{deposit.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage
                                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${deposit.clientName}`}/>
                                                <AvatarFallback>{deposit.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>{deposit.clientName}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{deposit.accountNumber}</TableCell>
                                    <TableCell>${deposit.amount.toLocaleString()}</TableCell>
                                    <TableCell>{format(new Date(deposit.date), 'MMM d, yyyy')}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            deposit.status === 'Verified' ? 'default' :
                                                deposit.status === 'Pending' ? 'secondary' :
                                                    deposit.status === 'Flagged' ? 'warning' :
                                                        'destructive'
                                        }>
                                            {deposit.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{deposit.verifiedBy}</TableCell>
                                    <TableCell>{deposit.initiatedBy}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon"
                                                            onClick={() => setSelectedDeposit(deposit)}>
                                                        <Eye className="h-4 w-4"/>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Deposit
                                                            Details: {selectedDeposit?.id}</DialogTitle>
                                                        <DialogDescription>View and manage deposit
                                                            information</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Tabs defaultValue="details" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="details">Transaction
                                                                    Details</TabsTrigger>
                                                                <TabsTrigger value="client">Client
                                                                    Information</TabsTrigger>
                                                                <TabsTrigger value="history">Transaction
                                                                    History</TabsTrigger>
                                                                <TabsTrigger value="notes">Admin Notes</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="details">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Transaction
                                                                            ID</h4>
                                                                        <p>{selectedDeposit?.id}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Amount</h4>
                                                                        <p>${selectedDeposit?.amount.toLocaleString()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date</h4>
                                                                        <p>{selectedDeposit?.date && format(new Date(selectedDeposit.date), 'MMM d, yyyy')}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Status</h4>
                                                                        <Badge variant={
                                                                            selectedDeposit?.status === 'Verified' ? 'default' :
                                                                                selectedDeposit?.status === 'Pending' ? 'secondary' :
                                                                                    selectedDeposit?.status === 'Flagged' ? 'warning' :
                                                                                        'destructive'
                                                                        }>
                                                                            {selectedDeposit?.status}
                                                                        </Badge>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Verified By</h4>
                                                                        <p>{selectedDeposit?.verifiedBy}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Initiated By</h4>
                                                                        <p>{selectedDeposit?.initiatedBy}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="client">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Client Name</h4>
                                                                        <p>{selectedDeposit?.clientName}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account
                                                                            Number</h4>
                                                                        <p>{selectedDeposit?.accountNumber}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account
                                                                            Balance</h4>
                                                                        <p>$75,000 (after deposit)</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Client Since</h4>
                                                                        <p>January 1, 2020</p>
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <Button variant="outline">View Full
                                                                            Profile</Button>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="history">
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>Date</TableHead>
                                                                            <TableHead>Type</TableHead>
                                                                            <TableHead>Amount</TableHead>
                                                                            <TableHead>Balance</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell>{format(new Date(), 'MMM d, yyyy')}</TableCell>
                                                                            <TableCell>Deposit</TableCell>
                                                                            <TableCell
                                                                                className="text-green-500">+${selectedDeposit?.amount.toLocaleString()}</TableCell>
                                                                            <TableCell>$75,000</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell>{format(new Date(Date.now() - 86400000), 'MMM d, yyyy')}</TableCell>
                                                                            <TableCell>Withdrawal</TableCell>
                                                                            <TableCell
                                                                                className="text-red-500">-$1,000.00</TableCell>
                                                                            <TableCell>$70,000</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </TabsContent>
                                                            <TabsContent value="notes">
                                                                <Textarea className="w-full h-32 mb-4"
                                                                          placeholder="Add a note about this deposit..."/>
                                                                <div className="space-y-4">
                                                                    <div className="bg-muted p-4 rounded-md">
                                                                        <p className="font-semibold">Admin1</p>
                                                                        <p className="text-sm text-muted-foreground">Deposit
                                                                            verified after confirming source of
                                                                            funds.</p>
                                                                        <p className="text-xs text-muted-foreground">{format(new Date(), 'MMM d, yyyy HH:mm')}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>
                                                    <DialogFooter>
                                                        <div className="flex justify-between w-full">
                                                            <div className="flex items-center space-x-2">
                                                                <Switch id="urgent"/>
                                                                <Label htmlFor="urgent">Mark as Urgent</Label>
                                                            </div>
                                                            <div>
                                                                <Button className="mr-2"
                                                                        variant="outline">Reject</Button>
                                                                <Button>Verify</Button>
                                                            </div>
                                                        </div>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <ChevronDown className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        <Check className="mr-2 h-4 w-4"/>
                                                        Verify
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <X className="mr-2 h-4 w-4"/>
                                                        Reject
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem>
                                                        <Flag className="mr-2 h-4 w-4"/>
                                                        Flag for Review
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Pagination>
                        <PaginationContent>
                            <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index + 1} onClick={() => setCurrentPage(index + 1)} active={currentPage === index + 1}>
                                    {index + 1}
                                </PaginationItem>
                            ))}
                            <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>

        </>
    );
}

export default Deposits;