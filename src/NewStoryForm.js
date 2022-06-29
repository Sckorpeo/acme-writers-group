import axios from 'axios';
import React, { useState } from 'react';

const NewStoryForm = ({ userId, updateStories }) => {

	const [state, setState] = useState({ title: '', body: '' });

	function handleChange(evt) {
		const { value, name } = evt.target;
		setState({ ...state, [name]: value });
	}

	async function handleClick(evt) {
		evt.preventDefault();
		const titleInput = document.getElementById('story-title');
		const bodyInput = document.getElementById('story-body');

		const { title, body } = state;
		const newStory = await axios.post(`/api/users/${userId}/stories`, { title, body });

		bodyInput.value = '';
		titleInput.value = '';

		updateStories(newStory.data);
	}

	return (
		<form>
			<input name='title' onChange={handleChange} placeholder='Title...' id='story-title'></input>
			<textarea name='body' onChange={handleChange} placeholder='Story text...' id='story-body'></textarea>
			<button onClick={handleClick}>Add Story</button>
		</form>
	)
}

export default NewStoryForm;