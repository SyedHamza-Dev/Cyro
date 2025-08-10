import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Settings, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout, userEmail } = useAuth();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-6 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg p-2 transition-colors">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-lg hover:bg-gray-100 transition-all">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                  3
                </span>
              </Button>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 px-3 py-2 h-auto rounded-lg hover:bg-gray-100 transition-all">
                    <div className="text-right hidden md:block">
                      <div className="text-xs text-gray-500 font-medium">Welcome back,</div>
                      <div className="text-sm font-semibold text-gray-800">Jason Doe</div>
                    </div>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&crop=face" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-semibold text-sm">
                        {userEmail?.charAt(0).toUpperCase() || 'JD'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-lg border-gray-200/50 shadow-lg">
                  <DropdownMenuLabel className="font-semibold text-gray-800">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200/50" />
                  <DropdownMenuItem className="rounded-md">
                    <User className="mr-3 h-4 w-4 text-gray-500" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-md">
                    <Settings className="mr-3 h-4 w-4 text-gray-500" />
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200/50" />
                  <DropdownMenuItem onClick={logout} className="text-red-600 rounded-md focus:bg-red-50 focus:text-red-700">
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}