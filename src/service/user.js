export const saveUser = async(user) => {
    localStorage.setItem("user", JSON.stringify(user));
}


export const deleteUser = async(user) => {
    localStorage.removeItem("user");
}