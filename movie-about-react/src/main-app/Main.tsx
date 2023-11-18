import React from 'react';
import Navbar from '../components/navbar';
import Home from '../views/home'
import History from '../views/history';
import AddPost from '../views/add-post'
import { Routes, Route, } from 'react-router-dom';
import Login from '../views/auth/login';
import { RequireAuth } from 'react-auth-kit';
import Register from '../views/auth/register';
import Posts from '../views/posts';
function Main() {
    return (
        <>
            <div>
                <Routes>
                    <Route path='/' element={
                        <RequireAuth loginPath='/login'>
                            <Home />
                        </RequireAuth>
                    } />

                    <Route path='/history' element={
                        <RequireAuth loginPath='/login'>
                            <History />
                        </RequireAuth>
                    } />

                    <Route path='/addPost' element={
                        <RequireAuth loginPath='/login'>
                            <AddPost />
                        </RequireAuth>
                    } />

                    <Route path='/posts' element={
                        <RequireAuth loginPath='/login'>
                            <Posts />
                        </RequireAuth>
                    } />


                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div >
        </>
    );
}

export default Main;