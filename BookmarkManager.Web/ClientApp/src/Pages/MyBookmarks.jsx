
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const MyBookmarks = () => {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState();

    const getBookmarks = async () => {
        const { data } = await axios.get('/api/bookmark/getbookmarks');
        setBookmarks(data);
    }

    useEffect(() => {
        getBookmarks();
    }, []);

    const onDeleteClick = async (id) => {
        await axios.post(`/api/bookmark/deletebookmark?id=${id}`)
        getBookmarks();
    }

    const onEditClick = (bookmark) => {
        setIsEdit(true);
        setTitle(bookmark.title);
    }
    const onUpdateClick = async (bookmark) => {
        bookmark.title = title;
        await axios.post('/api/bookmark/editbookmark', bookmark)
        setIsEdit(false);
        getBookmarks();
    }

    const onCancelClick = (bookmark) => {
        setIsEdit(false);
        setTitle(bookmark.title);
    }

    const onTextChange = (e) => {
        setTitle(e.target.value);
    }

    

    return (
        <div className="container">
            <main role="main" className="pb-3">
                <div>
                    <div className="row">                        
                         
                            <Link className="btn btn-primary" to="/addbookmark">Add Bookmark</Link>                        
                    </div>
                    <div className="row">
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookmarks.map(bookmark => (
                                    <tr key={bookmark.id}>
                                        {!isEdit && <td>{bookmark.title}</td>}
                                        {isEdit && <input type="text" className="form-control" value={title} onChange={onTextChange} />}
                                        <td><Link to={bookmark.url} target="_blank">{bookmark.url}</Link></td>
                                        <td>{!isEdit &&
                                            <button className="btn btn-success" onClick={() => onEditClick(bookmark)}>Edit Title</button>}
                                            {isEdit && <>
                                                <button className="btn btn-warning" onClick={() => onUpdateClick(bookmark)}>Update</button>
                                                <button className="btn btn-info" onClick={() => onCancelClick(bookmark)}>Cancel</button>
                                            </>}
                                            <button className="btn btn-danger" onClick={() => onDeleteClick(bookmark.id)}>Delete</button>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MyBookmarks;
