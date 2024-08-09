import { Control, useController } from 'react-hook-form';
import { JSX } from 'react';
import { Input as NextInput } from '@nextui-org/react';


interface InputProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'date';
    control: Control<any>;
    required?: string;
    endContent?: JSX.Element;

}

export const Input = ({ name, label, placeholder, type, control, required = '', endContent }: InputProps) => {
    const { field, fieldState: { invalid }, formState: { errors } } = useController({
        name,
        control,
        rules: { required }
    });

    return (
        <NextInput id={ name } label={ label } type={ type }
                   placeholder={ placeholder } value={ field.value }
                   name={ field.name } isInvalid={ invalid } onChange={ field.onChange }
                   onBlur={ field.onBlur } errorMessage={ `${ errors.name?.message ?? '' }` }
        >

        </NextInput>
    );
};
