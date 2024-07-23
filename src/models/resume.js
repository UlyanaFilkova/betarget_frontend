export const Gender = Object.freeze({
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other'
});


export const InterestInJob = Object.freeze({
  LOOKING_FOR_JOB: 'looking for job',
  NOT_LOOKING_FOR_A_JOB: 'not looking for a job',
  CONSIDERS_PROPOSALS: 'considers proposals',
  OFFERED_A_JOB_DECIDES: 'offered a job, decides'
});


export const ResumeStage = Object.freeze({
  IN_WORK: 'in_work',
  SCREENING: 'screening',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  REJECTED: 'rejected'
});


export const EducationDegree = Object.freeze({
  INCOMPLETE_PRIMARY: 'incomplete primary',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  INCOMPLETE_SECONDARY: 'incomplete secondary',
  SECONDARY_VOCATIONAL: 'secondary vocational',
  INCOMPLETE_HIGHER: 'incomplete higher',
  HIGHER: 'higher',
  BACHELOR: 'bachelor',
  MASTER: 'master',
  PHD: 'phd'
});


class Candidate {
  constructor(data) {
    this.id = data.id;
    this.about = data.about;
    this.age = data.age;
    this.city = data.city;
    this.email = data.email;
    this.firstName = data.first_name;
    this.gender = data.gender;
    this.github = data.github;
    this.lastName = data.last_name;
    this.linkedin = data.linkedin;
    this.phoneNumber = data.phone_number;
    this.profilePictureUrl = data.profile_picture_url;
    this.telegram = data.telegram;
    this.whatsapp = data.whatsapp;
  }
}


class Education {
  constructor(data) {
    this.id = data.id;
    this.educationalInstitution = data.educational_institution;
    this.year = data.year;
    this.degree = data.degree;
    this.specialization = data.specialization;
  }
}


class Experience {
  constructor(data) {
    this.id = data.id;
    this.company = data.company;
    this.startDate = data.start_date;
    this.endDate = data.end_date;
    this.description = data.description;
  }
}


export default class Resume {
  constructor(data) {
    this.id = data.id;
    this.expectedSalary = data.expected_salary;
    this.interestInJob = data.interest_in_job;
    this.jobTitle = data.job_title;
    this.rating = data.rating;
    this.readyForBusinessTrips = data.ready_for_business_trips;
    this.readyToRelocate = data.ready_to_relocate;
    this.resumeStage = data.resume_status;
    this.skills = data.skills;

    this.candidate = new Candidate(data.candidate);
    this.education = data.educations.map(education => new Education(education));
    this.experience = data.experiences.map(experience => new Experience(experience));
  }
}
