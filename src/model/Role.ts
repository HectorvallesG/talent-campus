export enum Role{
  Admin = 'ADMIN',
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Recruiter = 'RECRUITER'
}

export type CreateAccountRole = Role.Recruiter | Role.Student