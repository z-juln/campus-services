export { LOGIN } from './user'
import { get, post } from '../utils/http';
export const test = () => get('/');
export const login = params => post('user/login', params);
export const reg = params => post('user/register', params);
export const regset = params => post('user/regset', params);