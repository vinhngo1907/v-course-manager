import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Material
import { Card, Stack, Container, Typography, TextField } from '@material-ui/core';

// Components
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import * as apis from '../../apis';
import Page from '../../components/Page';
import { FileUploader } from '../../components/FileUploader';
import { COURSE_THUMBNAIL_TYPE } from '../../constants/fileTypes';

export default function Create() {
    const navigate = useNavigate();
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const CourseSchema = Yup.object().shape({
        title: Yup.string().required('Full name is required'),
        description: Yup.string().required('Username is required')
    });

    const formik = useFormik({
        initialValues: {
            title: '', description: ''
        },
        validationSchema: CourseSchema,
        onSubmit: async (values) => {
            const data = {
                ...values,
                thumbnailUrl
            };
            const newCourse = await apis.course.create(data);
            if (!newCourse) return;

            navigate("/dashboard/courses", { replace: true })
        }
    });
    const { isSubmitting, getFieldProps, errors, touched } = formik;
    const handleSubmit = (e) => {
        e.prevetDefault();
    }

    return (
        <Page title="Create | Course-CMS">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        New Course
                    </Typography>
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField fullWidth autoComplete="title" type="text" label="Title"
                                {...getFieldProps('title')} error={Boolean(touched.title && errors.title)}
                                helperText={touched.title && errors.title}
                            />
                            <TextField
                                fullWidth
                                autoComplete="description"
                                type="text"
                                label="Description"
                                {...getFieldProps('description')}
                                error={Boolean(touched.description && errors.description)}
                                helperText={touched.description && errors.description}
                            />
                            <FileUploader
                                initUrl={thumbnailUrl}
                                type={COURSE_THUMBNAIL_TYPE}
                                setUrl={setThumbnailUrl}
                                title="Upload thumbnail"
                                name="create-course-thumb"
                            />
                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                Submit
                            </LoadingButton>
                        </Stack>
                    </Form>
                </FormikProvider>
                <Card />
            </Container>
        </Page>
    );
};