"use client"
import Link from "next/link"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
  


function NavBar() {

    const router = useRouter();

    const handleLogout = () => {
         signOut({callbackUrl: "/home"})

    }



  return (
    <div>
        <div className="flex justify-between items-center  bg-slate-500 my-5 h-14 rounded-full sticky">
          <div className=" shadow-2xl font-bold text-2xl ml-8">
              <Link href={"/dashboard"}>QuickPay</Link>
          </div>
          <div>
              {/* <button className="bg-red-400 p-2 rounded-lg hover:bg-red-600 active:bg-red-300 ease-in-out">Logout</button> */}
              <AlertDialog>
                <AlertDialogTrigger className="bg-red-500 p-2 rounded-lg hover:bg-red-700 active:bg-red-300 ease-in-out mr-8">Logout</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> 
                    <AlertDialogDescription></AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
          </div>
        </div>
    </div>
  )
}

export default NavBar