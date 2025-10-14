import { X, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export const PdfViewerDialog = ({
  isOpen,
  onOpenChange,
  title,
  pdfUrl,
  date,
}) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  const pdfViewerUrl = pdfUrl

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-screen h-screen max-w-none max-h-screen top-0 left-0 translate-x-0 translate-y-0 p-0 m-0 rounded-none border-0 shadow-none flex flex-col gap-0 sm:max-w-none"
        showCloseButton={false}
      >
        <DialogHeader className="px-6 py-3 border-b relative gap-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-foreground">
                  {title}
                </DialogTitle>
                {date && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 w-full overflow-hidden relative">
          <iframe
            src={pdfViewerUrl}
            className="w-full h-full absolute inset-0"
            title={title}
            loading="lazy"
            style={{
              border: "none",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PdfViewerDialog
