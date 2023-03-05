import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as API from 'services/Pixabay.Api';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { SearchError } from 'components/SearchError/SearchError';
import { Container } from './App.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);
const [status, setStatus] = useState(Status.IDLE);
const [images, setImages] = useState([]);
const [totalHits, setTotalHits] = useState(0);
const [showModal, setShowModal] = useState(false);
const [imageData, setImageData] = useState({ url: null, alt: '' });
const [showBtn, setShowBtn] = useState(false);

useEffect (() => {
  if(!query){
    return;
  };
  (async () => {
    setStatus(Status.PENDING);
    API.searchParams.q = query;
    API.searchParams.page = page;
    try {
      const { totalHits, hits } = await API.getImages(API.searchParams);
        if (hits.length > 0) {
      const totalPages = Math.ceil(totalHits / 12);
      setShowBtn(page < totalPages);
      setTotalHits(totalHits);
      setImages(prevState => [...prevState, ...hits]);
      setStatus(Status.RESOLVED);
      if (page === 1) {
        toast.success(`🦄 We found ${totalHits} images.`);
      }
      if (hits.length < 12) {
        toast.info(`🦄 No more images for ${query}`);
      }
    } else {
      toast.error('🦄 Sorry, there are no images matching your search query. Please try again.');
      setStatus(Status.REJECTED);
    }
  } catch (error) {
    toast.info(`🦄 Something went wrong ${error}`);
    setStatus(Status.REJECTED);
  }
})();
  }, [query, page]);

const handleFormSearch = (query) => {
  if(!query) {
    setImages([]);
    setStatus(Status.REJECTED);
    setTotalHits(0);
    toast('🦄 There is nothing to search!');
   };
   setQuery(query);
   setPage(1);
   setTotalHits(0)
   setImages([]);
};
const handleChoicePerPage = (e) => {
  API.searchParams.per_page = e.value;
  setPage(1);
  setImages([]);
  setTotalHits(0);
};

const handleClickLoadMore = () => setPage(page =>  page + 1);

const handleToggleModal = (e) => {
  setShowModal(prevState => !showModal);
  if (!showModal) {
    setImageData({ url: e.target.dataset.source, alt: e.target.alt });
  };
};

return (
  <Container>
    <Searchbar onSearch={handleFormSearch} onChange={handleChoicePerPage} totalHits={totalHits}/>
    <ToastContainer autoClose={3000}/>
    {status === Status.REJECTED && <SearchError/>}
    {status === Status.PENDING && 
      <Loader />}
    {images.length !== 0 && <ImageGallery images={images} onClick={handleToggleModal}/>}
    {showBtn &&
      <Button onClick={handleClickLoadMore}>Load more</Button>}
    {showModal && 
      <Modal onClose={handleToggleModal}>
        <img src={imageData.url} alt={imageData.alt}/>
      </Modal>}
  </Container>
  );
};