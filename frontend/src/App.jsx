import GeneratedOutput from './components/GeneratedOutput'
import Header from './components/Header'
import InjectionComponent from './components/InjectionComponent'
import SchemaBuilder from './components/SchemaBuilder'
import { Button } from './components/ui/button'

function App() {


  return (
    <div className='min-h-screen bg-[#f4f8fd] w-full overflow-x-auto'>
      <Header></Header>
      <main className='max-w-screen mx-auto py-6 px-10 w-full min-w-[300px]'>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 '>
            <div className='flex flex-col gap-4 max-w-screen'>
              <SchemaBuilder></SchemaBuilder>
              <InjectionComponent></InjectionComponent>
              
            </div>
            
            <GeneratedOutput></GeneratedOutput>
            
        </div>
      </main>
      
    </div>
  )
}

export default App
