import axios from "axios";


/**
 * Fetches vacancies from the server API.
 *
 * @return {Promise<Array>} The data containing the vacancies.
 * @throws {Error} If there is an error fetching the vacancies.
 */
export const fetchVacancies = async () => {
    try {
      const response = await axios.get("/server/api/v1/vacancy", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching vacancies", error);
    }
  };