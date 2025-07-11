import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export default async function POST(request, res) {
  const { token, password } = await request.body;

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
    },
  });

  if (!user) {
    return res.status(400).json({ error: 'Token invalide ou expiré' });
  }

  const hashed = await hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return res.status(200).json({ success: true });
}
