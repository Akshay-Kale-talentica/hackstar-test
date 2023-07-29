import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';
import { EmployeeSearchRequest, EmployeeSearchType } from 'models/EmployeeSearchRequest';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { EmployeeSearchResponse } from 'models/EmployeeSearchResponse';
import { getEmployeeDto } from '@/app/api/employee/route';
import { EmployeeDto } from 'models/EmployeeDto';

export async function POST(req: Request) {
  const { searchType, searchValue } = (await req.json()) as EmployeeSearchRequest;
  let employeeDtos: EmployeeDto[] = [];
  try {
    switch (searchType) {
      case EmployeeSearchType.ID:
        const search = +searchValue;
        const employee = await prisma.employee.findFirst({
          where: {
            id: {
              equals: search,
            },
          },
        });
        const employeeDto = await getEmployeeDto(employee?.id ?? 0);
        return NextResponse.json({ employees: [employeeDto] } as EmployeeSearchResponse);
      case EmployeeSearchType.NAME:
        const employees = await prisma.employee.findMany({
          where: {
            name: {
              contains: searchValue,
            },
          },
        });
        for (const emp of employees) {
          employeeDtos.push(await getEmployeeDto(emp.id));
        }
        return NextResponse.json({ employees: [employeeDtos] } as EmployeeSearchResponse);
      case EmployeeSearchType.TECHNOLOGY:
        const technologies = await prisma.technology.findMany({
          where: {
            name: {
              contains: searchValue,
            },
          },
        });
        const technologyIds = technologies.map((tech) => tech.id);
        const skillMappings = await prisma.skill.findMany({
          where: {
            technologyId: {
              in: technologyIds,
            },
          },
        });
        const filteredEmpIds = skillMappings.map((skill) => skill.employeeId);
        const filteredEmployees = await prisma.employee.findMany({
          where: {
            id: {
              in: filteredEmpIds,
            },
          },
          orderBy: {
            yearsOfExperience: 'desc',
          },
        });
        for (const emp of filteredEmployees) {
          employeeDtos.push(await getEmployeeDto(emp.id));
        }
        return NextResponse.json({ employees: [employeeDtos] } as EmployeeSearchResponse);
    }
  } catch (error) {
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR } as ErrorResponseInterface, { status: 500 });
  }
}
