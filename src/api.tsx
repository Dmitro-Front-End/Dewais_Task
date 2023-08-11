import axios, {AxiosResponse} from "axios";
import { iUser } from "./interfice/interface";

const api = "https://api.github.com/users/";

export const getUser = (login : string) : Promise<AxiosResponse<iUser>>  => axios.get(api + login)