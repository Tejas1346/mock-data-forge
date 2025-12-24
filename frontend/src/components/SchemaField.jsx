import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useSchemaStore } from '@/store/schemaStore'
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectGroup, SelectLabel, SelectItem
} from './ui/select'
import { Settings2, Trash2 } from 'lucide-react'
import FieldConstraints from './FieldConstraint'

const SchemaField = ({ fieldId }) => {
  const field = useSchemaStore(state =>
    state.fields.find(f => f.id === fieldId)
  )
  const updateField = useSchemaStore(state => state.updateField)
  const removeField = useSchemaStore(state => state.removeField)

  const [showConstraints, setShowConstraints] = useState(false)

  if (!field) return null

  return (
    <div className="bg-[#f8fafc] gap-1 rounded-xl p-6 grid grid-cols-1">
      <div className="flex items-end justify-between">
        <div className="grid grid-cols-2 gap-4 w-5/6">
          <div className="w-auto">
            <label className="text-slate-600">
              <span>Field Name</span>
            </label>
            <Input
              value={field.fieldName}
              onChange={(e) => updateField(fieldId, { fieldName: e.target.value })}
            />
          </div>

          <div>
            <label className="text-slate-600 text-md">
              <span>Data Type</span>
            </label>
            <div className="text-xl">
              <Select
                value={field.dataType}
                onValueChange={(val) => updateField(fieldId, { dataType: val })}
              >
                <SelectTrigger className="w-full">
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
        </div>

        {/* Settings Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowConstraints(prev => !prev)}
          className={`h-10 w-10 [&_svg:not([class*='size-'])]:size-5 transition-colors
            ${showConstraints
              ? 'bg-slate-200/70 text-slate-900'
              : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
        >
          <Settings2 size={20} />
        </Button>

        {/* Delete Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeField(fieldId)}
          className="h-10 w-10 [&_svg:not([class*='size-'])]:size-5 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <Trash2 size={20} />
        </Button>
      </div>

      {showConstraints && (
        <FieldConstraints field={field} />
      )}
    </div>
  )
}

export default SchemaField
