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
import {Badge} from "@/components/ui/badge";
import {format} from "date-fns";
import {useEffect, useState} from "react";
import {addOperation, getClientAccounts, getComptes, getOperations} from "@/actions/use-dashboard";
import {AddOperationProps, ClientAccountProps} from "@/components/withdrawals";
import {useEmployeStore} from "@/store";
import {AccountProps} from "@/components/accounts";
import toast from "react-hot-toast";

type DepositDataProps = {
    metadata: {
        totalDepositsThisMonth: number;
        totalDepositsToday: number;
        averageDeposit: number;
    },
    data: {
        numOperation: number;
        dateOperation: string;
        montant: number;
        status: string;
        employe: {
            codeEmploye: number;
            fullname: string;
            email: string;
        };
        compte: {
            numCompte: number;
            solde: number;
            client: {
                codeClient: number;
                fullname: string;
                email: string;
                phone: string;
                address: string;
                joinDate: string;
            };
        };
    }[]
}

type SelectedDepositProps = {
    numOperation: number;
    dateOperation: string;
    montant: number;
    status: string;
    employe: {
        codeEmploye: number;
        fullname: string;
        email: string;
    };
    compte: {
        numCompte: number;
        solde: number;
        client: {
            codeClient: number;
            fullname: string;
            email: string;
            phone: string;
            address: string;
            joinDate: string;
        };
    };
}


