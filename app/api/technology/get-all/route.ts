import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';
import { technologiesListToTechnologyDtoList } from '@/app/api/employee/helper';
import prisma from '@/lib/prisma';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';
import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  try {
    const allTechnologies = await prisma.technology.findMany();
    return NextResponse.json(technologiesListToTechnologyDtoList(allTechnologies));
  } catch (error) {
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR } as ErrorResponseInterface, { status: 500 });
  }
}
