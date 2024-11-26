import React, {ReactNode, MouseEventHandler} from 'react';
import cls from './MyButton.module.css';

interface MyButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    disabled?: boolean;
    className?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
                                               type = 'button',
                                               onClick,
                                               children,
                                               disabled = false,
                                               className = ''
                                           }) => {
    return (
        <button
            className={`${cls.button} ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default MyButton;