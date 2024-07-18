import axios from "axios";
import qs from 'qs';
import User from "@/models/user.js";


/**
 * Registers a user by sending a POST request to the register endpoint with the provided data.
 *
 * @param {Object} data - The user data to be registered.
 * @return {Promise<User>} A promise that resolves to a User object representing the registered user.
 * @throws {Error} If there is an error during the registration process.
 */
export const fetchAuthRegister = async (data) => {
    try {
        const response = await axios.post("/server/auth/register", data, {
            headers: { "Content-Type": "application/json" },
        })
        let user = new User(response.data);
        return user;
    } catch (error) {
        console.error("Error to register user", error);
    }
}


/**
 * Fetches user login information by sending a POST request to the login endpoint.
 *
 * @param {Object} data - The user data for login.
 * @return {Boolean} True if the login response status is 200 or 204, false otherwise.
 */
export const fetchAuthLogin = async (data) => {
    try {
        const response = await axios.post("/server/auth/login", qs.stringify(data), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        return [200, 204].includes(response.status);        ;
    } catch (error) {
        console.error("Error to login user", error);
    }
}


/**
 * Fetches the authorization URL for Google authentication.
 *
 * @return {Promise<string>} The authorization URL.
 * @throws {Error} If there is an error during the authentication process.
 */
export const fetchAuthGoogle = async () => {
    try {
        const response = await axios.get("/server/auth/google/authorize", {
            headers: { "Content-Type": "application/json" },
        })
        const data = response.data;
        return data.authorization_url;
    } catch (error) {
        console.error("Error to login user", error);
    }
}