

export const asynchandler = (API) =>{
   return (req,res,next) => {
        API(req,res,next).catch((err)=>{
            console.log(err)
            res.status(500).json({message: 'Fail'})
        })
    }
} 