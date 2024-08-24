import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { userSchema, useSearchUser } from "@/hooks/SearchUsers"
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

function Search() {

  const {toast} = useToast();
  const router = useRouter();

  const [input, setinput] = useState("");
  const { usersData, loading} = useSearchUser(input);

  const [amountInput, setAmountInput] = useState("");

  const handleSend = async(user: userSchema) => {
    try {
      const amount = parseFloat(amountInput);

      if (amount <= 0) {
        toast({
          title: "invalid amount",
          description:"please enter a valid amount"
        })
        return;
      }

      const response = await axios.post("http://localhost:3000/api/account/transfer",{
        id: user.id,
        transferAmount: amount
      })
      
      if(response.status == 200){
        setAmountInput("");
        toast({
          description: "money sent successfully"
        })
        setTimeout(() => {
          window.location.reload();
        }, 1.1 * 1000)

      }
    } catch (error) {
      console.error("Error during transfer:", error);
      alert("An error occurred during the transfer process.");
    }
  }

  return (
    <div className='w-full'>
      <div className='w-full'>
        <input 
        onChange={(e) => setinput(e.target.value)}
        className='border-2 w-full my-5 rounded-lg p-1' 
        type="text" 
        placeholder='Search by Name'
        />
      </div>
      <div className=' w-full'>
        {
          usersData.map((user) => (
            <div className='flex justify-between my-5  items-center p-2' key={user.id}>
              <h1 className='text-2xl font-semibold'>{user.firstName} {user.lastName}</h1>
              <Dialog>
                <DialogTrigger className='bg-green-500 hover:bg-green-600 active:bg-green-400 p-2 rounded-full w-36'>Send Money</DialogTrigger>
                <DialogContent>
                  <DialogHeader className='p-5'>
                    <DialogTitle className='text-4xl text-purple-900'>Send Money to {user.firstName}</DialogTitle>
                    <DialogDescription className='flex flex-col'>
                      <h1 className='text-2xl font-semibold text-black mb-2'>Amount in Rupees</h1>
                      <input onChange={(e) => setAmountInput(e.target.value)} value={amountInput} className='h-10 border-2 rounded-full p-5 text-black text-xl mt-2' type="number" required placeholder='Enter Amount'/>
                      <button onClick={() => handleSend(user)} className='bg-green-500 hover:bg-green-600 active:bg-green-400 p-2 rounded-lg w-36 mt-5 text-black text-xl'>Transfer</button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Search