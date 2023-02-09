import React, {useState, useRef} from 'react';
import styles from '../styles/Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext'

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { signUp } = UserAuth();

    const handleSignUp = async(event) => {
        event.preventDefault()

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value)
            navigate('/login')
        } catch {
            setError('Failed to create and account')
        }
        setLoading(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <div className={styles.profloLogoWrapper}>
                    <img 
                        src={require('./../images/proflo-logo.png')} 
                        alt={'ProFlo Logo'}
                        className={styles.profloLogo}
                    />
                </div>
                <h1 className={styles.title}>ProFlo</h1>
                <h2 className={styles.welcomeInstructions}>Already have an account? <Link to="/login">Login</Link></h2>
                {error && <div>{error}</div>}
                <form className={styles.signInForm} onSubmit={handleSignUp}>
                    <div className={styles.nameWrapper}>
                        <div className={styles.firstNameWrapper}>
                            <label className={styles.signInFormLabel}>First name</label>
                            <input 
                                type='text' 
                                name='firstName' 
                                placeholder='First Name'
                                className={styles.signInFormInputName}
                                ref={firstNameRef}
                            />
                        </div>
                        <div className={styles.lastNameWrapper}>
                        <label className={styles.signInFormLabel}>Last name</label>
                            <input 
                                type='text' 
                                name='lastName' 
                                placeholder='Last Name'
                                className={styles.signInFormInputName}
                                ref={lastNameRef}
                            />
                        </div>
                    </div>
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
                        className={styles.signInFormInput}
                        ref={passwordRef}
                    />
                    <label className={styles.signInFormLabel}>Confirm Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Password'
                        className={styles.signInFormInput}
                        ref={confirmPasswordRef}
                    />
                    <button className={styles.signInFormButton} type='submit' disabled={loading}>Sign up</button>
                </form>           
            </div>
        </div>
    )
}

export default SignUp