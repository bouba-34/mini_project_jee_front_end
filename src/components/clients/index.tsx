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
import { Button } from "../ui/button";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useState} from "react";
import {format} from "date-fns";



const Clients = () => {

    const [clientData, setClientData] = useState([
        { id: 1, name: 'Alice Johnson', type: 'Savings', balance: 15000, status: 'Active', joined: '2023-01-15', email: 'alice@example.com', phone: '+1234567890' },
        { id: 2, name: 'Bob Smith', type: 'Checking', balance: 5000, status: 'Inactive', joined: '2023-02-20', email: 'bob@example.com', phone: '+1987654321' },
        { id: 3, name: 'Charlie Brown', type: 'Premium', balance: 50000, status: 'Active', joined: '2023-03-10', email: 'charlie@example.com', phone: '+1122334455' },
        { id: 4, name: 'Diana Prince', type: 'Savings', balance: 20000, status: 'Active', joined: '2023-04-05', email: 'diana@example.com', phone: '+1555666777' },
        { id: 5, name: 'Ethan Hunt', type: 'Checking', balance: 7500, status: 'Pending', joined: '2023-05-12', email: 'ethan@example.com', phone: '+1999888777' },
        { id: 6, name: 'Fiona Green', type: 'Savings', balance: 12000, status: 'Active', joined: '2023-06-03', email: 'fiona@example.com', phone: '+1444555666' },
        { id: 7, name: 'George Lucas', type: 'Premium', balance: 54000, status: 'Inactive', joined: '2023-07-21', email: 'george@example.com', phone: '+1666777888' },
        { id: 8, name: 'Hannah Baker', type: 'Checking', balance: 8000, status: 'Active', joined: '2023-08-15', email: 'hannah@example.com', phone: '+1222333444' },
        { id: 9, name: 'Ivan Petrov', type: 'Savings', balance: 4500, status: 'Pending', joined: '2023-09-05', email: 'ivan@example.com', phone: '+1888999000' },
        { id: 10, name: 'Julia Roberts', type: 'Premium', balance: 60000, status: 'Active', joined: '2023-10-10', email: 'julia@example.com', phone: '+1777666555' },
        { id: 11, name: 'Karen Williams', type: 'Checking', balance: 3000, status: 'Inactive', joined: '2023-11-15', email: 'karen@example.com', phone: '+1555444333' },
        { id: 12, name: 'Leo White', type: 'Savings', balance: 18000, status: 'Pending', joined: '2023-12-08', email: 'leo@example.com', phone: '+1444777888' },
        { id: 13, name: 'Mona Lisa', type: 'Premium', balance: 78000, status: 'Active', joined: '2023-01-20', email: 'mona@example.com', phone: '+1999111222' },
        { id: 14, name: 'Nate Adams', type: 'Checking', balance: 5200, status: 'Active', joined: '2023-02-14', email: 'nate@example.com', phone: '+1222999444' },
        { id: 15, name: 'Olivia Newton', type: 'Savings', balance: 10500, status: 'Inactive', joined: '2023-03-25', email: 'olivia@example.com', phone: '+1333444555' },
        { id: 16, name: 'Paul Carter', type: 'Premium', balance: 87000, status: 'Active', joined: '2023-04-09', email: 'paul@example.com', phone: '+1666888777' },
        { id: 17, name: 'Quincy Jones', type: 'Checking', balance: 4500, status: 'Pending', joined: '2023-05-06', email: 'quincy@example.com', phone: '+1777888999' },
        { id: 18, name: 'Rachel Adams', type: 'Savings', balance: 22000, status: 'Active', joined: '2023-06-30', email: 'rachel@example.com', phone: '+1999222333' },
        { id: 19, name: 'Sam Wilson', type: 'Premium', balance: 92000, status: 'Inactive', joined: '2023-07-13', email: 'sam@example.com', phone: '+1333555666' },
        { id: 20, name: 'Tina Turner', type: 'Checking', balance: 3500, status: 'Active', joined: '2023-08-23', email: 'tina@example.com', phone: '+1888666777' },
    ]);


    const [searchTerm, setSearchTerm] = useState('')
    const [selectedClient, setSelectedClient] = useState(null)
    const [newClient, setNewClient] = useState({ name: '', type: '', balance: 0, status: 'Pending', joined: '', email: '', phone: '' })
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredClients = clientData.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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



    const addClient = () => {
        setClientData([...clientData, { ...newClient, id: clientData.length + 1 }]);
        setNewClient({ name: '', type: '', balance: 0, status: 'Pending', joined: '', email: '', phone: '' });
    };

    return (
        <>
            {/* Client Overview Panel */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Clients</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">89</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,045</div>
                        <p className="text-xs text-muted-foreground">85% of total</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Accounts</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">189</div>
                        <p className="text-xs text-muted-foreground">15% of total</p>
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
                        <DropdownMenuItem>Account Status</DropdownMenuItem>
                        <DropdownMenuItem>Client Type</DropdownMenuItem>
                        <DropdownMenuItem>Registration Date</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
                            <DialogTitle>Ajouter un client</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                placeholder="Nom"
                                value={newClient.name}
                                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                            />
                            <Input
                                placeholder="Type de compte"
                                value={newClient.type}
                                onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
                            />
                            <Input
                                placeholder="Balance"
                                type="number"
                                value={newClient.balance}
                                onChange={(e) => setNewClient({ ...newClient, balance: parseFloat(e.target.value) })}
                            />
                            <Input
                                placeholder="Statut"
                                value={newClient.status}
                                onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                            />
                            <Input
                                placeholder="Date d'inscription"
                                value={newClient.joined}
                                onChange={(e) => setNewClient({ ...newClient, joined: e.target.value })}
                            />
                            <Input
                                placeholder="Email"
                                value={newClient.email}
                                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                            />
                            <Input
                                placeholder="Téléphone"
                                value={newClient.phone}
                                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                            />
                        </div>
                        <Button onClick={addClient}>Ajouter</Button>
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
                                <TableHead>Status</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentClients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell>{client.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${client.name}`} />
                                                <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{client.name}</div>
                                                <div className="text-sm text-muted-foreground">{client.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{client.type}</TableCell>
                                    <TableCell>${client.balance.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={client.status === 'Active' ? 'default' : client.status === 'Inactive' ? 'secondary' : 'outline'}>
                                            {client.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{format(new Date(client.joined), 'MMM d, yyyy')}</TableCell>
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
                                                        <DialogTitle>Client Profile: {selectedClient?.name}</DialogTitle>
                                                        <DialogDescription>View and manage client details</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Tabs defaultValue="personal" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                                                <TabsTrigger value="account">Account Details</TabsTrigger>
                                                                <TabsTrigger value="documents">Documents</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="personal">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Full Name</h4>
                                                                        <p>{selectedClient?.name}</p>
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
                                                                        <p>123 Main St, Anytown, USA</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="account">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Account Type</h4>
                                                                        <p>{selectedClient?.type}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Balance</h4>
                                                                        <p>${selectedClient?.balance.toLocaleString()}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Status</h4>
                                                                        <Badge variant={selectedClient?.status === 'Active' ? 'default' : selectedClient?.status === 'Inactive' ? 'secondary' : 'outline'}>
                                                                            {selectedClient?.status}
                                                                        </Badge>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date Joined</h4>
                                                                        <p>{selectedClient?.joined && format(new Date(selectedClient.joined), 'MMM d, yyyy')}</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="documents">
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">ID Verification</h4>
                                                                        <Badge variant="outline">Verified</Badge>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Proof of Address</h4>
                                                                        <Badge variant="destructive">Pending</Badge>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <Button variant="outline">Send Message</Button>
                                                        <Button variant="default">Upgrade Account</Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
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

export default Clients;