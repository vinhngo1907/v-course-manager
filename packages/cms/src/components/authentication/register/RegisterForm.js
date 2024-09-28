import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
	// Context
	const { registerUser } = useContext(AuthContext)

	// Local state
	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		confirmPassword: ''
	})

	const [alert, setAlert] = useState(null)

	const { username, password, confirmPassword } = registerForm

	const onChangeRegisterForm = event =>
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value
		})

	const register = async event => {
		event.preventDefault()

		if (password !== confirmPassword) {
			setAlert({ type: 'danger', message: 'Passwords do not match' })
			setTimeout(() => setAlert(null), 5000)
			return
		}

		try {
			const registerData = await registerUser(registerForm)
			if (!registerData.success) {
				setAlert({ type: 'danger', message: registerData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Form className='my-4' onSubmit={register}>
				<AlertMessage info={alert} />

				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						required
						value={confirmPassword}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Register
				</Button>
			</Form>
			<p>
				Already have an account?
				<Link to='/login'>
					<Button variant='info' size='sm' className='ml-2'>
						Login
					</Button>
				</Link>
			</p>
		</>
	)
}