import React, { useState } from 'react'
import SchemaField from './SchemaField'
import { Button } from './ui/button'
import { Plus, Sparkle } from 'lucide-react'
import { useSchemaStore } from '@/store/schemaStore'

const SchemaBuilder = () => {
    const fields = useSchemaStore(state => state.fields)
    const addField = useSchemaStore(state => state.addField)
    const generateData = useSchemaStore(state=>state.generateData)
    return (
        <div className='p-6 bg-[#ffffff] rounded-xl flex flex-col gap-4'>
            <div>
                <h1 className='text-xl'>Schema Builder</h1>
                <p className='text-lg font-light'>Define your data structure</p>
            </div>
            <div className='flex flex-col mt-4 gap-3'>
                {fields.map((field)=>(
                    <SchemaField key={field.id} fieldId={field.id} />
                ))}
            </div>
            <Button onClick={addField} className="[&_svg:not([class*='size-'])]:size-6" size='custom'><Plus size={80}/>Add Field</Button>
            <Button onClick={generateData} size='custom' className="bg-[#4743f8] [&_svg:not([class*='size-'])]:size-6
             hover:bg-[#3830c7]" color ='[#4743f8]' ><Sparkle  />Generate Mock Data</Button>
        </div>
    )
}

export default SchemaBuilder