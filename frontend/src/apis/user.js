import { request } from "../utils";

export const REGISTER = () => {}
export const LOGIN = ({name, password}) => request.post('/login', {name, password})
export const LOGOUT = () => {}
