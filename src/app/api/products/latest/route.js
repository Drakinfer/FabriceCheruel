import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const latest = await prisma.product.findFirst({
      orderBy: { id: 'desc' },
      include: { category: true },
    });
    return NextResponse.json(latest);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch latest product' },
      { status: 500 },
    );
  }
}
