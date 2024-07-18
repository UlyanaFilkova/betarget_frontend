export const saveUser = async(user) => {
    localStorage.setItem("user", JSON.stringify(user));
}


export const deleteUser = async() => {
    localStorage.removeItem("user");
}


export const getUser = async() => {
    return JSON.parse(localStorage.getItem("user"));
}


export const saveLocale = (locale) => {
    localStorage.setItem("user-locale", locale);
}


export const getLocale = () => { 
    return localStorage.getItem("user-locale");
}