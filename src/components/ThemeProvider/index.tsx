import React, { useState } from 'react';

type ThemeContextType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => null
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const storedTheme = localStorage.getItem('theme');
    const currentTheme = storedTheme ? storedTheme as 'dark' | 'light' : 'dark';

    const [theme, setTheme] = useState(currentTheme);

    const toggleTheme = () => {
        setTheme(prevState => {
            const newTheme = prevState === 'dark' ? 'light' : 'dark';

            localStorage.setItem('theme', newTheme);

            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={ { theme, toggleTheme } }>
            <main className={ `${ theme } text-foreground bg-background` }>
                { children }
            </main>
        </ThemeContext.Provider>
    );
};

