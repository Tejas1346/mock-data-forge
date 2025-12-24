// FieldConstraints.jsx
import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from './ui/select'
import { Button } from './ui/button'
import { useSchemaStore } from '@/store/schemaStore'
import ObjectPropertyRow from './ObjectPropertyRow'

const SEMANTIC_TYPES = ['name','email','phone','date','address','company','uuid','image_url','file_url']

const FieldConstraints = ({ field }) => {
  const updateField = useSchemaStore(s => s.updateField)
  const { dataType } = field

  // no constraints for semantic types
  if (SEMANTIC_TYPES.includes(dataType)) return null

  // OBJECT CONFIG (no constraints on object itself)
  // FieldConstraints.jsx - Object section
if (dataType === 'object') {
  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">Configuration</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const newProperty = {
              id: Date.now().toString(),
              fieldName: '',
              dataType: 'string',
            }
            const currentProperties = field.properties || []
            updateField(field.id, { 
              properties: [...currentProperties, newProperty] 
            })
          }}
        >
          + Add Property
        </Button>
      </div>

      {/* Object Properties List */}
      <div className="space-y-2">
        {(!field.properties || field.properties.length === 0) && (
          <p className="text-xs text-slate-400 italic">
            No properties defined. Click "Add Property" to start.
          </p>
        )}

        {field.properties?.map((property) => (
          <ObjectPropertyRow
            key={property.id}
            property={property}
            parentFieldId={field.id}
          />
        ))}
      </div>
    </div>
  )
}


  // ARRAY CONFIG: elementType + length, but no nested object/array
  if (dataType === 'array') {
    return (
      <div className="mt-3 space-y-2">
        <p className="text-sm  text-slate-600">Configuration</p>

        <div className="">
            <div className='mb-2'>
            <Label className="text-sm mb-1">Element Type</Label>
            <Select
              value={field.elementType}
              onValueChange={(val) => updateField(field.id, { elementType: val })}
            >
              <SelectTrigger className='w-full'>
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
                {/* no object/array here */}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-1">
            <Label className="text-sm">Array Length</Label>
            <Input
              type="number"
              min={1}
              value={field.elementCount || ''}
              onChange={(e) => updateField(field.id, { elementCount: e.target.value })}
            />
          </div>
        </div>
      </div>
    )
  }

  // NUMBER CONSTRAINTS (integer / float)
  if (dataType === 'integer' || dataType === 'float') {
    const step = dataType === 'float' ? '0.01' : '1'
    return (
      <div className="mt-3 space-y-2">
        <p className="text-sm  text-slate-600">
          Constraints (Optional)
        </p>

        <div className="flex gap-4">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Min Value</Label>
            <Input
              type="number"
              step={step}
              placeholder="No minimum"
              value={field.min || ''}
              onChange={(e) => updateField(field.id, { min: e.target.value })}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Max Value</Label>
            <Input
              type="number"
              step={step}
              placeholder="No maximum"
              value={field.max || ''}
              onChange={(e) => updateField(field.id, { max: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Choices (comma-separated)</Label>
          <Input
            placeholder="option1, option2, option3"
            value={field.enumValues || ''}
            onChange={(e) => updateField(field.id, { enumValues: e.target.value })}
          />
        </div>
      </div>
    )
  }

  // STRING CONSTRAINTS
  if (dataType === 'string') {
    return (
      <div className="mt-2 space-y-2">
      <p className="text-sm  text-slate-600">
        Constraints <span className="text-slate-400">(Optional)</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Min Length</Label>
          <Input
            type="number"
            min={0}
            placeholder="Random length"
            value={field.minLength || ''}
            onChange={(e) =>
              updateField(field.id, { minLength: e.target.value })
            }
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Max Length</Label>
          <Input
            type="number"
            min={0}
            placeholder="Random length"
            value={field.maxLength || ''}
            onChange={(e) =>
              updateField(field.id, { maxLength: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs ">
          Choices <span className="">(comma-separated)</span>
        </Label>
        <Input
          placeholder="option1, option2, option3"
          value={field.enumValues || ''}
          onChange={(e) =>
            updateField(field.id, { enumValues: e.target.value })
          }
        />
      </div>
    </div>
    )
  }

  // default: nothing
  return null
}

export default FieldConstraints
