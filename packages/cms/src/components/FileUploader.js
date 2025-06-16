import { Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import * as apis from '../apis';
import { COURSE_THUMBNAIL_TYPE, VIDEO_THUMBNAIL_TYPE, VIDEO_TYPE } from "../constants/fileTypes";

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

FileUploader.propTypes = {
    initUrl: PropTypes.string,
    type: PropTypes.string,
    setUrl: PropTypes.func,
    title: PropTypes.string,
    name: PropTypes.string,
}

export function FileUploader({ initUrl, type, setUrl, title, name }) {
    const classes = useStyles()
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const uploadFileStorage = async (e) => {
        setIsUploading(true);
        const file = e.target.files[0]
        if (!file) return;
        const newUrl = await apis.uploader(type, file, setProgress);
        if (newUrl) setUrl(newUrl);
        setIsUploading(false);
    }
    const getFileType = () => type === COURSE_THUMBNAIL_TYPE || type === VIDEO_THUMBNAIL_TYPE ? "image/*" : "video/*";

    return (
        <>
            <label htmlFor={name}>
                <Button variant="raised">{title}</Button>
            </label>
            <input
                type="file" id={name} accept={getFileType()} style={{ display: "none" }}
                onChange={uploadFileStorage}
            />
            {isUploading && <LinearProgress value={{ progress }} variant="determinate" />}
            {!isUploading && (
                <div className={classes.root}>
                    {
                        (type === VIDEO_THUMBNAIL_TYPE || type === COURSE_THUMBNAIL_TYPE)
                        && initUrl
                        && (<img alt="Thumbnail" width={350} src={initUrl} />)
                    }
                    {type === VIDEO_TYPE && initUrl && <p>Video Url {initUrl}</p>}
                </div>
            )}
        </>
    )
}