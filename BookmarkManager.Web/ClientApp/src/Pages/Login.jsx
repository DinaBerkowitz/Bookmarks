
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';



const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isValidLogin, setIsValidLogin] = useState(true);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const onFormSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('api/bookmark/login', formData);
        const isValid = Boolean(data);
        setIsValidLogin(isValid);

        if (isValid) {
            setUser(data)
            navigate('/')
        }
    }


    const onTextChange = (e) => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }



    return (
        <div className="container">
            <main role="main" className="pb-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Log in to your account</h3>
                        {!isValidLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                        <form onSubmit={onFormSubmit}>
                            <input type="text" name="email" placeholder="Email" className="form-control" value={formData.email} onChange={onTextChange} />
                            <br />
                            <input type="password" name="password" placeholder="Password" className="form-control" value={formData.password} onChange={onTextChange} />
                            <br /><button className="btn btn-primary">Login</button>
                        </form>
                        <Link to="/signup">Sign up for a new account</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;