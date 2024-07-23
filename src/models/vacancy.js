export const WorkFormat = Object.freeze({
  OFFICE: 'in office',
  HOME: 'from home',
  HYBRID: 'hybrid',
  DISCUSS: 'discuss'
});


export const Experience = Object.freeze({
  NO_EXPERIENCE: 'no experience',
  UP_TO_1_YEAR: 'up to 1 year',
  BETWEEN_1_AND_3: '1-3 years',
  BETWEEN_3_AND_6: '3-6 years',
  MORE_THAN_6: 'more than 6 years'
});


export const EmploymentType = Object.freeze({
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  INTERNSHIP: 'internship',
  VOLUNTEER: 'volunteer'
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


export default class Vacancy {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id;
    this.jobTitle = data.job_title;
    this.city = data.city;
    this.company = data.company;
    this.experience = data.experience;
    this.workFormat = data.work_format;
    this.salary = data.salary;
    this.education = data.education;
    this.employmentType = data.employment_type;
    this.skills = data.skills;
    this.description = data.description;
    this.createdAt = data.created_at;
    this.expirationDate = data.expiration_date;
  }
}
