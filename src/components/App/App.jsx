import { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiFetch } from '../API/Api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { Modal } from 'components/Moodal/Modal';
import { Button } from 'components/Button/Button';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  // =============fetchCats=====================

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);
    try {
      ApiFetch(searchQuery, page).then(res => {
        const { data } = res;
        if (data.hits.length === 0) {
          return toast.error(`No pictures found with name ${searchQuery}`);
        }
        setGallery(prev => [...prev, ...data.hits]);
      });
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  }, [page, searchQuery]);

  const onModalOpen = largeImageURL => {
    toggleModal();
    setLargeImageURL(largeImageURL);
  };
  // ============Modal methods============
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const submitFormHandler = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setGallery([]);
  };

  return (
    <div>
      <Searchbar submitFormHandler={submitFormHandler} />
      {error && toast.error(`Oops something went wrong. ${error.message}`)}
      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} onModalOpen={onModalOpen} />
      )}
      {showModal && (
        <Modal onModalClose={toggleModal} largeImageUrl={largeImageURL} />
      )}
      {isLoading && <Loader />}
      {gallery.length > 11 && <Button onClick={() => setPage(page + 1)} />}

      <ToastContainer autoClose={3000} theme={'colored'} />
    </div>
  );
};
