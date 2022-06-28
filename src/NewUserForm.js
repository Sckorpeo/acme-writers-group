import axios from 'axios';
import React, { useState } from 'react';

const NewUsersList = ({ addUser }) => {

	const [formState, setFormState] = useState({ name: '', bio: '' });
	const nameInput = document.getElementById('user-name');
	const bioInput = document.getElementById('user-bio');

	function handleChange(evt) {
		setFormState({ ...formState, [evt.target.name]: evt.target.value });
	}

	async function handleClick(evt) {
		evt.preventDefault();
		const { name, bio } = formState;
		const newUser = await axios.post('/api/users', { name, bio });
		setFormState({ name: '', bio: '' });
		nameInput.value = '';
		bioInput.value = '';
		addUser(newUser.data);
	}

	return (
		<form className='new-user-form'>
			<input placeholder='Name...' name='name' onChange={handleChange} id='user-name'></input>
			<textarea className='text-area' placeholder='Bio...' cols={30} rows={15} name='bio' onChange={handleChange} id='user-bio'></textarea>
			<button onClick={handleClick}>Add New User</button>
		</form>
	)
}

export default NewUsersList;