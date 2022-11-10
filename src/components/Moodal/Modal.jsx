import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Moodal/Modal.module.css';

export const Modal = ({ largeImageUrl, onModalClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackDropClick}>
      <div className={css.modal}>
        <img src={largeImageUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
};
