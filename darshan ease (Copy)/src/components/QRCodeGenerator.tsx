import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, RefreshCw } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface QRCodeGeneratorProps {
  templeName: string;
}

interface VisitorData {
  visitorId: string;
  visitorName: string;
  bookingTime: string;
  templeName: string;
  dateGenerated: string;
  qrValue: string;
}

export function QRCodeGenerator({ templeName }: QRCodeGeneratorProps) {
  const [visitorName, setVisitorName] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [generatedQR, setGeneratedQR] = useState<VisitorData | null>(null);

  const generateQRCode = () => {
    if (!visitorName || !bookingTime) {
      toast.error("Please fill in all fields");
      return;
    }

    const visitorId = `DEV${Date.now().toString().slice(-8)}`;
    const qrData: VisitorData = {
      visitorId,
      visitorName,
      bookingTime,
      templeName,
      dateGenerated: new Date().toISOString(),
      qrValue: JSON.stringify({
        id: visitorId,
        name: visitorName,
        time: bookingTime,
        temple: templeName,
        generated: new Date().toISOString(),
      }),
    };

    setGeneratedQR(qrData);
    toast.success("QR Code generated successfully!");
  };

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR_${generatedQR?.visitorId || 'code'}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success("QR Code downloaded!");
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const resetForm = () => {
    setVisitorName("");
    setBookingTime("");
    setGeneratedQR(null);
  };

  return (
    <div className="bg-card border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
          📱
        </div>
        <div>
          <h3 className="mb-1">QR Code Generator</h3>
          <p className="text-sm text-muted-foreground">
            Generate unique QR codes for devotee entry
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Visitor Name</label>
            <input
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="Enter devotee name"
              className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Booking Date & Time</label>
            <input
              type="datetime-local"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Temple</label>
            <input
              type="text"
              value={templeName}
              readOnly
              className="w-full px-4 py-2 rounded-lg border bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={generateQRCode}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              Generate QR Code
            </button>
            {generatedQR && (
              <button
                onClick={resetForm}
                className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
                title="Reset Form"
              >
                <RefreshCw size={20} />
              </button>
            )}
          </div>
        </div>

        {/* QR Code Preview */}
        <div className="flex flex-col items-center justify-center">
          {generatedQR ? (
            <div className="bg-white p-6 rounded-xl border-2 border-purple-200 shadow-lg">
              <div className="text-center mb-4">
                <h4 className="text-sm text-gray-700 mb-1">Visitor QR Code</h4>
                <p className="text-xs text-gray-500">ID: {generatedQR.visitorId}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG
                  id="qr-code-svg"
                  value={generatedQR.qrValue}
                  size={200}
                  level="H"
                  includeMargin
                  imageSettings={{
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='50' x='50' text-anchor='middle' dominant-baseline='central' font-size='60'%3E🕉️%3C/text%3E%3C/svg%3E",
                    height: 30,
                    width: 30,
                    excavate: true,
                  }}
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-600 mb-1">{generatedQR.visitorName}</p>
                <p className="text-xs text-gray-500">
                  {new Date(generatedQR.bookingTime).toLocaleString()}
                </p>
              </div>

              <button
                onClick={downloadQRCode}
                className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download QR Code
              </button>
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed rounded-xl bg-muted/30">
              <div className="text-5xl mb-3">📱</div>
              <p className="text-sm text-muted-foreground">
                Fill in the details and click Generate
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                QR Code preview will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent QR Codes */}
      {generatedQR && (
        <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
          <h4 className="text-sm mb-3">Recently Generated</h4>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span>✓</span>
              </div>
              <div>
                <p className="text-sm">{generatedQR.visitorName}</p>
                <p className="text-xs text-muted-foreground">{generatedQR.visitorId}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                {new Date(generatedQR.dateGenerated).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
