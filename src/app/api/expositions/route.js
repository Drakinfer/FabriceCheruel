import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const expos = await prisma.exposition.findMany();
    return NextResponse.json(expos);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch expositions' },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const exposition = await prisma.exposition.create({
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country,
        image: body.image,
        date: new Date(body.date),
      },
    });
    return NextResponse.json(exposition);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create exposition' },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const updated = await prisma.exposition.update({
      where: { id: body.id },
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country,
        image: body.image,
        date: new Date(body.date),
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update exposition' },
      { status: 500 },
    );
  }
}
