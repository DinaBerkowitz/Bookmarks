import { useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddBookmark = () => {
    const [bookmark, setBookmark] = useState({
        title: '',
        url: '',
    })
    const { title, url } = bookmark;
    const { user } = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => {
        const copy = { ...bookmark };
        copy[e.target.name] = e.target.value;
        setBookmark(copy);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark', bookmark)
        navigate('/mybookmarks')
    }
    return (
        <div className="container">
            <main role="main" className="pb-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Add Bookmark</h3>
                        <form onSubmit={onSubmit}>
                            <input type="text" name="title" placeholder="Title" className="form-control" value={title} onChange={onChange} />
                            <br />
                            <input type="text" name="url" placeholder="Url" className="form-control" value={url} onChange={onChange} />
                            <br />
                            <button className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddBookmark;