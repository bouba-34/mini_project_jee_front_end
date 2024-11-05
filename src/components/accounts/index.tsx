"use client"
import {useEffect, useState} from "react";
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
import {addCompte, deleteCompte, getComptes} from "@/actions/use-dashboard";
import toast from "react-hot-toast";

export type AccountProps = {
    numCompte: number;
    dateCreation: string;
    solde: number;
    client: {
        codeClient: number
        fullname: string;
        phone: string;
        email: string;
        address: string;
    };
    decouvert?: number;
    taux?: number;
    decouvertInitial?: number
}

export type AddAccountProps = {
    clientId: number;
    account_type: string;
    decouvert: number;
    taux: number;
    solde: number;
}

const Accounts = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [data, setData] = useState({
        metadata: {
            totalAccounts: 0,
            newAccounts: 0,
            activeAccounts: 0,
            totalBalance: 0
        },
        data: []
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await getComptes();
            setData(response);
            console.log("account", data)
        }
        fetchData();
    }, []);

    const [selectedAccount, setSelectedAccount] = useState<AccountProps>({
        numCompte: 0,
        dateCreation: '',
        solde: 0,
        client: {
            codeClient: 0,
            fullname: '',
            phone: '',
            email: '',
            address: ''
        },
        decouvert: 0,
        taux: 0,
        decouvertInitial: 0
    })

    const [newAccount, setNewAccount] = useState<AddAccountProps>({
        clientId: 0,
        account_type: '',
        decouvert: 0,
        taux: 0,
        solde: 0
    })

    const [selectedClientForAdd, setSelectedClientForAdd] = useState<AccountProps>({
        numCompte: 0,
        dateCreation: '',
        solde: 0,
        client: {
            codeClient: 0,
            fullname: '',
            phone: '',
            email: '',
            address: ''
        },
        decouvert: 0,
        taux: 0,
        decouvertInitial: 0
    })
    const [clientSearchTerm, setClientSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<AccountProps[]>([])
    const [inputText, setInputText] = useState('')

    useEffect(() => {
        if (clientSearchTerm.length > 0) {
            const suggestionsFiltrees = data.data.filter((element:AccountProps) =>
                element.client.fullname.toLowerCase().includes(clientSearchTerm.toLowerCase())
            )
            setSuggestions(suggestionsFiltrees)
        } else {
            setSuggestions([])
        }
    }, [clientSearchTerm])

    const handleSelection = (element: AccountProps) => {
        setSelectedClientForAdd(element)
        //console.log(selectedClientForAdd)
        setInputText(element.client.fullname)
        newAccount.clientId = element.client.codeClient
        setClientSearchTerm("")
        setSuggestions([])
    }

    const handleRemove = (element: string) => {
        setSelectedClientForAdd({
            numCompte: 0,
            dateCreation: '',
            solde: 0,
            client: {
                codeClient: 0,
                fullname: '',
                phone: '',
                email: '',
                address: ''
            },
            decouvert: 0,
            taux: 0,
            decouvertInitial: 0
        })
    }

    const handleDeleteAccount = async (id: number) => {
        try {
            await deleteCompte(id);
            toast.success('Account deleted successfully')
        } catch (error) {
            toast.error('An error occurred. Please try again.')
            console.error(error)
        }
    }

    const handleAddAccount = async () => {
        //console.log(newAccount)
        try {
            await addCompte(newAccount);
            setNewAccount({
                clientId: 0,
                account_type: '',
                decouvert: 0,
                taux: 0,
                solde: 0
            })
            setInputText('')
            setClientSearchTerm('')
            setSuggestions([])
            setIsNewAccountDialogOpen(false)
            toast.success('Account created successfully')
        } catch (error) {
            toast.error('An error occurred. Please try again.')
            console.error(error)
        }
    }


    const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false)
    //const [selectedAccounts, setSelectedAccounts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const totalPages = Math.ceil(data.data.length / itemsPerPage);
    const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4]); // Pages visibles initiales

    const filteredAccounts = data.data.filter((account: AccountProps) =>
        //account.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.client.fullname.toLowerCase().includes(searchTerm.toLowerCase())
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

    /*const handleSelectAccount = (accountId) => {
        setSelectedAccounts(prev =>
            prev.includes(accountId)
                ? prev.filter(id => id !== accountId)
                : [...prev, accountId]
        )
    }*/


    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Accounts Management</h1>
            {/* Accounts Overview Panel */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.metadata.totalAccounts}</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Accounts</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.metadata.newAccounts}</div>
                        <p className="text-xs text-muted-foreground">Opened this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${data.metadata.totalBalance}</div>
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
                            <div className="grid grid-cols-2 items-center gap-4">
                                <Label htmlFor="client" className="text-right">
                                    Client
                                </Label>
                                <div className="relative">
                                    <Input id="client"
                                           className="col-span-3"
                                           placeholder="Search existing client..."
                                           value={inputText}
                                           onChange={(e) => {
                                               setClientSearchTerm(e.target.value)
                                               setInputText(e.target.value)
                                           }}
                                    />
                                    {suggestions.length > 0 && (
                                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg max-h-60 overflow-auto">
                                            {suggestions.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleSelection(suggestion)}
                                                >
                                                    <div className="flex items-center">
                                                        <Avatar className="h-8 w-8 mr-2">
                                                            <AvatarImage
                                                                src={`https://api.dicebear.com/6.x/initials/svg?seed=${suggestion.client.fullname}`}/>
                                                            <AvatarFallback>{suggestion.client.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                        </Avatar>
                                                        <div>{suggestion.client.fullname}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="accountType" className="text-right">
                                    Account Type
                                </Label>
                                <Select
                                    onValueChange={(value) => setNewAccount({
                                        ...newAccount,
                                        account_type: value
                                    })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select account type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cc">Compte Courant</SelectItem>
                                        <SelectItem value="ce">Compte Epargne</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="initialDeposit" className="text-right">
                                    Initial Deposit
                                </Label>
                                <Input
                                    id="initialDeposit"
                                    className="col-span-3"
                                    onChange={(e) => setNewAccount({
                                        ...newAccount,
                                        solde: parseInt(e.target.value)
                                    })}
                                    placeholder="Enter amount"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="accountDecouvert" className="text-right">
                                    {newAccount.account_type === 'cc' ? 'Découvert' : 'Taux'}
                                </Label>
                                <Input
                                    id="accountDecouvert"
                                    className="col-span-3"
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value) || 0; // Convertir en entier ou mettre 0 si NaN
                                        setNewAccount({
                                            ...newAccount,
                                            [newAccount.account_type === 'cc' ? 'decouvert' : 'taux']: value // Utiliser la notation par crochets
                                        });
                                    }}
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddAccount}>Create Account</Button>
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
                            <TableHead>Account Number</TableHead>
                                <TableHead>Account Holder</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Date Opened</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentAccounts.map((account: AccountProps) => (
                                <TableRow key={account.numCompte}>
                                    <TableCell>ACC{account.numCompte}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage
                                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${account.client.fullname}`}/>
                                                <AvatarFallback>{account.client.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>{account.client.fullname}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{account?.decouvert != null ? "CC" : "CE"}</TableCell>
                                    <TableCell
                                        className={account.solde < 1000 ? 'text-red-500' : account.solde > 40000 ? 'text-green-500' : ''}>
                                        ${account.solde.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{format(new Date(account.dateCreation), 'MMM d, yyyy')}</TableCell>
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
                                                            Details: ACC{selectedAccount.numCompte}</DialogTitle>
                                                        <DialogDescription>View and manage account
                                                            information</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Tabs defaultValue="info" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="info">Account Info</TabsTrigger>
                                                                <TabsTrigger value="owner">Owner Profile</TabsTrigger>
                                                                <TabsTrigger
                                                                    value="transactions">Today Transactions</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="info">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Account
                                                                            Number</h4>
                                                                        <p>ACC{selectedAccount.numCompte}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account Type</h4>
                                                                        <p>{selectedAccount?.decouvert != null ? "CC" : "CE"}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Balance</h4>
                                                                        <p>${selectedAccount.solde.toLocaleString()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">{selectedAccount.decouvert ? "Decouvert Actuel" : "Taux d'intérêt"}</h4>
                                                                        <p>{selectedAccount.decouvert ? `$${selectedAccount.decouvert}` : `${selectedAccount.taux}%`}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date Opened</h4>
                                                                        <p>{selectedAccount.dateCreation && format(new Date(selectedAccount.dateCreation), 'MMM d, yyyy')}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="owner">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                        <h4 className="font-semibold">Full Name</h4>
                                                                        <p>{selectedAccount.client.fullname}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Client ID</h4>
                                                                        <p>CL{selectedAccount.numCompte}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Email</h4>
                                                                        <p>{selectedAccount.client.email.toLowerCase()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Phone</h4>
                                                                        <p>{selectedAccount.client.phone}</p>
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
                                                                            <TableCell>${(selectedAccount.solde + 500).toLocaleString()}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell>{format(new Date(Date.now() - 86400000), 'MMM d, yyyy')}</TableCell>
                                                                            <TableCell>Withdrawal</TableCell>
                                                                            <TableCell
                                                                                className="text-red-500">-$200.00</TableCell>
                                                                            <TableCell>${selectedAccount.solde.toLocaleString()}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setSelectedAccount(account)}>
                                                        <XCircle className="h-4 w-4"/>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Close Account</DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to delete this account?
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button variant="ghost">Cancel</Button>
                                                        <Button variant="destructive" onClick={() => handleDeleteAccount(account.numCompte)}>Delete</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
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