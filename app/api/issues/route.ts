import { NextRequest, NextResponse } from "next/server";
import {Prisma, PrismaClient} from '@prisma/client';
import { createIssueSchema } from "@/app/validationSchemas";

const prisma = new PrismaClient();

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