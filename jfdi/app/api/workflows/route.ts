import { NextResponse } from 'next/server'

type Workflow = {
  id: number
  name: string
  steps: string[]
}

let workflows: Workflow[] = []

export async function GET() {
  return NextResponse.json(workflows)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newWorkflow: Workflow = {
    id: workflows.length + 1,
    name: body.name,
    steps: body.steps,
  }
  workflows.push(newWorkflow)
  return NextResponse.json(newWorkflow, { status: 201 })
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'GET, POST',
    },
  })
}