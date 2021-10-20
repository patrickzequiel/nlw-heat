import { api } from '../../services/api'
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg'

interface Message { 
    id: number;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

export function MessageList() {

    const [ messages, setMessages ] = useState<Message[]>([])


    useEffect(() => { // useEffect é uma função que executa uma função quando o componente é renderizado
        api.get<Message[]>('messages/last3').then(response => { // api.get é uma função que faz uma requisição ao backend
            setMessages(response.data)
        })
    }, [])
    
    return (
        <div className={ styles.messageListWrapper }>
            <img src={ logoImg } alt="logo" />

            <ul className={ styles.messageList }>
                { messages.map(message => { //sempre que usa o map, o primeiro elemento precisa de uma key
                    return (
                <li key={message.id} className={ styles.message }>
                    <p className={ styles.messageContent }>
                        {message.text}
                    </p>
                    <div className={ styles.messageUser }>
                        <div className={ styles.userImage }>
                            <img src={message.user.avatar_url} alt="Patrick Cruz" />
                        </div>
                        <span>{message.user.name}</span>
                    </div>
                </li>
                
                )}) }
            </ul>
        </div>
    )
 }