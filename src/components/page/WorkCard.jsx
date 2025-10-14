import { FileText, Download, ExternalLink, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { PdfViewerDialog } from "@/components/shared/PdfViewerDialog"
import { ShineBorder } from "@/components/ui/shine-border"

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export const WorkCard = ({
  title = "Documento de ejemplo",
  description = "Este es un documento de prueba para verificar la funcionalidad del visor de PDF",
  date = new Date().toISOString(),
  pdfUrl = "/files/demo001.pdf",
  subject = "Materia",
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDownload = (e) => {
    e.stopPropagation()
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = `${title.replace(/\s+/g, "_")}.pdf`
    link.click()
  }

  const handleOpenInBrowser = (e) => {
    e.stopPropagation()
    window.open(pdfUrl, "_blank", "noopener,noreferrer")
  }

  const formattedDate = new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <>
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <Card className="h-full flex flex-col relative overflow-hidden shadow-none border-1">
          <ShineBorder
            className="z-0"
            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          />
          <div className="relative z-10">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <Badge variant="secondary" className="w-fit">
                  {subject}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold">
                {title}
              </CardTitle>
              {description && (
                <CardDescription className="text-sm line-clamp-2 mt-1">
                  {description}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="pt-2 mt-auto">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 text-sm h-8"
                  onClick={() => setIsOpen(true)}
                >
                  <FileText className="mr-2 h-3.5 w-3.5" />
                  <span className="font-bold">Ver PDF</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleOpenInBrowser}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleDownload}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      <PdfViewerDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={title}
        pdfUrl={pdfUrl}
        date={date}
      />
    </>
  )
}

export default WorkCard
