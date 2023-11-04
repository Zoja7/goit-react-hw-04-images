import { API_KEY } from './configs/configs';
import axios from 'axios';

const FetchImages = async (searchQuery, page) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    if (response.data.total === 0) {
      return {
        error:
          'Sorry, there are no images matching your search query. Please try again!',
      };
    }
    return {
      ...response.data,
      images: response.data.hits,
      totalPages: response.data.totalHits,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default FetchImages;
