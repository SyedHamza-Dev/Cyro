import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Filter, Search, Eye, Clock, Camera, Shield, AlertTriangle, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const mockEvents = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:15",
    camera: "Front Entrance",
    eventType: "Person Detected",
    severity: "low",
    description: "Individual approaching main entrance",
    duration: "00:02:15"
  },
  {
    id: 2,
    timestamp: "2024-01-15 15:22:30",
    camera: "Parking Lot",
    eventType: "Vehicle Alert",
    severity: "high",
    description: "Unauthorized vehicle in restricted zone",
    duration: "00:01:45"
  },
  {
    id: 3,
    timestamp: "2024-01-15 16:45:12",
    camera: "Lobby Area",
    eventType: "Sound Detection",
    severity: "medium",
    description: "Unusual noise levels detected",
    duration: "00:00:30"
  },
  {
    id: 4,
    timestamp: "2024-01-15 18:10:05",
    camera: "Back Exit",
    eventType: "Door Access",
    severity: "high",
    description: "Emergency exit door opened",
    duration: "00:03:20"
  },
  {
    id: 5,
    timestamp: "2024-01-15 19:35:45",
    camera: "Reception",
    eventType: "Motion Alert",
    severity: "low",
    description: "Movement detected after hours",
    duration: "00:01:10"
  }
];

const eventStats = [
  { title: "Total Events", value: "156", subtext: "Today", icon: Activity, color: "text-slate-600" },
  { title: "High Priority", value: "12", subtext: "Needs attention", icon: AlertTriangle, color: "text-red-500" },
  { title: "Active Cameras", value: "8", subtext: "Recording", icon: Camera, color: "text-slate-600" },
  { title: "Avg Response", value: "2.3min", subtext: "Resolution time", icon: Clock, color: "text-slate-600" },
];

export default function Events() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <Badge className="bg-red-500 text-white text-xs">High</Badge>;
      case 'medium': return <Badge className="bg-orange-500 text-white text-xs">Medium</Badge>;
      case 'low': return <Badge className="bg-slate-400 text-white text-xs">Low</Badge>;
      default: return <Badge className="bg-slate-400 text-white text-xs">Unknown</Badge>;
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'person detected': return <Shield className="w-4 h-4 text-blue-500" />;
      case 'vehicle alert': return <Camera className="w-4 h-4 text-red-500" />;
      case 'sound detection': return <Activity className="w-4 h-4 text-orange-500" />;
      case 'door access': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'motion alert': return <Eye className="w-4 h-4 text-slate-500" />;
      default: return <Eye className="w-4 h-4 text-slate-500" />;
    }
  };

  const filteredEvents = mockEvents.filter(event =>
    event.camera.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Seo title="Events - Vista Guard Pro" description="Browse and analyze security events and recordings" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Security Events</h1>
            <p className="text-slate-600 text-sm mt-1">Monitor and analyze security incidents across your premises</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-200">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {eventStats.map((stat, index) => (
            <Card key={index} className="border border-slate-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-slate-600">{stat.title}</p>
                    <p className="text-xl font-semibold text-slate-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.subtext}</p>
                  </div>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search events, cameras, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="border-slate-200">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "MMM dd") : "Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        setIsCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm" className="border-slate-200">
                  <Filter className="w-4 h-4 mr-2" />
                  Severity
                </Button>
                <Button variant="outline" size="sm" className="border-slate-200">
                  <Camera className="w-4 h-4 mr-2" />
                  Camera
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Events ({filteredEvents.length})</CardTitle>
              <div className="text-sm text-slate-500">
                {date ? format(date, "MMM dd, yyyy") : "All dates"}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600 w-[120px]">Time</TableHead>
                    <TableHead className="text-slate-600">Event</TableHead>
                    <TableHead className="text-slate-600">Camera</TableHead>
                    <TableHead className="text-slate-600">Severity</TableHead>
                    <TableHead className="text-slate-600">Duration</TableHead>
                    <TableHead className="text-slate-600">Description</TableHead>
                    <TableHead className="text-slate-600 w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id} className="hover:bg-slate-50 border-slate-200">
                      <TableCell className="font-mono text-xs">
                        <div className="text-slate-900">{event.timestamp.split(' ')[1]}</div>
                        <div className="text-slate-500">{event.timestamp.split(' ')[0].split('-').slice(1).join('-')}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getEventIcon(event.eventType)}
                          <span className="text-sm font-medium text-slate-900">{event.eventType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Camera className="w-3 h-3 text-slate-400" />
                          <span className="text-sm text-slate-700">{event.camera}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getSeverityBadge(event.severity)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Clock className="w-3 h-3" />
                          {event.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs text-sm text-slate-600">
                          {event.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <Shield className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <p className="text-sm">No events found for the selected criteria.</p>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your search or date filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}