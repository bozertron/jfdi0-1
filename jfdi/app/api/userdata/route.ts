import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { UserData } from '@/lib/db/userSchema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const name = searchParams.get('name');

  await dbConnect();

  try {
    const query: any = { userId };
    if (name) query.name = name;

    const userData = await UserData.find(query);
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    
    if (!body.userId || !body.name || !body.value) {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    const newUserData = new UserData(body);
    await newUserData.save();
    return NextResponse.json(newUserData, { status: 201 });
  } catch (error) {
    console.error("Error creating user data:", error);
    return NextResponse.json({ error: "Failed to create user data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const userDataId = searchParams.get('id');

  await dbConnect();

  try {
    const body = await request.json();
    const updatedUserData = await UserData.findByIdAndUpdate(userDataId, body, { new: true });
    
    if (!updatedUserData) {
      return NextResponse.json({ error: "User data not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUserData);
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ error: "Failed to update user data" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userDataId = searchParams.get('id');

  await dbConnect();

  try {
    const deletedUserData = await UserData.findByIdAndDelete(userDataId);
    
    if (!deletedUserData) {
      return NextResponse.json({ error: "User data not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user data:", error);
    return NextResponse.json({ error: "Failed to delete user data" }, { status: 500 });
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