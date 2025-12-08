import { faker } from '@faker-js/faker';

// Mapping of non enum types
const typeMap = {
  // Primitive types
  'string': () => faker.lorem.word(),
  'integer': () => faker.number.int({ min: 1, max: 1000 }),
  'float': () => faker.number.float({ min: 0, max: 1000, precision: 0.01 }),
  'boolean': () => faker.datatype.boolean(),
  'company':()=>faker.company.name(),
  'address':()=>faker.location.streetAddress(),
  
  // Semantic types
  'name': () => faker.person.fullName(),
  'email': () => faker.internet.email(),
  'phone': () => faker.phone.number(),
  'date': () => faker.date.past().toISOString(),
  
  // File types
  'image_url': () => faker.image.url(),
  'file_url': () => faker.internet.url(),
  
  // Identifiers
  'uuid': () => faker.string.uuid(),
};

// Parse inline enum syntax: "string[man,human,wolf]"
const parseEnum = (fieldConfig) => {
  if (typeof fieldConfig !== 'string') return null;
  
  // Match pattern: type[value1,value2,value3]
  const enumPattern = /^(\w+)\[(.*)\]$/;
  const match = fieldConfig.match(enumPattern);
  

  if (!match) return null;
  
  const [, type, enumString] = match;
  
  try {
    // Parse the enum values into an array
    const values = enumString
      .split(',')
      .filter(v => v.length > 0);
    
    if (values.length === 0) {
      throw new Error('Enum must have at least one value');
    }
    
    // data passed to getValue for the array
    return { type, values };
  } catch (error) {
    throw new Error(`Invalid enum syntax: ${fieldConfig}`);
  }
};

const parseRange = (fieldConfig) => {
  if (typeof fieldConfig !== 'string') return null;

  const rangePattern = /^(\w+)\(([^,]+),([^)]+)\)$/;
  const match = fieldConfig.match(rangePattern);
  
  if (!match) return null;
  
  const [, type, minStr, maxStr] = match;
  
  try {
    let min, max;
      if(type === 'integer'){
          min = parseInt(minStr,10);
          max = parseInt(maxStr,10);
          if(isNaN(min) || isNaN(max)){
              throw new Error('Invalid range values for integer');
          }
      }
      else if(type === 'float'){
          min = parseFloat(minStr);
          max = parseFloat(maxStr);
          if(isNaN(min) || isNaN(max)){
              throw new Error('Invalid range values for float');
          }
      }
      else if(type=='string'){
          min = parseInt(minStr,10);
          max = parseInt(maxStr,10);
          if(isNaN(min) || isNaN(max)){
              throw new Error('Invalid range values for string length');
          }
      }
      else{
          throw new Error('Range type must be integer or float');
      }
      
      return { type, min, max};
  } catch (error) {
      throw new Error(`Error parsing range: ${fieldConfig}`);
  }
}

export const getValue = (type) => {
  
  const enumData = parseEnum(type);

  //Check if Enum Type 
  if (enumData) {
    const { type: enumType,values } = enumData;
    if(enumType=='integer'){
        return parseInt(faker.helpers.arrayElement(values),10);
    }
    else if(enumType=='float'){
        return parseFloat(faker.helpers.arrayElement(values));
    }
    return faker.helpers.arrayElement(values);
  }

  //Check if Range Type
  const rangeData = parseRange(type);
  if(rangeData){
      const {type,min,max} = rangeData;
      if(type === 'integer'){
          return faker.number.int({min:min,max:max});
      }
      else if (type==='float') {
          return faker.number.float({min:min,max:max,precision:0.01});
      }
      else{
        return faker.string.alpha({length: {min: min, max: max}});
      }
  }
  //Not Enum Nor Range Type
  const generator = typeMap[type];
  
  if (!generator) {
    throw new Error(`Unknown data type: ${type}`);
  }
  
  return generator();
};

export default { getValue };
