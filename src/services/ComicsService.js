import { useHttp } from "../hooks/http.hook";

const useComicsService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'http://gateway.marvel.com/v1/public/';
    const _apiKey = 'apikey=3bfbcd319190170cdb6c63f7b47ee5f8';

    const getAllComics = async () => {       // если не передаём аргумент, то будет использоваться базовый отступ = 210
        const res =  await request(`${_apiBase}comics?limit=8&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformComics = (com) => {
        return {
            id: com.id,
            title: com.title,
            thumbnail: com.thumbnail.path + '.' + com.thumbnail.extension,
            price: com.prices[0].price ? com.prices[0].price + '$' : 'NOT AVAILABLE'
        }
    }

    return {loading, error, clearError, getAllComics}
}

export default useComicsService;