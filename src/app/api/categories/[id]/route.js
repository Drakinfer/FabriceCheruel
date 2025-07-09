import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ✅ PUT : Modifier une catégorie
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updated = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PUT /categories/:id]', err);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 },
    );
  }
}

// ✅ DELETE : Supprimer une catégorie
export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    await prisma.category.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: 'Catégorie supprimée' });
  } catch (err) {
    console.error('[DELETE /categories/:id]', err);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 },
    );
  }
}
