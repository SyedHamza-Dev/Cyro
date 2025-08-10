import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <Layout>
      <Seo title="Settings – Vista Guard Pro" description="Basic preferences" />
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      <div className="grid gap-6 max-w-2xl">
        <Card className="p-4 space-y-4">
          <div>
            <label className="text-sm">Full Name</label>
            <Input placeholder="John Doe" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email notifications</div>
              <div className="text-sm text-muted-foreground">Receive alerts and reports</div>
            </div>
            <Switch />
          </div>
        </Card>
      </div>
    </Layout>
  );
}
