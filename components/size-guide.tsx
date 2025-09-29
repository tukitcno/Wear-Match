import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Ruler } from "lucide-react"

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Ruler className="mr-2 h-4 w-4" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>T-Shirt Size Guide</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Size Chart (inches)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Size</th>
                    <th className="text-left p-3 font-semibold">Chest</th>
                    <th className="text-left p-3 font-semibold">Length</th>
                    <th className="text-left p-3 font-semibold">Sleeve</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">XS</td>
                    <td className="p-3">34-36"</td>
                    <td className="p-3">27"</td>
                    <td className="p-3">8"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">S</td>
                    <td className="p-3">36-38"</td>
                    <td className="p-3">28"</td>
                    <td className="p-3">8.5"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">M</td>
                    <td className="p-3">38-40"</td>
                    <td className="p-3">29"</td>
                    <td className="p-3">9"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">L</td>
                    <td className="p-3">40-42"</td>
                    <td className="p-3">30"</td>
                    <td className="p-3">9.5"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">XL</td>
                    <td className="p-3">42-44"</td>
                    <td className="p-3">31"</td>
                    <td className="p-3">10"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">2XL</td>
                    <td className="p-3">44-46"</td>
                    <td className="p-3">32"</td>
                    <td className="p-3">10.5"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">3XL</td>
                    <td className="p-3">46-48"</td>
                    <td className="p-3">33"</td>
                    <td className="p-3">11"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">How to Measure</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">Chest:</p>
                <p>Measure around the fullest part of your chest, keeping the tape horizontal.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Length:</p>
                <p>Measure from the highest point of the shoulder to the bottom hem.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Sleeve:</p>
                <p>Measure from the center back of the neck to the end of the sleeve.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/40 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Fit Tip:</strong> If you're between sizes, we recommend sizing up for a more relaxed fit or sizing
              down for a slimmer fit.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
