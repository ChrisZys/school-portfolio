import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/page/Hero"
import WorkCard from "@/components/page/WorkCard"
import Password from "@/components/page/Password"
import works from "@/data/works"

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(auth === "true")
  }, [])

  const handleAuthentication = () => {
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <Password onSuccess={handleAuthentication} />
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo gradiente modo claro */}
      <div
        className="absolute inset-0 -z-10 block dark:hidden"
        style={{
          background:
            "radial-gradient(1000px 500px at 0% -10%, color-mix(in oklch, var(--primary) 18%, transparent) 0%, transparent 60%)," +
            "radial-gradient(1200px 700px at 100% 0%, color-mix(in oklch, var(--primary) 14%, transparent) 0%, transparent 60%)," +
            "linear-gradient(180deg, color-mix(in oklch, var(--primary) 6%, var(--background)) 0%, var(--background) 30%, var(--background) 100%)",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Fondo gradiente modo oscuro */}
      <div
        className="absolute inset-0 -z-10 hidden dark:block"
        style={{
          background:
            "radial-gradient(1000px 500px at 0% -10%, color-mix(in oklch, var(--primary) 26%, transparent) 0%, transparent 60%)," +
            "radial-gradient(1200px 700px at 100% 0%, color-mix(in oklch, var(--primary) 22%, transparent) 0%, transparent 60%)," +
            "linear-gradient(180deg, color-mix(in oklch, var(--primary) 8%, var(--background)) 0%, var(--background) 30%, var(--background) 100%)",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Benner Principal */}
      <Hero worksCount={works.length} />

      {/* Sección de Trabajos */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto"
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          {works.map((work) => (
            <WorkCard
              key={work.id}
              title={work.title}
              date={work.date}
              description={work.description}
              pdfUrl={work.pdfUrl}
              subject={work.subject}
            />
          ))}
        </motion.div>
      </main>
    </div>
  )
}
