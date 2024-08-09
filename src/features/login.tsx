import { useForm } from 'react-hook-form';
import { Input } from '../components/Input';
import { Link, Button } from '@nextui-org/react';
import { useLazyCurrentQuery, useLoginMutation } from '../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { hasErrorField } from '../utils/hasErrorField';

type Login = {
    email: string;
    password: string;
}

interface LoginProps {
    setSelected: (value: string) => void;
}

export const Login = ({ setSelected }: LoginProps) => {
    const { handleSubmit, control, formState: { errors } } = useForm<Login>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [triggerCurrentQuery] = useLazyCurrentQuery();

    const onSubmit = async (data: Login) => {
        try {
            await login(data).unwrap();
            await triggerCurrentQuery().unwrap();
            navigate('/');
        } catch (error) {
            if (hasErrorField(error)) setError(error.data.error);
        }
    };

    return (
        <form className='flex flex-col gap-4' onSubmit={ handleSubmit(onSubmit) }>
            <Input name='email' label='Email' control={ control } type='email' required='Обязательное поле'/>
            <Input name='password' label='Password' control={ control } type='password' required='Обязательное поле'/>

            <ErrorMessage message={ error }/>

            <p className='text-center text-small'>
                Нет аккаунта?{ ' ' }
                <Link className='cursor-pointer' size='sm' onPress={ () => setSelected('sign-up') }>
                    Зарегистрируйтесь
                </Link>
            </p>
            <div className='flex gap-2 justify-end'>
                <Button fullWidth color='primary' type='submit' isLoading={ isLoading }>
                    Войти
                </Button>
            </div>
        </form>
    );
};
