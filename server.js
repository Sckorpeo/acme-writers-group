const express = require('express');
const app = express();
const { User, Story } = require('./db');
const path = require('path');

app.use('/dist', express.static('dist'));
app.use('/public', express.static('public'));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/users', async (req, res, next) => {
	try {
		res.send(await User.findAll({
			attributes: {
				exclude: ['bio']
			}
		}));
	}
	catch (ex) {
		next(ex);
	}
});

app.get('/api/users/:id', async (req, res, next) => {
	try {
		res.send(await User.findByPk(req.params.id));
	}
	catch (ex) {
		next(ex);
	}
});

app.get('/api/users/:id/stories', async (req, res, next) => {
	try {
		const stories = await Story.findAll({
			where: {
				userId: req.params.id
			}
		});
		res.send(stories);
	}
	catch (ex) {
		next(ex);
	}
});


app.post('/api/users', async (req, res, next) => {
	try {
		const { name, bio } = req.body;
		const newUser = await User.create({ name, bio });
		res.status(201).send(newUser);
	}
	catch (err) {
		next(err);
	}
});

app.post('/api/users/:id/stories', async (req, res, next) => {
	try {
		const { title, body } = req.body;
		const { id } = req.params;
		const newStory = await Story.create({ title, body, userId: id, favorite: false });
		res.status(201).send(newStory);
	}
	catch (err) {
		next(err);
	}
});

app.delete('/api/users/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		await user?.destroy();
		res.sendStatus(204);
	}
	catch (err) {
		next(err);
	}
});

app.delete('/api/stories/:id', async (req, res, next) => {
	try {
		const story = await Story.findByPk(req.params.id);
		await story?.destroy();
		res.sendStatus(204);
	}
	catch (err) {
		next(err);
	}
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
