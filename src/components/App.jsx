import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import * as API from 'services/Pixabay.Api';
import { toast } from 'react-toastify';
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
  };
  async componentDidUpdate (prevProps, prevState) {
  const { query, page } = this.state;
  const {query: prevQuery, page: prevPage} = prevState;
  if((prevQuery.trim() !== query.trim() && query.trim().length > 0) || page > prevPage){
    API.searchParams.q = query;
    API.searchParams.page = page;
    this.setState({status: Status.PENDING})
    try {
      const { totalHits, hits } = await API.getImages(API.searchParams);
        if(totalHits || hits.length){
          if (page === 1) {toast.success(`🦄 We found ${totalHits} images.`);};
          if (page >= 1) {
            this.setState((prevState) => ({
            totalHits: totalHits,
            hits: prevState.hits ? [...prevState.hits, ...hits] : hits,
            status: Status.RESOLVED,
            }));
          };
          if(hits.length < 12){toast.info(`🦄 No more images for ${query}`);};
        }
        else {
          this.setState ({
          totalHits: null,
          hits: [],
          status: Status.REJECTED,
          });
          toast.error("🦄 Sorry, there are no images matching your search query. Please try again.");
        };
    } catch (error) {
      this.setState({
      totalHits: null,
      hits: [],
      status: Status.REJECTED,
      error,
      });
      toast.info(`Something went wrong ${error}`);
      } 
    };
    if (prevState.hits !== this.state.hits) {
      window.scrollBy({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    };
  };

handleFormSearch = (query) => {
  if(query === '') {
    this.setState({
    query: '',
    totalHits: null,
    hits: [],
    status: Status.REJECTED,
    loading: false,
    });
    toast('🦄 There is nothing to search!');
   };
  this.setState({ 
  query,
  page: 1,
  totalHits: null,
  hits: [],
  });
};

handleClickLoadMore = () => this.setState(({page}) => ({ page: page + 1 }));

handleToggleModal = (e) => {
  this.setState(({showModal}) => ({ showModal: !showModal }));
  if (!this.state.showModal) {
    this.setState({ 
      largeImageURL: e.target.dataset.source, 
      tags: e.target.alt 
    });
  }
};

  render() {
    const { hits, showModal, largeImageURL, tags, status } = this.state;
    return (
    <Container>
      <Searchbar onSearch={this.handleFormSearch}/>
        <ToastContainer autoClose={3000} hideProgressBar={true} checkmark={false} />
      {status === 'rejected' && <SearchError/>}
      {status === 'pending' && <Loader/>}
      {hits.length !== 0 && <ImageGallery images={hits} onClick={this.handleToggleModal}/>}
      {hits.length >= API.searchParams.per_page &&
        <Button onClick={this.handleClickLoadMore}/>}
      {showModal && 
        <Modal onClose={this.handleToggleModal}>
          <img src={largeImageURL} alt={tags}/>
        </Modal>}
    </Container>
    );
  };
};