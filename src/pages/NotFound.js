import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../resources/404/404.png'

function NotFound() {
    return (
        <div>
            <img style={{ width: '50%' }} src={notfound} alt="" />
            <Link to="/"><button className='btn btn-danger'>Go Me To My Home</button> </Link>

        </div>
    )
}

export default NotFound