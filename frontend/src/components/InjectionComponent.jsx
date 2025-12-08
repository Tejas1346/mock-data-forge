import { Send, Zap } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import { Select,SelectTrigger,SelectValue,SelectContent,SelectGroup,SelectLabel,
    SelectItem
 } from './ui/select'
import { Button } from './ui/button'
const InjectionComponent = () => {
  return (
    <div className='bg-white p-4 rounded-lg'>
        <div className='flex items-center gap-2 mb-4'>
            <span>
                <Zap color='#00a63e'></Zap>
            </span>
           <p className='text-xl'>Automated Injection</p>
        </div>
        <p className='text-lg mb-4'>Automatically send generated data to your API endpoint</p>
        <div className='flex items-center gap-4 mb-4'>
            <div>
                <h1 className='text-lg mb-2'>Method</h1>
                <Select >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
          </SelectContent>
                </Select>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
            <h1 className='text-lg'>API Endpoint</h1>
            <Input className='h-10 '/>
            </div>
        </div>
       <Button size='custom' className="[&_svg:not([class*='size-'])]:size-5.25 w-full bg-[#00a63e] hover:bg-[#006b26]"><Send/>Send To API</Button>
    </div>
  )
}

export default InjectionComponent