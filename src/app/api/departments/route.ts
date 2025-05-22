import { NextResponse } from 'next/server';
import { Department } from '../../types';

// In-memory storage (replace with database later)
let departments: Department[] = [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Marketing' },
];

export async function GET() {
    return NextResponse.json(departments);
}

export async function POST(request: Request) {
    const { name } = await request.json();
    if (typeof name === 'string' && name.trim()) {
        const newDepartment: Department = { id: departments.length + 1, name };
        departments.push(newDepartment);
        return NextResponse.json(departments, { status: 201 });
    }
    return NextResponse.json({ error: 'Invalid department name' }, { status: 400 });
}