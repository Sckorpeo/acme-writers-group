import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Users from './Users';
import User from './User';


class App extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			userId: '',
			delUserAlertShowed: false
		};
		this.deleteUser = this.deleteUser.bind(this);
	}
	async componentDidMount() {
		try {
			const userId = window.location.hash.slice(1);
			this.setState({ userId });
			const response = await axios.get('/api/users');
			this.setState({ users: response.data });
			window.addEventListener('hashchange', () => {
				const userId = window.location.hash.slice(1);
				this.setState({ userId, delUserAlertShowed: false });
			});
		}
		catch (ex) {
			console.log(ex);
		}

	}

	async deleteUser(userId, userStories) {
		const { delUserAlertShowed } = this.state;
		if (!delUserAlertShowed) {
			window.alert('Are you sure you want to delete this User? All information will be removed. If you would like to proceed please click delete button again.');
			this.setState({ delUserAlertShowed: !delUserAlertShowed });
		} else {
			console.log(userId, userStories);
			userStories.forEach(async element => {
				await axios.delete(`/api/stories/${element.id}`);
			});
			await axios.delete(`/api/users/${userId}`);
			const newUsersList = this.state.users.filter(user => user.id !== userId);
			this.setState({ users: newUsersList, userId: '' });
		}
	}
	render() {
		const { users, userId } = this.state;
		return (
			<div>
				<h1>Acme Writers Group ({users.length})</h1>
				<main>
					<Users users={users} userId={userId} />
					{
						userId ? <User userId={userId} del={this.deleteUser} /> : null
					}
				</main>
			</div>
		);
	}
}

const root = document.querySelector('#root');
render(<App />, root);


