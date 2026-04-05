import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function DownloadPage() {
  return (
    <main className="p-6 md:p-8">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-4 text-navy-800">Raporu indir</h2>
        <Card>
          <p className="text-gray-600">
            PDF üretimi için <code className="text-sm">@react-pdf/renderer</code> ve rapor şablonu
            eklenecek. Şimdilik raporunu &quot;Raporlarım&quot; sayfasından okuyabilirsin.
          </p>
          <Link href="/dashboard/report" className="mt-6 inline-block">
            <Button variant="primary">Rapora git</Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}
