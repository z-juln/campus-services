import { request } from "../utils";

export const REGISTER = ({email, password, captcha}) => request.post('/user/register', {email, password, captcha})
export const LOGIN = ({email, password}) => request.post('/user/login', {email, password})
// export const LOGOUT = () => {}
export const UPLOAD_AVATAR = (formData) => request.post('/user/avatar/update', formData)
