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
    if (!searchQuery) return;
    const fetchData = async () => {
      setIsLoading(true);
      const {
        images,
        totalPages,
        error: fetchError,
      } = await FetchImages(searchQuery, page);
      if (fetchError) {
        setError(fetchError);
      } else {
        setImages(prevImages => [...prevImages, ...images]);
        setPage(prevPage => prevPage + 1);
        setTotalPages(totalPages);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [searchQuery, page]);

  const loadMore = () => {
    // this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    // this.setState({
    //   isOpenModal: true,
    //   modalImage: largeImageURL,
    // });
    setIsOpenModal(true);
    setModalImage(largeImageURL);
  };

  const closeModal = () => {
    // this.setState({
    //   isOpenModal: false,
    //   images: this.state.images,
    // });
    setImages(images);
    isOpenModal(false);
  };

  const handelSubmitForm = query => {
    if (searchQuery === query) {
      return alert(`You are looking for ${query} now!`);
      // this.setState({
      //   searchQuery: searchQuery.toLowerCase(),
      //   images: [],
      //   currentPage: 1,
      // });
    }
    setSearchQuery(query.toLowerCase());
    setImages([]);
    setPage(1);
  };
  const ShownLoadMoreButton = () => {
    return (
      searchQuery !== null &&
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
      {isOpenModal && <Modal largeImage={modalImage} closeModal={closeModal} />}
    </StyledApp>
  );
};
