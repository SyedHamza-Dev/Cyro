import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";
import { Seo } from "@/components/Seo";

export default function Verify() {
  const { pendingOtp, verifyOtp } = useAuth();
  const [code, setCode] = useState("");

  useEffect(() => {
    // nothing – demo flow
  }, [pendingOtp]);

  const onVerify = async () => {
    await verifyOtp(code);
  };

  return (
    <>
      <Seo title="Verify Code – Vista Guard Pro" description="Enter your authentication code" />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Enter your authentication code</h1>
          <p className="text-muted-foreground mb-8">Enter the code from your authenticator app</p>
          <div className="flex justify-center mb-6">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button onClick={onVerify} disabled={code.length < 4}>Verify</Button>
        </div>
      </div>
    </>
  );
}
