import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id, 10) },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Échec de la récupération du produit' },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const deleted = await prisma.product.delete({
      where: { id: parseInt(params.id, 10) },
    });

    return NextResponse.json({ message: 'Produit supprimé', deleted });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du produit' },
      { status: 500 },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    const updated = await prisma.product.update({
      where: { id: parseInt(params.id, 10) },
      data: {
        name: body.name,
        description: body.description,
        images: body.images,
        category: {
          connect: { id: Number(body.categoryId) },
        },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du produit' },
      { status: 500 },
    );
  }
}
