export const saveUser = async(user) => {
    localStorage.setItem("user", JSON.stringify(user));
}


export const deleteUser = async() => {
    localStorage.removeItem("user");
}


export const getUser = async() => {
    return JSON.parse(localStorage.getItem("user"));
}