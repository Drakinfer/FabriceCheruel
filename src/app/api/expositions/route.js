import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 3;
  const skip = Math.max((page - 1) * limit, 0);
  const keyword = searchParams.get('keywords')?.trim() || '';

  const where = keyword
    ? {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      }
    : {};

  const [total, expos] = await Promise.all([
    prisma.exposition.count({ where }),
    prisma.exposition.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: 'desc' },
    }),
  ]);

  return NextResponse.json({ items: expos, total });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, address, city, postalCode, country, image, date } = body;

    const created = await prisma.exposition.create({
      data: {
        name,
        address,
        city,
        postalCode,
        country,
        image,
        date: new Date(date),
        description,
      },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error('Erreur POST exposition:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l’exposition.' },
      { status: 500 },
    );
  }
}
