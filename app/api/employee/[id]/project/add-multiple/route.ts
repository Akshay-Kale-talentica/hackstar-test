import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';
import { addEmployeeProject } from '@/app/api/employee/[id]/project/route';
import { EmployeeProjectRequest } from 'models/EmployeeProjectRequest';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';
import { NextResponse } from 'next/server';

interface Params {
  id: number;
}

export async function POST(req: Request, { params }: { params: Params }) {
  const addProjectRequests = (await req.json()) as EmployeeProjectRequest[];
  const employeeId = +(params.id ?? '');
  try {
    for (const req of addProjectRequests) {
      await addEmployeeProject(req, employeeId);
    }
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error, message: INTERNAL_SERVER_ERROR } as ErrorResponseInterface, { status: 500 });
  }
}
