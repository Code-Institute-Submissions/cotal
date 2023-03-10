import React from 'react';
import { URLConfig } from '@cloudinary/url-gen';
import { CloudConfig } from '@cloudinary/url-gen';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { AdvancedImage, lazyload } from '@cloudinary/react';

export const Image = ({
  image,
  modelName,
  addedModelName,
  slug,
  className,
  alt,
}) => {
  if (!image) return null;

  const idx = image.lastIndexOf(`/`);

  const model = addedModelName ? addedModelName : modelName.slice(0, -1);
  const publicId = image.slice(idx + 1);

  const imageUrl = 'cotal-api/' + slug + '/' + model + '/' + publicId;

  // https://cloudinary.com/documentation/react_integration#asset_instance_configuration
  let cloudConfig = new CloudConfig({ cloudName: 'matouri' });
  let urlConfig = new URLConfig({ secure: true });
  let img = new CloudinaryImage(imageUrl, cloudConfig, urlConfig);

  img.delivery(format('auto'));

  return (
    <AdvancedImage
      id={publicId}
      className={className}
      cldImg={img}
      plugins={[lazyload()]}
      alt={alt}
    />
  );
};
