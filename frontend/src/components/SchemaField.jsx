import React from 'react'
import { Input } from './ui/input'
import { useSchemaStore } from '@/store/schemaStore'
import { Select,SelectTrigger,SelectValue,SelectContent,SelectGroup,SelectLabel,
    SelectItem
 } from './ui/select'
import { Settings2, SwitchCameraIcon, Trash2 } from 'lucide-react'
import SchemeContraint from './FieldConstraint'
import SchemaConstraint from './FieldConstraint'
import FieldConstraints from './FieldConstraint'
const SchemaField = ({fieldId}) => {
    const field = useSchemaStore(state => 
        state.fields.find(f => f.id === fieldId)
    )
    const updateField = useSchemaStore(state => state.updateField)
    const removeField = useSchemaStore(state => state.removeField)

    // if(!field) return null
  return (
    <div className='bg-[#f8fafc] gap-1 rounded-xl p-3 grid grid-cols-1 ' >
    <div className='flex items-center justify-around  '>
        <div className=''>
            <label className='font-light text-sm'>
                <span>Field Name</span>
            </label>
            <Input value={field.fieldName} onChange={(e)=>updateField(fieldId,{fieldName:e.target.value})} />
        </div>
        <div className=''>
            <label className='font-light text-sm'>
                <span>Data Type</span>
            </label>
            <div className='text-xl'>
            <Select value={field.dataType} onValueChange={(e)=>updateField(fieldId,{dataType:e})} >
      <SelectTrigger className="w-[200px]" >
        <SelectValue placeholder="Select data type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Primitive</SelectLabel>
          <SelectItem value="string">String</SelectItem>
          <SelectItem value="integer">Integer</SelectItem>
          <SelectItem value="float">Float</SelectItem>
          <SelectItem value="boolean">Boolean</SelectItem>
        </SelectGroup>
        
        <SelectGroup>
          <SelectLabel>Semantic</SelectLabel>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="phone">Phone</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="address">Address</SelectItem>
          <SelectItem value="company">Company</SelectItem>
          <SelectItem value="uuid">UUID</SelectItem>
        </SelectGroup>
        
        <SelectGroup>
          <SelectLabel>File</SelectLabel>
          <SelectItem value="image_url">Image URL</SelectItem>
          <SelectItem value="file_url">File URL</SelectItem>
        </SelectGroup>
        
        <SelectGroup>
          <SelectLabel>Complex</SelectLabel>
          <SelectItem value="array">Array</SelectItem>
          <SelectItem value="object">Object</SelectItem>
        </SelectGroup>
      </SelectContent>
            </Select>
                
            </div>

        </div>
        <button><Settings2 className='mt-5 min-w-4' size={24}></Settings2></button>
        <button onClick={()=>removeField(fieldId)}><Trash2 color='red' className='mt-4' size={24} >
            </Trash2>
        </button>
        
           
        
    </div>
    
     
    </div>
  )
}

export default SchemaField