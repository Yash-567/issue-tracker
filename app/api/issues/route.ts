import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import {Prisma, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST (request: NextRequest){
    try {
        const body = await request.json();

        // Validate the request body
        const validation = createIssueSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        // Create a new issue in the database
        const createdIssue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description
            }
        });

        // Return the created issue
        return NextResponse.json(createdIssue, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest){
    return NextResponse.json("Hello from issues", {status: 200})
}