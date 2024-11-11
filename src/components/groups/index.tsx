"use client"
import {Eye, Mail, Phone, Search, Trash2, UserPlus} from "lucide-react";
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
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useEffect, useState} from "react";
import {addGroupe, deleteGroup, getGroupe, getGroupEmployes} from "@/actions/use-dashboard";
import toast from "react-hot-toast";

type GroupDataProps = {
    data: {
        numGroupe: number;
        nomGroupe: string;
    }[]
}

type GroupProps = {
    numGroupe: number;
    nomGroupe: string;
}

type GroupEmployeProps = {
    data: {
        fullname: string;
        email: string;
    }[]
}

const Groups = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isNewGroupDialogOpen, setIsNewGroupDialogOpen] = useState(false)
    const [data, setData] = useState<GroupDataProps>({data: []})
    const [newGroup, setNewGroup] = useState({
        nomGroupe: ''
    })
    const [selectedGroup, setSelectedGroup] = useState<GroupProps>({
        numGroupe: 0,
        nomGroupe: '',
    })

    const [selectedGroupEmployes, setSelectedGroupEmployes] = useState<GroupEmployeProps>({data: []})

    useEffect(() => {
        const fetchData = async () => {
            const response = await getGroupe();
            setData(response);
        }
        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const totalPages = Math.ceil(data.data.length / itemsPerPage);
    const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4]); // Pages visibles initiales

    const filteredGroups = data.data.filter((group) =>
        //account.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.nomGroupe.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastAccount = currentPage * itemsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - itemsPerPage;
    const currentGroups = filteredGroups.slice(indexOfFirstAccount, indexOfLastAccount);

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

    const handleAddGroup = async () => {
        try {
            const response = await addGroupe(newGroup.nomGroupe);
            toast.success('Group added successfully');
            setIsNewGroupDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again');
            setIsNewGroupDialogOpen(false);
        }
    }

    const handleSelectGroup = async (group: GroupProps) => {
        setSelectedGroup(group);
        try {
            const employes = await getGroupEmployes(group.numGroupe);
            setSelectedGroupEmployes(employes);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteGroup = async (id: number) => {
        try {
            await deleteGroup(id);
            toast.success('Group deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again');
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Group Management</h1>

            {/* Search, Filters, and Add Employee Button */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        placeholder="Search group..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Dialog open={isNewGroupDialogOpen} onOpenChange={setIsNewGroupDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4"/>
                            Add Group
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Group</DialogTitle>
                            <DialogDescription>
                                Enter the details for the new group. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Group name
                                </Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    placeholder="Group Name"
                                    onChange={(e) => setNewGroup({nomGroupe: e.target.value})}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddGroup}>Save Group</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Employee Table with Group and Supervisor Details */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Group List</CardTitle>
                    <CardDescription>Manage and view all group information</CardDescription>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Group ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentGroups.map((group) => (
                                <TableRow key={group.numGroupe}>
                                    <TableCell>GRP{group.numGroupe}</TableCell>
                                    <TableCell>{group.nomGroupe}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon"
                                                            onClick={() => handleSelectGroup(group)}
                                                    >
                                                        <Eye className="h-4 w-4"/>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Group
                                                            Profile: {selectedGroup.nomGroupe}</DialogTitle>
                                                        <DialogDescription>View and manage employee
                                                            details</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Tabs defaultValue="details" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="members">Group members</TabsTrigger>
                                                            </TabsList>
                                                           <TabsContent value="members">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        {selectedGroupEmployes.data ?  selectedGroupEmployes.data.map((employe) => (
                                                                            <div key={employe.email}
                                                                                    className="flex items-center gap-4">
                                                                                    <div>
                                                                                        <h4 className="font-semibold">{employe.fullname}</h4>
                                                                                        <p className="text-sm text-muted-foreground">{employe.email}</p>
                                                                                    </div>
                                                                            </div>
                                                                        )) : (
                                                                            <p>No members in this group</p>
                                                                        )}
                                                                    </div>

                                                                </div>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            {/*<Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4"/>
                                            </Button>*/}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon"
                                                            onClick={() => setSelectedGroup(group)}>
                                                        <Trash2 className="h-4 w-4"/>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Group</DialogTitle>
                                                        <DialogDescription>Are you sure you want to delete this
                                                            group and all members?</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost">Cancel</Button>
                                                        <Button variant="destructive"
                                                                onClick={() => handleDeleteGroup(group.numGroupe)}
                                                        >
                                                            Delete</Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
                </CardContent>
            </Card>
        </>
    )
}

export default Groups;