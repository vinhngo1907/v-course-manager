import { Course } from "@/types"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import TextInput from "./TextInput"
import TextAreaInput from "./TextAreaInput"
import Checkbox from "./Checkbox"

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
    const methods = useForm<Inputs>({
        defaultValues: {
            title: course.title,
            description: course.description
        }
    });
    return (
        <FormProvider {...methods}>
            <form>
                <TextInput label='Name' name='name' options={{ required: true }} />
                <TextAreaInput label='Description' name='description' options={{ required: true }} />
                <Checkbox label='Publish' name='published' />
            </form>
        </FormProvider>
    )
}

export default CourseForm;