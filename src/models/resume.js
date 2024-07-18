export default class Resume {
  constructor(data) {
    this.candidate = {
      about: data.candidate.about,
      age: data.candidate.age,
      city: data.candidate.city,
      email: data.candidate.email,
      firstName: data.candidate.first_name,
      gender: data.candidate.gender,
      github: data.candidate.github,
      id: data.candidate.id,
      lastName: data.candidate.last_name,
      linkedin: data.candidate.linkedin,
      phoneNumber: data.candidate.phone_number,
      profilePicture: data.candidate.profile_picture,
      telegram: data.candidate.telegram,
      whatsapp: data.candidate.whatsapp,
    };

    this.education = data.education;
    this.expectedSalary = data.expected_salary;
    this.experience = data.experience;
    this.id = data.id;
    this.interestInJob = data.interest_in_job;
    this.jobTitle = data.job_title;
    this.rating = data.rating;
    this.readyForBusinessTrips = data.ready_for_business_trips;
    this.readyToRelocate = data.ready_to_relocate;
    this.resumeStage = data.resume_stage;
    this.skills = data.skills;
  }
}
