import React, {useState, useRef} from 'react';
import styles from '@styles/pages/AuthPages/Login.module.css';
import { Link } from 'react-router-dom';
import { UserAuth } from '@contexts/AuthContext';

const ForgotPassword = () => {
    //declare refs
    const emailRef = useRef();

    //declare state variables
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    //import the resetPassword function from the AuthContext
    const { resetPassword } = UserAuth();

    //Execute the resetPassword function
    const handleResetPassword = async(event) => {
        event.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions');
        } catch {
            setError('Failed to reset password');
        }
        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <div className={styles.profloLogoWrapper}>
                    <img 
                        src={require('./../../images/proflo-logo.png')} 
                        alt={'ProFlo Logo'}
                        className={styles.profloLogo}
                    />
                </div>
                <h1 className={styles.title}>ProFlo</h1>
                <h2 className={styles.welcomeInstructions}><Link to="/login">Login</Link></h2>
                {error && <div>{error}</div>}
                {message && <div>{message}</div>}
                <form className={styles.signInForm} onSubmit={handleResetPassword}>
                    <label className={styles.signInFormLabel}>Email address</label>
                    <input 
                        type='text' 
                        name='email' 
                        placeholder='Email'
                        className={styles.signInFormInput}
                        ref={emailRef}
                    />
                    <button className={styles.signInFormButton} type='submit' disabled={loading}>Reset password</button>
                </form>           
            </div>
        </div>
    )
}

export default ForgotPassword;