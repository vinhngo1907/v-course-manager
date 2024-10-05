import { useForm } from 'react-hook-form';
import FormItem from '@components/FormItem';
import { useRef, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axios } from '../../utils/axios';
import styles from './index.module.css';
import { ModalTypeEnum } from '@components/Layouts';

export interface LoginFormData {
	username: string;
	password: string;
}

type Props = {
	toggleModal: Function;
}

export default function LoginModal({ toggleModal }: Props) {
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
			const response = await axios.post("/auth/login", data, {
				withCredentials: true,
			});

		} catch (error) {
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
			>
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
								value: 8,
								message: 'Username must be at least'
							}
						})}
					/>
				</form>
			</div>
		</>
	)
}