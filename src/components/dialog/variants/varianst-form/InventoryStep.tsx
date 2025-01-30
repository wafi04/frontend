"use client"
import { useAddStock } from "@/lib/api/variants/variantstock"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function FormStock({
  variantID,
  open,
  setOpen
}: {
  variantID: string,
  open : boolean,
  setOpen : (open : boolean)  => void
}) {
  const [stock, setStock] = useState<string>("0")
  const { mutate: addStock ,isPending} = useAddStock(variantID)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '')
    setStock(numericValue)
  }

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addStock(parseInt(stock, 10))  
    
  }

  return (
    <Dialog open={open}  onOpenChange={setOpen}>
<DialogContent className="max-w-[300px] w-full">
    <DialogHeader>
      <DialogTitle>
        Add Stock
      </DialogTitle>
      <DialogDescription>
        Added stock
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={stock}
        onChange={handleInputChange}
        className="w-24"
        min="0"
        />
      <Button type="submit" disabled={isPending}>
        Update Stock
      </Button>
    </form>
    </DialogContent>
    </Dialog>
  )
}