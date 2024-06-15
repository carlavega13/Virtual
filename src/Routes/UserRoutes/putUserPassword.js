const putUserPassword=async(req,res)=>{
try {
    res.status(200).json({response:""})
} catch (error) {
    res.status(200).json({error:error.message})
}
}
module.exports=putUserPassword
