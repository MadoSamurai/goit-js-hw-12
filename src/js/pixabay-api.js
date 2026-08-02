import axios from "axios";

const API_KEY = "56868862-3dcc84f72f876530e5630b5a4";
const HTTP_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query) {
    const searchParams = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    };
    const response = await axios.get(HTTP_URL, { params: searchParams });

    return response.data;
};