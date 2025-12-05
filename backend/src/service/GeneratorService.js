import { faker } from '@faker-js/faker';
import typeMapper from '../utils/typeMapper.js';

// Main function to generate data based on schema
export const generate = (schema) => {
  const record = {};
  
  for (const field in schema) {
    if (schema.hasOwnProperty(field)) {
        // Check if the field is an array
        if(Array.isArray(schema[field])){
            record[field] = generateArray(schema[field]);
            
        }
        
        // recursive call for the nested object
        else if(typeof schema[field] === 'object'){
            record[field] = generate(schema[field]);
            
        }
        
        // Simple type
        else{
             record[field] = typeMapper.getValue(schema[field]);
            }
            
        }
    }
    return record;
  }
  
  

// function for generatingArray in request
const generateArray = (item) => {
    const size = item[0];
    const element = item[1];
    const arr = []; 
    for(let i=0;i<size;i++){
        if(typeof element === 'object'){
            arr.push(generate(element));
        }
        else if(Array.isArray(element)){
            arr.push(generateArray(element));
        }
        else{
            arr.push(typeMapper.getValue(element));
        }
    }
    return arr;
}




