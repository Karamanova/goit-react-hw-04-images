import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { ImageGalleryBoxItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <ImageGalleryBoxItem>
      <ImageGalleryItemImage
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        onClick={onClick}
        onLoad={handleLoad}
        loading="lazy"
      />
      {isLoading && <div>Loading...</div>}
    </ImageGalleryBoxItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

