import { NavLink, useLocation } from "react-router-dom";
import { Camera, LayoutDashboard, Bell, Settings, HelpCircle, Shield, ChevronRight, List, MessageCircle, Calendar, BarChart3, Grid3X3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Cameras", url: "/cameras", icon: Camera },
  { title: "Events", url: "/events", icon: Shield },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
  // { title: "Tables", url: "/tables", icon: Grid3X3 },
  // { title: "Charts", url: "/charts", icon: BarChart3 },
  { title: "Help", url: "/help", icon: HelpCircle },
];

const MenuItem = ({ item, isActive, isCollapsed }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild className="h-auto p-0">
      <NavLink
        to={item.url}
        end
        className={`
          group flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl transition-all duration-200
          ${isActive 
             ? 'bg-slate-900 text-white'
             : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }
        `}
      >
        {/* Simple dot indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-slate-900 rounded-r" />
        )}
        
        <item.icon className="h-4 w-4 shrink-0" />
        
        {!isCollapsed && (
          <span className="text-sm font-medium">{item.title}</span>
        )}
      </NavLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar className="border-r border-slate-200 bg-white" collapsible="icon">
      <SidebarContent className="bg-white">
        {/* Minimal Logo */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">C</span>
            </div>
            {!isCollapsed && (
              <span className="text-lg font-semibold text-slate-900">Cyro</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = currentPath === item.url;
                  return (
                    <MenuItem 
                      key={item.title}
                      item={item}
                      isActive={isActive}
                      isCollapsed={isCollapsed}
                    />
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}