import axios from "axios";
import { useState ,useEffect} from "react";

const BASE_URL = "https://api.flickr.com/services/rest"
const apiKey = import.meta.env.VITE_APP_FLICKR_API_KEY


export const fetchRecentPhotos = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: 'flickr.photos.getRecent',
        api_key: apiKey,
        format: 'json',
        nojsoncallback: 1,
        safe_search: 1,
      },
    });
    const data =  response.data.photos.photo;
    return data;
  } catch (error) {
    console.error('Error fetching recent photos:', error);
    return error;
  }
};

function searchImages(query) {
  const [state,setState] = useState([])
  const [error, setError] = useState(null);
  useEffect(() =>{
    if (query) {
    const response = axios.get(BASE_URL, {
      params: {
        method: 'flickr.photos.search',
        api_key: apiKey,
        text: query,
        format: 'json',
        nojsoncallback: 1,
        safe_search: 1,
      },
    }).then((response) => {
      setState(response.data.photos.photo);
      setError(null); 
    })
    .catch((error) => {
      setError(error);
      setState([]);
      console.log(error);
    });
  } else {
    setState([]);
    setError(null);
  }
  },[query])
  return {state,error};
}
// export const searchPhotos = async (query) => {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         method: 'flickr.photos.search',
//         api_key: apiKey,
//         text: query,
//         format: 'json',
//         nojsoncallback: 1,
//         safe_search: 1,
//       },
//     });
//     const data =  response.data.photos.photo;
//     return data;
//   } catch (error) {
//     console.error('Error fetching search photos:', error);
//     return error;
//   }
// };

export {searchImages}