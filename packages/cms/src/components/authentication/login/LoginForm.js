import React, { useState } from 'react';
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik, Form } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

// material
import { Link, Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from "@material-ui/lab";

// Api
import * as api from "../../../apis";
import { setUpdateLoginState } from '../../../apis/axios';

export default function LoginForm() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	setUpdateLoginState((newProfile) => {
		console.log(`${newProfile.username} logged in`);
	});

	const LoginSchema = Yup.object().shape({
		username: Yup.string().required('Username is required'),
		password: Yup.string().required('Password is required'),
	});

	const formik = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema: LoginSchema,
		onSubmit: async (values) => {
			const user = await api.auth.login(values);
			console.log({user})
			if (user) navigate('/dashboard', { replace: true });
		}
	});

	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

	const handleShowPassword = () => {
		setShowPassword((show) => !show);
	}

	return (
		<FormikProvider value={formik}>
			<Form autoComplete='off' noValidate onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<TextField fullWidth autoComplete='username' type='text'
						label="Username" {...getFieldProps('username')}
						error={Boolean(touched.username && errors.username)}
						helperText={touched.username && errors.username}
					/>
					<TextField fullWidth autoComplete='password' type={showPassword ? 'text' : 'password'}
						label="Password" {...getFieldProps('password')}
						error={Boolean(touched.password && errors.password)}
						helperText={touched.password && errors.password}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton onClick={handleShowPassword} edge="end">
										<Icon icon={showPassword ? eyeFill : eyeOffFill} />
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				</Stack>
				<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
					<Link component={RouterLink} variant="subtitle2" to="#">
						Forgot password?
					</Link>
				</Stack>

				<LoadingButton
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					loading={isSubmitting}
				>
					Login
				</LoadingButton>
			</Form>
		</FormikProvider>
	);
};