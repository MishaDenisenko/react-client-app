import { Header } from '../Header';
import { Container } from '../Container';
import { NavBarVertical } from '../NavBarVertical';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../../features/userSlice';
import { useEffect } from 'react';
import { Profile } from '../Profile';

export const Layout = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/auth');
    }, []);

    return (
        <>
            <Header/>
            <Container>
                <div className='flex-2 p-2'>
                    <NavBarVertical/>
                </div>
                <div className='flex-1 p-4'>
                    <Outlet/>
                </div>
                <div className='flex-2 p-2'>
                    <div className='flex-col flex gap-5'>
                        { !user && <Profile/> }
                    </div>
                </div>
            </Container>
        </>
    );
};
