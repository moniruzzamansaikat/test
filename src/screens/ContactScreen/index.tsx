import React, { useState } from 'react'
import swal from 'sweetalert'
import styles from './ContactScreen.module.css';
import axios from 'axios';

export default function ContactScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      firstName, lastName, email, postalCode, message
    }

    axios.post('http://localhost:5555/api/contact', {
      ...data
    }).then(res => {
      swal('success', {
        title: 'Your  message has been sent!',
        icon: 'success'
      })
    }).catch(error => {
      swal('error', {
        title: error.message,
        icon: 'error'
      })
    })

    setFirstName('');
    setLastName('');
    setEmail('');
    setPostalCode('');
    setMessage('');
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className='page_title'>Contact</h1>
        <div>
          <input value={firstName} type="text" placeholder='First Name' name='firstName' onChange={e => setFirstName(e.target.value)} required />
        </div>
        <div>
          <input value={lastName} type="text" placeholder='Last Name' name='lastName' onChange={e => setLastName(e.target.value)} required />
        </div>
        <div>
          <input value={email} type="text" placeholder='Email Address' name='email' onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <input value={postalCode} type="text" placeholder='Postal Code' name='postalCode' onChange={e => setPostalCode(e.target.value)} required />
        </div>
        <div>
          <textarea value={message} placeholder='Enter your message' name='message' onChange={e => setMessage(e.target.value)} required></textarea>
        </div>

        <div>
          <button type="submit" className='btn'>Submit</button>
        </div>

      </form>
    </div>
  )
}