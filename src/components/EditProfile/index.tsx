import { User } from '../../app/types';
import {
    Button,
    DateInput,
    Input as NInput,
    Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
    Textarea
} from '@nextui-org/react';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeProvider';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../Input';
import { MdDateRange, MdOutlineEmail } from 'react-icons/md';
import { useUpdateUserMutation } from '../../app/services/userApi';
import { ErrorMessage } from '../ErrorMessage';
import { useParams } from 'react-router-dom';
import { hasErrorField } from '../../utils/hasErrorField';

interface EditProfileProps {
    user: User | null
    isOpen: boolean,
    onClose: () => void,
}

export const EditProfile = ({ user, isOpen, onClose }: EditProfileProps) => {
    const { id } = useParams<{ id: string }>();
    const { theme } = useContext(ThemeContext);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { handleSubmit, control } = useForm<User>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            name: user?.name,
            email: user?.email,
            dateOfBirth: user?.dateOfBirth,
            bio: user?.bio,
            location: user?.location
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && setSelectedFile(e.target.files[0]);
    };

    const onSubmit = async (data: User) => {
        if (!id) return;

        const userData = new FormData();

        const { name, email, dateOfBirth, bio, location } = data;

        name && userData.append('name', name);
        email && email !== user?.email && userData.append('email', email);
        dateOfBirth && userData.append('dateOfBirth', new Date(dateOfBirth).toISOString());
        location && userData.append('location', location);
        bio && userData.append('bio', bio);
        selectedFile && userData.append('avatar', selectedFile);

        try {
            await updateUser({ id, userData }).unwrap();
            onClose();
        } catch (error) {
            hasErrorField(error) ? setError(error.data.error) : setError(error as string);
        }
    };

    return (
        <Modal isOpen={ isOpen } onClose={ onClose } className={ `${ theme } text-foreground` }>
            <ModalContent>
                <ModalHeader className='flex flex-col gap-1'>
                    Изменение профиля
                </ModalHeader>
                <ModalBody>
                    <form className='flex flex-col gap-4' onSubmit={ handleSubmit(onSubmit) }>
                        <NInput name='avatarUrl' type='file' placeholder='Добавить фото' onChange={ handleFileChange }/>
                        <Input control={ control } name='name' label='Имя' type='text'/>
                        <Input control={ control } name='email' label='Почта' type='email'
                               endContent={ <MdOutlineEmail/> }
                        />
                        <Input name='dateOfBirth' label='День рождения' control={ control } type='date'/>

                        <Controller
                            control={ control }
                            render={
                                ({ field }) => <Textarea { ...field } rows={ 4 } placeholder={ 'Расскажите о себе' }/>
                            }
                            name='bio'
                        />
                        <Button type='submit' color='primary' isLoading={ isLoading } fullWidth={ true }>
                            Обновить профиль
                        </Button>
                        <ErrorMessage message={ error }/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' variant='light' onPress={ onClose }>
                        Закрыть
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