const Deposits = () => {
    const [depositData, setDepositData] = useState<DepositDataProps>({
        metadata: {
            totalDepositsThisMonth: 0,
            totalDepositsToday: 0,
            averageDeposit: 0
        },
        data: []
    })
    const [searchTerm, setSearchTerm] = useState('')
    const filteredDeposits = depositData.data.filter(deposit =>
        deposit.compte.client.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
    const indexOfLastDeposit = currentPage * itemsPerPage;
    const indexOfFirstDeposit = indexOfLastDeposit - itemsPerPage;
    const currentDeposits = filteredDeposits.slice(indexOfFirstDeposit, indexOfLastDeposit);
    const [selectedDeposit, setSelectedDeposit] = useState<SelectedDepositProps>({
        numOperation: 0,
        dateOperation: '',
        montant: 0,
        status: '',
        employe: {
            codeEmploye: 0,
            fullname: '',
            email: '',
        },
        compte: {
            numCompte: 0,
            solde: 0,
            client: {
                codeClient: 0,
                fullname: '',
                email: '',
                phone: '',
                address: '',
                joinDate: '',
            },
        }
    })
    const [isNewDepositDialogOpen, setIsNewDepositDialogOpen] = useState(false)
    const [clientData, setClientData] = useState({
        data:[]
    });

    const [clientAccounts, setClientAccounts] = useState<ClientAccountProps>({
        data: []
    });

    const current_emp_code = useEmployeStore(state => state.code);
    const current_emp_fullname = useEmployeStore(state => state.fullname);
    const [suggestions, setSuggestions] = useState<AccountProps[]>([])
    const [inputText, setInputText] = useState('')
    const [clientSearchTerm, setClientSearchTerm] = useState('');

    const [newDeposit, setNewDeposit] = useState<AddOperationProps>({
        operationType: "",
        compteId: 0,
        montant: 0,
        employeID: ""
    });


    useEffect(() => {
        const fetchData = async () => {
            const response = await getOperations("VE");
            const clients = await getComptes();
            setClientData(clients);
            setDepositData(response);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (clientSearchTerm.length > 0) {
            const suggestionsFiltrees = clientData.data.filter((element:AccountProps) =>
                element.client.fullname.toLowerCase().includes(clientSearchTerm.toLowerCase())
            )
            setSuggestions(suggestionsFiltrees)
        } else {
            setSuggestions([])
        }
    }, [clientSearchTerm])

    const handleSelection = async (element: AccountProps) => {
        setInputText(element.client.fullname)
        const accounts = await getClientAccounts(element.client.codeClient)
        setClientAccounts(accounts)
        setClientSearchTerm("")
        setSuggestions([])
    }

    const handleAddOperation = async () => {
        newDeposit.employeID = current_emp_code;
        newDeposit.operationType = "versement";
        try {
            const response = await addOperation(newDeposit);
            setNewDeposit({
                operationType: "",
                compteId: 0,
                montant: 0,
                employeID: ""
            });
            setIsNewDepositDialogOpen(false);
            toast.success("Withdrawal added successfully");
        } catch (error) {
            setNewDeposit({
                operationType: "",
                compteId: 0,
                montant: 0,
                employeID: ""
            })
            console.error(error);
        }
    }



    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Deposits Management</h1>

            {/* Deposits Overview Panel */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deposits Today</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${depositData.metadata.totalDepositsToday}</div>
                        <p className="text-xs text-muted-foreground">+18% from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deposits This Month</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${depositData.metadata.totalDepositsThisMonth}</div>
                        <p className="text-xs text-muted-foreground">+8% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Deposit</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${depositData.metadata.averageDeposit}</div>
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
                                <Label htmlFor="accountNumber" className="text-right">
                                    Account
                                </Label>
                                <Select
                                    onValueChange={(value) => setNewDeposit({
                                            ...newDeposit,
                                            compteId: parseInt(value)
                                        }
                                    )}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select account"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clientAccounts.data.length > 0 ? (
                                            clientAccounts.data.map(account => (
                                                <SelectItem
                                                    key={account.numCompte}
                                                    value={`${account.numCompte}`}
                                                >
                                                    ACC{account.numCompte}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value={'none'} disabled>No accounts available</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Amount
                                </Label>
                                <Input
                                    id="amount"
                                    className="col-span-3"
                                    placeholder="Enter amount"
                                    onChange={(e) => setNewDeposit({
                                        ...newDeposit,
                                        montant: parseInt(e.target.value)
                                    })}
                                    type="number"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="initiatedBy" className="text-right">
                                    Initiated By
                                </Label>
                                <Input id="initiatedBy" className="col-span-3" value={`${current_emp_fullname}`}
                                       disabled/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddOperation}>Submit Deposit</Button>
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
                                <TableHead>Initiated By</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentDeposits.map((deposit) => (
                                <TableRow key={deposit.numOperation}>
                                    <TableCell>D{deposit.numOperation}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage
                                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${deposit.compte.client.fullname}`}/>
                                                <AvatarFallback>{deposit.compte.client.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>{deposit.compte.client.fullname}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>ACC{deposit.compte.numCompte}</TableCell>
                                    <TableCell>${deposit.montant.toLocaleString()}</TableCell>
                                    <TableCell>{format(new Date(deposit.dateOperation), 'MMM d, yyyy')}</TableCell>
                                    <TableCell>
                                        <Badge className={`${deposit.status === "success" ? "bg-green-500 hover:bg-green-500" : "bg-red-500 hover:bg-red-500"}`}>
                                            {deposit.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{deposit.employe.fullname}</TableCell>
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
                                                            Details: D{selectedDeposit.numOperation}</DialogTitle>
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
                                                            </TabsList>
                                                            <TabsContent value="details">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Transaction
                                                                            ID</h4>
                                                                        <p>D{selectedDeposit.numOperation}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Amount</h4>
                                                                        <p>${selectedDeposit.montant.toLocaleString()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date</h4>
                                                                        <p>{selectedDeposit.dateOperation && format(new Date(selectedDeposit.dateOperation), 'MMM d, yyyy')}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Status</h4>
                                                                        <Badge className={`${selectedDeposit.status === "success" ? "bg-green-500 hover:bg-green-500" : "bg-red-500 hover:bg-red-500"}`}>
                                                                            {selectedDeposit.status}
                                                                        </Badge>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Initiated By</h4>
                                                                        <p>{selectedDeposit.employe.fullname}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="client">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Client Name</h4>
                                                                        <p>{selectedDeposit.compte.client.fullname}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account
                                                                            Number</h4>
                                                                        <p>ACC{selectedDeposit.compte.numCompte}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account
                                                                            Balance</h4>
                                                                        <p>${selectedDeposit.compte.solde}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Client Since</h4>
                                                                        <p>{selectedDeposit.compte.client.joinDate}</p>
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <Button variant="outline">View Full
                                                                            Profile</Button>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>
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