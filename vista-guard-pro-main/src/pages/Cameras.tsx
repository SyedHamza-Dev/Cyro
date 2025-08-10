import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Search, Settings, Play, Maximize, MoreVertical, MapPin, Wifi, WifiOff, Video } from "lucide-react";
import { useState } from "react";
import cam1 from "@/assets/cam1.jpg";
import cam2 from "@/assets/cam2.jpg";
import cam3 from "@/assets/cam3.jpg";
import cam4 from "@/assets/cam4.jpg";

const cameras = [
  { 
    id: 1, 
    name: "Front Entrance", 
    status: "online", 
    location: "Main Gate - Building A", 
    tag: "Outdoor", 
    lastSeen: "Live", 
    resolution: "1080p",
    fps: "30fps",
    image: cam1,
    ip: "192.168.1.101"
  },
  { 
    id: 2, 
    name: "Parking Lot", 
    status: "offline", 
    location: "Parking Zone A", 
    tag: "Outdoor", 
    lastSeen: "2 hours ago", 
    resolution: "720p",
    fps: "25fps",
    image: cam2,
    ip: "192.168.1.102"
  },
  { 
    id: 3, 
    name: "Lobby Area", 
    status: "online", 
    location: "Ground Floor Reception", 
    tag: "Indoor", 
    lastSeen: "Live", 
    resolution: "4K",
    fps: "30fps",
    image: cam3,
    ip: "192.168.1.103"
  },
  { 
    id: 4, 
    name: "Executive Floor", 
    status: "recording", 
    location: "5th Floor Corridor", 
    tag: "Indoor", 
    lastSeen: "Live", 
    resolution: "1080p",
    fps: "60fps",
    image: cam4,
    ip: "192.168.1.104"
  },
  { 
    id: 5, 
    name: "Back Exit", 
    status: "maintenance", 
    location: "Rear Emergency Exit", 
    tag: "Outdoor", 
    lastSeen: "1 day ago", 
    resolution: "720p",
    fps: "25fps",
    image: cam1,
    ip: "192.168.1.105"
  },
];

export default function Cameras() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCamera, setSelectedCamera] = useState<typeof cameras[0] | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online": 
        return <Badge className="bg-green-500 text-white text-xs gap-1"><Wifi className="w-3 h-3" />Online</Badge>;
      case "offline": 
        return <Badge className="bg-red-500 text-white text-xs gap-1"><WifiOff className="w-3 h-3" />Offline</Badge>;
      case "recording": 
        return <Badge className="bg-blue-500 text-white text-xs gap-1"><Video className="w-3 h-3" />Recording</Badge>;
      case "maintenance": 
        return <Badge className="bg-orange-500 text-white text-xs gap-1"><Settings className="w-3 h-3" />Maintenance</Badge>;
      default: 
        return <Badge className="bg-slate-400 text-white text-xs">Unknown</Badge>;
    }
  };

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Seo title="Cameras - Vista Guard Pro" description="Manage and monitor all security cameras" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Camera Management</h1>
            <p className="text-slate-600 text-sm mt-1">Monitor and configure all security cameras</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-200">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
              <Camera className="w-4 h-4 mr-2" />
              Add Camera
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-slate-200 bg-white">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-sm text-slate-600">Online</span>
              </div>
              <div className="text-xl font-semibold text-slate-900">3</div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 bg-white">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <WifiOff className="w-4 h-4 text-red-500" />
                <span className="text-sm text-slate-600">Offline</span>
              </div>
              <div className="text-xl font-semibold text-slate-900">1</div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 bg-white">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Video className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-slate-600">Recording</span>
              </div>
              <div className="text-xl font-semibold text-slate-900">1</div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 bg-white">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-slate-600">Maintenance</span>
              </div>
              <div className="text-xl font-semibold text-slate-900">1</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        {/* <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex-1 min-w-[240px]">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search cameras by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200"
                  />
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" className="border-slate-200">Filter Status</Button>
                <Button variant="outline" size="sm" className="border-slate-200">Filter Location</Button>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Cameras Table */}
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">All Cameras ({filteredCameras.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600">Camera</TableHead>
                    <TableHead className="text-slate-600">Status</TableHead>
                    <TableHead className="text-slate-600">Location</TableHead>
                    <TableHead className="text-slate-600">Type</TableHead>
                    <TableHead className="text-slate-600">Resolution</TableHead>
                    <TableHead className="text-slate-600">Last Seen</TableHead>
                    <TableHead className="w-[120px] text-slate-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCameras.map((camera) => (
                    <TableRow key={camera.id} className="hover:bg-slate-50 border-slate-200">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100">
                            <img src={camera.image} alt={camera.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 text-sm">{camera.name}</div>
                            <div className="text-xs text-slate-500">{camera.ip}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(camera.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-sm">{camera.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-slate-100 text-slate-700 text-xs">{camera.tag}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-slate-900">{camera.resolution}</div>
                          <div className="text-slate-500 text-xs">{camera.fps}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {camera.status === 'online' && (
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                          )}
                          <span className={`text-sm ${camera.status === 'online' ? 'text-green-600 font-medium' : 'text-slate-600'}`}>
                            {camera.lastSeen}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setSelectedCamera(camera)}>
                                <Play className="w-3 h-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-lg">
                                  <Camera className="w-4 h-4" />
                                  {camera.name} - Live View
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
                                  <img 
                                    src={camera.image} 
                                    alt={`${camera.name} live view`}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    LIVE
                                  </div>
                                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                    {camera.resolution} • {camera.fps}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-200 pt-4">
                                  <div><span className="text-slate-600">Location:</span> <span className="text-slate-900">{camera.location}</span></div>
                                  <div><span className="text-slate-600">IP Address:</span> <span className="text-slate-900">{camera.ip}</span></div>
                                  <div><span className="text-slate-600">Status:</span> <span className="text-slate-900 capitalize">{camera.status}</span></div>
                                  <div><span className="text-slate-600">Type:</span> <span className="text-slate-900">{camera.tag}</span></div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Settings className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}