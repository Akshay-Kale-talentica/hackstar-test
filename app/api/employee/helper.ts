import { Technology } from '@prisma/client';
import { TechnologyDto } from 'models/TechnologyDto';

export const technologiesListToTechnologyDtoList = (technologies: Technology[]): TechnologyDto[] => {
  return technologies.map((technology) => technologyToTechnologyDto(technology));
};

export const technologyToTechnologyDto = (technology: Technology): TechnologyDto => {
  return {
    ...technology,
  };
};
