export const checkJWTExists = () => {
    if (localStorage.getItem("user")) {
        return true;
    }
    return false;
}