export { LOGIN } from './user'
import { get, post } from '../utils/http';
export const test = () => get('/');
export const login = params => post('login', params);
export const reg = params => post('reg', params);
export const regset = params => post('regset', params);