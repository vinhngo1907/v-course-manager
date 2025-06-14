import PropTypes, { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

// material
import { makeStyles } from "@material-ui/styles"
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    media: {
        height: 150
    }
});

// ----------------------------------------------------------------------

CourseCard.propTypes = {
    course: PropTypes.object
};


export default function CourseCard({ course }) {
    const classes = useStyles();
    const { id, title, description, thumbnailUrl, videoCount } = course;
    return (
        <Card className={classes.root}>
            <CardMedia image={thumbnailUrl} title={title} className={classes.media} />
            <CardContent style={{ padding: '12px' }}>
                <Link
                    to={`/dashboard/courses/${id}`}
                    color="inherit"
                    underline="hover"
                    component={RouterLink}
                >
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                </Link>
                <Typography variant="body2" noWrap>
                    {description}
                </Typography>
                <Typography variant="body2" noWrap>
                    {videoCount} videos
                </Typography>
            </CardContent>
        </Card>
    )
}