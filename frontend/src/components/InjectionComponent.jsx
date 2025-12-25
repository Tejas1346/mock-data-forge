import React, { useState } from 'react'
import { Send, Zap } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useSchemaStore } from '@/store/schemaStore'
import axios from 'axios'

const InjectionComponent = () => {
  const buildSchema = useSchemaStore((state) => state.buildSchema)

  const [apiUrl, setApiUrl] = useState('')
  const [injections, setInjections] = useState('1')
  const [isLoading, setIsLoading] = useState(false)

  const handleInject = async () => {
    const schema = buildSchema()

    if (!apiUrl.trim()) {
      // optional: alert('Please enter target API URL')
      return
    }

    if (!schema || Object.keys(schema).length === 0) {
      // optional: alert('Please define schema first')
      return
    }

    const injectionsNum = parseInt(injections, 10)
    if (Number.isNaN(injectionsNum) || injectionsNum <= 0) {
      // optional: alert('Injections must be a positive number')
      return
    }

    const payload = {
      injections: injectionsNum,
      schema,
      apiUrl: apiUrl.trim(),
    }

    setIsLoading(true)
    try {
      await axios.post('https://mock-data-forge-e9lr.vercel.app/api/inject', payload)
      console.log('Injection job started:', payload)
    } catch (err) {
      console.error('Injection error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg max-w-screen">
      <div className="flex items-center gap-2 mb-4">
        <span>
          <Zap color="#00a63e" />
        </span>
        <p className="text-xl">Automated Injection</p>
      </div>

      <p className="text-lg mb-4">
        Automatically send generated data to your API endpoint
      </p>

      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg">Target API URL</h1>
          <Input
            className="h-10"
            placeholder="https://api.example.com/endpoint"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 max-w-xs">
          <h1 className="text-lg">Number of injections</h1>
          <Input
            className="h-10"
            type="number"
            min={1}
            value={injections}
            onChange={(e) => setInjections(e.target.value)}
          />
        </div>
      </div>

      <Button
        size="custom"
        className="[&_svg:not([class*='size-'])]:size-5.25 w-full bg-[#00a63e] hover:bg-[#006b26]"
        onClick={handleInject}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="mr-2 animate-spin">⏳</span>
            Injecting…
          </>
        ) : (
          <>
            <Send className="mr-2" />
            Start Injection
          </>
        )}
      </Button>
    </div>
  )
}

export default InjectionComponent
