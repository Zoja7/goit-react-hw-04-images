// import { API_KEY } from './configs/configs';
// import axios from 'axios';
import FetchImages from './FetchImages';
import { useState, useEffect } from 'react';
import { StyledApp } from './StyledApp.styled';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ message: '' });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (searchQuery === null) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const {
          images,
          totalPages,
          error: fetchError,
        } = await FetchImages(searchQuery, page);

        if (fetchError) {
          setError({ message: fetchError });
        } else {
          setImages(prevImages => [...prevImages, ...images]);
          setTotalPages(totalPages);
        }
      } catch (error) {
        setError({ message: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    setIsOpenModal(true);
    setModalImage(largeImageURL);
  };

  const closeModal = () => {
    setImages(images);
    setIsOpenModal(false);
  };

  const handelSubmitForm = query => {
    if (searchQuery === query) {
      return alert(`You are looking for ${query} now!`);
    }
    setSearchQuery(query.toLowerCase());
    setImages([]);
    setPage(1);
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  const ShownLoadMoreButton = () => {
    return (
      searchQuery !== null &&
      // page < Math.ceil(totalPages / 12) &&
      page < totalPages &&
      images &&
      images !== null &&
      images.length > 0
    );
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handelSubmitForm} />
      {error.message && (
        <p className="errorBage">
          Oops, some error occured... Error message: {error.message}
        </p>
      )}
      {isLoading && <Loader />}
      {searchQuery !== null && images && images.length > 0 && (
        <ImageGallery
          images={images}
          searchQuery={searchQuery}
          openModal={openModal}
        />
      )}
      {ShownLoadMoreButton() && <Button onClick={loadMore} />}
      {isOpenModal && (
        <Modal
          largeImage={modalImage}
          closeModal={closeModal}
          handleOverlayClick={handleOverlayClick}
        />
      )}
    </StyledApp>
  );
};
