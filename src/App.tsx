import React from 'react';
import './styles/index.css';
import AuthComponent from "./components/Auth/AuthComponent";

const App: React.FC = () => {
    return (
        <div className="app">
            <AuthComponent />
        </div>
    );
};

export default App;