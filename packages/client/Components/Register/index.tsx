import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import { ModalTypeEnum } from "@components/Layouts";
import FormItem from "@components/FormItem";
import { useForm } from "react-hook-form";
import axios from "axios";

type Props = {
    toggleModal: Function;
};
export interface RegisterFormData {
    username: string;
    password: string;
    email: string;
    fullname: string;
    retypedPassword: string;
}

export default function RegisterModal({ toggleModal }: Props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const submitForm = async (data: RegisterFormData) => {
        try {
            setLoading(true);
            const { retypedPassword, ...body } = data;
            const response = await axios.post("/auth/register", data, {
                withCredentials: true
            });

            console.log(response.data);
        } catch (error) {
            console.log(error.message);
            setErrorMessage('Failed to login, please try again!');
        } finally {
            setLoading(false);
        }
    }
    const {
        register, formState: { errors }, handleSubmit, watch
    } = useForm<RegisterFormData>();

    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const password = useRef({});
    password.current = watch('password', '');
    return (
        <>
            <div
                className={styles.blurBg}
                onClick={() => toggleModal(ModalTypeEnum.None)}
            >
                <form id={styles.registerForm}
                    onSubmit={handleSubmit(submitForm)}
                >
                    <div className={styles.formHeader}>Sign Up</div>
                    <div className={styles.loginNavigator}>
                        I have an account!{' '}
                        <span
                            tabIndex={0}
                            role='button'
                            onClick={() => toggleModal(ModalTypeEnum.Login)}
                            onKeyDown={() => toggleModal(ModalTypeEnum.Login)}
                        >Click here</span>
                    </div>
                </form>
                {errorMessage && <span>{errorMessage}</span>}
                <FormItem
                    isFirstVisit={isFirstVisit}
                    labelName="Username"
                    name="username"
                    placeholder="Enter your username"
                    inputId="usernameInput"
                    type="text"
                    error={errors.username}
                    register={register('username', {
                        required: 'Username is required',
                        minLength: {
                            value: 8,
                            message: 'Username must be at least'
                        }
                    })}
                />
            </div>
        </>
    )
}
