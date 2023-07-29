import { Designation, Employee, Gender } from '@prisma/client';
import { EmployeeProjectDto } from 'models/EmployeeProjectDto';
import { TechnologyDto } from 'models/TechnologyDto';

export interface EmployeeDto {
  id?: number;
  name?: string;
  email?: string;
  gender?: Gender | null;
  designation?: Designation | null;
  yearsOfExperience?: number | null;
  skills?: TechnologyDto[];
  areasOfInterest?: TechnologyDto[];
  projects?: EmployeeProjectDto[];
}
