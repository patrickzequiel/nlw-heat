import { FormEvent, useContext, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export function SendMessageForm() {
    const { user, signOut } = useContext(AuthContext)
    const [ message, setMessage ] = useState('')

    const handleSendMessage = async (event: FormEvent) => {
        event.preventDefault();
        
        if (!message.trim()) {
            return;
        }

        await api.post('messages', { message })
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size='32'/>

            </button>

            <header className={styles.signedUserInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>
                    {user?.name}
                </strong>
                <span>
                    <VscGithubInverted size="16" />
                    {user?.login}
                </span>
            </header>

            <form className={styles.sendMessageForm}>
                <label htmlFor="message">
                    Mensagem
                </label>
                <textarea 
                    name="message" 
                    id="message" 
                    placeholder="Qual sua expectativa?"
                    onChange={ event => setMessage(event.target.value)}
                    value={ message }
                    />
                <button onSubmit={ handleSendMessage } type="submit">
                    Enviar Mensagem
                </button>
            </form>

        </div>
        )
  }

function UserContext(UserContext: any): { user: any } {
    throw new Error('Function not implemented.')
}
