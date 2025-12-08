import JsonView from '@uiw/react-json-view'
import React from 'react'
import { darkTheme } from '@uiw/react-json-view/dark';
import { Card, CardContent, CardHeader } from './ui/card';
import { File, FileBraces, FileCodeCorner } from 'lucide-react';
import { useSchemaStore } from '@/store/schemaStore';
const GeneratedOutput = () => {
    const generatedData = useSchemaStore(state=>state.generatedData);
    // generatedData=[];
  return (
    <div className='bg-white p-6 rounded-lg overflow-auto h-auto self-start'>
        <h1 className='text-xl mb-4'>Generated Output</h1>
        {generatedData.length === 0 ? (
            <Card className='max-w-full bg-[#f8fafc] mx-auto text-center flex flex-col justify-around h-1/2'>
                <CardContent>
                <FileBraces className='mx-auto mb-2' size={64}></FileBraces>
                <h1 className='text-2xl mb-2'>No Data Generated Yet</h1>
                <p className='xl'>Configure your schema and click Generate</p>
                </CardContent>
            </Card>
            ) : (
            <div className='w-full'>
                <JsonView 
                value={generatedData}
                displayDataTypes={false}
                collapsed={false}
                stringEllipsis={10000}
                style={{ 
                    fontSize: '16px',
                    padding: 16 
                }}
                />
            </div>
)}

        
    </div>
  )
}

export default GeneratedOutput