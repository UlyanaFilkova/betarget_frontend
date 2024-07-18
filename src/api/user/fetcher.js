import axios from "axios";


/**
 * Fetches whether a user exists based on the provided data.
 *
 * @param {Object} data - An object containing the user's data.
 * @return {Promise<boolean>} A promise that resolves to true if the user exists, false otherwise.
 * @throws {Error} If there is an error during the API request.
 */
export const fetchUserExists = async (data) => {
    const params = new URLSearchParams(data).toString();
    try {
        const response = await axios.get(`/server/api/v1/user/is_exists?${params}`, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        let is_exists_by_username = false;
        let is_exists_by_email = false;
        if (response.data) {
            if ("is_exists_by_username" in response.data) {
                is_exists_by_username = response.data.is_exists_by_username;
            }
            if ("is_exists_by_email" in response.data) {
                is_exists_by_email = response.data.is_exists_by_email;
            }
        }
        if (is_exists_by_username || is_exists_by_email) {
            return true;
        } else {
            return false;
        } 
    } catch (error) {
        console.error("Error to check if user exists", error);
        return false;
    }
}


export const fetchUserMyData = async () => {
    try {
        const response = await axios.get("/server/api/v1/user/my_data", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error to fetch user data", error);
    }
}