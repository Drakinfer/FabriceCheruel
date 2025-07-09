'use client';

import Image from 'next/image';

export default function ProtectedImage({
  src,
  alt = '',
  fill = false,
  width,
  height,
  className = '',
  containerClass = '',
}) {
  const getWatermarkedUrl = (url) => {
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;
    return `${parts[0]}/upload/l_text:Arial_20:©%20NomDeLArtiste,g_south_east,x_10,y_10/${parts[1]}`;
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`relative select-none ${fill ? 'w-full aspect-[4/3]' : ''} ${containerClass}`}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
    >
      <Image
        src={getWatermarkedUrl(src)}
        alt={alt}
        {...(fill ? { fill: true } : { width, height })}
        className={`object-cover select-none pointer-events-none ${className}`}
        draggable={false}
      />
      <div className="absolute inset-0 z-10 bg-transparent pointer-events-auto" />
    </div>
  );
}
