const validateDataUser = (data) => {
    const { name, email, password, profile_picture } = data;
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/~`|\\]).{6,}$/;

    if(profile_picture&&!urlRegex.test(profile_picture)){
        throw new Error("Image link is not valid");
    }
    if(name&&typeof name !=="string"){
        throw new Error("Name is not valid");
    }
    if(!emailRegex.test(email)){
        throw new Error("Email is not valid");
    }
    if(password&&!passwordRegex.test(password)){
        throw new Error("Password is not valid");
    }
    return true;
}
module.exports = validateDataUser;
