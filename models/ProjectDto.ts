import { Project } from '@prisma/client';
import { TechnologyDto } from 'models/TechnologyDto';

export interface ProjectDto {
  id?: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  createdDate?: string;
  technologies?: TechnologyDto[];
}
