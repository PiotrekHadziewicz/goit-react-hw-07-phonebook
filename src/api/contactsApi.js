import axios from "axios";

export const contactsApi = axios.create({
    baseURL: 'https://62d6a96b49c87ff2af29af71.mockapi.io/',
});