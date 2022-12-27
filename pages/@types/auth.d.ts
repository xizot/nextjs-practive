export interface IAuthBase {
    email: string;
    password: string;
}

export interface IAuthRegisterReq extends IAuthBase {
    fullname: string;
}
