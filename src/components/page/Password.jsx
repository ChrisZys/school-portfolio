import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"

import { useState } from "react"
import { useForm } from "react-hook-form"

const Password = ({ onSuccess }) => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      pin: "",
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/validatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: data.pin }),
      })

      const result = await response.json()

      if (result.success) {
        localStorage.setItem("isAuthenticated", "true")
        onSuccess && onSuccess()
      } else {
        setError("Contraseña incorrecta")
        form.reset()
      }
    } catch (error) {
      console.error("Error al validar contraseña:", error)
      setError("Error al validar contraseña. Intente nuevamente.")
      form.reset()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        className="sm:max-w-[400px] p-6"
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            Ingrese la contraseña
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  {error && (
                    <p className="text-sm font-medium text-destructive mt-2">
                      {error}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-center">
              <Button
                type="submit"
                className="w-full max-w-[200px] cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Ingresar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default Password
