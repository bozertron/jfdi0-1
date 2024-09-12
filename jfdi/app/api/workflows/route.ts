import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { SharedWorkflow } from '@/lib/db/sharedSchema';
import { PersonalWorkflow } from '@/lib/db/userSchema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const isShared = searchParams.get('shared') === 'true';

  await dbConnect();

  try {
    let workflows;
    if (isShared) {
      workflows = await SharedWorkflow.find();
    } else {
      if (!userId) {
        return NextResponse.json({ error: "UserId is required for personal workflows" }, { status: 400 });
      }
      workflows = await PersonalWorkflow.find({ userId });
    }
    return NextResponse.json(workflows);
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return NextResponse.json({ error: "Failed to fetch workflows" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const isShared = searchParams.get('shared') === 'true';

  await dbConnect();

  try {
    const body = await request.json();
    
    if (!body.name || !Array.isArray(body.steps) || body.steps.length === 0) {
      return NextResponse.json({ error: "Invalid workflow data" }, { status: 400 });
    }

    let newWorkflow;
    if (isShared) {
      newWorkflow = new SharedWorkflow({
        name: body.name,
        description: body.description,
        steps: body.steps,
        createdBy: userId
      });
    } else {
      if (!userId) {
        return NextResponse.json({ error: "UserId is required for personal workflows" }, { status: 400 });
      }
      newWorkflow = new PersonalWorkflow({
        userId,
        name: body.name,
        description: body.description,
        steps: body.steps
      });
    }

    await newWorkflow.save();
    return NextResponse.json(newWorkflow, { status: 201 });
  } catch (error) {
    console.error("Error creating workflow:", error);
    return NextResponse.json({ error: "Failed to create workflow" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'GET, POST',
    },
  });
}