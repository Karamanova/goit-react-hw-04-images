import PropTypes from 'prop-types';
import { ImageGalleryBoxItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
  return (
    <ImageGalleryBoxItem>
      <ImageGalleryItemImage
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        onClick={onClick}
        loading="lazy"
      />
    </ImageGalleryBoxItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
