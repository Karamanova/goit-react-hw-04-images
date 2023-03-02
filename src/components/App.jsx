import { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    page: 1,
    totalHits: null,
    hits: [],
    status: Status.IDLE,
    error: null,
    loading: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
    showBtn: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const { query: prevQuery, page: prevPage } = prevState;

    if (prevQuery !== query || prevPage !== page) {
      API.searchParams.q = query;
      API.searchParams.page = page;
      this.setState({ status: Status.PENDING });

      try {
        const { totalHits, hits } = await API.getImages(API.searchParams);

        if (hits.length > 0) {
          this.setState((prevState) => ({
            // showBtn: this.state.page < Math.ceil(totalHits / 12),
            hits: [...prevState.hits, ...hits],
            totalHits: totalHits,
            status: this.state.page < Math.ceil(totalHits / 12) ? Status.IDLE : Status.RESOLVED,
          }));
          if (page === 1)
            { toast.success(`🦄 We found ${totalHits} images.`) };
          if (hits.length < 12)
            { toast.info(`🦄 No more images for ${query}`);
          }
        } else {
          toast.error('🦄 Sorry, there are no images matching your search query. Please try again.');
          this.setState({ status: Status.REJECTED, });
        }
      } catch (error) {
        toast.info(`🦄 Something went wrong ${error}`);
        this.setState({ status: Status.REJECTED });
      }
    }

    if (prevState.hits !== this.state.hits) {
      window.scrollBy({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleFormSearch = (query) => {
    const trimmedQuery = query.trim();
    this.setState({
      query: trimmedQuery,
      page: 1,
      totalHits: null,
      hits: [],
    });
  };

  handleClickLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleToggleModal = (e) => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (!this.state.showModal) {
      this.setState({
        largeImageURL: e.target.dataset.source,
        tags: e.target.alt,
      });
    }
  };

  render() {
    const { hits, showModal, largeImageURL, tags, status, showBtn } = this.state;

    return (
      <Container>
        <Searchbar onSearch={this.handleFormSearch} />
        <ToastContainer autoClose={3000} hideProgressBar checkmark={false} />
        {status === Status.REJECTED && <SearchError />}
        {status === Status.PENDING && <Loader />}
        {hits.length !== 0 && <ImageGallery images={hits} onClick={this.handleToggleModal} />}
        {hits.length >= API.searchParams.per_page &&
          <Button showBtn={showBtn} onClick={this.handleClickLoadMore} />}
      {showModal && 
        <Modal onClose={this.handleToggleModal}>
          <img src={largeImageURL} alt={tags}/>
        </Modal>}
    </Container>
    );
  };
};