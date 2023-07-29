import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';
import { getProjectDto } from '@/app/api/project/route';
import prisma from '@/lib/prisma';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';
import { ProjectDto } from 'models/ProjectDto';
import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  try {
    const allProjectsOnlyIds = await prisma.project.findMany({
      select: {
        id: true,
      },
    });
    const allProjects: ProjectDto[] = [];
    for (const id of allProjectsOnlyIds) {
      const project = await getProjectDto(id.id);
      allProjects.push(project);
    }
    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR } as ErrorResponseInterface, { status: 500 });
  }
}
