import { JSX, ReactNode } from 'react';
import { Button as NextButton } from '@nextui-org/react';

interface ButtonProps {
    children: ReactNode;
    icon?: JSX.Element;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const Button = ({ children, icon, color, fullWidth, type, className }: ButtonProps) => {
    return (
        <NextButton
            startContent={ icon } size='lg' variant='light' className={ className }
            color={ color } fullWidth={ fullWidth } type={ type }
        >
            { children }
        </NextButton>
    );
};
