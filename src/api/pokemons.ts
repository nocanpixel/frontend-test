import axiosInstance from "./axiosInstance";

const pokeApi = {
    getAllPokemons: () => {
        return axiosInstance.get('/pokemon/?offset=0&limit=10')
    },
    next: (url:string) => {
        return axiosInstance.get(url);
    },
    prev: (url:string)=>{
        return axiosInstance.get(url);
    },
    getPokemonsDetails: (url:string) => {
        return axiosInstance.get(url);
    },
    getPokemonsLocation: (url:string) => {
        return axiosInstance.get(url);
    },
    getLocationName: (url:string) => {
        return axiosInstance.get(url);
    }
}

export default pokeApi;