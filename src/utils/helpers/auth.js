import { getItemFromLS } from "./localStorage"

export const getToken = () => {
    return getItemFromLS('token')
}