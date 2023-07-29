import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';
import prisma from '@/lib/prisma';
import { ProjectTechnologyMapping } from '@prisma/client';
import { AddProjectRequest } from 'models/AddProjectRequest';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';
import { NextResponse } from 'next/server';
import { ProjectDto } from 'models/ProjectDto';
import { technologiesListToTechnologyDtoList } from '@/app/api/employee/helper';

export async function POST(req: Request) {
  const { name, description, status, startDate, endDate, technologyIds } = (await req.json()) as AddProjectRequest;
  const exists = await prisma.project.findFirst({
    where: {
      name,
    },
  });
  if (exists) {
    return NextResponse.json({ message: 'A Project already exisis with same name' } as ErrorResponseInterface, {
      status: 400,
    });
  }
  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        createdDate: new Date(),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    if (technologyIds && technologyIds.length > 0) {
      const rowsToBeAdded: ProjectTechnologyMapping[] = [];
      technologyIds.forEach((technologyId: string) => {
        rowsToBeAdded.push({ projectId: project.id, technologyId });
      });
      await prisma.projectTechnologyMapping.createMany({
        data: rowsToBeAdded,
      });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR, error } as ErrorResponseInterface, {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') ?? '';
  try {
    const projectDto = await getProjectDto(id);
    if (projectDto === null) {
      return NextResponse.json({ message: 'Project not found' } as ErrorResponseInterface, { status: 404 });
    }
    return NextResponse.json(projectDto);
  } catch (error) {
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR } as ErrorResponseInterface, { status: 500 });
  }
}

export async function getProjectDto(id: string): Promise<ProjectDto> {
  const project = await prisma.project.findFirst({
    where: {
      id,
    },
    include: {
      ProjectTechnologyMapping: true,
    },
  });
  const technologyIdsList = project?.ProjectTechnologyMapping.map(({ technologyId }) => technologyId);
  const technologies = await prisma.technology.findMany({
    where: {
      id: { in: technologyIdsList },
    },
  });
  return {
    id: project?.id,
    name: project?.name,
    description: project?.description,
    startDate: project?.startDate.toString(),
    endDate: project?.endDate.toString(),
    createdDate: project?.createdDate.toString(),
    technologies: technologiesListToTechnologyDtoList(technologies),
  };
}

export async function getTechnologyDtoListByProjectId(id: string) {}
