import axios from 'axios'
import { generate } from './GeneratorService.js';
export const inject=async (body)=>{
    const iterations = body['injections'];
    const schema = body['schema'];
    const apiUrl = body['apiUrl'];

    if(!iterations || typeof iterations !== 'number' || iterations <=0){
        throw new Error("Injections must be a positive number");
    }
    if(!schema || typeof schema !=='object'){
        throw new Error("Schema is required and must be an object");
    }
    if(!apiUrl || typeof apiUrl !=='string'){
        throw new Error("apiUrl is required and must be a string");
    }

    for(let i=0;i<iterations;i++){
        const data = generate(schema);
        await axios.post(apiUrl,data)
        .catch((error)=>{
            console.log(error.message)
            throw new Error(`Error injecting data to ${apiUrl}: ${error.message}`);
            
        });
    }

}