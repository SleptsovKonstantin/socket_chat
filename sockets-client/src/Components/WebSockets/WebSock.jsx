import React, {useRef, useState} from 'react';
import './WebSock.css'

const  WebSock = () => {
    const [massages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef()

    const [username, setUsername] = useState('')
    const [connected, setConnected] = useState(false)


    function connect () {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(message)
            console.log('connecting established')
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }

        socket.current.onclose = () => {
            console.log('Socket close')
        }

        socket.current.onerror = () => {
            console.log('Error socket')
        }
    }


    const sendMessages = async () => {
        const message = {
            id: Date.now(),
            message: value,
            username,
            event: 'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')

    }

    if (!connected) {
        return (
            <div className='center'>
                <div>
                    <div className="form">
                        <input value={username} onChange={event => setUsername(event.target.value)}
                               placeholder='Enter your name' type='text'/>
                        <button onClick={connect}>Войти</button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className='center'>
            <div>
                <div className="form">
                    <input value={value} onChange={event => setValue(event.target.value)}
                           placeholder='Enter your message' type='text'/>
                    <button onClick={sendMessages}>Отправить</button>
                </div>
                <div className="messages">
                    {massages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ?
                                <div className='connection_message'>Пользователь {mess.username} подключился </div>
                                : <div className='message'>{mess.username}: {mess.message}</div>
                            }
                        </div>)}
                </div>
            </div>
        </div>
    );
}

export default WebSock;