import React, { useContext, useEffect, useState } from 'react'
import './CSS/MyBlogs.css';
import blogContext from '../context/blogContext';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

const MyBlogs = () => {

    const backendLink = process.env.REACT_APP_BACKEND_LINK
    const [getMyBlogs, setGetMyBlogs] = useState([])

    let navigate = useNavigate();

    useEffect(() => {

        const myBlogs = async () => {
            const response = await fetch(`${backendLink}/api/blog/myblogs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setGetMyBlogs(json);
        }

        myBlogs()
        // myBlogs()
        // eslint-disable-next-line
    }, [])

    const handleDeleteBlog = async (e, id) => {

        const confirmDelete = window.confirm('Are you sure you want to delete this Blog?');

        if (confirmDelete) {
            await fetch(`${backendLink}/api/blog/deleteblog/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            window.location.reload(true);
        }
    }

    return (
        <main>
            <div className='container d-flex justify-content-center'>
                <h2 className='fw-bold mt-3'>MY BLOGS</h2>
            </div>
            {getMyBlogs.length == 0 ?
                <div className='container d-flex justify-content-center'>
                    <h2 className='fw-bold mt-5'>You haven't created any Blog yet!</h2>
                </div>
                : getMyBlogs.map((data) => (
                    <div key={data._id} className='blog-container'>
                        <div className=''>
                            <img className="post-image" src={data.files} alt="" />
                        </div>
                        <div className='post-text'>
                            <Link to={`/blog/${data._id}`} className='resetLink'>
                                <h1>{data.title}</h1>
                            </Link>
                            <p className='m-0 my-2 blog-info'><strong><a href="/" className='author'>{data.user.username} </a></strong> posted On {format(new Date(data.createdAt), 'MMM d, yyyy')}</p>
                            <p>{data.summary}</p>
                            {/* Summary length should be less than 148 words */}
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <Link to={`/editblog/${data._id}`} className='resetLink'>
                                        <i className="fa-solid mx-2 fa-pen"></i>
                                        <strong>Edit Post</strong>
                                    </Link>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <button className='myBtn' onClick={e => handleDeleteBlog(e, data._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                        <strong className='mx-2'>Delete Post</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </main>
    )
}

export default MyBlogs
