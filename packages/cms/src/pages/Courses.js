import React, { useEffect, useState } from 'react';

// matarial
import { Button, Container, Stack, Typography } from "@material-ui/core";

// components
import { Link, Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from '../components/Page';
import { CourseList } from '../components/_dashboard/courses';

//
import PRODUCTS from '../_mocks_/products';
import * as apis from '../apis';

// ----------------------------------------------------------------------

export default function Courses() {
	return (
		<Page title="Course">
			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Typography variant='h4' gutterBottom>
						Courses
					</Typography>
					<Button
						variant='contained'
						component={RouterLink} to="/dashboard/course/create"
						startIcon={<Icon icon={plusFill} />}
					>New course</Button>
				</Stack>
				<Stack direction="column" alignItems="center">
					<CourseList courses={PRODUCTS} />
					{isLoading && <CircularProgress />}
					{canReadMore && !isLoading && (
						<Button style={{ marginTop: '24px' }} variant="contained" onClick={fetchMoreCourses}>
							More
						</Button>
					)}
				</Stack>
			</Container>
		</Page>
	)
}