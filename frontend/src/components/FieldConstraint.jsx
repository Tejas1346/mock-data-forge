// FieldConstraints.jsx
import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from './ui/select'
import { useSchemaStore } from '@/store/schemaStore'

const SEMANTIC_TYPES = ['name','email','phone','date','address','company','uuid','image_url','file_url']

const FieldConstraints = ({ field }) => {
  const updateField = useSchemaStore(s => s.updateField)
  const { dataType } = field

  // no constraints for semantic types
  if (SEMANTIC_TYPES.includes(dataType)) return null

  // OBJECT CONFIG (no constraints on object itself)
  if (dataType === 'object') {
    return (
      <div className="mt-3 space-y-2">
        <p className="text-xs font-medium text-slate-500">Configuration</p>
        <p className="text-xs text-slate-500">Object Properties</p>
        {/* reuse the ObjectPropertiesSection / SchemaConstraint from before */}
      </div>
    )
  }

  // ARRAY CONFIG: elementType + length, but no nested object/array
  if (dataType === 'array') {
    return (
      <div className="mt-3 space-y-2">
        <p className="text-xs font-medium text-slate-500">Configuration</p>

        <div className="flex gap-4">
          <div className="flex-1 space-y-1">
            <Label className="text-xs">Element Type</Label>
            <Select
              value={field.elementType}
              onValueChange={(val) => updateField(field.id, { elementType: val })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="integer">Integer</SelectItem>
                <SelectItem value="float">Float</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                {/* no object/array here */}
              </SelectContent>
            </Select>
          </div>

          <div className="w-32 space-y-1">
            <Label className="text-xs">Array Length</Label>
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
        <p className="text-xs font-medium text-slate-500">
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
      <p className="text-xs text-slate-500">
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
        <Label className="text-xs text-slate-500">
          Choices <span className="text-slate-400">(comma-separated)</span>
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
