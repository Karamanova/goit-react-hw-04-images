import PropTypes from "prop-types";
import { ImageGalleryBox } from "./ImageGallery.styled";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { Modal } from "components/Modal/Modal";

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ImageGalleryBox>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClick={onClick}
          largeImageURL={largeImageURL}
        />
      ))}
    </ImageGalleryBox>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

<Modal />
