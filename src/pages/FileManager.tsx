
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  FileType,
  Loader2,
  Search,
  Filter,
  FileUp,
  Folder,
  CircleSlash,
  FileSymlink,
  FileCog,
  Clock,
  ListFilter,
  Grid3X3
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ModelFile {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  printCount: number;
  thumbnail?: string;
}

const MOCK_FILES: ModelFile[] = [
  {
    id: "file1",
    name: "Calibration Cube",
    type: "STL",
    size: "2.4 MB",
    lastModified: "2023-10-15",
    printCount: 15,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/3d-printing-line/614/11_-_Calibration_Cube-512.png"
  },
  {
    id: "file2",
    name: "Phone Stand",
    type: "STL",
    size: "12.8 MB",
    lastModified: "2023-10-20",
    printCount: 3,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/3d-printing-line/512/3D_Phone_Stand-512.png"
  },
  {
    id: "file3",
    name: "Custom Knob",
    type: "STL",
    size: "4.2 MB",
    lastModified: "2023-11-05",
    printCount: 8
  },
  {
    id: "file4",
    name: "Vase Mode Flower Pot",
    type: "3MF",
    size: "8.5 MB",
    lastModified: "2023-11-10",
    printCount: 2,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/3d-printing-line/512/3D_Vase-512.png"
  },
  {
    id: "file5",
    name: "Replacement Gear",
    type: "STL",
    size: "3.7 MB",
    lastModified: "2023-11-15",
    printCount: 6,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/3d-printing-line/512/3D_Gear-512.png"
  },
  {
    id: "file6",
    name: "Tool Holder",
    type: "STL",
    size: "15.3 MB",
    lastModified: "2023-11-20",
    printCount: 1
  },
  {
    id: "file7",
    name: "Cable Clip",
    type: "STL",
    size: "1.2 MB",
    lastModified: "2023-11-25",
    printCount: 12
  },
  {
    id: "file8",
    name: "Custom Enclosure",
    type: "3MF",
    size: "22.6 MB",
    lastModified: "2023-12-01",
    printCount: 4
  }
];

const FileManager = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<ModelFile[]>(MOCK_FILES);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleUpload = () => {
    // Simulate file upload
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add a mock file
          const newFile = {
            id: `file${files.length + 1}`,
            name: "New Uploaded Model",
            type: "STL",
            size: "5.6 MB",
            lastModified: new Date().toISOString().split('T')[0],
            printCount: 0
          };
          
          setFiles(prev => [newFile, ...prev]);
          
          toast({
            title: "Upload complete",
            description: "Your 3D model has been uploaded successfully.",
          });
          
          return 0;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const handlePrepareForSlicing = (file: ModelFile) => {
    toast({
      title: "Preparing for slicing",
      description: `Sending ${file.name} to slicing software.`,
    });
  };
  
  const handleDelete = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
    toast({
      title: "File deleted",
      description: "The file has been removed from your library.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-6 mx-auto max-w-7xl">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">3D Model File Manager</h1>
            
            <div className="flex items-center gap-2">
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Model
                  </>
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFiles([...files].sort((a, b) => a.name.localeCompare(b.name)))}>
                    Name (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFiles([...files].sort((a, b) => b.name.localeCompare(a.name)))}>
                    Name (Z-A)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFiles([...files].sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()))}>
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFiles([...files].sort((a, b) => b.printCount - a.printCount))}>
                    Most Printed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-none"
                  onClick={() => setView("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-none"
                  onClick={() => setView("list")}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading file...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models by name or type..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="max-w-md"
            />
          </div>
          
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="stl">STL Files</TabsTrigger>
              <TabsTrigger value="3mf">3MF Files</TabsTrigger>
              <TabsTrigger value="gcode">G-code Files</TabsTrigger>
              <TabsTrigger value="recent">Recently Modified</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                  <CircleSlash className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                  <p className="text-muted-foreground">No files match your search criteria.</p>
                </div>
              ) : view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredFiles.map(file => (
                    <Card key={file.id} className="overflow-hidden">
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        {file.thumbnail ? (
                          <img 
                            src={file.thumbnail} 
                            alt={file.name} 
                            className="object-contain w-3/4 h-3/4"
                          />
                        ) : (
                          <FileType className="h-24 w-24 text-muted-foreground/50" />
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <h3 className="font-medium truncate" title={file.name}>{file.name}</h3>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{file.type} • {file.size}</span>
                            <span>{file.printCount} prints</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handlePrepareForSlicing(file)}
                          >
                            <FileCog className="h-3.5 w-3.5 mr-1" />
                            Slice
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="px-2" 
                            onClick={() => handleDelete(file.id)}
                          >
                            <CircleSlash className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <div className="grid grid-cols-12 p-3 text-sm font-medium bg-muted/40">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Last Modified</div>
                    <div className="col-span-1"></div>
                  </div>
                  <div className="divide-y">
                    {filteredFiles.map(file => (
                      <div key={file.id} className="grid grid-cols-12 p-3 text-sm items-center hover:bg-muted/30">
                        <div className="col-span-5 flex items-center gap-2">
                          <FileType className="h-5 w-5 text-primary" />
                          <span className="truncate" title={file.name}>{file.name}</span>
                        </div>
                        <div className="col-span-2">{file.type}</div>
                        <div className="col-span-2">{file.size}</div>
                        <div className="col-span-2 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{file.lastModified}</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end gap-2">
                          <Button 
                            size="icon" 
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handlePrepareForSlicing(file)}
                          >
                            <FileCog className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDelete(file.id)}
                          >
                            <CircleSlash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="stl">
              <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                <Folder className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                <p className="font-medium">STL Files</p>
                <p className="text-muted-foreground">
                  {files.filter(f => f.type === "STL").length} files available
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="3mf">
              <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                <Folder className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                <p className="font-medium">3MF Files</p>
                <p className="text-muted-foreground">
                  {files.filter(f => f.type === "3MF").length} files available
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="gcode">
              <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                <Folder className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                <p className="font-medium">G-code Files</p>
                <p className="text-muted-foreground">
                  {files.filter(f => f.type === "G-code").length} files available
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                <FileSymlink className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                <p className="font-medium">Recently Modified Files</p>
                <p className="text-muted-foreground">
                  View files modified in the last 7 days
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <div className="border-t border-border/40 py-6 px-4 mt-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              File Manager • {files.length} files in library
            </div>
            <div className="text-sm text-muted-foreground mt-2 md:mt-0">
              Used storage: 128MB of 5GB (2.56%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
