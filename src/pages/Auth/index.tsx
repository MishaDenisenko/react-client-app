import { useState } from 'react';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { Login } from '../../features/login';
import { Register } from '../../features/register';


export const Auth = () => {
    const [selected, setSelected] = useState('login');

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex flex-col'>
                <Card className='max-w-full w-[340px] h-[450px]'>
                    <CardBody className='overflow-hidden'>
                        <Tabs fullWidth size='md' selectedKey={ selected }
                              onSelectionChange={ (key) => setSelected(key as string) }
                        >
                            <Tab key='login' title='Вход'>
                                <Login setSelected={ setSelected }/>
                            </Tab>
                            <Tab key='sign-up' title='Регистрация'>
                                <Register setSelected={ setSelected }/>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
