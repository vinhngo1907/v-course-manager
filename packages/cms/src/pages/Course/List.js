import { useCallback, useEffect, useState } from 'react';
import { Button, Container, Stack, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from '../../components/Page';
import { CourseList } from '../../components/_dashboard/courses';
import * as apis from '../../apis';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [canReadMore, setCanReadMore] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);

            const queryString = RequestQueryBuilder.create({
                page,
                limit: 20,
                join: {
                    field: 'videos',
                    select: ['id']
                }
            });

            const response = await apis.course.find(queryString.query());

            console.log('FULL RESPONSE:', response);

            const { data: fetchedCourses, page: fetchedPage, pageCount } = response;

            if (Array.isArray(fetchedCourses) && fetchedCourses.length > 0) {
                setCourses((prev) => [
                    ...prev,
                    ...fetchedCourses.map(({ id, title, description, thumbnailUrl, videos }) => ({
                        id,
                        title,
                        description,
                        thumbnailUrl,
                        videoCount: videos?.length || 0
                    }))
                ]);
            }

            setCanReadMore(fetchedPage < pageCount);
            setPage(fetchedPage);
        } catch (err) {
            console.error('Error fetching courses:', err);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        console.log('Updated courses:', courses);
    }, [courses]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const fetchMoreCourses = async () => {
        setPage((prev) => prev + 1);
    };

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
                    <CourseList courses={courses} />
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
