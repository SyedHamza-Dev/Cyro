import Layout from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Alerts() {
  return (
    <Layout>
      <Seo title="Alerts – Vista Guard Pro" description="Live and historical alerts" />
      <h1 className="text-3xl font-semibold mb-6">Alerts</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>09:10 AM</TableCell>
              <TableCell><Badge variant="destructive">High</Badge></TableCell>
              <TableCell>Unauthorized access at Back Door</TableCell>
              <TableCell><Badge variant="secondary">Acknowledged</Badge></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>10:05 AM</TableCell>
              <TableCell><Badge variant="warning">Medium</Badge></TableCell>
              <TableCell>Motion detected in Lobby</TableCell>
              <TableCell><Badge variant="success">Resolved</Badge></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Layout>
  );
}
