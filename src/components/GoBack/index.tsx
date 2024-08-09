import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

export const GoBack = () => {
    const navigate = useNavigate();

    return (
        <div
            onClick={ () => navigate(-1) }
            className='text-default-500 flex items-center gap-2 mb-10 cursor-pointer'
        >
            <FaRegArrowAltCircleLeft/>
            Назад
        </div>
    );
};
