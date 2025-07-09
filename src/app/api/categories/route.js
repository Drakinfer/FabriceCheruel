import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const limit = 5;

  const rawPage = parseInt(searchParams.get('page'));
  const page = isNaN(rawPage) || rawPage < 0 ? 0 : rawPage;
  const skip = page * limit;

  try {
    const [total, categories] = await Promise.all([
      prisma.category.count(),
      prisma.category.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
    ]);

    return Response.json({
      categories,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Erreur dans la récupération des catégories :', error);
    return new Response('Erreur serveur', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const category = await prisma.category.create({
      data: {
        name: body.name,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 },
    );
  }
}
