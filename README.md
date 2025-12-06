# Mock Data Forge 🔥

A Node.js API service for generating and injecting mock data into any REST API endpoint. Perfect for testing, development, and load testing your backend services.

## Features

- Generate mock data based on custom schemas
- Support for multiple data types: `string`, `integer`, `float`, `boolean`, `uuid`, `email`, `date`
- Enum support for predefined values
- Range support for numbers with `(min,max)` syntax
- Nested objects and arrays
- Batch injection to any API endpoint

## Tech Stack

- Node.js
- Express.js
- Axios
- ES6 Modules

## Installation

1. Clone the repository 

2. Install dependencies
```
npm install
```

3. Create a `.env` file
```
PORT=<your-port>
```

4. Start the server
```
npm run dev
```

## API Endpoints

### Generate Mock Data
`POST /api/generate`

Generate mock data based on a schema without sending it anywhere.

### Inject Mock Data
`POST /api/inject`

Generate and send mock data to a specified API endpoint.

**Request Body:**
{
"injections": 5,
"apiUrl": "http://localhost:3000/test",
"schema": {
"id": "uuid",
"name": "string",
"email": "email",
"age": "integer(18,60)",
"city": "string[Mumbai,Delhi,Bangalore,Pune]",
"isActive": "boolean"
}
}

## Schema Format

- **String**: `"string"` or `"string[option1,option2]"` for enums
- **Numbers**: `"integer(min,max)"` or `"float(min,max)"`
- **Boolean**: `"boolean"`
- **UUID**: `"uuid"`
- **Email**: `"email"`
- **Date**: `"date"`
- **Nested Objects**: Standard JSON object notation
- **Arrays**: `["count", schema]` where count is number of items

## Example Usage

curl -X POST http://localhost:3000/api/inject
-H "Content-Type: application/json"
-d '{
"injections": 10,
"apiUrl": "https://your-api.com/endpoint",
"schema": {
"id": "uuid",
"username": "string",
"age": "integer(18,65)"
}
}'

## License

MIT
