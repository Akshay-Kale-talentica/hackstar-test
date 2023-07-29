import { ProjectDto } from 'models/ProjectDto';
import { TechnologyDto } from 'models/TechnologyDto';

export interface EmployeeProjectDto {
  project?: ProjectDto;
  startDate?: string;
  endDate?: string;
  achievement?: string;
  responsibilities?: string;
}
