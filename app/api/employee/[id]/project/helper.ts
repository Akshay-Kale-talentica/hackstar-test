import { Project } from '@prisma/client';
import { ProjectDto } from 'models/ProjectDto';

export const projectToProjectDto = (project: Project): ProjectDto => {
  return { ...project };
};
