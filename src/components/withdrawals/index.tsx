"use client"
import {useState} from "react";
import {Calendar, ArrowDownRight, Clock,
    DollarSign, Search, PlusCircle,
    Filter, Eye, ChevronDown,
    Check, X, Flag} from "lucide-react";
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

const Withdrawals = () => {
    const withdrawalData = [
        { id: 'W001', clientName: 'Alice Johnson', accountNumber: 'ACC001', amount: 5000, date: '2023-06-01', status: 'Approved', approvedBy: 'Admin1', initiatedBy: 'EMP001' },
        { id: 'W002', clientName: 'Bob Smith', accountNumber: 'ACC002', amount: 1000, date: '2023-06-02', status: 'Pending', approvedBy: '-', initiatedBy: 'EMP002' },
        { id: 'W003', clientName: 'Charlie Brown', accountNumber: 'ACC003', amount: 15000, date: '2023-06-03', status: 'Flagged', approvedBy: '-', initiatedBy: 'EMP003' },
        { id: 'W004', clientName: 'Diana Prince', accountNumber: 'ACC004', amount: 2000, date: '2023-06-04', status: 'Approved', approvedBy: 'Admin2', initiatedBy: 'EMP001' },
        { id: 'W005', clientName: 'Ethan Hunt', accountNumber: 'ACC005', amount: 500, date: '2023-06-05', status: 'Rejected', approvedBy: 'Admin1', initiatedBy: 'EMP002' },
        { id: 'W006', clientName: 'Fiona Green', accountNumber: 'ACC006', amount: 7500, date: '2023-06-06', status: 'Approved', approvedBy: 'Admin3', initiatedBy: 'EMP003' },
        { id: 'W007', clientName: 'George White', accountNumber: 'ACC007', amount: 1200, date: '2023-06-07', status: 'Pending', approvedBy: '-', initiatedBy: 'EMP004' },
        { id: 'W008', clientName: 'Hannah Brown', accountNumber: 'ACC008', amount: 3000, date: '2023-06-08', status: 'Approved', approvedBy: 'Admin1', initiatedBy: 'EMP005' },
        { id: 'W009', clientName: 'Ian Black', accountNumber: 'ACC009', amount: 4000, date: '2023-06-09', status: 'Rejected', approvedBy: 'Admin2', initiatedBy: 'EMP006' },
        { id: 'W010', clientName: 'Jasmine Blue', accountNumber: 'ACC010', amount: 2500, date: '2023-06-10', status: 'Flagged', approvedBy: '-', initiatedBy: 'EMP007' },
        { id: 'W011', clientName: 'Kevin Yellow', accountNumber: 'ACC011', amount: 6000, date: '2023-06-11', status: 'Approved', approvedBy: 'Admin3', initiatedBy: 'EMP008' },
        { id: 'W012', clientName: 'Laura Red', accountNumber: 'ACC012', amount: 1500, date: '2023-06-12', status: 'Pending', approvedBy: '-', initiatedBy: 'EMP009' },
        { id: 'W013', clientName: 'Mike Grey', accountNumber: 'ACC013', amount: 8000, date: '2023-06-13', status: 'Approved', approvedBy: 'Admin1', initiatedBy: 'EMP010' },
        { id: 'W014', clientName: 'Nina Pink', accountNumber: 'ACC014', amount: 2000, date: '2023-06-14', status: 'Rejected', approvedBy: 'Admin2', initiatedBy: 'EMP011' },
        { id: 'W015', clientName: 'Oscar Silver', accountNumber: 'ACC015', amount: 3500, date: '2023-06-15', status: 'Flagged', approvedBy: '-', initiatedBy: 'EMP012' },
        { id: 'W016', clientName: 'Paula Gold', accountNumber: 'ACC016', amount: 9000, date: '2023-06-16', status: 'Approved', approvedBy: 'Admin3', initiatedBy: 'EMP013' },
        { id: 'W017', clientName: 'Quincy Bronze', accountNumber: 'ACC017', amount: 4500, date: '2023-06-17', status: 'Pending', approvedBy: '-', initiatedBy: 'EMP014' },
        { id: 'W018', clientName: 'Rachel Copper', accountNumber: 'ACC018', amount: 3700, date: '2023-06-18', status: 'Approved', approvedBy: 'Admin1', initiatedBy: 'EMP015' },
        { id: 'W019', clientName: 'Steve Platinum', accountNumber: 'ACC019', amount: 2900, date: '2023-06-19', status: 'Rejected', approvedBy: 'Admin2', initiatedBy: 'EMP016' },
        { id: 'W020', clientName: 'Tina Emerald', accountNumber: 'ACC020', amount: 5600, date: '2023-06-20', status: 'Flagged', approvedBy: '-', initiatedBy: 'EMP017' },
    ];


    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null)
    const [isNewWithdrawalDialogOpen, setIsNewWithdrawalDialogOpen] = useState(false)

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const totalPages = Math.ceil(withdrawalData.length / itemsPerPage);
    const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4]); // Pages visibles initiales

    const filteredWithdrawals = withdrawalData.filter(withdrawal =>
        withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        withdrawal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        withdrawal.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastWithdrawal = currentPage * itemsPerPage;
    const indexOfFirstWithdrawal = indexOfLastWithdrawal - itemsPerPage;
    const currentWithdrawals = filteredWithdrawals.slice(indexOfFirstWithdrawal, indexOfLastWithdrawal);


    const handleNext = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            if (newPage > visiblePages[visiblePages.length - 1]) {
                setVisiblePages(prev => [...prev.slice(1), newPage]); // Dévoile une nouvelle page
            }
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            if (newPage < visiblePages[0]) {
                setVisiblePages(prev => [newPage, ...prev.slice(0, 3)]); // Révèle une page précédente
            }
        }
    };



    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Withdrawals Management</h1>
            {/* Withdrawals Overview Panel */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Withdrawals Today</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$24,500</div>
                        <p className="text-xs text-muted-foreground">+15% from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Withdrawn This Month</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$789,000</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="text-xs text-muted-foreground">4 urgent requests</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Withdrawal</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$3,450</div>
                        <p className="text-xs text-muted-foreground">+2% from last week</p>
                    </CardContent>
                </Card>
            </div>
            {/* Search, Filters, and Initiate Withdrawal Button */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search withdrawals..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Date Range</DropdownMenuItem>
                        <DropdownMenuItem>Amount Range</DropdownMenuItem>
                        <DropdownMenuItem>Status</DropdownMenuItem>
                        <DropdownMenuItem>Initiated By</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={isNewWithdrawalDialogOpen} onOpenChange={setIsNewWithdrawalDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Withdraw Funds
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Initiate Withdrawal</DialogTitle>
                            <DialogDescription>
                                Enter the details for the new withdrawal. Click submit when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="client" className="text-right">
                                    Client
                                </Label>
                                <Input id="client" className="col-span-3" placeholder="Search client..." />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="accountNumber" className="text-right">
                                    Account
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select account" />
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
                                <Input id="amount" className="col-span-3" placeholder="Enter amount" type="number" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="reason" className="text-right">
                                    Reason
                                </Label>
                                <Textarea id="reason" className="col-span-3" placeholder="Enter reason for withdrawal (optional)" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="initiatedBy" className="text-right">
                                    Initiated By
                                </Label>
                                <Input id="initiatedBy" className="col-span-3" value="EMP001" disabled />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Submit Withdrawal</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {/* Withdrawals Table with Client Details */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Recent Withdrawals</CardTitle>
                    <CardDescription>Manage and review all withdrawal transactions</CardDescription>
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
                                <TableHead>Approved By</TableHead>
                                <TableHead>Initiated By</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentWithdrawals.map((withdrawal) => (
                                <TableRow key={withdrawal.id}>
                                    <TableCell>{withdrawal.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">

                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${withdrawal.clientName}`} />
                                                <AvatarFallback>{withdrawal.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>{withdrawal.clientName}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{withdrawal.accountNumber}</TableCell>
                                    <TableCell>${withdrawal.amount.toLocaleString()}</TableCell>
                                    <TableCell>{format(new Date(withdrawal.date), 'MMM d, yyyy')}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            withdrawal.status === 'Approved' ? 'default' :
                                                withdrawal.status === 'Pending' ? 'secondary' :
                                                    withdrawal.status === 'Flagged' ? 'warning' :
                                                        'destructive'
                                        }>
                                            {withdrawal.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{withdrawal.approvedBy}</TableCell>
                                    <TableCell>{withdrawal.initiatedBy}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setSelectedWithdrawal(withdrawal)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Withdrawal Details: {selectedWithdrawal?.id}</DialogTitle>
                                                        <DialogDescription>View and manage withdrawal information</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Tabs defaultValue="details" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="details">Transaction Details</TabsTrigger>
                                                                <TabsTrigger value="client">Client Information</TabsTrigger>
                                                                <TabsTrigger value="history">Transaction History</TabsTrigger>
                                                                <TabsTrigger value="notes">Admin Notes</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="details">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Transaction ID</h4>
                                                                        <p>{selectedWithdrawal?.id}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Amount</h4>
                                                                        <p>${selectedWithdrawal?.amount.toLocaleString()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date</h4>
                                                                        <p>{selectedWithdrawal?.date && format(new Date(selectedWithdrawal.date), 'MMM d, yyyy')}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Status</h4>
                                                                        <Badge variant={
                                                                            selectedWithdrawal?.status === 'Approved' ? 'default' :
                                                                                selectedWithdrawal?.status === 'Pending' ? 'secondary' :
                                                                                    selectedWithdrawal?.status === 'Flagged' ? 'warning' :
                                                                                        'destructive'
                                                                        }>
                                                                            {selectedWithdrawal?.status}
                                                                        </Badge>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Approved By</h4>
                                                                        <p>{selectedWithdrawal?.approvedBy}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Initiated By</h4>
                                                                        <p>{selectedWithdrawal?.initiatedBy}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="client">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Client Name</h4>
                                                                        <p>{selectedWithdrawal?.clientName}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account Number</h4>
                                                                        <p>{selectedWithdrawal?.accountNumber}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account Balance</h4>
                                                                        <p>$50,000 (after withdrawal)</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Client Since</h4>
                                                                        <p>January 1, 2020</p>
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <Button variant="outline">View Full Profile</Button>
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
                                                                            <TableCell>Withdrawal</TableCell>
                                                                            <TableCell className="text-red-500">-${selectedWithdrawal?.amount.toLocaleString()}</TableCell>
                                                                            <TableCell>$50,000</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell>{format(new Date(Date.now() - 86400000), 'MMM d, yyyy')}</TableCell>
                                                                            <TableCell>Deposit</TableCell>
                                                                            <TableCell className="text-green-500">+$2,000.00</TableCell>
                                                                            <TableCell>$52,000</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </TabsContent>
                                                            <TabsContent value="notes">
                                                                <Textarea className="w-full h-32 mb-4" placeholder="Add a note about this withdrawal..." />
                                                                <div className="space-y-4">
                                                                    <div className="bg-muted p-4 rounded-md">
                                                                        <p className="font-semibold">Admin1</p>
                                                                        <p className="text-sm text-muted-foreground">Withdrawal approved after verifying client identity.</p>
                                                                        <p className="text-xs text-muted-foreground">{format(new Date(), 'MMM d, yyyy HH:mm')}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>
                                                    <DialogFooter>
                                                        <div className="flex justify-between w-full">
                                                            <div className="flex items-center space-x-2">
                                                                <Switch id="urgent" />
                                                                <Label htmlFor="urgent">Mark as Urgent</Label>
                                                            </div>
                                                            <div>
                                                                <Button className="mr-2" variant="outline">Reject</Button>
                                                                <Button>Approve</Button>
                                                            </div>
                                                        </div>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <ChevronDown className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        <Check className="mr-2 h-4 w-4" />
                                                        Approve
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <X className="mr-2 h-4 w-4" />
                                                        Reject
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Flag className="mr-2 h-4 w-4" />
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
                            <PaginationPrevious onClick={handlePrevious} disabled={currentPage === 1} />
                            {visiblePages.map(page => (
                                page <= totalPages && (
                                    <PaginationItem key={page} onClick={() => setCurrentPage(page)} active={currentPage === page}>
                                        {page}
                                    </PaginationItem>
                                )
                            ))}
                            <PaginationNext onClick={handleNext} disabled={currentPage === totalPages} />
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>
        </>
    );
}

export default Withdrawals;