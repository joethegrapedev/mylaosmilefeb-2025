import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/auth';
const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-bodyColor flex items-center justify-center", children: _jsx("div", { className: "text-lightText", children: "Loading..." }) }));
    }
    return user ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/admin/signin", replace: true });
};
export default ProtectedRoute;
