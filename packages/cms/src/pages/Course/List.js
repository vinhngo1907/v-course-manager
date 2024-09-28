import React, { useState } from "react";
// material
import { Button, CircularProgress, Typography, Container } from "@material-ui/core";

import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import Page from '../../components/Page';
//
import * as apis from '../../apis';

// ----------------------------------------------------------------------

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [canReadMore, setCanReadMore] = useState(true);
    const fetchData = async () => {
        setIsLoading(true);
        const queryString = RequestQueryBuilder.create({
            page,
            limit: 20,
            join: {
                field: 'videos',
                select: ['id']
            }
        });
    }
    const fetchMoreCourses = async () => {

    }
    return (
        <Page title="Courses">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Courses
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/courses/create"
                        startIcon={<Icon icon={plusFill} />}
                    >
                        New Course
                    </Button>
                </Stack>

                <Stack direction="column" alignItems="center">
                    {/* <CourseList courses={courses} /> */}
                    {isLoading && <CircularProgress />}
                    {canReadMore && !isLoading && (
                        <Button style={{ marginTop: '24px' }} variant="contained" onClick={fetchMoreCourses}>
                            More
                        </Button>
                    )}
                </Stack>
            </Container>
        </Page>
    );
}