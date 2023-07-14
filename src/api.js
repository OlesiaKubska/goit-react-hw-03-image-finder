import axios from "axios";

const API_KEY = '36691988-31241ee49ae4977171e194e7f';
const BASE_URL = 'https://pixabay.com/api/';

const fetchImages = async (query, page, perPage) => {
    try {
        const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            page: page,
            per_page: perPage,
            image_type: 'photo',
            orientation: 'horizontal',
        },
        });

        return response.data.hits.map(image => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
        }));
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch images');
    }
};

const api = {
    fetchImages,
};

export default api;