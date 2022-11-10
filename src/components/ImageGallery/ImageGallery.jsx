import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';

export const ImageGallery = ({ gallery, onModalOpen }) => {
  return (
    <ul className={css.imageGallery}>
      {gallery.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          id={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onGettingIms={onModalOpen}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
