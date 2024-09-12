import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { CompanyData } from '@/lib/db/sharedSchema';

export async function GET() {
  await dbConnect();

  try {
    const companyData = await CompanyData.find();
    return NextResponse.json(companyData);
  } catch (error) {
    console.error("Error fetching company data:", error);
    return NextResponse.json({ error: "Failed to fetch company data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    
    if (!body.name || !body.value) {
      return NextResponse.json({ error: "Invalid company data" }, { status: 400 });
    }

    const newCompanyData = new CompanyData(body);
    await newCompanyData.save();
    return NextResponse.json(newCompanyData, { status: 201 });
  } catch (error) {
    console.error("Error creating company data:", error);
    return NextResponse.json({ error: "Failed to create company data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const dataId = searchParams.get('id');

  await dbConnect();

  try {
    const body = await request.json();
    const updatedCompanyData = await CompanyData.findByIdAndUpdate(dataId, body, { new: true });
    
    if (!updatedCompanyData) {
      return NextResponse.json({ error: "Company data not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCompanyData);
  } catch (error) {
    console.error("Error updating company data:", error);
    return NextResponse.json({ error: "Failed to update company data" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const dataId = searchParams.get('id');

  await dbConnect();

  try {
    const deletedCompanyData = await CompanyData.findByIdAndDelete(dataId);
    
    if (!deletedCompanyData) {
      return NextResponse.json({ error: "Company data not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Company data deleted successfully" });
  } catch (error) {
    console.error("Error deleting company data:", error);
    return NextResponse.json({ error: "Failed to delete company data" }, { status: 500 });
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