import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { projectMatcher } from 'services/langchain/projectMatcher';
import { ProjectRequestInterface } from 'models/ProjectRequest';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  const { description } = (await req.json()) as ProjectRequestInterface;
  const techs = (await prisma.technology.findMany()).map(tech => tech.name);  
  const response = await projectMatcher({description, techs});
  const arr = response.replace(/\[|\]/g, '').split(',');
  const technologies = await prisma.technology.findMany({
    where: {
      name: {
        in: arr
      }
    }
  })
  const techIds = technologies.map((technology) => technology.id);
  const employeeIdSkillMappings = await prisma.skill.findMany({
    where: {
      technologyId: {
        in: techIds
      }
    }
  })
  const employeeIds = employeeIdSkillMappings.map((mapping) => mapping.employeeId).filter((value, index, self) => self.indexOf(value) === index);
  const employees = await prisma.employee.findMany({
    where: {
      id: {
        in: employeeIds
      }
    },
    take: 5,
  })
  
  return NextResponse.json(employees);
}