
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Clock, 
  Mail, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Smartphone,
  Trash2,
  CheckCheck,
  Filter
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  timestamp: string;
  read: boolean;
  source: string;
}

// Mock notifications data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif1",
    title: "Print job completed",
    message: "The print job 'Calibration Cube' has finished successfully on Printer 1.",
    type: "success",
    timestamp: "2023-07-28T14:30:00",
    read: false,
    source: "Printer 1"
  },
  {
    id: "notif2",
    title: "Maintenance required",
    message: "Printer 2 is due for maintenance. Please schedule a service soon.",
    type: "warning",
    timestamp: "2023-07-28T10:15:00",
    read: false,
    source: "System"
  },
  {
    id: "notif3",
    title: "Filament running low",
    message: "The PLA filament on Printer 3 is running low. Consider replacing it soon.",
    type: "info",
    timestamp: "2023-07-27T16:45:00",
    read: true,
    source: "Printer 3"
  },
  {
    id: "notif4",
    title: "Print job failed",
    message: "The print job 'Complex Part' has failed on Printer 2 due to thermal runaway protection.",
    type: "error",
    timestamp: "2023-07-27T09:30:00",
    read: false,
    source: "Printer 2"
  },
  {
    id: "notif5",
    title: "New user joined",
    message: "David Wilson has accepted the invitation and joined the system.",
    type: "info",
    timestamp: "2023-07-26T11:20:00",
    read: true,
    source: "User Management"
  },
  {
    id: "notif6",
    title: "Weekly report available",
    message: "The weekly production report for Jul 17-23 is now available for review.",
    type: "info",
    timestamp: "2023-07-24T08:00:00",
    read: true,
    source: "Analytics"
  },
  {
    id: "notif7",
    title: "Temperature warning",
    message: "Printer 1 hotend temperature is fluctuating outside normal parameters.",
    type: "warning",
    timestamp: "2023-07-23T13:45:00",
    read: true,
    source: "Printer 1"
  },
];

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [notificationType, setNotificationType] = useState<'all' | 'error' | 'warning' | 'info' | 'success'>('all');
  
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [inAppEnabled, setInAppEnabled] = useState(true);
  const [emailAddress, setEmailAddress] = useState("user@example.com");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "Your notification list has been updated.",
    });
  };
  
  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      description: "Your notification list has been cleared.",
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  // Filter notifications based on read status and type
  const filteredNotifications = notifications.filter(notif => {
    const readFilter = 
      notificationFilter === 'all' || 
      (notificationFilter === 'read' && notif.read) || 
      (notificationFilter === 'unread' && !notif.read);
    
    const typeFilter = 
      notificationType === 'all' || 
      notif.type === notificationType;
    
    return readFilter && typeFilter;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Get type-specific styles
  const getNotificationTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };
  
  const getNotificationTypeBadge = (type: Notification['type']) => {
    switch (type) {
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "warning":
        return <Badge variant="outline" className="text-warning border-warning">Warning</Badge>;
      case "success":
        return <Badge variant="outline" className="text-success border-success">Success</Badge>;
      case "info":
      default:
        return <Badge variant="outline" className="text-info border-info">Info</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-6 mx-auto max-w-7xl">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount} new
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground">
                Stay updated with alerts, status changes, and system messages
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark All as Read
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setNotificationType('all')}>
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNotificationType('error')}>
                    Errors Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNotificationType('warning')}>
                    Warnings Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNotificationType('info')}>
                    Information Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNotificationType('success')}>
                    Success Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <Tabs defaultValue="notifications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Messages</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notification Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Notifications</CardTitle>
                    <div className="flex items-center">
                      <TabsList>
                        <TabsTrigger 
                          value="all" 
                          onClick={() => setNotificationFilter('all')}
                          className={notificationFilter === 'all' ? "bg-primary text-primary-foreground" : ""}
                        >
                          All
                        </TabsTrigger>
                        <TabsTrigger 
                          value="unread" 
                          onClick={() => setNotificationFilter('unread')}
                          className={notificationFilter === 'unread' ? "bg-primary text-primary-foreground" : ""}
                        >
                          Unread
                        </TabsTrigger>
                        <TabsTrigger 
                          value="read" 
                          onClick={() => setNotificationFilter('read')}
                          className={notificationFilter === 'read' ? "bg-primary text-primary-foreground" : ""}
                        >
                          Read
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </div>
                  <CardDescription>
                    {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                      <Bell className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                      <p className="font-medium">No notifications</p>
                      <p className="text-muted-foreground">
                        You're all caught up! No notifications to display.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`rounded-lg border p-4 ${notification.read ? '' : 'bg-muted/30'}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              {getNotificationTypeIcon(notification.type)}
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{notification.title}</h3>
                                  {!notification.read && (
                                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                  <span>{notification.source}</span>
                                  <span>•</span>
                                  <Clock className="h-3 w-3" />
                                  <span>{formatDate(notification.timestamp)}</span>
                                  <span>•</span>
                                  {getNotificationTypeBadge(notification.type)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  Mark as read
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>
                    Configure how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <div>
                          <Label>In-App Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications within the application
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={inAppEnabled}
                        onCheckedChange={setInAppEnabled}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={emailEnabled}
                        onCheckedChange={setEmailEnabled}
                      />
                    </div>
                    
                    {emailEnabled && (
                      <div className="pl-8 space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                        />
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via SMS
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={smsEnabled}
                        onCheckedChange={setSmsEnabled}
                      />
                    </div>
                    
                    {smsEnabled && (
                      <div className="pl-8 space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  
                  <Button onClick={handleSaveSettings}>
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notification Types</CardTitle>
                  <CardDescription>
                    Select which types of notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>System Errors</AlertTitle>
                      <AlertDescription>
                        Critical alerts about system failures and errors
                      </AlertDescription>
                      <div className="flex justify-end mt-2">
                        <Switch defaultChecked />
                      </div>
                    </Alert>
                    
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Warnings</AlertTitle>
                      <AlertDescription>
                        Warnings about potential issues that need attention
                      </AlertDescription>
                      <div className="flex justify-end mt-2">
                        <Switch defaultChecked />
                      </div>
                    </Alert>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Informational</AlertTitle>
                      <AlertDescription>
                        General information about system events
                      </AlertDescription>
                      <div className="flex justify-end mt-2">
                        <Switch defaultChecked />
                      </div>
                    </Alert>
                    
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>
                        Notifications about successful operations
                      </AlertDescription>
                      <div className="flex justify-end mt-2">
                        <Switch defaultChecked />
                      </div>
                    </Alert>
                  </div>
                  
                  <Button onClick={handleSaveSettings} className="mt-4">
                    Save Type Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
