import { useForm } from 'react-hook-form';
import FormItem from '@/Components/FormItem';
import { useContext, useRef, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axios } from '@/utils/axios';
import styles from './index.module.css';
import { ModalTypeEnum } from '@/Components/Layouts';
import { AuthContext } from '@/context/AuthContext';

export interface LoginFormData {
	username: string;
	password: string;
	email: string
}

type Props = {
	toggleModal: Function;
}

export default function LoginModal({ toggleModal }: Props) {
	const { loginUser } = useContext(AuthContext)!;
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register, formState: { errors }, handleSubmit, watch
	} = useForm<LoginFormData>();

	const [isFirstVisit, setIsFirstVisit] = useState(true);

	const password = useRef({});
	password.current = watch('password', '');

	const submitForm = async (data: LoginFormData) => {
		try {
			setLoading(true);
			// const response = await axios.post("/auth/login", data, {
			// 	withCredentials: true,
			// });
			// console.log(response.data);
			await loginUser(data);
			toggleModal(ModalTypeEnum.None);
		} catch (error: any) {
			console.log(error.message);
			setErrorMessage('Failed to login, please try again!');
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
			<form id={styles.loginForm} onSubmit={handleSubmit(submitForm)}>
				<div className={styles.formHeader}>Sign In</div>
				<div className={styles.registerNavigator}>
					Don't have an account?{' '}
					<span
						tabIndex={0}
						role="button"
						onClick={() => toggleModal(ModalTypeEnum.Register)}
						onKeyDown={() => toggleModal(ModalTypeEnum.Register)}
					>
						Click here
					</span>
				</div>
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
							value: 6,
							message: 'Username must be at least'
						}
					})}
				/>
				<FormItem
					isFirstVisit={isFirstVisit}
					labelName="Password"
					name="password"
					placeholder="Enter your password"
					inputId="passwordInput"
					type="password"
					error={errors.password}
					register={register('password', {
						required: 'Password is required'
					})}
				/>
				<div className={styles.forgotPassword}>
					<span
						tabIndex={0}
						role="button"
						onClick={() => toggleModal(ModalTypeEnum.Register)}
						onKeyDown={() => toggleModal(ModalTypeEnum.Register)}
					>
						Forgot password?
					</span>
				</div>
				<button
					form={styles.loginForm}
					disabled={loading}
					className={styles.submitButton}
					onClick={() => {
						setIsFirstVisit(false);
					}}
					value="Submit"
					type="submit"
				>
					{loading && <FontAwesomeIcon icon={faSpinner} spin />}
					{!loading && <span>Login</span>}
				</button>
			</form>

		</>
	)
}