import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllDevelopers = async (req: Request, res: Response) => {
  try {
    const developers = await prisma.user.findMany({
      where: { role: 'developer' },
      include: { projects: true },
    });
    res.json(developers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch developers' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { title, description, imageUrl, userId } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        userId,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};