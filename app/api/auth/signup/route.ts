import { EmployeeSignUpRequest } from 'models/EmployeeSignUpRequest';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';

export async function POST(req: Request) {
  const { name, email } = (await req.json()) as EmployeeSignUpRequest;
  if (!name || !email)
    return NextResponse.json({ message: 'Name or email cannot be null' } as ErrorResponseInterface, {
      status: 404,
    });
  const exists = await prisma.employee.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });
  if (exists) {
    return NextResponse.json({ message: 'User with email already exists' } as ErrorResponseInterface, {
      status: 409,
    });
  }
  try {
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
      },
    });
    return NextResponse.json({ ...employee, isLoggedIn: true });
  } catch (error) {}
}
