import React from "react";
// Material
import { Card, Stack, Container, Typography, TextField } from '@material-ui/core';

// Components
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';

import Page from '../../components/Page';

export default function Create() {
    return (
        <Page title="Create | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        New Course
                    </Typography>
                </Stack>
                {/* <FormikProvider></FormikProvider> */}
            </Container>
        </Page>
    );
};