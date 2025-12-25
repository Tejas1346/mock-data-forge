import { Database } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='max-w-screen mx-auto p-6  bg-[#fdfeff]'>
        <div className='flex items-center gap-4'>
            <div className='bg-[#4545f8] p-4 rounded-xl'>
                <Database size={26} color="white" ></Database>
            </div>
            <div>
                <h1 className='text-2xl font-semibold'>Mock Data Forge</h1>
                <p className='text-xl'>Generate Realistic Data for your development needs</p>
            </div>
        </div>
    </div>
  )
}

export default Header   