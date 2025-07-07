import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const { publicId } = await req.json();

  if (!publicId) {
    return NextResponse.json({ error: 'Missing publicId' }, { status: 400 });
  }

  try {
    await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ message: 'Image supprimée avec succès' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 },
    );
  }
}
