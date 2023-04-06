import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/CreateBlog.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileBase from 'react-file-base64';

const CreateBlog = () => {

  let navigate = useNavigate();
  
  const backendLink = process.env.REACT_APP_BACKEND_LINK

  const [postData, setPostData] = useState({ title: '', summary: '', content: '', files: '' });

  const handleCreateBLOG = (e) => {
    e.preventDefault();

    const addBlog = async (title, summary, content, files) => {
      // API call
      const response = await fetch(`${backendLink}/api/blog/addblog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, summary, content, files })
      });
    }
    addBlog(postData.title, postData.summary, postData.content, postData.files);

    navigate('/');
  }

  return (
    <main>
      <form className='mt-3' onSubmit={handleCreateBLOG}>
        <input type="title" placeholder='Blog title' className='createBlogInput' value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} required={true} maxLength="100" />
        <input type="summary" placeholder='Summary' className='createBlogInput' value={postData.summary} onChange={e => setPostData({ ...postData, summary: e.target.value })} required={true} maxLength="250" />
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, files: base64 })} />
        <ReactQuill theme="snow" value={postData.content} onChange={newValue => setPostData({ ...postData, content: newValue })} required={true} />
        <button disabled={postData.content === ''} className='btn btn-primary createBlogInput'>POST BLOG</button>
      </form>
    </main>
  )
}

export default CreateBlog
