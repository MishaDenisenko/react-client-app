import { JSX, ReactNode } from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

interface NavButtonProps {
    children: ReactNode;
    icon: JSX.Element;
    href: string;
}

export const NavButton = ({ children, icon, href }: NavButtonProps) => {
    return (
        <Button className='flex justify-start text-xl' icon={ icon } fullWidth>
            <Link to={ href }>
                { children }
            </Link>
        </Button>
    );
};
