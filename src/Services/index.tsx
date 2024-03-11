import api from './Axios';

const API = {
    // Visual
    getAllVisual: () => {
        return api.get('/v2/visual')
    },
}

export default API;