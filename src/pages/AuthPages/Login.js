import React, { useEffect, useState, useRef } from 'react';
import styles from '@styles/pages/AuthPages/Login.module.css';
import { UserAuth } from '@contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import CustomGoogleButton from '@utils/GoogleButton';
import CustomMSButton from '@utils/MicrosoftButton';

const Login = () => {
    //import the signin functions from the userAuth context.
    const { googleSignIn, MSSignIn, user, emailSignIn } = UserAuth();

    //Declare navigate function
    const navigate = useNavigate();

    //Declare state variables
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //Declar refs for email and password sign in.
    const emailRef = useRef();
    const passwordRef = useRef();

    //Execute the Google Sign In
    const handleGoogleSignIn = async(event) => {
        event.preventDefault();
        try {
            await googleSignIn();
            navigate('/projects');
        } catch(error) {
            console.log(error);
        }
    }

    //Execute the MS Sign In
    const handleMSSignIn = async(event) => {
        event.preventDefault();
        try {
            await MSSignIn();
            navigate('/projects');
        } catch(error) {
            console.log(error);
        }
    }

    //Execute the Email and Password Sign In.
    const handleEmailSignIn = async(event) => {
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            await emailSignIn(emailRef.current.value, passwordRef.current.value);
            navigate('/projects');
        } catch {
            setError('Failed to sign in');
        }
        setLoading(false);
    }

    //Redirect an authenticated user to the home page.
    useEffect(() => {
        if(user != null) {
            navigate('/projects');
        }
    }, [user])

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <div className={styles.profloLogoWrapper}>
                    <img 
                        src={require('@images/proflo-logo.png')} 
                        alt={'ProFlo Logo'}
                        className={styles.profloLogo}
                    />
                </div>
                <h1 className={styles.title}>ProFlo</h1>
                <h2 className={styles.welcomeInstructions}>Don't have an account? <Link to="/signup">Sign up</Link></h2>
                {error && <div>{error}</div>}
                <form className={styles.signInForm} onSubmit={handleEmailSignIn}>
                    <label className={styles.signInFormLabel}>Email address</label>
                    <input 
                        type='text' 
                        name='email' 
                        placeholder='Email'
                        className={styles.signInFormInput}
                        ref={emailRef}
                    />
                    <label className={styles.signInFormLabel}>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Password'
                        className={styles.signInFormInputPassword}
                        ref={passwordRef}
                    />
                    <label className={styles.forgotPassWord}><Link to="/resetpassword">Forgot password</Link></label>
                    <button className={styles.signInFormButton} type='submit' disabled={loading}>Sign in</button>
                    <hr />
                    <CustomGoogleButton handleGoogleSignIn = {handleGoogleSignIn} />
                    <CustomMSButton handleMSSignIn = {handleMSSignIn} />
                </form>           
            </div>
        </div>
    )
}

export default Login