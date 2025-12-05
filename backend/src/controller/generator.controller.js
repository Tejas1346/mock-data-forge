import { generate } from '../service/GeneratorService.js';
export const generateData=(req,res)=>{
    try {
        const schema  = req.body;
        
        if (!schema || typeof schema !== 'object') {
        return res.status(400).json({
            success: false,
            error: 'Schema is required and must be an object'
        });
        }
        const data = generate(schema);
        
        res.json(data);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
          });
    }
}