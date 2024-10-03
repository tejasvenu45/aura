// src/actions/authActions.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';

export const login = (formData) => async (dispatch) => {
    const api = import.meta.env.VITE_BASE_URL;

    try {
        const response = await fetch(`${api}/api/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); // Save token to localStorage
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data,
            });
        } else {
            dispatch({
                type: LOGIN_FAILURE,
                payload: data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: 'An error occurred while logging in.',
        });
    }
};

// Action to handle logout
export const logout = () => async (dispatch) => {
    const api = import.meta.env.VITE_BASE_URL;

    try {
        await fetch(`${api}/api/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token in request headers
            }
        });

        localStorage.removeItem('token'); // Remove token from localStorage
        dispatch({ type: LOGOUT });
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
