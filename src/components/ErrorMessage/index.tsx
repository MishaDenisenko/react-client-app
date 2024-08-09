interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message = '' }: ErrorMessageProps) => {
    return message && (
        <p className='text-red-500 mt-2 mb-5 text-small'>{ message }</p>
    );
};
