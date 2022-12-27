import { IAuthBase, IAuthRegisterReq } from "../@types/auth";
import axios from "../config/axios.config";
import { LoginResponseDto } from "../types/auth";

export class AuthAction {
    private static prefixApi: string =
        process.env.NEXT_PUBLIC_BACKEND_API_URL + "/auth";

    static login = (data: IAuthBase): Promise<LoginResponseDto> =>
        axios.post(`${AuthAction.prefixApi}/login`, data);

    static register = (data: IAuthRegisterReq): Promise<LoginResponseDto> =>
        axios.post(`${AuthAction.prefixApi}/register`, data);
}
