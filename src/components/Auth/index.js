import React from 'react';

import bem from "easy-bem";

import './style.scss'
import {Link} from "react-router-dom";

const Auth = ({setUser}) => {

    const cn = bem('Auth')

    const forSubmitHandler = (e) => {
        e.preventDefault()
        setUser(e.target.children[2].value)
    }

    return (
        <div className={cn()}>
            <form
                  onSubmit={(e) => forSubmitHandler(e)}
                  className={cn('form')}>
                <Link className={cn('link')} to={'/users'}>Users</Link>
                <h3 className={cn('title')}>Authorization</h3>
                    <input type="text" className={cn('input')}/>
                <button className={cn('button')}>Sign in</button>
            </form>
        </div>
    );
};

export default Auth;