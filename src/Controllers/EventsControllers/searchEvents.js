const searchEvents=(info)=>{
try {
    return info
} catch (error) {
    throw Error(error.message)
}
}
module.exports=searchEvents