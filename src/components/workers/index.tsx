"use client"
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
import {Badge} from "@/components/ui/badge";
import {format} from "date-fns";
import {useState} from "react";
import {ArrowUpRight, ChevronDown,
    Edit, Eye, Filter,
    Search, UserPlus, Users,
    Lock, Mail, Phone,UserMinus, Briefcase
} from "lucide-react";
import {Separator} from "@radix-ui/react-menu";

const Workers = () => {

    const employeeData = [
        { id: 'EMP001', name: 'Alice Johnson', position: 'Software Engineer', group: 'Development', supervisor: 'Bob Smith', status: 'Active', dateJoined: '2022-03-15' },
        { id: 'EMP002', name: 'Charlie Brown', position: 'UI/UX Designer', group: 'Design', supervisor: 'Diana Prince', status: 'Active', dateJoined: '2022-05-20' },
        { id: 'EMP003', name: 'Eva Green', position: 'Project Manager', group: 'Management', supervisor: 'Frank Castle', status: 'On Leave', dateJoined: '2021-11-10' },
        { id: 'EMP004', name: 'George Harris', position: 'Data Analyst', group: 'Analytics', supervisor: 'Helen Cho', status: 'Active', dateJoined: '2023-01-05' },
        { id: 'EMP005', name: 'Ivy Wilson', position: 'Marketing Specialist', group: 'Marketing', supervisor: 'Jack Ryan', status: 'Inactive', dateJoined: '2022-08-30' },
        { id: 'EMP006', name: 'Jack Reacher', position: 'Sales Manager', group: 'Sales', supervisor: 'Alice Johnson', status: 'Active', dateJoined: '2020-02-12' },
        { id: 'EMP007', name: 'Kate Winslet', position: 'HR Specialist', group: 'Human Resources', supervisor: 'Bob Smith', status: 'Active', dateJoined: '2021-06-18' },
        { id: 'EMP008', name: 'Liam Neeson', position: 'Software Tester', group: 'Development', supervisor: 'Diana Prince', status: 'Active', dateJoined: '2022-09-25' },
        { id: 'EMP009', name: 'Megan Fox', position: 'Content Writer', group: 'Marketing', supervisor: 'Jack Ryan', status: 'Inactive', dateJoined: '2021-03-15' },
        { id: 'EMP010', name: 'Noah Centineo', position: 'Graphic Designer', group: 'Design', supervisor: 'Helen Cho', status: 'Active', dateJoined: '2022-11-05' },
        { id: 'EMP011', name: 'Olivia Wilde', position: 'DevOps Engineer', group: 'Development', supervisor: 'Frank Castle', status: 'Active', dateJoined: '2022-01-22' },
        { id: 'EMP012', name: 'Peter Parker', position: 'Data Scientist', group: 'Analytics', supervisor: 'Bob Smith', status: 'On Leave', dateJoined: '2023-02-14' },
        { id: 'EMP013', name: 'Quentin Tarantino', position: 'Creative Director', group: 'Marketing', supervisor: 'Diana Prince', status: 'Active', dateJoined: '2023-03-10' },
        { id: 'EMP014', name: 'Rihanna', position: 'Social Media Manager', group: 'Marketing', supervisor: 'Jack Ryan', status: 'Active', dateJoined: '2022-07-30' },
        { id: 'EMP015', name: 'Samuel L. Jackson', position: 'IT Support', group: 'Support', supervisor: 'Helen Cho', status: 'Inactive', dateJoined: '2021-12-01' },
        { id: 'EMP016', name: 'Tina Fey', position: 'Business Analyst', group: 'Management', supervisor: 'Frank Castle', status: 'Active', dateJoined: '2022-04-20' },
        { id: 'EMP017', name: 'Uma Thurman', position: 'Product Manager', group: 'Product', supervisor: 'Bob Smith', status: 'Active', dateJoined: '2023-05-15' },
        { id: 'EMP018', name: 'Vin Diesel', position: 'Network Engineer', group: 'IT', supervisor: 'Diana Prince', status: 'On Leave', dateJoined: '2021-10-25' },
        { id: 'EMP019', name: 'Will Smith', position: 'Customer Support', group: 'Support', supervisor: 'Jack Ryan', status: 'Active', dateJoined: '2022-11-01' },
        { id: 'EMP020', name: 'Xena Warrior', position: 'Operations Manager', group: 'Operations', supervisor: 'Helen Cho', status: 'Inactive', dateJoined: '2022-02-28' },
    ];


    const [searchTerm, setSearchTerm] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false)

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5; // Nombre d'employés par page

    // Filtrer les employés
    const filteredEmployees = employeeData.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.group.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculer les employés à afficher
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Changer de page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Total des pages
    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);


    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Employee Management</h1>

            {/* Employee Overview Panel */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,180</div>
                        <p className="text-xs text-muted-foreground">95.6% of total</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Number of Groups</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">Across 5 departments</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Employees per Supervisor</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8.2</div>
                        <p className="text-xs text-muted-foreground">Optimal range: 5-10</p>
                    </CardContent>
                </Card>
            </div>

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
                        <DropdownMenuItem>Group</DropdownMenuItem>
                        <DropdownMenuItem>Supervisor</DropdownMenuItem>
                        <DropdownMenuItem>Status</DropdownMenuItem>
                        <DropdownMenuItem>Date Joined</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" className="col-span-3" placeholder="Full Name"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="position" className="text-right">
                                    Position
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select position"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="engineer">Software Engineer</SelectItem>
                                        <SelectItem value="designer">UI/UX Designer</SelectItem>
                                        <SelectItem value="manager">Project Manager</SelectItem>
                                        <SelectItem value="analyst">Data Analyst</SelectItem>
                                        <SelectItem value="marketing">Marketing Specialist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="group" className="text-right">
                                    Group
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select group"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="development">Development</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                        <SelectItem value="management">Management</SelectItem>
                                        <SelectItem value="analytics">Analytics</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="supervisor" className="text-right">
                                    Supervisor
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select supervisor"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bob">Bob Smith</SelectItem>
                                        <SelectItem value="diana">Diana Prince</SelectItem>
                                        <SelectItem value="frank">Frank Castle</SelectItem>
                                        <SelectItem value="helen">Helen Cho</SelectItem>
                                        <SelectItem value="jack">Jack Ryan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">
                                    Status
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="onleave">On Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dateJoined" className="text-right">
                                    Date Joined
                                </Label>
                                <Input id="dateJoined" className="col-span-3" type="date"/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save Employee</Button>
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
                                <TableHead>Status</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentEmployees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${employee.name}`}/>
                                                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>{employee.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{employee.position}</TableCell>
                                    <TableCell>{employee.group}</TableCell>
                                    <TableCell>{employee.supervisor}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            employee.status === 'Active' ? 'default' :
                                                employee.status === 'Inactive' ? 'secondary' :
                                                    'outline'
                                        }>
                                            {employee.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {employee.dateJoined ? format(new Date(employee.dateJoined), 'MMM d, yyyy') : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon"
                                                            onClick={() => setSelectedEmployee(employee)}>
                                                        <Eye className="h-4 w-4"/>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Employee
                                                            Profile: {selectedEmployee?.name}</DialogTitle>
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
                                                                <TabsTrigger value="projects">Assigned
                                                                    Projects</TabsTrigger>
                                                                <TabsTrigger value="permissions">Access &
                                                                    Permissions</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="details">
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Employee ID</h4>
                                                                        <p>{selectedEmployee?.id}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Name</h4>
                                                                        <p>{selectedEmployee?.name}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Position</h4>
                                                                        <p>{selectedEmployee?.position}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Group</h4>
                                                                        <p>{selectedEmployee?.group}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Supervisor</h4>
                                                                        <p>{selectedEmployee?.supervisor}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Status</h4>
                                                                        <Badge variant={
                                                                            selectedEmployee?.status === 'Active' ? 'default' :
                                                                                selectedEmployee?.status === 'Inactive' ? 'secondary' :
                                                                                    'outline'
                                                                        }>
                                                                            {selectedEmployee?.status}
                                                                        </Badge>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Date Joined</h4>
                                                                        <p>{selectedEmployee?.dateJoined ? format(new Date(selectedEmployee.dateJoined), 'MMM d, yyyy') : 'N/A'}</p>
                                                                    </div>
                                                                </div>
                                                                <Separator className="my-4"/>
                                                                <div>
                                                                    <h4 className="font-semibold mb-2">Contact Information</h4>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="flex items-center">
                                                                            <Mail className="h-4 w-4 mr-2"/>
                                                                            <p>{selectedEmployee?.name.toLowerCase().replace(' ', '.')}@company.com</p>
                                                                        </div>
                                                                        <div className="flex items-center">
                                                                            <Phone className="h-4 w-4 mr-2"/>
                                                                            <p>+1 (555) 123-4567</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>


                                                            <TabsContent value="history">
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Current Position</h4>
                                                                        <p>{selectedEmployee?.position} (Since {selectedEmployee?.dateJoined ? format(new Date(selectedEmployee.dateJoined), 'MMM yyyy') : 'N/A'})</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Previous Positions</h4>
                                                                        <ul className="list-disc list-inside">
                                                                            <li>Junior {selectedEmployee?.position} (Jan 2021 - {selectedEmployee?.dateJoined ? format(new Date(selectedEmployee.dateJoined), 'MMM yyyy') : 'N/A'})</li>
                                                                            <li>Intern (Jun 2020 - Dec 2020)</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>

                                                            <TabsContent value="projects">
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">Current Projects</h4>
                                                                        <ul className="list-disc list-inside">
                                                                            <li>Project Alpha (Lead Developer)</li>
                                                                            <li>Project Beta (Contributor)</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Completed Projects</h4>
                                                                        <ul className="list-disc list-inside">
                                                                            <li>Project Gamma (Feb 2023 - May 2023)</li>
                                                                            <li>Project Delta (Sep 2022 - Jan 2023)</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>

                                                            <TabsContent value="permissions">
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <h4 className="font-semibold">System Access Level</h4>
                                                                        <Badge>Level 2</Badge>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold">Permissions</h4>
                                                                        <ul className="list-disc list-inside">
                                                                            <li>View and edit project details</li>
                                                                            <li>Access development environments</li>
                                                                            <li>Submit code for review</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <Switch id="airplane-mode"/>
                                                                        <Label htmlFor="airplane-mode">Enable admin access</Label>
                                                                    </div>
                                                                </div>
                                                            </TabsContent>

                                                        </Tabs>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button variant="outline">Edit Profile</Button>
                                                        <Button>Save Changes</Button>
                                                    </DialogFooter>
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
                                                        <UserMinus className="mr-2 h-4 w-4"/>
                                                        Suspend Employee
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem>
                                                        <Lock className="mr-2 h-4 w-4"/>
                                                        Change Permissions
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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