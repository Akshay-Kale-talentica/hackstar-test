import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';
import { projectToProjectDto } from '@/app/api/employee/[id]/project/helper';
import { technologiesListToTechnologyDtoList } from '@/app/api/employee/helper';
import prisma from '@/lib/prisma';
import { Project } from '@prisma/client';
import { AddEmployeeRequestInterface } from 'models/AddEmployeeRequest';
import { EmployeeDto } from 'models/EmployeeDto';
import { EmployeeProjectDto } from 'models/EmployeeProjectDto';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, gender, designation, yearsOfExperience } = (await req.json()) as AddEmployeeRequestInterface;
  const exists = await prisma.employee.findFirst({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ message: 'Employee already exisis with same email' } as ErrorResponseInterface, {
      status: 400,
    });
  }
  try {
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        gender,
        designation,
        yearsOfExperience,
      },
    });
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR, error } as ErrorResponseInterface, {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = +(searchParams.get('id') ?? '');
  try {
    const employeeDto = await getEmployeeDto(id);
    if (employeeDto === null) {
      return NextResponse.json({ message: 'Employee not found' } as ErrorResponseInterface, { status: 404 });
    }
    return NextResponse.json(employeeDto);
  } catch (error) {
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR } as ErrorResponseInterface, { status: 500 });
  }
}

export async function getEmployeeDto(id: number): Promise<EmployeeDto> {
  const employee = await prisma.employee.findFirst({
    where: {
      id: id,
    },
    include: {
      skills: true,
      EmployeeAreaOfInterestMapping: true,
    },
  });
  const skillsTechnologIdsList = employee?.skills.map(({ technologyId }) => technologyId);
  const areasOfInterestTechIdsList = employee?.EmployeeAreaOfInterestMapping.map(({ technologyId }) => technologyId);
  const skillTechnologies = await prisma.technology.findMany({
    where: {
      id: { in: skillsTechnologIdsList },
    },
  });
  const aoiTechnologiesList = await prisma.technology.findMany({
    where: {
      id: { in: areasOfInterestTechIdsList },
    },
  });
  const employeeProjects = await prisma.employeeProjectMapping.findMany({
    where: {
      employeeId: id,
    },
  });
  let employeeProjectDtos: EmployeeProjectDto[] = [];
  for (const employeeProject of employeeProjects) {
    const project = await prisma.project.findUnique({
      where: {
        id: employeeProject.projectId,
      },
    });
    employeeProjectDtos.push({
      project: projectToProjectDto(project ?? ({} as Project)),
      achievement: employeeProject.achievement,
      responsibilities: employeeProject.responsibilities,
      startDate: employeeProject.startDate.toString(),
      endDate: employeeProject.endDate?.toString(),
    });
  }
  return {
    id: employee?.id,
    name: employee?.name,
    email: employee?.email,
    gender: employee?.gender,
    designation: employee?.designation,
    yearsOfExperience: employee?.yearsOfExperience,
    skills: technologiesListToTechnologyDtoList(skillTechnologies),
    areasOfInterest: technologiesListToTechnologyDtoList(aoiTechnologiesList),
    projects: employeeProjectDtos,
  };
}
