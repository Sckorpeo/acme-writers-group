import React from 'react';


const Users = ({ users, userId }) => {
	return (
		<ul>
			<li className={!userId ? 'selected' : ''}>
				<a href='#'>Users</a>
			</li>
			{
				users.map(user => {
					return (
						<li className={user.id === userId * 1 ? 'selected' : ''} key={user.id} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
							<a href={`#${user.id}`}>
								{user.name}
							</a>
						</li>
					);
				})
			}
		</ul>
	);
}

export default Users;


