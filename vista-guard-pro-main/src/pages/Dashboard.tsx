import { Seo } from "@/components/Seo";
import Layout from "@/components/Layout";
import cam1 from "@/assets/cam1.jpg";
import cam2 from "@/assets/cam2.jpg";
import cam3 from "@/assets/cam3.jpg";
import cam4 from "@/assets/cam4.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Activity, Shield, AlertTriangle, Settings, BarChart3, Play, Maximize } from "lucide-react";
import { useState } from "react";

const feeds = [
  { src: cam1, name: "Front Entrance", status: "online", location: "Main Gate" },
  { src: cam2, name: "Parking Lot", status: "online", location: "Zone A" },
  { src: cam3, name: "Lobby Area", status: "recording", location: "Ground Floor" },
  { src: cam4, name: "Back Exit", status: "online", location: "Rear Gate" }
];

const recentAlerts = [
  { time: "10:15 AM", camera: "Front Entrance", event: "Motion Detected", description: "Person approaching main entrance", severity: "low" },
  { time: "11:30 AM", camera: "Parking Lot", event: "Vehicle Alert", description: "Unauthorized vehicle detected", severity: "high" },
  { time: "12:45 PM", camera: "Lobby Area", event: "Sound Detection", description: "Loud noise in lobby area", severity: "medium" },
  { time: "01:20 PM", camera: "Back Exit", event: "Door Opened", description: "Emergency exit accessed", severity: "high" },
];

const quickStats = [
  { title: "Active Cameras", value: "4", subtext: "All systems operational", icon: Camera, color: "text-slate-600" },
  { title: "Today's Events", value: "23", subtext: "+12% from yesterday", icon: Activity, color: "text-slate-600" },
  { title: "Active Alerts", value: "3", subtext: "2 high priority", icon: AlertTriangle, color: "text-red-500" },
  { title: "System Health", value: "98%", subtext: "Excellent performance", icon: Shield, color: "text-slate-600" },
];

export default function Dashboard() {
  const [selectedFeed, setSelectedFeed] = useState<number | null>(null);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <Badge className="bg-red-500 text-white text-xs">High</Badge>;
      case 'medium': return <Badge className="bg-orange-500 text-white text-xs">Medium</Badge>;
      case 'low': return <Badge className="bg-slate-400 text-white text-xs">Low</Badge>;
      default: return <Badge className="bg-slate-400 text-white text-xs">Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <Seo title="Dashboard - Vista Guard Pro" description="Security system overview and monitoring" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Security Dashboard</h1>
            <p className="text-slate-600 text-sm mt-1">Real-time monitoring and system overview</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">
              <Settings className="w-4 h-4 mr-2" />
              Quick Setup
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
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

        {/* Live Camera Feeds */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium text-slate-900">Live Camera Feeds</h2>
              <p className="text-slate-600 text-sm">Real-time monitoring from all security cameras</p>
            </div>
            <Button variant="outline" size="sm" className="border-slate-200">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {feeds.map((feed, index) => (
              <Card key={index} className="overflow-hidden border border-slate-200 bg-white group">
                <div className="relative">
                  <img 
                    src={feed.src} 
                    alt={feed.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-200" />
                  
                  {/* Live indicator */}
                  <div className="absolute top-2 left-2">
                    <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="absolute top-2 right-2">
                    <Badge className={`text-xs ${feed.status === 'online' ? 'bg-green-500' : 'bg-slate-500'} text-white`}>
                      {feed.status}
                    </Badge>
                  </div>
                  
                  {/* Controls */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-white text-slate-700 hover:bg-slate-100 h-8 w-8 p-0">
                        <Play className="w-3 h-3" />
                      </Button>
                      <Button size="sm" className="bg-white text-slate-700 hover:bg-slate-100 h-8 w-8 p-0">
                        <Maximize className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-3">
                  <h3 className="font-medium text-slate-900 text-sm">{feed.name}</h3>
                  <p className="text-xs text-slate-600 mt-1">{feed.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Alerts & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Alerts */}
          <div className="lg:col-span-2">
            <Card className="border border-slate-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-150 border border-slate-100">
                      <div className="text-sm font-medium text-slate-600 w-16">{alert.time}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-900 text-sm">{alert.event}</span>
                          {getSeverityBadge(alert.severity)}
                        </div>
                        <div className="text-xs text-slate-600">{alert.camera} • {alert.description}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs px-3 py-1 h-7">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="border border-slate-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm h-10 border-slate-200">
                  <Camera className="w-4 h-4 mr-2" />
                  Camera Setup
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm h-10 border-slate-200">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm h-10 border-slate-200">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm h-10 border-slate-200">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Alert Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}