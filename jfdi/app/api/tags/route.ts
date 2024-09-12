import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Tag } from '@/lib/db/userSchema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const llm = searchParams.get('llm');
  const project = searchParams.get('project');
  const task = searchParams.get('task');

  await dbConnect();

  try {
    const query: any = { userId };
    if (llm) query.llm = llm;
    if (project) query.project = project;
    if (task) query.task = task;

    const tags = await Tag.find(query);
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    
    if (!body.userId || !body.llm || !body.project || !body.task || !body.name || !body.value) {
      return NextResponse.json({ error: "Invalid tag data" }, { status: 400 });
    }

    const newTag = new Tag(body);
    await newTag.save();
    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const tagId = searchParams.get('id');

  await dbConnect();

  try {
    const body = await request.json();
    const updatedTag = await Tag.findByIdAndUpdate(tagId, body, { new: true });
    
    if (!updatedTag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTag);
  } catch (error) {
    console.error("Error updating tag:", error);
    return NextResponse.json({ error: "Failed to update tag" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const tagId = searchParams.get('id');

  await dbConnect();

  try {
    const deletedTag = await Tag.findByIdAndDelete(tagId);
    
    if (!deletedTag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'GET, POST, PUT, DELETE',
    },
  });
}