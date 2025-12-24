// ObjectPropertyRow.jsx
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from './ui/select'
import { Trash2 } from 'lucide-react'
import { useSchemaStore } from '@/store/schemaStore'

const ObjectPropertyRow = ({ property, parentFieldId }) => {
  const { fields, updateField } = useSchemaStore()
  
  // Get the parent field
  const parentField = fields.find(f => f.id === parentFieldId)
  const properties = parentField?.properties || []

  // Update a specific property
  const updateProperty = (propertyId, updates) => {
    const updatedProperties = properties.map(prop =>
      prop.id === propertyId ? { ...prop, ...updates } : prop
    )
    updateField(parentFieldId, { properties: updatedProperties })
  }

  // Delete a property
  const deleteProperty = (propertyId) => {
    const filteredProperties = properties.filter(prop => prop.id !== propertyId)
    updateField(parentFieldId, { properties: filteredProperties })
  }

  return (
    <div className="flex gap-2 items-start p-3 rounded-md border bg-slate-50/50">
      {/* Property Name */}
      <div className="flex-1">
        <Input
          placeholder="property_name"
          value={property.fieldName || ''}
          onChange={(e) => updateProperty(property.id, { fieldName: e.target.value })}
          className="h-9 text-sm"
        />
      </div>

      {/* Property Type */}
      <div className="flex-1">
        <Select
          value={property.dataType || 'string'}
          onValueChange={(val) => updateProperty(property.id, { dataType: val })}
        >
          <SelectTrigger className="h-9 text-sm w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="integer">Integer</SelectItem>
            <SelectItem value="float">Float</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="address">Address</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="uuid">UUID</SelectItem>
            <SelectItem value="image_url">Image URL</SelectItem>
            <SelectItem value="file_url">File URL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={() => deleteProperty(property.id)}
      >
        <Trash2  />
      </Button>
    </div>
  )
}

export default ObjectPropertyRow
