import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { Card } from "@/components/ui/card";

export default function Help() {
  return (
    <Layout>
      <Seo title="Help – Vista Guard Pro" description="Support resources" />
      <h1 className="text-3xl font-semibold mb-6">Help</h1>
      <Card className="p-4 space-y-2">
        <p>For support, email support@vistaguard.pro</p>
        <p className="text-muted-foreground">This is a demo interface with sample data.</p>
      </Card>
    </Layout>
  );
}
