
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Users, FileType, ChartBar, Printer, Sliders, Palette, Send } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Settings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [jobCompletionAlerts, setJobCompletionAlerts] = useState(true);
  const [errorAlerts, setErrorAlerts] = useState(true);
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        </div>
        
        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList className="flex flex-wrap gap-2 w-full">
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>User Management</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FileType className="h-4 w-4" />
              <span>File Settings</span>
            </TabsTrigger>
            <TabsTrigger value="machines" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              <span>Machine Settings</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              <span>Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              <span>Messages</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications about your 3D printing operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-medium">Communication Channels</h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-2 pt-4">
                    <h3 className="font-medium">Notification Types</h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about upcoming machine maintenance
                      </p>
                    </div>
                    <Switch
                      id="maintenance-alerts"
                      checked={maintenanceAlerts}
                      onCheckedChange={setMaintenanceAlerts}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="job-completion">Job Completion</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when print jobs are complete
                      </p>
                    </div>
                    <Switch
                      id="job-completion"
                      checked={jobCompletionAlerts}
                      onCheckedChange={setJobCompletionAlerts}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="error-alerts">Error Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about system errors or failures
                      </p>
                    </div>
                    <Switch
                      id="error-alerts"
                      checked={errorAlerts}
                      onCheckedChange={setErrorAlerts}
                    />
                  </div>
                  
                  <Button onClick={handleSaveNotifications} className="mt-4">
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user roles, permissions and accounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  This section allows admins to manage users, assign roles, and set permissions. 
                  Click the button below to access user management.
                </p>
                <Button onClick={() => window.location.href = "/users"}>
                  Go to User Management
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>File Management Settings</CardTitle>
                <CardDescription>
                  Configure file storage, formats, and slicing preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  Manage 3D model files, configure slicing preferences, and organize your file library.
                  Click the button below to access the file management system.
                </p>
                <Button onClick={() => window.location.href = "/files"}>
                  Open File Manager
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="machines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Machine Configuration</CardTitle>
                <CardDescription>
                  Configure and manage your 3D printers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  Add or remove printers, configure maintenance schedules, and set up monitoring parameters.
                </p>
                <Button onClick={() => toast({
                  title: "Machine settings",
                  description: "This feature will let you configure printer parameters and maintenance schedules."
                })}>
                  Configure Machines
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Settings</CardTitle>
                <CardDescription>
                  Configure data collection and reporting preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  Set up advanced analytics, predictive maintenance, and configure reports.
                </p>
                <Button onClick={() => window.location.href = "/analytics"}>
                  Open Analytics Dashboard
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how your dashboard looks and feels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  Configure theme settings, dashboard layout, and display preferences.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact-view">Compact View</Label>
                    <Switch id="compact-view" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-charts">Show Charts</Label>
                    <Switch id="show-charts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    <Switch id="high-contrast" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>External Integrations</CardTitle>
                <CardDescription>
                  Connect your dashboard with external services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  Integrate with slicing software, material inventory systems, and cloud services.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">Prusa Slicer Integration</p>
                      <p className="text-sm text-muted-foreground">
                        Connect with Prusa Slicer for direct file processing
                      </p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">Cura Integration</p>
                      <p className="text-sm text-muted-foreground">
                        Connect with Ultimaker Cura for slicing
                      </p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Inventory Management</p>
                      <p className="text-sm text-muted-foreground">
                        Track filament and material inventory
                      </p>
                    </div>
                    <Button variant="outline">Setup</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Messaging Settings</CardTitle>
                <CardDescription>
                  Configure automated messaging and alerts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  Set up automated reports, alerts, and communication preferences.
                </p>
                <Button onClick={() => window.location.href = "/notifications"}>
                  Configure Messaging
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
