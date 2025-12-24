// src/store/schemaStore.js
import { create } from 'zustand'
import axios from 'axios'

export const useSchemaStore = create((set, get) => ({
  // State
  fields: [
    {
      id: crypto.randomUUID(),
      fieldName: '',
      dataType: 'string',
      properties: [],      // for objects
      elementType: 'string', // for arrays
      elementCount: '',    // for arrays

      // constraints
      minLength: '',
      maxLength: '',
      min: '',
      max: '',
      enumValues: '',
    },
  ],
  generatedData: [],
  recordCount: 5,
  isLoading: false,
  error: null,

  // Actions
  addField: () =>
    set((state) => ({
      fields: [
        ...state.fields,
        {
          id: crypto.randomUUID(),
          fieldName: '',
          dataType: 'string',
          properties: [],
          elementType: 'string',
          elementCount: '',
          minLength: '',
          maxLength: '',
          min: '',
          max: '',
          enumValues: '',
        },
      ],
    })),

  updateField: (id, updates) =>
    set((state) => ({
      fields: state.fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      ),
    })),

  removeField: (id) =>
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== id),
    })),

  setGeneratedData: (data) => set({ generatedData: data }),

  setRecordCount: (count) => set({ recordCount: count }),

  // Helper to create a new field with defaults
  makeField: () => ({
    id: crypto.randomUUID(),
    fieldName: '',
    dataType: 'string',
    // String constraints
    minLength: '',
    maxLength: '',
    // Number constraints
    min: '',
    max: '',
    // Enum/Choices
    enumValues: '', // "a,b,c"
    // Complex types
    properties: [], // for object type
    elementType: 'string', // for array type
    elementCount: '', // for array length
  }),

  // Build schema payload for backend
  buildSchema: () => {
    const { fields } = get()
    const schema = {}

    const buildFieldType = (fieldLike) => {
      const dt = fieldLike.dataType
      const hasEnum =
        fieldLike.enumValues && fieldLike.enumValues.trim().length > 0

      // STRING
      if (dt === 'string') {
        if (hasEnum) {
          const values = fieldLike.enumValues
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean)
          return `string[${values.join(',')}]`
        }

        const minLenRaw = fieldLike.minLength
        const maxLenRaw = fieldLike.maxLength
        const minLen =
          minLenRaw !== '' && minLenRaw != null
            ? parseInt(minLenRaw, 10)
            : undefined
        const maxLen =
          maxLenRaw !== '' && maxLenRaw != null
            ? parseInt(maxLenRaw, 10)
            : undefined

        if (
          minLen != null &&
          maxLen != null &&
          !Number.isNaN(minLen) &&
          !Number.isNaN(maxLen)
        ) {
          return `string(${minLen},${maxLen})`
        }
        return 'string'
      }

      // INTEGER (use "integer" everywhere)
      if (dt === 'integer') {
        if (hasEnum) {
          const nums = fieldLike.enumValues
            .split(',')
            .map((v) => parseInt(v.trim(), 10))
            .filter((n) => !Number.isNaN(n))
          return `integer[${nums.join(',')}]`
        }

        const minRaw = fieldLike.min
        const maxRaw = fieldLike.max
        const min =
          minRaw !== '' && minRaw != null
            ? parseInt(minRaw, 10)
            : undefined
        const max =
          maxRaw !== '' && maxRaw != null
            ? parseInt(maxRaw, 10)
            : undefined

        if (
          min != null &&
          max != null &&
          !Number.isNaN(min) &&
          !Number.isNaN(max)
        ) {
          return `integer(${min},${max})`
        }
        return 'integer'
      }

      // FLOAT
      if (dt === 'float') {
        if (hasEnum) {
          const nums = fieldLike.enumValues
            .split(',')
            .map((v) => parseFloat(v.trim()))
            .filter((n) => !Number.isNaN(n))
          return `float[${nums.join(',')}]`
        }

        const minRaw = fieldLike.min
        const maxRaw = fieldLike.max
        const min =
          minRaw !== '' && minRaw != null
            ? parseFloat(minRaw)
            : undefined
        const max =
          maxRaw !== '' && maxRaw != null
            ? parseFloat(maxRaw)
            : undefined

        if (
          min != null &&
          max != null &&
          !Number.isNaN(min) &&
          !Number.isNaN(max)
        ) {
          return `float(${min},${max})`
        }
        return 'float'
      }

      if (dt === 'boolean') return 'boolean'

      // semantic / file types (name, email, phone, date, uuid, image_url, file_url, etc.)
      return dt
    }

    fields.forEach((field) => {
      const name = field.fieldName?.trim()
      if (!name) return

      const dt = field.dataType

      // OBJECT → nested object, with full names like "integer"
      if (dt === 'object') {
        const nested = {}

        field.properties?.forEach((prop) => {
          const propName = prop.fieldName?.trim()
          if (!propName) return

          // use full dataType string (e.g. "integer", "string", etc.)
          nested[propName] = prop.dataType || 'string'
        })

        schema[name] = nested
        return
      }

      // ARRAY → [size, elementType] using full name (e.g. "integer")
      if (dt === 'array') {
        const size =
          field.elementCount &&
          !Number.isNaN(parseInt(field.elementCount, 10))
            ? parseInt(field.elementCount, 10)
            : 3

        const elementType = field.elementType || 'string' // "integer", "float", etc.

        schema[name] = [size, elementType]
        return
      }

      // PRIMITIVE / SEMANTIC / FILE
      schema[name] = buildFieldType(field)
    })

    return schema
  },

  generateData: async () => {
    const { buildSchema } = get()
    set({ isLoading: true, error: null })

    try {
      const schema = buildSchema()
      console.log('SCHEMA PAYLOAD:', schema)

      if (Object.keys(schema).length === 0) {
        set({
          error: 'Please add at least one field with a name',
          isLoading: false,
        })
        return
      }

      // send only schema
      const res = await axios.post('http://localhost:8080/api/generate', schema)

      set({
        generatedData: res.data,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      console.error('Generation error:', error)
      set({
        error: error.response?.data?.message || 'Failed to generate data',
        isLoading: false,
      })
    }
  },

  // Clear all data
  reset: () =>
    set({
      fields: [
        {
          id: crypto.randomUUID(),
          fieldName: '',
          dataType: 'string',
          properties: [],
          elementType: 'string',
          elementCount: '',
          minLength: '',
          maxLength: '',
          min: '',
          max: '',
          enumValues: '',
        },
      ],
      generatedData: [],
      error: null,
    }),

  // Import schema from JSON (kept as-is, adjust later if your backend export changes)
  importSchema: (schemaJson) => {
    try {
      const imported =
        typeof schemaJson === 'string'
          ? JSON.parse(schemaJson)
          : schemaJson

      const newFields = Object.entries(imported).map(
        ([fieldName, config]) => {
          const field = {
            id: crypto.randomUUID(),
            fieldName,
            dataType: typeof config === 'string' ? config : config.type,
            properties: [],
            elementType: 'string',
            elementCount: '',
            minLength: '',
            maxLength: '',
            min: '',
            max: '',
            enumValues: '',
          }

          if (typeof config === 'object' && config !== null) {
            if (config.properties) {
              field.dataType = 'object'
              field.properties = Object.entries(
                config.properties
              ).map(([propName, propConfig]) => ({
                id: crypto.randomUUID(),
                fieldName: propName,
                dataType:
                  typeof propConfig === 'string'
                    ? propConfig
                    : propConfig.type,
              }))
            }

            if (config.elementType) {
              field.elementType = config.elementType
              field.elementCount = config.length?.toString() || ''
            }

            if (config.minLength)
              field.minLength = config.minLength.toString()
            if (config.maxLength)
              field.maxLength = config.maxLength.toString()

            if (config.min) field.min = config.min.toString()
            if (config.max) field.max = config.max.toString()

            if (config.enum) {
              field.enumValues = Array.isArray(config.enum)
                ? config.enum.join(', ')
                : config.enum
            }
          }

          return field
        }
      )

      set({ fields: newFields, error: null })
      return true
    } catch (error) {
      console.error('Import error:', error)
      set({ error: 'Invalid JSON schema format' })
      return false
    }
  },
}))
