import { Controller, useForm } from 'react-hook-form';
import { Comment } from '../../app/types';
import { useParams } from 'react-router-dom';
import { useCreateCommentMutation } from '../../app/services/commentApi';
import { useLazyGetPostByIdQuery } from '../../app/services/postApi';
import { Button, Textarea } from '@nextui-org/react';
import { ErrorMessage } from '../ErrorMessage';
import { hasErrorField } from '../../utils/hasErrorField';
import { useState } from 'react';
import { IoMdCreate } from 'react-icons/io';

export const CreateComment = () => {
    const { id } = useParams<{ id: string }>();
    const [createComment] = useCreateCommentMutation();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();

    const { handleSubmit, control, formState: { errors }, setValue } = useForm<Comment>();

    const [error, setError] = useState(errors?.post?.message as string);

    const onSubmit = async ({ content }: Comment) => {
        try {
            if (id) {
                await createComment({ content, postId: id }).unwrap();
                setValue('content', '');
                await triggerGetPostById(id).unwrap();
            }
        } catch (error) {
            hasErrorField(error) ? setError(error.data.error) : setError(error as string);
        }
    };

    return (
        <form className='flex-grow' onSubmit={ handleSubmit(onSubmit) }>
            <Controller
                name='content'
                control={ control }
                defaultValue=''
                rules={ {
                    required: 'Обязательное поле'
                } }
                render={ ({ field }) => (
                    <Textarea
                        { ...field }
                        labelPlacement='outside'
                        placeholder='Напишите свой комментарий'
                        className='mb-5'
                    />
                ) }
            />

            { errors && <ErrorMessage message={ error }/> }
            <Button
                color='primary'
                className='flex-end'
                type='submit'
                endContent={<IoMdCreate />}
            >
                Ответить
            </Button>
        </form>
    );
};
