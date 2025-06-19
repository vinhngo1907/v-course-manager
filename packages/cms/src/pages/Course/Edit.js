import React from "react";
// Material
import { Card, Stack, Container, Typography, TextField } from '@material-ui/core';

// Components
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';

import Page from '../../components/Page';

export default function Edit() {
    return (
        <Page title="Edit | Course-CMS">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Edit Course
                    </Typography>
                </Stack>
                {/* <FormikProvider></FormikProvider> */}
            </Container>
        </Page>
    );
};