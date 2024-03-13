import api from './Axios';

const API = {
    // Visual
    getAllVisual: () => {
        return api.get('/v2/visual')
    },

    // Dinas
    getAllDinas: () => {
        return api.get('/v2/dinas')
    },
}

export default API;