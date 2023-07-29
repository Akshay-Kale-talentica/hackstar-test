import { EmployeeTechnicalRequest } from 'models/EmployeeTechnicalRequest';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { EmployeeAreaOfInterestMapping, Skill } from '@prisma/client';
import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';

interface Params {
  id: number;
}

export async function POST(req: Request, { params }: { params: Params }) {
  const employeeId = +(params.id ?? '');
  const { skills, areasOfInterest } = (await req.json()) as EmployeeTechnicalRequest;
  try {
    if (skills && skills.length > 0) {
      const rowsToBeAdded: Skill[] = [];
      skills.forEach((Skill: string) => {
        rowsToBeAdded.push({ employeeId: employeeId, technologyId: Skill });
      });
      await prisma.skill.createMany({
        data: rowsToBeAdded,
      });
    }
    if (areasOfInterest && areasOfInterest.length > 0) {
      const rowsToBeAdded: EmployeeAreaOfInterestMapping[] = [];
      areasOfInterest.forEach((areaOfInterest: string) => {
        rowsToBeAdded.push({ employeeId: employeeId, technologyId: areaOfInterest });
      });
      await prisma.employeeAreaOfInterestMapping.createMany({
        data: rowsToBeAdded,
      });
    }
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR, error } as ErrorResponseInterface, {
      status: 500,
    });
  }
}
