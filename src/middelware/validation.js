const reqMethods = ['body','query','params','Headers','file','files']

export const validationCoreFunction = (schema) =>{
    return (req,res,next) =>{
        const validationErrorArr = []
        for(const key of reqMethods){
            if(schema[key]){
                const validationResult = schema[key].validate(req[key],{
                    abortEarly:false
                })
                if(validationResult.error){
                    validationErrorArr.push(validationResult.error.details)
                }
            }
        }
        if(validationErrorArr.length){
           return res.status(400).json({message: 'Validation Error', Errors: validationErrorArr})
        }
        next()
    }
}