import axios from "axios"

const baseUrl = 'http://localhost:3001/api/notes'

export const getAllNotes = () => {
    return axios.get(baseUrl)
    .then((response) => {
        const { data } = response
        return data
    })
    .catch(e => console.log(e))
}