import { Course } from "@/types"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import TextInput from "./TextInput"
import TextAreaInput from "./TextAreaInput"
import Checkbox from "./Checkbox"
import SubmitInput from "./SubmitInput"
import { FileUploader } from "@/Components/FileUploader"
import { useState } from "react"
import { COURSE_THUMBNAIL_TYPE } from "@/constants/file"

export type Inputs = {
    title: string
    description: string
}

type Props = {
    course?: Course,
    onSubmit: SubmitHandler<Inputs>,
    isLoading: boolean
}

const CourseForm = ({ course, onSubmit, isLoading }: Props) => {
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const methods = useForm<Inputs>({
        defaultValues: {
            title: course?.title,
            description: course?.description
        }
    });
    return (
        <FormProvider {...methods}>
            <form className='flex flex-col max-w-lg' onSubmit={methods.handleSubmit(onSubmit)}>
                <TextInput label='Name' name='name' options={{ required: true }} />
                <TextAreaInput label='Description' name='description' options={{ required: true }} />
                <Checkbox label='Publish' name='published' />
                <p className="text-slate-500 text-sm mb-6">
                    <a href='https://github.com/muxinc/video-course-starter-kit' target='_blank' rel='noreferrer' className='underline'>Fork this repo</a>
                    {" "}
                    to publish your own courses
                </p>
                <FileUploader
                    initUrl={thumbnailUrl}
                    type={COURSE_THUMBNAIL_TYPE}
                    setUrl={setThumbnailUrl}
                    title="Upload thumbnail"
                    name="create-course-thumb"
                />
                <SubmitInput value={`${course ? 'Update' : 'Create'} course`} isLoading={isLoading} />
            </form>

        </FormProvider>
    )
}

export default CourseForm;