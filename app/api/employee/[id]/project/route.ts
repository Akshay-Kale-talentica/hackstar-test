import { EmployeeProjectRequest } from 'models/EmployeeProjectRequest';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';
import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';

interface Params {
  id: number;
}

export async function POST(req: Request, { params }: { params: Params }) {
  const employeeId = +(params.id ?? '');
  const request = (await req.json()) as EmployeeProjectRequest;
  try {
    await addEmployeeProject(request, employeeId);
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error, message: INTERNAL_SERVER_ERROR } as ErrorResponseInterface, { status: 500 });
  }
}

export async function addEmployeeProject(employeeProjectRequest: EmployeeProjectRequest, employeeId: number) {
  const { projectId, startDate, endDate, achievement, responsibilities } = employeeProjectRequest;
  await prisma.employeeProjectMapping.create({
    data: {
      projectId,
      employeeId,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      achievement,
      responsibilities,
    },
  });
}
