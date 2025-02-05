import React, { Component } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import NewStoryForm from './NewStoryForm';


class User extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			stories: []
		};
		this.addStory = this.addStory.bind(this);
	}
	async componentDidMount() {
		let response = await axios.get(`/api/users/${this.props.userId}`);
		this.setState({ user: response.data });
		response = await axios.get(`/api/users/${this.props.userId}/stories`);
		this.setState({ stories: response.data });

	}
	async componentDidUpdate(prevProps) {
		if (prevProps.userId !== this.props.userId) {
			let response = await axios.get(`/api/users/${this.props.userId}`);
			this.setState({ user: response.data });
			response = await axios.get(`/api/users/${this.props.userId}/stories`);
			this.setState({ stories: response.data });

		}
	}
	async deleteStory(storyId) {
		await axios.delete(`/api/stories/${storyId}`);
		const newStoriesArr = this.state.stories.filter(story => story.id !== storyId);
		this.setState({ stories: newStoriesArr });
	}
	addStory(story) {
		const { stories } = this.state;
		this.setState({ stories: [...stories, story] });
	}

	render() {
		const { user, stories } = this.state;
		const { del } = this.props;
		return (
			<div>
				Details for {user.name}
				<button onClick={() => del(user.id, stories)} className='del-btn'>Delete User?</button>
				<p>
					{user.bio}
				</p>
				<ul>
					{
						stories.map(story => {
							return (
								<li key={story.id}>
									{story.title} <FontAwesomeIcon icon={faTrashCan} onClick={() => this.deleteStory(story.id)} />
									<p>
										{story.body}
									</p>
								</li>

							);
						})
					}
				</ul>
				<NewStoryForm updateStories={this.addStory} userId={user.id} />
			</div>
		);
	}
}



export default User;
