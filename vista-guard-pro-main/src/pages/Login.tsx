import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth, demoCreds } from "@/context/AuthContext";
import { Seo } from "@/components/Seo";
import { Eye, EyeOff, Shield, Lock, Mail, ArrowRight, Zap, BarChart3 } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState(demoCreds.email);
  const [password, setPassword] = useState(demoCreds.password);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) {
      toast({ 
        title: "Authentication Failed", 
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Seo title="Sign In - Cyro" description="Secure access to your security management system" />
      <div className="h-screen flex overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-24 h-24 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-32 right-16 w-32 h-32 bg-white rounded-full blur-xl"></div>
          </div>
          
          <div className="flex flex-col justify-center px-16 text-white w-full relative z-10">
            <div className="max-w-md">
              
              {/* Logo */}
              <div className="flex items-center gap-3 mb-12">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Cyro</h1>
                  <p className="text-slate-400 text-sm">Security Platform</p>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-4 leading-tight">
                  Enterprise Security
                  <br />
                  <span className="text-slate-300">Made Simple</span>
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  Advanced security management with real-time monitoring and intelligent threat detection.
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Real-time Monitoring</h3>
                    <p className="text-slate-400 text-xs">Instant alerts and detection</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Advanced Analytics</h3>
                    <p className="text-slate-400 text-xs">Deep insights and reports</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Enterprise Grade</h3>
                    <p className="text-slate-400 text-xs">Bank-level security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-12 h-12 mx-auto mb-4 bg-slate-900 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Cyro</h1>
            </div>

            {/* Login Card - Full shadcn */}
            <Card className="w-full shadow-lg">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
                <p className="text-sm text-muted-foreground text-center">
                  Sign in to your security dashboard
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="pl-10"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onSubmit(e);
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onSubmit(e);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={onSubmit}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign in
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                {/* Demo Credentials */}
                <div className="pt-4 border-t">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm font-medium">Demo Account</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <code className="bg-background px-2 py-1 rounded text-xs font-mono">
                          {demoCreds.email}
                        </code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Password:</span>
                        <code className="bg-background px-2 py-1 rounded text-xs font-mono">
                          {demoCreds.password}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-xs text-muted-foreground">
                © 2024 Cyro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}