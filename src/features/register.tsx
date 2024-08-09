import { Input } from '../components/Input';
import { Button, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLazyCurrentQuery, useRegisterMutation } from '../app/services/userApi';
import { useState } from 'react';
import { hasErrorField } from '../utils/hasErrorField';
import { ErrorMessage } from '../components/ErrorMessage';

type Register = {
    email: string;
    password: string;
    name: string;
}

interface RegisterProps {
    setSelected: (value: string) => void;
}

export const Register = ({ setSelected }: RegisterProps) => {
    const { handleSubmit, control, formState: { errors } } = useForm<Register>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    });

    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const [triggerCurrentQuery] = useLazyCurrentQuery();
    const [error, setError] = useState('');

    const onSubmit = async (data: Register) => {
        try {
            await register(data).unwrap();
            setSelected('login');
        } catch (error) {
            if (hasErrorField(error)) setError(error.data.error);
        }
    };

    return (
        <form className='flex flex-col gap-4' onSubmit={ handleSubmit(onSubmit) }>
            <Input name='name' label='Name' control={ control } type='text' required='Обязательное поле'/>
            <Input name='email' label='Email' control={ control } type='email' required='Обязательное поле'/>
            <Input name='password' label='Password' control={ control } type='password' required='Обязательное поле'/>

            <ErrorMessage message={ error }/>

            <p className='text-center text-small'>
                Уже зарегистрированы?{ ' ' }
                <Link className='cursor-pointer' size='sm' onPress={ () => setSelected('login') }>
                    Войти
                </Link>
            </p>
            <div className='flex gap-2 justify-end'>
                <Button fullWidth color='primary' type='submit' isLoading={ isLoading }>
                    Зарегистрироваться
                </Button>
            </div>
        </form>
    );
};
