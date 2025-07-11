import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '3', 10);
    const skip = (page - 1) * limit;

    const categoryId = searchParams.get('categoryId');
    const keywords = searchParams.get('keywords');

    const filters = {};

    if (categoryId) {
      filters.categoryId = parseInt(categoryId, 10);
    }

    if (keywords) {
      const keywordArray = keywords.split(' ').filter(Boolean);
      filters.OR = keywordArray.map((keyword) => ({
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ],
      }));
    }

    const totalItems = await prisma.product.count({
      where: filters,
    });

    const items = await prisma.product.findMany({
      where: filters,
      skip,
      take: limit,
      include: { category: true },
    });

    return NextResponse.json({
      items,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        images: body.images,
        category: {
          connect: {
            id: parseInt(body.categoryId, 10),
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 },
    );
  }
}
