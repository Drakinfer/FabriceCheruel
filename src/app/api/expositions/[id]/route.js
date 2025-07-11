import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { name, address, city, postalCode, country, image, date } = body;

    const updated = await prisma.exposition.update({
      where: { id: parseInt(params.id, 10) },
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

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Erreur PUT exposition:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la modification de l’exposition.' },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.exposition.delete({
      where: { id: parseInt(params.id, 10) },
    });

    return NextResponse.json({ message: 'Exposition supprimée avec succès' });
  } catch (error) {
    console.error('Erreur DELETE exposition:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l’exposition.' },
      { status: 500 },
    );
  }
}
