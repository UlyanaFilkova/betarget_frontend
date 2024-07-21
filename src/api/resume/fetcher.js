import axios from "axios";

/**
 * Asynchronously fetches resumes based on vacancyId and resumeStatus.
 *
 * @param {string} vacancyId - The ID of the vacancy to fetch resumes for.
 * @param {string} [resumeStatus=undefined] - The status of the resumes to fetch.
 * @return {Promise} A Promise that resolves to the fetched data.
 */
export const fetchResumes = async (vacancyId, resumeStatus) => {
    try {
      const params = new URLSearchParams({ vacancy_id: vacancyId, resume_status: resumeStatus });
      const response = await axios.get(`/server/api/v1/resume?${params.toString()}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error)
    }
  };
  
