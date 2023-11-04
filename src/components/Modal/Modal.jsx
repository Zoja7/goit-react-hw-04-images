import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ largeImage, closeModal, id, tags, handleOverlayClick }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal} key={id}>
        <img src={largeImage} alt={tags} style={{ width: '300px' }} />
      </div>
    </div>
  );
};

export default Modal;
