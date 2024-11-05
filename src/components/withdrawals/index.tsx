"use client"
import {useEffect, useState} from "react";
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
import {addOperation, getClientAccounts, getComptes, getOperations} from "@/actions/use-dashboard";
import accounts, {AccountProps} from "@/components/accounts";
import {useEmployeStore} from "@/store";
import toast from "react-hot-toast";

type WithDrawalDataProps = {
    metadata: {
        totalWithdrawnToday: number;
        averageWithdrawal: number;
        totalWithdrawnThisMonth: number;
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


type SelectedWithdrawalProps = {
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

export type AddOperationProps = {
    operationType: string;
    compteId: number;
    montant: number;
    employeID: string;
}

export type ClientAccountProps = {
    data: {
        numCompte: number;
        dateCreation: string;
    }[];
};


const Withdrawals = () => {

    const [withdrawalData, setWithdrawalData] = useState<WithDrawalDataProps>({
        metadata: {
            totalWithdrawnToday: 0,
            averageWithdrawal: 0,
            totalWithdrawnThisMonth: 0,
        },
        data: []
    });

    const [clientData, setClientData] = useState({
        data:[]
    });

    const [clientAccounts, setClientAccounts] = useState<ClientAccountProps>({
        data: []
    });

    const current_emp_code = useEmployeStore(state => state.code);
    const current_emp_fullname = useEmployeStore(state => state.fullname);

    const [selectedWithdrawal, setSelectedWithdrawal] = useState<SelectedWithdrawalProps>({
        numOperation: 0,
        dateOperation: "",
        montant: 0,
        status: "",
        employe: {
            codeEmploye: 0,
            fullname: "",
            email: "",
        },
        compte: {
            numCompte: 0,
            solde: 0,
            client: {
                codeClient: 0,
                fullname: "",
                email: "",
                phone: "",
                address: "",
                joinDate: "",
            },
        }
    });

    const [newWithDrawal, setNewWithDrawal] = useState<AddOperationProps>({
        operationType: "",
        compteId: 0,
        montant: 0,
        employeID: ""
    });

    const [suggestions, setSuggestions] = useState<AccountProps[]>([])
    const [inputText, setInputText] = useState('')
    const [clientSearchTerm, setClientSearchTerm] = useState('');

    const [isNewWithdrawalDialogOpen, setIsNewWithdrawalDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const totalPages = Math.ceil(withdrawalData.data.length / itemsPerPage);
    const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4]); // Pages visibles dans la pagination

    const filteredWithdrawals = withdrawalData.data.filter(withdrawal =>
        withdrawal.compte.client.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastWithdrawal = currentPage * itemsPerPage;
    const indexOfFirstWithdrawal = indexOfLastWithdrawal - itemsPerPage;
    const currentWithdrawals = filteredWithdrawals.slice(indexOfFirstWithdrawal, indexOfLastWithdrawal);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getOperations("RE");
            const clients = await getComptes();
            setClientData(clients);
            setWithdrawalData(response);
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

    const handleAddWithdrawOperation = async () => {
        newWithDrawal.employeID = current_emp_code;
        newWithDrawal.operationType = "retrait";
        try {
            const response = await addOperation(newWithDrawal);
            console.log(response);
            setNewWithDrawal({
                operationType: "",
                compteId: 0,
                montant: 0,
                employeID: ""
            });
            setIsNewWithdrawalDialogOpen(false);
            toast.success("Withdrawal added successfully");
        } catch (error) {
            toast.error("Insufficient funds or decouvert exceeded");
            setNewWithDrawal({
                operationType: "",
                compteId: 0,
                montant: 0,
                employeID: ""
            })
            console.error(error);
        }
    }

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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Withdrawals Today</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${withdrawalData.metadata.totalWithdrawnToday}</div>
                        <p className="text-xs text-muted-foreground">+15% from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Withdrawn This Month</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${withdrawalData.metadata.totalWithdrawnThisMonth}</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Withdrawal</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${withdrawalData.metadata.averageWithdrawal}</div>
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
                                    onValueChange={(value) => setNewWithDrawal({
                                        ...newWithDrawal,
                                        compteId: parseInt(value)}
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
                                    onChange={(e) => setNewWithDrawal({
                                        ...newWithDrawal,
                                        montant: parseInt(e.target.value)
                                    })}
                                    type="number"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="initiatedBy" className="text-right">
                                    Initiated By
                                </Label>
                                <Input id="initiatedBy" className="col-span-3" value={`EMP${current_emp_fullname}`}
                                       disabled/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddWithdrawOperation}>Submit Withdrawal</Button>
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
                                <TableHead>Initiated By</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentWithdrawals.map((withdrawal) => (
                                <TableRow key={withdrawal.numOperation}>
                                    <TableCell>W{withdrawal.numOperation}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">

                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${withdrawal.compte.client.fullname}`} />
                                                <AvatarFallback>{withdrawal.compte.client.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>{withdrawal.compte.client.fullname}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>ACC{withdrawal.compte.numCompte}</TableCell>
                                    <TableCell className="text-red-500">-${withdrawal.montant.toLocaleString()}</TableCell>
                                    <TableCell>{format(new Date(withdrawal.dateOperation), 'MMM d, yyyy')}</TableCell>
                                    <TableCell>
                                        <Badge className={`${withdrawal.status === "success" ? "bg-green-500 hover:bg-green-500" : "bg-red-500 hover:bg-red-500"}`}>
                                            {withdrawal.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{withdrawal.employe.fullname}</TableCell>
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
                                                        <DialogTitle>Withdrawal Details: W{selectedWithdrawal.numOperation}</DialogTitle>
                                                        <DialogDescription>View and manage withdrawal information</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Tabs defaultValue="details" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="details">Transaction Details</TabsTrigger>
                                                                <TabsTrigger value="client">Client Information</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="details">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Transaction ID</h4>
                                                                        <p>W{selectedWithdrawal.numOperation}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Amount</h4>
                                                                        <p>${selectedWithdrawal.montant.toLocaleString()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date</h4>
                                                                        <p>{selectedWithdrawal.dateOperation && format(new Date(selectedWithdrawal.dateOperation), 'MMM d, yyyy')}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Status</h4>
                                                                        <Badge className={`${selectedWithdrawal.status === "success" ? "bg-green-500" : "bg-red-500"}`}>
                                                                            {selectedWithdrawal.status}
                                                                        </Badge>
                                                                    </div>

                                                                    <div>
                                                                        <h4 className="font-semibold">Initiated By</h4>
                                                                        <p>{selectedWithdrawal.employe.fullname}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="client">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Client Name</h4>
                                                                        <p>{selectedWithdrawal.compte.client.fullname}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account Number</h4>
                                                                        <p>ACC{selectedWithdrawal.compte.numCompte}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Account Balance</h4>
                                                                        <p>${selectedWithdrawal.compte.solde}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Client Since</h4>
                                                                        <p>{selectedWithdrawal.compte.client.joinDate && format(new Date(selectedWithdrawal.compte.client.joinDate), 'MMM d, yyyy')}</p>
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