import { EmployeeSignInRequest } from 'models/EmployeeSIgnInRequest';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';
import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';
import { SignInResponse } from 'models/SignInResponse';

export async function POST(req: Request) {
  const { id } = (await req.json()) as EmployeeSignInRequest;
  try {
    const employee = await prisma.employee.findFirst({
      where: {
        id,
      },
    });
    if (employee) return NextResponse.json({ isLoggedIn: true, employeeId: employee.id } as SignInResponse);
    return NextResponse.json({ message: 'User not found' } as ErrorResponseInterface, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR } as ErrorResponseInterface, { status: 500 });
  }
}
