'use client';
import { useState } from 'react';

export default function ImageUploader({ onUpload }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploads = [];

    setIsUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
      );
      formData.append('folder', 'oeuvres');

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await res.json();
      uploads.push(data.secure_url);
    }

    setIsUploading(false);
    onUpload((prev) => [...(prev || []), ...uploads]);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="file-input file-input-bordered w-full"
      />
      {isUploading && (
        <p className="text-sm text-gray-500 mt-2">Upload en cours...</p>
      )}
    </div>
  );
}
