import Image from 'next/image';
import React from 'react';
type Props = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};
const ImageBlock = ({ src, alt, caption, width, height }: Props) => {
  return (
    <div>
      <Image src={src} alt={alt} width={width} height={height}></Image>;
      <p>{caption}</p>
    </div>
  );
};

export default ImageBlock;
