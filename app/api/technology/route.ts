import { AddTechnologyRequest } from 'models/AddTechnology';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ErrorResponseInterface } from 'models/ErrorResponseInterface';
import { INTERNAL_SERVER_ERROR } from '@/app/AppConstants';

export async function POST(req: Request) {
  const { name, description } = (await req.json()) as AddTechnologyRequest;
  try {
    const technology = await prisma.technology.create({
      data: {
        name,
        description,
      },
    });
    return NextResponse.json(technology);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR } as ErrorResponseInterface, { status: 500 });
  }
}
