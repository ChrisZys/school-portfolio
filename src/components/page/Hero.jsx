import { BookOpen, GraduationCap } from "lucide-react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { AuroraText } from "@/components/ui/aurora-text"
import { Button } from "@/components/ui/button"

const Hero = ({ worksCount = 0 }) => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-accent/10" />

      <div className="absolute top-4 right-4 z-10">
        <AnimatedThemeToggler className="cursor-pointer" />
      </div>

      <div className="relative container mx-auto px-4 py-8 sm:py-8 md:py-16 !pb-2">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Portafolio Académico
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            <AuroraText>Trabajos Escolares</AuroraText>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Tareas para las materias de HCI y Redes II
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>
                {worksCount} {worksCount === 1 ? "Trabajo" : "Trabajos"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
