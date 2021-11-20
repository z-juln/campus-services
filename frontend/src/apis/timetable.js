import { request } from "../utils";

export const GET_TIME_TABLE_LIST = () => request.get('/timetable/findall')
