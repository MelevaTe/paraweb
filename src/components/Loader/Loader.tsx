import React from 'react';
import cls from './Loader.module.css';

const Loader: React.FC = () => {
    return (
        <div className={cls.loaderContainer}>
            <div className={cls.loader} />
        </div>
    );
};

export default Loader;