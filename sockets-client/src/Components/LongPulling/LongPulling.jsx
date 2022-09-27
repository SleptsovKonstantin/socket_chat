import React, {useEffect, useState} from 'react';
import './LongPulling.css'
import axios from "axios";

const LongPulling = () => {
    const [massages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
            subscribe()
        },
        [])

    const subscribe = async () => {
        try {
          const { data } = await axios.get('http://localhost:5000/get-messages')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 5000)
        }
    }

    const sendMessages = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            id: Date.now(),
            message: value
        })
        setValue('')

    }

    return (
        <div className='center'>
            <div>
                <div className="form">
                    <input value={value} onChange={event => setValue(event.target.value)} type='text'/>
                    <button onClick={sendMessages}>send</button>
                </div>
                <div className="messages">
                    {massages.map(mess =>
                        <div className='message' key={mess.id}>
                            {mess.message}
                        </div>)}
                </div>
            </div>
        </div>
    );
}

export default LongPulling;