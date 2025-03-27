
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  UserPlus,
  Shield,
  User,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Edit2,
  Users,
  Key,
} from "lucide-react";

type UserRole = 'admin' | 'operator' | 'viewer';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  permissions: {
    canEditMachines: boolean;
    canManageFiles: boolean;
    canViewAnalytics: boolean;
    canManageUsers: boolean;
  };
}

// Mock data
const MOCK_USERS: UserProfile[] = [
  {
    id: "user1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "admin",
    department: "Engineering",
    status: "active",
    lastLogin: "2023-07-28T14:30:00",
    permissions: {
      canEditMachines: true,
      canManageFiles: true,
      canViewAnalytics: true,
      canManageUsers: true,
    },
  },
  {
    id: "user2",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    role: "operator",
    department: "Production",
    status: "active",
    lastLogin: "2023-07-27T09:15:00",
    permissions: {
      canEditMachines: true,
      canManageFiles: true,
      canViewAnalytics: true,
      canManageUsers: false,
    },
  },
  {
    id: "user3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    role: "viewer",
    department: "Sales",
    status: "active",
    lastLogin: "2023-07-25T16:45:00",
    permissions: {
      canEditMachines: false,
      canManageFiles: false,
      canViewAnalytics: true,
      canManageUsers: false,
    },
  },
  {
    id: "user4",
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    role: "operator",
    department: "Production",
    status: "inactive",
    lastLogin: "2023-06-15T10:30:00",
    permissions: {
      canEditMachines: true,
      canManageFiles: true,
      canViewAnalytics: true,
      canManageUsers: false,
    },
  },
  {
    id: "user5",
    name: "David Wilson",
    email: "d.wilson@example.com",
    role: "viewer",
    department: "Marketing",
    status: "pending",
    lastLogin: "",
    permissions: {
      canEditMachines: false,
      canManageFiles: false,
      canViewAnalytics: true,
      canManageUsers: false,
    },
  },
  {
    id: "user6",
    name: "Sarah Martinez",
    email: "sarah.m@example.com",
    role: "admin",
    department: "IT",
    status: "active",
    lastLogin: "2023-07-28T08:20:00",
    permissions: {
      canEditMachines: true,
      canManageFiles: true,
      canViewAnalytics: true,
      canManageUsers: true,
    },
  },
];

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer" as UserRole,
    department: "",
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.department) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new user
    const user: UserProfile = {
      id: `user${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: "pending",
      lastLogin: "",
      permissions: {
        canEditMachines: newUser.role === "admin" || newUser.role === "operator",
        canManageFiles: newUser.role === "admin" || newUser.role === "operator",
        canViewAnalytics: true,
        canManageUsers: newUser.role === "admin",
      },
    };
    
    setUsers([...users, user]);
    setShowAddUserDialog(false);
    
    // Reset form
    setNewUser({
      name: "",
      email: "",
      role: "viewer",
      department: "",
    });
    
    toast({
      title: "User added",
      description: `Invitation sent to ${user.email}`,
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User removed",
      description: "The user has been removed from the system.",
    });
  };
  
  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" } 
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === "active" ? "inactive" : "active";
    
    toast({
      title: `User ${newStatus}`,
      description: `${user?.name} is now ${newStatus}.`,
    });
  };
  
  const getRoleBadgeStyles = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-primary text-primary-foreground";
      case "operator":
        return "bg-warning text-warning-foreground";
      case "viewer":
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };
  
  const getStatusBadgeStyles = (status: UserProfile["status"]) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "inactive":
        return "bg-destructive text-destructive-foreground";
      case "pending":
      default:
        return "bg-warning text-warning-foreground";
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-6 mx-auto max-w-7xl">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">User Management</h1>
              <p className="text-muted-foreground">
                Manage user accounts, roles, and permissions
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Invite a new user to join your 3D printing management system.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Smith" 
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john.smith@example.com" 
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={newUser.role} 
                        onValueChange={(value) => setNewUser({...newUser, role: value as UserRole})}
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="operator">Operator</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Input 
                        id="department" 
                        placeholder="Engineering" 
                        value={newUser.department}
                        onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser}>
                      Send Invitation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or department..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="max-w-md"
            />
          </div>
          
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>User Accounts</CardTitle>
                  <CardDescription>
                    Manage access and permissions for your team members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <div className="grid grid-cols-12 p-3 text-sm font-medium bg-muted/40">
                      <div className="col-span-3">User</div>
                      <div className="col-span-2">Role</div>
                      <div className="col-span-2">Department</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Last Login</div>
                      <div className="col-span-1"></div>
                    </div>
                    <div className="divide-y">
                      {filteredUsers.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                          No users found matching your search criteria.
                        </div>
                      ) : (
                        filteredUsers.map(user => (
                          <div key={user.id} className="grid grid-cols-12 p-3 text-sm items-center hover:bg-muted/30">
                            <div className="col-span-3 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                <User className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Badge className={getRoleBadgeStyles(user.role)}>
                                {user.role === "admin" && <Shield className="h-3 w-3 mr-1" />}
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </Badge>
                            </div>
                            <div className="col-span-2">{user.department}</div>
                            <div className="col-span-2">
                              <Badge className={getStatusBadgeStyles(user.status)}>
                                {user.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
                                {user.status === "inactive" && <XCircle className="h-3 w-3 mr-1" />}
                                {user.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="col-span-2">
                              {formatDate(user.lastLogin)}
                            </div>
                            <div className="col-span-1">
                              <div className="flex items-center justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleToggleStatus(user.id)}
                                  title={user.status === "active" ? "Deactivate user" : "Activate user"}
                                >
                                  {user.status === "active" ? (
                                    <XCircle className="h-4 w-4 text-destructive" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4 text-success" />
                                  )}
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeleteUser(user.id)}
                                  title="Delete user"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Users</CardTitle>
                  <CardDescription>
                    Users with active access to the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                    <Users className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                    <p className="font-medium">Active Users</p>
                    <p className="text-muted-foreground">
                      {users.filter(u => u.status === "active").length} active users
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Invitations</CardTitle>
                  <CardDescription>
                    Users who have been invited but haven't completed registration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                    <Clock className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                    <p className="font-medium">Pending Invitations</p>
                    <p className="text-muted-foreground">
                      {users.filter(u => u.status === "pending").length} pending invitations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inactive">
              <Card>
                <CardHeader>
                  <CardTitle>Inactive Users</CardTitle>
                  <CardDescription>
                    Users whose accounts have been deactivated
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                    <XCircle className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                    <p className="font-medium">Inactive Users</p>
                    <p className="text-muted-foreground">
                      {users.filter(u => u.status === "inactive").length} inactive users
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure what each user role can access and modify
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-9 p-3 text-sm font-medium bg-muted/40">
                  <div className="col-span-3">Permission</div>
                  <div className="col-span-2 text-center">Administrator</div>
                  <div className="col-span-2 text-center">Operator</div>
                  <div className="col-span-2 text-center">Viewer</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-9 p-3 text-sm items-center hover:bg-muted/30">
                    <div className="col-span-3 flex items-center gap-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <span>Edit Machine Settings</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch checked disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch checked disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch disabled />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-9 p-3 text-sm items-center hover:bg-muted/30">
                    <div className="col-span-3 flex items-center gap-2">
                      <FileType className="h-4 w-4 text-primary" />
                      <span>Manage Files</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch checked disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch checked disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch disabled />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-9 p-3 text-sm items-center hover:bg-muted/30">
                    <div className="col-span-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span>View Analytics</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch checked disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch checked disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch checked disabled />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-9 p-3 text-sm items-center hover:bg-muted/30">
                    <div className="col-span-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Manage Users</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch checked disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch disabled />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-9 p-3 text-sm items-center hover:bg-muted/30">
                    <div className="col-span-3 flex items-center gap-2">
                      <Key className="h-4 w-4 text-primary" />
                      <span>Access API Keys</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch checked disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch disabled />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <Switch disabled />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button
                  onClick={() => {
                    toast({
                      title: "Role permissions updated",
                      description: "Changes to role permissions have been saved.",
                    });
                  }}
                >
                  Save Permission Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
