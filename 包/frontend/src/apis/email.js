import { request } from "../utils";

export const SEND_CAPTCHA = ({email}) => request.post('/email/send-captcha', {email})
