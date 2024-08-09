export const formatToClientDate = (date?: Date): string => {
    return date ? new Date(date).toLocaleDateString() : '';
}