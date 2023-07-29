import { Designation, Gender } from '@prisma/client';

export interface AddEmployeeRequestInterface {
  name: string;
  email: string;
  yearsOfExperience: number;
  designation: Designation;
  gender: Gender;
}
