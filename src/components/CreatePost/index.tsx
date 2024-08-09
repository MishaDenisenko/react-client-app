import { useCreatePostMutation, useLazyGetAllPostsQuery } from '../../app/services/postApi';
import { Controller, useForm } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import { ErrorMessage } from '../ErrorMessage';
import { IoMdCreate } from 'react-icons/io';
import { useState } from 'react';
import { hasErrorField } from '../../utils/hasErrorField';

type Post = {
    post: string
}

export const CreatePost = () => {
    const [createPost] = useCreatePostMutation();
    const [triggerAllPosts] = useLazyGetAllPostsQuery();

    const { handleSubmit, control, formState: { errors }, setValue } = useForm<Post>();
    const [error, setError] = useState(errors?.post?.message as string);

    const textArea = ({ field }: any) => (
        <Textarea { ...field } placeholder='О чем думаете?' labelPlacement='outside' className='mb-5'/>
    );

    const onSubmit = async (data: Post) => {
        try {
            await createPost({ content: data.post }).unwrap();
            setValue('post', '');
            await triggerAllPosts().unwrap();
        } catch (error) {
            hasErrorField(error) ? setError(error.data.error) : setError(error as string);
        }
    };

    return (
        <form className='flex-grow' onSubmit={ handleSubmit(onSubmit) }>
            <Controller
                render={ ({ field }) => textArea({ field }) }
                name='post' control={ control } defaultValue=''
                rules={ { required: 'Обязательное поле' } }
            />

            { error && <ErrorMessage message={ error }/> }

            <Button color='success' type='submit'  endContent={ <IoMdCreate/> }>
                Добавить пост
            </Button>
        </form>
    );
};
