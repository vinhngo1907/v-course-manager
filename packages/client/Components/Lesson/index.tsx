import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import SubmitInput from './SubmitInput';
import { Lesson } from "@/types";
import EditableField from "./EditableField";
// import Checkbox from "./Checkbox";

export type Inputs = {
    name: string;
    description: string;
    published?: boolean
};

type Props = {
    lesson?: Lesson;
    courseId: string;
    onSubmit: SubmitHandler<Inputs>;
    isLoading: boolean;
}


const LessonForm = ({ courseId, lesson, onSubmit, isLoading }: Props) => {
    const methods = useForm<Inputs>({
        defaultValues: {
            name: lesson?.name,
            description: lesson?.description,
        }
    });
    if (!courseId || !lesson) {
        return null;
    }

    const handleSubmit: SubmitHandler<Inputs> = (data) => {
        const finalPayload: Inputs = {
            name: data.name,
            description: data.description || data?.description || "",
            published: data.published,
        };

        onSubmit(finalPayload);
    };

    return (
        <FormProvider {...methods}>
            <form className='flex flex-col max-w-lg'
                onSubmit={methods.handleSubmit(handleSubmit)}>
                <EditableField
                    title="Title"
                    view={<p>{methods.getValues("name")}</p>}
                >
                    <TextInput
                        // label="Title"
                        name="name"
                        options={{ required: true }}
                    />
                </EditableField>
                {/* DESCRIPTION */}
                <EditableField
                    title="Description"
                    view={<p>{methods.getValues("description")}</p>}
                >
                    <TextAreaInput
                        // label="Description"
                        name="description"
                        options={{ required: true }}
                    />
                </EditableField>

                {/* PUBLISH */}
                {/* <EditableField
                    title="Publish"
                    view={<p>{methods.getValues("published") ? "Yes" : "No"}</p>}
                >
                    <Checkbox label="Publish" name="published" />
                </EditableField> */}
                <SubmitInput value={`${lesson ? 'Update' : 'Create'} lesson`} isLoading={isLoading} />
            </form>
        </FormProvider>
    )
}

export default LessonForm;