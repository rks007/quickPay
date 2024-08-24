"use client"
import NavBar from '@/components/component/NavBar'
import Search from '@/components/component/Search';
import { useBalance } from '@/hooks/Balance'
import React from 'react'

function page() {
  const balance = useBalance();

  // console.log("dashboard:-", balance);
  
  return (
    <div className=" container">
        <div className=''>
            <NavBar/>
        </div>
        <div>
          <h1>Remaining Balance: <span className=' font-semibold'>{balance ? balance : "fetching your balance..."}</span> </h1>
        </div>
        <div>
          <Search/>
        </div>
    </div>
  )
}

export default page