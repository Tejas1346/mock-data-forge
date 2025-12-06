import { inject } from '../service/injectorService.js';
export const injectData=async (req,res)=>{
    try {
        const reqBody = req.body;
        if(!reqBody || typeof reqBody !== 'object'){
            return res.status(400).json({
                success:false,
                error:"Request body is required and must be an object"
            });
        }
        await inject(reqBody);

        res.status(200).json({
            success:true,
            message:"Data injection completed"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
          });
    }
}