import axios from "axios"

export const getMethod = async (url) => {
    const resp = await axios.get(url);
    return resp
}