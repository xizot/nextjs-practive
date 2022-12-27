import { AxiosError } from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { IAuthRegisterReq } from "../@types";
import { AuthAction } from "../actions/auth.action";

interface IProps {}

interface IFormRegister extends IAuthRegisterReq {}

interface IError {
    statusCode: number | string | null;
    message: string[] | null;
}

const initializeError: IError = {
    statusCode: null,
    message: null,
};

const Register: React.FC<IProps> = () => {
    const [formData, setFormData] = useState<IFormRegister>({
        email: "",
        password: "",
        fullname: "",
    });

    const [error, setError] = useState<IError>(initializeError);
    const [isSucceed, setIsSucceed] = useState<boolean>(false);

    const inputChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const loginSubmitHandler = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setError(initializeError);
        setIsSucceed(false);
        try {
            await AuthAction.register(formData);
            setIsSucceed(true);
        } catch (error) {
            const res = (error as any)?.response?.data;
            let errorMessage = res?.message;
            if (typeof errorMessage === "string") {
                errorMessage = [errorMessage];
            }

            setError({
                statusCode: res?.statusCode,
                message: errorMessage,
            });
        }
    };
    return (
        <div className="min-h-screen pt-40">
            <div className="form-wrapper">
                {error.message && error.message.length > 0 && (
                    <div className="border-dashed border-[1px] border-red rounded-md p-2 bg-opacity-5 bg-red mb-4">
                        <ul className="">
                            {error.message.map((err) => (
                                <li className="text-red">(*) {err}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {isSucceed && (
                    <div className="border-dashed border-[1px] border-green rounded-md p-2 bg-opacity-5 bg-green mb-4">
                        <ul className="">
                            <li className="text-green">Registered</li>
                        </ul>
                    </div>
                )}

                <h3 className="title-1">Create a new user</h3>
                <form onSubmit={loginSubmitHandler} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="fullname">Yourname</label>
                        <input
                            className="form-input w-full"
                            type="text"
                            name="fullname"
                            id="fullname"
                            value={formData.fullname}
                            onChange={inputChangeHandler}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-input w-full"
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={inputChangeHandler}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-input w-full"
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={inputChangeHandler}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Register new user"
                            className="w-full btn btn-outlined"
                        />
                    </div>
                </form>

                <span className="text-center block">
                    Already have an account?
                    <Link
                        href="/login"
                        className="text-primary font-bold underline"
                    >
                        {" "}
                        Sign In
                    </Link>
                </span>
            </div>
        </div>
    );
};
export default Register;
