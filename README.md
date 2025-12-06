# Mock Data Forge 🔥

A Node.js API service for generating and injecting mock data into any REST API endpoint. Perfect for testing, development, and load testing your backend services.

## Features

- Generate mock data based on custom schemas
- Support for multiple data types: `string`, `integer`, `float`, `boolean`, `uuid`, `email`, `date`
- Enum support for predefined values
- Range support for numbers with `(min,max)` syntax and strings with `(minLength,maxLength)`
- Nested objects and arrays
- Batch injection to any API endpoint

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
- Sample request
```
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
```
## Schema Format

- **String**: `"string"` or `"string[option1,option2]"` for enums or `"string(minLength,maxLength)"` for ranges
- **Numbers**: `"integer(min,max)"` or `"float(min,max)"`
- **Boolean**: `"boolean"`
- **UUID**: `"uuid"`
- **Email**: `"email"`
- **Date**: `"date"`
- **Nested Objects**: Standard JSON object notation
- **Arrays**: `["count", schema]` where count is number of items
- Sample Request
```
{
    "id": "uuid",
    "username": "string(5,15)",
    "email": "email",
    "age": "integer(18,60)",
    "salary": "float(30000.0,100000.0)",
    "city": "string[Mumbai,Delhi,Bangalore]",
    "isActive": "boolean",
    "joinDate": "date",
    "address": {
      "street": "string(10,50)",
      "zipCode": "integer(100000,999999)"
    },
    "tags": ["3", "string[developer,designer,manager]"],
    "projects": ["2", {
      "project_id": "uuid",
      "title": "string(8,30)",
      "status": "string[active,completed]"
    }]
}
```
- Sample Output
```
{
    "id": "392bc132-5dc3-47ac-a903-b8aa7af81ce1",
    "username": "KNOBovtvI",
    "email": "Ted.Crooks31@hotmail.com",
    "age": 51,
    "salary": 93568.55665195886,
    "city": "Mumbai",
    "isActive": true,
    "joinDate": "2025-10-29T15:00:55.591Z",
    "address": {
        "street": "reSaHVuHQurNrLvAiIPFWQSXq",
        "zipCode": 473337
    },
    "tags": [
        "developer",
        "developer",
        "designer"
    ],
    "projects": [
        {
            "project_id": "71630767-e8db-45c6-a811-49edc7311029",
            "title": "wteHlMfaLYvJ",
            "status": "completed"
        },
        {
            "project_id": "3218eeea-13ae-48d3-b1f8-6a18019c0349",
            "title": "RLjcfUOGoMlWjO",
            "status": "active"
        }
    ]
}
```
## Example Usage
```
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
```

