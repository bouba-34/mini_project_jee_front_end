"use client"
import {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    ArrowUpRight,
    CreditCard,
    Activity,
    DollarSign,
    Filter,
    Search,
    PlusCircle,
    Eye,
    Edit,
    ChevronDown, XCircle, Unlock, Lock
} from "lucide-react";
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogFooter, DialogTrigger, DialogTitle } from "../ui/dialog";
import {DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenu, DropdownMenuContent} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Table, TableCell, TableHead, TableRow, TableBody, TableFooter, TableCaption, TableHeader} from "@/components/ui/table"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {format} from "date-fns";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";


const Accounts = () => {
    const accountData = [
        { id: 'ACC001', holder: 'Alice Johnson', type: 'Savings', balance: 15000, status: 'Active', opened: '2023-01-15', lastActivity: '2023-06-01' },
        { id: 'ACC002', holder: 'Bob Smith', type: 'Checking', balance: 5000, status: 'Inactive', opened: '2023-02-20', lastActivity: '2023-05-15' },
        { id: 'ACC003', holder: 'Charlie Brown', type: 'Premium', balance: 50000, status: 'Active', opened: '2023-03-10', lastActivity: '2023-06-05' },
        { id: 'ACC004', holder: 'Diana Prince', type: 'Savings', balance: 20000, status: 'Active', opened: '2023-04-05', lastActivity: '2023-06-02' },
        { id: 'ACC005', holder: 'Ethan Hunt', type: 'Checking', balance: 100, status: 'Under Review', opened: '2023-05-12', lastActivity: '2023-06-03' },
        { id: 'ACC006', holder: 'Fiona Gallagher', type: 'Savings', balance: 30000, status: 'Active', opened: '2023-01-20', lastActivity: '2023-06-10' },
        { id: 'ACC007', holder: 'George Costanza', type: 'Checking', balance: 2000, status: 'Inactive', opened: '2023-02-15', lastActivity: '2023-05-20' },
        { id: 'ACC008', holder: 'Hannah Baker', type: 'Premium', balance: 75000, status: 'Active', opened: '2023-03-25', lastActivity: '2023-06-15' },
        { id: 'ACC009', holder: 'Ian Malcolm', type: 'Savings', balance: 12000, status: 'Active', opened: '2023-04-10', lastActivity: '2023-06-11' },
        { id: 'ACC010', holder: 'Jessica Jones', type: 'Checking', balance: 400, status: 'Under Review', opened: '2023-05-05', lastActivity: '2023-06-05' },
        { id: 'ACC011', holder: 'Kevin Hart', type: 'Savings', balance: 22000, status: 'Active', opened: '2023-01-30', lastActivity: '2023-06-12' },
        { id: 'ACC012', holder: 'Laura Croft', type: 'Checking', balance: 8000, status: 'Inactive', opened: '2023-02-22', lastActivity: '2023-05-25' },
        { id: 'ACC013', holder: 'Michael Scott', type: 'Premium', balance: 95000, status: 'Active', opened: '2023-03-15', lastActivity: '2023-06-13' },
        { id: 'ACC014', holder: 'Nina Simone', type: 'Savings', balance: 18000, status: 'Active', opened: '2023-04-01', lastActivity: '2023-06-14' },
        { id: 'ACC015', holder: 'Oscar Isaac', type: 'Checking', balance: 2500, status: 'Under Review', opened: '2023-05-10', lastActivity: '2023-06-06' },
        { id: 'ACC016', holder: 'Pam Beesly', type: 'Savings', balance: 35000, status: 'Active', opened: '2023-01-25', lastActivity: '2023-06-09' },
        { id: 'ACC017', holder: 'Quentin Tarantino', type: 'Checking', balance: 1500, status: 'Inactive', opened: '2023-02-28', lastActivity: '2023-05-30' },
        { id: 'ACC018', holder: 'Rachel Green', type: 'Premium', balance: 60000, status: 'Active', opened: '2023-03-20', lastActivity: '2023-06-08' },
        { id: 'ACC019', holder: 'Steve Rogers', type: 'Savings', balance: 9000, status: 'Active', opened: '2023-04-15', lastActivity: '2023-06-07' },
        { id: 'ACC020', holder: 'Tony Stark', type: 'Checking', balance: 300, status: 'Under Review', opened: '2023-05-01', lastActivity: '2023-06-04' },
        { id: 'ACC021', holder: 'Uma Thurman', type: 'Savings', balance: 50000, status: 'Active', opened: '2023-01-10', lastActivity: '2023-06-03' },
        { id: 'ACC022', holder: 'Vin Diesel', type: 'Checking', balance: 7000, status: 'Inactive', opened: '2023-02-12', lastActivity: '2023-05-12' },
        { id: 'ACC023', holder: 'Will Smith', type: 'Premium', balance: 85000, status: 'Active', opened: '2023-03-05', lastActivity: '2023-06-01' },
        { id: 'ACC024', holder: 'Xena Warrior', type: 'Savings', balance: 13000, status: 'Active', opened: '2023-04-20', lastActivity: '2023-06-02' },
        { id: 'ACC025', holder: 'Yoda', type: 'Checking', balance: 400, status: 'Under Review', opened: '2023-05-15', lastActivity: '2023-06-05' },
    ]


    const [searchTerm, setSearchTerm] = useState('')
    const [selectedAccount, setSelectedAccount] = useState(null)
    const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false)
    const [selectedAccounts, setSelectedAccounts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const totalPages = Math.ceil(accountData.length / itemsPerPage);
    const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4]); // Pages visibles initiales

    const filteredAccounts = accountData.filter(account =>
        account.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.holder.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastAccount = currentPage * itemsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - itemsPerPage;
    const currentAccounts = filteredAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

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
    //const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

    const handleSelectAccount = (accountId) => {
        setSelectedAccounts(prev =>
            prev.includes(accountId)
                ? prev.filter(id => id !== accountId)
                : [...prev, accountId]
        )
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Accounts Management</h1>
            {/* Accounts Overview Panel */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Accounts</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">89</div>
                        <p className="text-xs text-muted-foreground">Opened this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,045</div>
                        <p className="text-xs text-muted-foreground">85% of total</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$10.2M</div>
                        <p className="text-xs text-muted-foreground">Across all accounts</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search, Filters, and New Account Button */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        placeholder="Search accounts..."
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
                        <DropdownMenuItem>Account Type</DropdownMenuItem>
                        <DropdownMenuItem>Balance Range</DropdownMenuItem>
                        <DropdownMenuItem>Status</DropdownMenuItem>
                        <DropdownMenuItem>Date Opened</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={isNewAccountDialogOpen} onOpenChange={setIsNewAccountDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            New Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Account</DialogTitle>
                            <DialogDescription>
                                Enter the details for the new account. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="client" className="text-right">
                                    Client
                                </Label>
                                <Input id="client" className="col-span-3" placeholder="Search existing client..."/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="accountType" className="text-right">
                                    Account Type
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select account type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="savings">Savings</SelectItem>
                                        <SelectItem value="checking">Checking</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="initialDeposit" className="text-right">
                                    Initial Deposit
                                </Label>
                                <Input id="initialDeposit" className="col-span-3" placeholder="Enter amount"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="accountStatus" className="text-right">
                                    Status
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="pending">Pending Review</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Settings</Label>
                                <div className="col-span-3 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="overdraft"/>
                                        <label htmlFor="overdraft">Overdraft Protection</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="linkedBenefits"/>
                                        <label htmlFor="linkedBenefits">Linked Benefits</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Create Account</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {/* Accounts & Owners Table */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Accounts & Owners</CardTitle>
                    <CardDescription>Manage and view all account information</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    <Checkbox
                                        checked={selectedAccounts.length === accountData.length}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedAccounts(accountData.map(account => account.id))
                                            } else {
                                                setSelectedAccounts([])
                                            }
                                        }}
                                    />
                                </TableHead>
                                <TableHead>Account Number</TableHead>
                                <TableHead>Account Holder</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date Opened</TableHead>
                                <TableHead>Last Activity</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentAccounts.map((account) => (
                                <TableRow key={account.id}>
                                    <TableCell>
                                        <Checkbox

                                            checked={selectedAccounts.includes(account.id)}
                                            onCheckedChange={() => handleSelectAccount(account.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{account.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage
                                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${account.holder}`}/>
                                                <AvatarFallback>{account.holder.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>{account.holder}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{account.type}</TableCell>
                                    <TableCell
                                        className={account.balance < 1000 ? 'text-red-500' : account.balance > 40000 ? 'text-green-500' : ''}>
                                        ${account.balance.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            account.status === 'Active' ? 'default' :
                                                account.status === 'Inactive' ? 'secondary' :
                                                    'destructive'
                                        }>
                                            {account.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{format(new Date(account.opened), 'MMM d, yyyy')}</TableCell>
                                    <TableCell>{format(new Date(account.lastActivity), 'MMM d, yyyy')}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon"
                                                            onClick={() => setSelectedAccount(account)}>
                                                        <Eye className="h-4 w-4"/>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Account
                                                            Details: {selectedAccount?.id}</DialogTitle>
                                                        <DialogDescription>View and manage account
                                                            information</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Tabs defaultValue="info" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="info">Account Info</TabsTrigger>
                                                                <TabsTrigger value="owner">Owner Profile</TabsTrigger>
                                                                <TabsTrigger
                                                                    value="transactions">Transactions</TabsTrigger>
                                                                <TabsTrigger value="activity">Admin
                                                                    Actions</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="info">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Account
                                                                            Number</h4>
                                                                        <p>{selectedAccount?.id}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account Type</h4>
                                                                        <p>{selectedAccount?.type}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Balance</h4>
                                                                        <p>${selectedAccount?.balance.toLocaleString()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Status</h4>
                                                                        <Badge variant={
                                                                            selectedAccount?.status === 'Active' ? 'default' :
                                                                                selectedAccount?.status === 'Inactive' ? 'secondary' :
                                                                                    'destructive'
                                                                        }>
                                                                            {selectedAccount?.status}
                                                                        </Badge>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date Opened</h4>
                                                                        <p>{selectedAccount?.opened && format(new Date(selectedAccount.opened), 'MMM d, yyyy')}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Last Activity</h4>
                                                                        <p>{selectedAccount?.lastActivity && format(new Date(selectedAccount.lastActivity), 'MMM d, yyyy')}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="owner">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Full Name</h4>
                                                                        <p>{selectedAccount?.holder}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Client ID</h4>
                                                                        <p>CL{selectedAccount?.id.slice(3)}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Email</h4>
                                                                        <p>{selectedAccount?.holder.toLowerCase().replace(' ', '.')}@example.com</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Phone</h4>
                                                                        <p>+1 (555) 123-4567</p>
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <Button variant="outline">View Full
                                                                            Profile</Button>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="transactions">
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
                                                                                className="text-green-500">+$500.00</TableCell>
                                                                            <TableCell>${(selectedAccount?.balance + 500).toLocaleString()}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell>{format(new Date(Date.now() - 86400000), 'MMM d, yyyy')}</TableCell>
                                                                            <TableCell>Withdrawal</TableCell>
                                                                            <TableCell
                                                                                className="text-red-500">-$200.00</TableCell>
                                                                            <TableCell>${selectedAccount?.balance.toLocaleString()}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </TabsContent>
                                                            <TabsContent value="activity">
                                                                <div className="space-y-4">
                                                                    <div className="flex items-center justify-between">
                                                                        <div>
                                                                            <p className="font-semibold">Balance
                                                                                adjusted</p>
                                                                            <p className="text-sm text-muted-foreground">By
                                                                                Admin User</p>
                                                                        </div>
                                                                        <p className="text-sm">{format(new Date(), 'MMM d, yyyy HH:mm')}</p>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <div>
                                                                            <p className="font-semibold">Account status
                                                                                changed to Active</p>
                                                                            <p className="text-sm text-muted-foreground">By
                                                                                System</p>
                                                                        </div>
                                                                        <p className="text-sm">{format(new Date(Date.now() - 86400000), 'MMM d, yyyy HH:mm')}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4"/>
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <ChevronDown className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        <Lock className="mr-2 h-4 w-4"/>
                                                        Freeze Account
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Unlock className="mr-2 h-4 w-4"/>
                                                        Unfreeze Account
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem>
                                                        <XCircle className="mr-2 h-4 w-4"/>
                                                        Close Account
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
                            <PaginationPrevious onClick={handlePrevious} disabled={currentPage === 1}>
                                Précédent
                            </PaginationPrevious>
                            {visiblePages.map(page => (
                                page <= totalPages && (
                                    <PaginationItem key={page} onClick={() => setCurrentPage(page)} active={currentPage === page}>
                                        {page}
                                    </PaginationItem>
                                )
                            ))}
                            <PaginationNext onClick={handleNext} disabled={currentPage === totalPages}>
                                Suivant
                            </PaginationNext>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>

        </>
    );
}

export default Accounts;