"use client"
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
import {
    Edit, Eye,
    Search, UserPlus, Users,
    Lock, Mail, Phone, UserMinus, Briefcase, Trash2
} from "lucide-react";
import {Separator} from "@radix-ui/react-menu";
import {addEmploye, deleteEmploye, getCollaborators, getEmployes, getGroupe} from "@/actions/use-dashboard";
import toast from "react-hot-toast";

type SelectedEmployeeProps = {
    codeEmploye: number;
    fullname: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    employe_sup: {
        codeEmploye: number;
        fullname: string;
    };
    joinDate: string;
    groupe: {
        numGroupe: number;
        nomGroupe: string;
    },
}

type EmployeDataProps = {
    code: string;
    data: SelectedEmployeeProps[];
}

type CollaboratorProps = {
    code: number;
    data:{
        id: number,
        fullname: string,
    }[]
}

export type NewEmployeProps = {
    fullname: string,
    email: string,
    phone: string,
    address: string,
    role: string,
    password: string,
}

type GroupDataProps = {
    data: {
        numGroupe: number,
        nomGroupe: string,
    }[]
}

const Workers = () => {

    const [employeeData, setEmployeeData] = useState<EmployeDataProps>({
        code: "",
        data: [],
    });

    const [groupData, setGroupData] = useState<GroupDataProps>({
        data: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const employes = await getEmployes()
            setEmployeeData(employes);
            const groupes = await getGroupe()
            setGroupData(groupes);
        }
        fetchData();
    }, []);

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState<SelectedEmployeeProps>({
        codeEmploye: 0,
        fullname: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        employe_sup: {
            codeEmploye: 0,
            fullname: "",
        },
        joinDate: "",
        groupe: {
            numGroupe: 0,
            nomGroupe: "",
        },
    })
    const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false)
    const [SelectedEmployeCollaborators, setSelectedEmployeCollaborators] = useState<CollaboratorProps>({
        code: 0,
        data: [],
    })

    const [newEmployee, setNewEmployee] = useState<NewEmployeProps>({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        password: "",
    })
    const [supervisorSearchTerm, setSupervisorSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<SelectedEmployeeProps[]>([])
    const [inputText, setInputText] = useState('')
    const [supervisorId, setSupervisorId] = useState<number>(0)
    const [groupId, setGroupId] = useState('')

    useEffect(() => {
        if (supervisorSearchTerm.length > 0) {
            const suggestionsFiltrees = employeeData.data.filter((employee:SelectedEmployeeProps) =>
                employee.fullname.toLowerCase().includes(supervisorSearchTerm.toLowerCase())
            )
            setSuggestions(suggestionsFiltrees)
        } else {
            setSuggestions([])
        }
    }, [supervisorSearchTerm])

    const handleSelection = (element: SelectedEmployeeProps) => {
        setInputText(element.fullname)
        setSupervisorId(element.codeEmploye)
        setSupervisorSearchTerm("")
        setSuggestions([])
    }

    const handleAddEmployee = async () => {
        try {
            await addEmploye(newEmployee, supervisorId, groupId)
            setIsNewEmployeeDialogOpen(false)
            toast.success("Employee added successfully")
            setNewEmployee({
                fullname: "",
                email: "",
                phone: "",
                address: "",
                role: "",
                password: "",
            })
            setSupervisorId(0)
            setGroupId('')
        } catch (error) {
            console.error(error)
            toast.error("An error occurred while adding the employee")
        }
    }

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5; // Nombre d'employés par page

    // Filtrer les employés
    const filteredEmployees = employeeData.data.filter(employee =>
        employee.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.groupe.nomGroupe.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculer les employés à afficher
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Changer de page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Total des pages
    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    const handleSelectEmployee = async (employee: SelectedEmployeeProps) => {
        setSelectedEmployee(employee);
        const collaborators = await getCollaborators(employee.codeEmploye);
        setSelectedEmployeCollaborators(collaborators);
    }

    const handleDeleteEmploye = async (id: number) => {
        try {
            await deleteEmploye(id)
            toast.success("Employee deleted successfully")
        } catch (error) {
            console.error(error)
            toast.error("An error occurred while deleting the employee")
        }
    }


    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Employee Management</h1>

            {/* Search, Filters, and Add Employee Button */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        placeholder="Search employees..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Dialog open={isNewEmployeeDialogOpen} onOpenChange={setIsNewEmployeeDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4"/>
                            Add Employee
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Employee</DialogTitle>
                            <DialogDescription>
                                Enter the details for the new employee. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 items-center gap-4">
                                <Label htmlFor="supervisor" className="text-right">
                                    Supervisor
                                </Label>
                                <div className="relative">
                                <Input
                                    id="supervisor"
                                    className="col-span-3"
                                    placeholder="Supervisor Name"
                                    value={inputText}
                                    onChange={(e) => {
                                        setSupervisorSearchTerm(e.target.value)
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
                                                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${suggestion.fullname}`}/>
                                                        <AvatarFallback>{suggestion.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div>{suggestion.fullname}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Full name
                                </Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    placeholder="Full Name"
                                    onChange={(e) => setNewEmployee({...newEmployee, fullname: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="position" className="text-right">
                                    Position
                                </Label>
                                <Select
                                    onValueChange={(value) => setNewEmployee({...newEmployee, role: value})}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select position"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="engineer">Software Engineer</SelectItem>
                                        <SelectItem value="designer">UI/UX Designer</SelectItem>
                                        <SelectItem value="manager">Project Manager</SelectItem>
                                        <SelectItem value="directeur comptable">Directeur Comptable</SelectItem>
                                        <SelectItem value="comptable">Comptable</SelectItem>
                                        <SelectItem value="analyst">Data Analyst</SelectItem>
                                        <SelectItem value="marketing">Marketing Specialist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="group" className="text-right">
                                    Group
                                </Label>
                                <Select
                                    onValueChange={(value) => setGroupId(value)}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select group"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {groupData.data.map((group) => (
                                            <SelectItem key={group.numGroupe} value={group.numGroupe.toString()}>{group.nomGroupe}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    className="col-span-3"
                                    placeholder="Email Address"
                                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    className="col-span-3"
                                    placeholder="Phone Number"
                                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="address" className="text-right">
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    className="col-span-3"
                                    placeholder="Home Address"
                                    onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="password" className="text-right">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    className="col-span-3"
                                    placeholder="Password"
                                    onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value})}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddEmployee}>Save Employee</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Employee Table with Group and Supervisor Details */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Employee List</CardTitle>
                    <CardDescription>Manage and view all employee information</CardDescription>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Group</TableHead>
                                <TableHead>Supervisor</TableHead>
                                {/*<TableHead>Status</TableHead>*/}
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentEmployees.map((employee) => (
                                <TableRow key={employee.codeEmploye}>
                                    <TableCell>EMP{employee.codeEmploye}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage
                                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${employee.fullname}`}/>
                                                <AvatarFallback>{employee.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>{employee.fullname}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{employee.role}</TableCell>
                                    <TableCell>{employee.groupe.nomGroupe}</TableCell>
                                    <TableCell>{employee.employe_sup ? employee.employe_sup.fullname : "N/A"}</TableCell>
                                    <TableCell>
                                        {employee.joinDate ? format(new Date(employee.joinDate), 'MMM d, yyyy') : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon"
                                                            onClick={() => handleSelectEmployee(employee)}>
                                                        <Eye className="h-4 w-4"/>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Employee
                                                            Profile: {selectedEmployee.fullname}</DialogTitle>
                                                        <DialogDescription>View and manage employee
                                                            details</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Tabs defaultValue="details" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="details">Employee
                                                                    Details</TabsTrigger>
                                                                <TabsTrigger value="history">Employment
                                                                    History</TabsTrigger>
                                                                <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="details">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Employee ID</h4>
                                                                        <p>EMP{selectedEmployee.codeEmploye}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Name</h4>
                                                                        <p>{selectedEmployee.fullname}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Position</h4>
                                                                        <p>{selectedEmployee.role}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Group</h4>
                                                                        <p>{selectedEmployee.groupe.nomGroupe}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Supervisor</h4>
                                                                        <p>{selectedEmployee.employe_sup ? selectedEmployee.employe_sup.fullname : "N/A"}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date Joined</h4>
                                                                        <p>{selectedEmployee.joinDate ? format(new Date(selectedEmployee.joinDate), 'MMM d, yyyy') : 'N/A'}</p>
                                                                    </div>
                                                                </div>
                                                                <Separator className="my-4"/>
                                                                <div>
                                                                    <h4 className="font-semibold mb-2">Contact Information</h4>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="flex items-center">
                                                                            <Mail className="h-4 w-4 mr-2"/>
                                                                            <p>{selectedEmployee.email.toLowerCase()}</p>
                                                                        </div>
                                                                        <div className="flex items-center">
                                                                            <Phone className="h-4 w-4 mr-2"/>
                                                                            <p>{selectedEmployee.phone}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>


                                                            <TabsContent value="history">
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Current Position</h4>
                                                                        <p>{selectedEmployee.role} (Since {selectedEmployee?.joinDate ? format(new Date(selectedEmployee.joinDate), 'MMM yyyy') : 'N/A'})</p>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>

                                                            <TabsContent value="collaborators">
                                                                {SelectedEmployeCollaborators.data ? (
                                                                    <div className="space-y-4">
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                {SelectedEmployeCollaborators.data.map(collaborator => (
                                                                                    <div key={collaborator.id}>
                                                                                        <p>{collaborator.fullname}</p>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="space-y-4">
                                                                        <div>
                                                                            <p>N/A</p>
                                                                        </div>
                                                                    </div>
                                                                )}
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
                                                            onClick={() => setSelectedEmployee(employee)}>
                                                        <Trash2 className="h-4 w-4"/>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Client</DialogTitle>
                                                        <DialogDescription>Are you sure you want to delete this
                                                            worker?</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost">Cancel</Button>
                                                        <Button variant="destructive"
                                                                onClick={() => handleDeleteEmploye(employee.codeEmploye)}>Delete</Button>
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
                            <PaginationPrevious onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </PaginationPrevious>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index + 1} onClick={() => paginate(index + 1)} active={currentPage === index + 1}>
                                    {index + 1}
                                </PaginationItem>
                            ))}
                            <PaginationNext onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                Next
                            </PaginationNext>
                        </Pagination>
                    </CardFooter>
                </CardContent>
            </Card>
        </>
    )
}

export default Workers;