// client section
"use client"
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Users, UserPlus, AlertCircle, Wallet, Search, Trash2, Edit, Filter, Eye, PlusCircle} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {format} from "date-fns";
import {addClient, deleteClient, getClients, updateClient} from "@/actions/use-dashboard";
import {Client} from "@/components/dashboard";
import toast from "react-hot-toast";

export type AddClientProps = {
    fullname: string;
    email: string;
    phone: string;
    address: string;
}

const ClientSection = () => {
    const [data, setData] = useState({
        data: [],
        metadata: {
            totalClients: 0,
            newClientsThisMonth: 0
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            const fdata = await getClients();
            setData(fdata);
        }
        fetchData();
    }, []);

    const [searchTerm, setSearchTerm] = useState('')
    const [decouvert, setDecouvert] = useState('')
    const [taux, setTaux] = useState('')
    const [account_type, setAccount_type] = useState('cc')
    const [solde, setSolde] = useState('')

    const [selectedClient, setSelectedClient] = useState<Client>({
        accountTypes: [],
        address: "",
        email: "",
        fullname: "",
        id: 0,
        joinDate: "",
        phone: "",
        totalBalance: 0
    });
    const [newClient, setNewClient] = useState<AddClientProps>(
        {
            fullname: "",
            email: "",
            phone: "",
            address: "",
        }
    )

    const [editClient, setEditClient] = useState<AddClientProps>({
        fullname: "",
        email: "",
        phone: "",
        address: "",
    });


    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5;

    const filteredClients = data.data.filter((client: Client) =>
        client.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Calcul des pages
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };


    const handleAddClient = async () => {
        const clientData = {
            fullname: newClient.fullname,
            email: newClient.email,
            phone: newClient.phone,
            address: newClient.address,
        };

        try {
            await addClient(clientData, account_type, decouvert || '0', taux || '0', solde);
            setNewClient({
                fullname: "",
                email: "",
                phone: "",
                address: "",
            });
            setAccount_type('');
            setDecouvert('');
            setTaux('');
            setSolde('');
            toast.success('New client added successfully');
        } catch (err) {
            toast.error('An error occurred while adding the client');
            console.error("Erreur lors de l'ajout du client:", err);
        }
    };


    const handleDeleteClient = (id: number) => {
        deleteClient(id)
             .then(() => {
                 toast.success('Client deleted successfully');
             })
             .catch(err => {
                 toast.error('An error occurred while deleting the client');
                 console.error("Erreur lors de la suppression du client:", err);
             });
    }

    const handleEditClient = (id: number) => {
        const clientData = {
            fullname: editClient.fullname,
            email: editClient.email,
            phone: editClient.phone,
            address: editClient.address,
        };

        updateClient(id, clientData)
            .then(() => {
                toast.success('Client updated successfully');
            })
            .catch(err => {
                toast.error('An error occurred while updating the client');
                console.error("Erreur lors de la mise à jour du client:", err);
            });

        setEditClient({
            address: "",
            email: "",
            fullname: "",
            phone: "",
        })

    }


    return (
        <>
            {/* Client Overview Panel */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.metadata.totalClients}</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Clients</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.metadata.newClientsThisMonth}</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
            </div>
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search clients..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Ajouter un nouveau client */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New client
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add new client</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                placeholder="Fullname"
                                value={newClient.fullname}
                                onChange={(e) => setNewClient({ ...newClient, fullname: e.target.value })}
                            />
                            <Input
                                placeholder="Type de compte"
                                value={account_type}
                                onChange={(e) => setAccount_type(e.target.value)}
                            />
                            <Input
                                placeholder="Solde initial"
                                type="number"
                                value={solde}
                                onChange={(e) => setSolde(e.target.value)}
                            />
                            <Input
                                placeholder= {account_type === "cc" ? "Découvert autorisé" : "Taux d'intérêt"}
                                type="number"
                                value={account_type === "cc" ? decouvert : taux}
                                onChange={(e) => account_type === "cc" ? setDecouvert(e.target.value) : setTaux(e.target.value)}
                            />
                            <Input
                                placeholder="Email"
                                value={newClient.email}
                                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                            />
                            <Input
                                placeholder="Adresse"
                                value={newClient.address}
                                onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                            />
                            <Input
                                placeholder="Téléphone"
                                value={newClient.phone}
                                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                            />
                        </div>
                        <Button onClick={handleAddClient}>Ajouter</Button>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Client Details Table */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Client Details</CardTitle>
                    <CardDescription>Manage and view all client information</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Account Type</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentClients.map((client: Client) => (
                                <TableRow key={client.id}>
                                    <TableCell>CL{client.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${client.fullname}`} />
                                                <AvatarFallback>{client.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{client.fullname}</div>
                                                <div className="text-sm text-muted-foreground">{client.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            (() => {
                                                if (client.accountTypes.includes("cc") && client.accountTypes.includes("ce")) {
                                                    return "CC & CE";
                                                } else if (client.accountTypes.includes("cc")) {
                                                    return "CC";
                                                } else if (client.accountTypes.includes("ce")) {
                                                    return "CE";
                                                } else {
                                                    return "N/A"; // Par défaut, si aucun type de compte n'est trouvé
                                                }
                                            })()
                                        }
                                    </TableCell>
                                    <TableCell>${client.totalBalance.toLocaleString()}</TableCell>
                                    <TableCell>{format(new Date(client.joinDate), 'MMM d, yyyy')}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setSelectedClient(client)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-3xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Client Profile: {selectedClient?.fullname}</DialogTitle>
                                                        <DialogDescription>View and manage client details</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Tabs defaultValue="personal" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                                                <TabsTrigger value="account">Account Details</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="personal">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Full Name</h4>
                                                                        <p>{selectedClient?.fullname}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Email</h4>
                                                                        <p>{selectedClient?.email}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Phone</h4>
                                                                        <p>{selectedClient?.phone}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Address</h4>
                                                                        <p>{selectedClient.address}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="account">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Account Type</h4>
                                                                        <p>
                                                                            {
                                                                                (() => {
                                                                                    if (selectedClient.accountTypes.includes("cc") && selectedClient.accountTypes.includes("ce")) {
                                                                                        return "CC & CE";
                                                                                    } else if (selectedClient.accountTypes.includes("cc")) {
                                                                                        return "CC";
                                                                                    } else if (selectedClient.accountTypes.includes("ce")) {
                                                                                        return "CE";
                                                                                    } else {
                                                                                        return "N/A"; // Par défaut, si aucun type de compte n'est trouvé
                                                                                    }
                                                                                })()
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Balance Total</h4>
                                                                        <p>${selectedClient?.totalBalance.toLocaleString()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date Joined</h4>
                                                                        <p>{selectedClient?.joinDate && format(new Date(selectedClient.joinDate), 'MMM d, yyyy')}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => {
                                                        setEditClient({
                                                            address: client.address,
                                                            email: client.email,
                                                            fullname: client.fullname,
                                                            phone: client.phone,
                                                        });
                                                    }}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Client </DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <Input
                                                            placeholder="Fullname"
                                                            value={editClient.fullname}
                                                            onChange={(e) => setEditClient({ ...editClient, fullname: e.target.value })}
                                                        />
                                                        <Input
                                                            placeholder="Email"
                                                            value={editClient.email}
                                                            onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
                                                        />
                                                        <Input
                                                            placeholder="Adresse"
                                                            value={editClient.address}
                                                            onChange={(e) => setEditClient({ ...editClient, address: e.target.value })}
                                                        />
                                                        <Input
                                                            placeholder="Téléphone"
                                                            value={editClient.phone}
                                                            onChange={(e) => setEditClient({ ...editClient, phone: e.target.value })}
                                                        />
                                                    </div>
                                                    <Button onClick={() => handleEditClient(client.id)} >Edit</Button>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setSelectedClient(client)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Client</DialogTitle>
                                                        <DialogDescription>Are you sure you want to delete this client?</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost">Cancel</Button>
                                                        <Button variant="destructive" onClick={() => handleDeleteClient(selectedClient.id)}>Delete</Button>
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
                            <PaginationItem>
                                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            </PaginationItem>
                            {[...Array(totalPages).keys()].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        isActive={index + 1 === currentPage}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>
        </>
    );
}

export default ClientSection;