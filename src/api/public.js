import api from './api';

export async function healthz() {

    return await api().get("/healthz")
}


