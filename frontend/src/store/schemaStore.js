// src/store/schemaStore.js
import { create } from 'zustand'
import axios from 'axios'
export const useSchemaStore = create((set,get) => ({
  // State
  fields: [{ id: 1, fieldName: '', dataType: 'string' }],
  generatedData: [],
  isLoading:false,
  error:null,
 
  
  // Actions
  addField: () => set((state) => ({
    fields: [...state.fields, { 
      id: Date.now(), 
      fieldName: '', 
      dataType: 'string' 
    }]
  })),
  
  updateField: (id, updates) => set((state) => ({
    fields: state.fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    )
  })),
  
  removeField: (id) => set((state) => ({
    fields: state.fields.filter(field => field.id !== id)
  })),
  
  setGeneratedData: (data) => set({ generatedData: data }),
  
  setRecordCount: (count) => set({ recordCount: count }),

  // in schemaStore.js
   makeField: () => ({
    id: crypto.randomUUID(),
    fieldName: '',
    dataType: 'string',    // 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'object' | 'name' | ...
    // constraints
    minLength: '',
    maxLength: '',
    min: '',
    max: '',
    enumValues: '',        // "a,b,c"
    // complex
    children: [],          // for object
    elementType: 'string', // for array
    elementCount: '3',
  }),


  generateData: async()=>{
    console.log("hello")
    const {fields} = get()
    set({isLoading:true,error:null})
    try {
      const schema={}
      fields.forEach(f=>{
        if(f.fieldName?.trim()) schema[f.fieldName]=f.dataType
        

      })
      const res = await axios.post('http://localhost:8080/api/generate', { schema })
      set({generatedData:res.data,isLoading:false})
    } catch (error) {
      console.log(error);
    }
  }
}))
