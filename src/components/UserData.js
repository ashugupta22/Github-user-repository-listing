import './style.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import UserRepo from './UserRepo';
import Loading from './Loading';
function UserData() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        try{
            setLoading(false);
            const response = await fetch('https://api.github.com/users/mojombo');
        // console.log(response);
        // const data = await response.json();
        // console.log(data);
        setUsers(await response.json());
        }
        catch(error){
            console.log(error);
        }
        
    }

    useEffect(() => {
        getUsers();
    }, []);


    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='container-lg'>
                    <div className='row justify-content-start mt-5'>
                        <div className='col-2'>
                            <img className='roundimg' src={users.avatar_url} alt="profile image"></img>
                        </div>
                        <div className='col-4 ms-5 my-auto fw-bold'>
                            <h3 className='t-blue'>{users.name}</h3>
                            <p>{users.bio}</p>
                            <p><i className="fa-solid fa-location-dot me-3"></i>{users.location}</p>
                            <p><span className='me-2'>Twitter:</span><a href={'https://twitter.com/'+users.twitter_username}>{'@'+users.twitter_username}</a></p>
                        </div>
                    </div>
                    <p className='mt-3 fw-bold'><i className="fa-solid fa-link"></i> <a href={users.html_url}>{users.html_url}</a></p>

                    <UserRepo />

                </div>
            </div>
        </>
    )
}
export default UserData;