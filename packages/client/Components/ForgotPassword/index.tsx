import React, { useContext, useRef, useState } from "react";
import styles from "./index.module.css";
import { ModalTypeEnum } from "@/Components/Layouts";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/context/AuthContext";
import FormItem from "../FormItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Button from "../Layouts/Button";

type Props = {
    toggleModal: Function;
};
export interface userData {
    email: string;
}

export default function ForgotPasswordModal({ toggleModal }: Props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { forgotPass } = useContext(AuthContext)!;
    const { register, formState: { errors }, handleSubmit } = useForm<userData>();
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    const submitForm = async (data: userData) => {
        try {
            setLoading(true);
            await forgotPass(data);
            toggleModal(ModalTypeEnum.None);
        } catch (error: any) {
            console.log(error.message);
            setErrorMessage('Failed to retype new pass, please try again!');
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div
                className={styles.blurBg}
                onClick={() => toggleModal(ModalTypeEnum.None)}
            />
            <form id={styles.forgotPassForm} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.formHeader}>Forgot Password?</div>
                <div className={styles.registerNavigator}>
                    Enter the email address associated with your account
                </div>
                {errorMessage && <span>{errorMessage}</span>}
                <FormItem
                    isFirstVisit={isFirstVisit}
                    labelName="Your email"
                    name="email"
                    placeholder="Enter your email"
                    inputId="emailInput"
                    type="email"
                    error={errors.email}
                    register={register('email', {
                        required: 'Email is required',
                        // minLength: {
                        //     value: 6,
                        //     message: 'Email must be at least'
                        // }
                    })}
                />
                <button
                    form={styles.forgotPassForm}
                    disabled={loading}
                    className={styles.submitButton}
                    onClick={() => {
                        setIsFirstVisit(false);
                    }}
                    value="Submit"
                    type="submit"
                >
                    {loading && <FontAwesomeIcon icon={faSpinner} spin />}
                    {!loading && <span>Submit</span>}
                </button>
                <Button onClick={() => toggleModal(ModalTypeEnum.Login)}
                   intent="primary" style={{width:"100%", cursor:"pointer", borderRadius:"20px"}}
                    >
                    <span>Login</span>
                </Button>
            </form>

        </>
    )
}