import { JSX } from 'react';
import { useCurrentQuery } from '../app/services/userApi';
import { Spinner } from '../components/Spinner';

interface AuthGuardProps {
    children: JSX.Element;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { isLoading } = useCurrentQuery();

    if (isLoading) return <Spinner/>;

    return children;
};
