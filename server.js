const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [
  { id: '1', title: 'Welcome to FRI2PLAN', status: 'pending', dueDate: new Date().toISOString().split('T')[0] }
];

let notes = [
  { id: '1', title: 'Welcome to FRI2PLAN', content: 'Start taking notes here!' }
];

let events = [
  { id: '1', title: 'Project Kickoff', description: 'Start of FRI2PLAN project', startDate: new Date().toISOString().split('T')[0], endDate: new Date().toISOString().split('T')[0] }
];

app.get('/api/tasks', (req, res) => res.json(tasks));
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const newTask = { id: Date.now().toString(), title, status: 'pending', dueDate: new Date().toISOString().split('T')[0] };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  if (req.body.title) task.title = req.body.title;
  if (req.body.status) task.status = req.body.status;
  res.json(task);
});
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.json({ success: true });
});

app.get('/api/notes', (req, res) => res.json(notes));
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const newNote = { id: Date.now().toString(), title, content: content || '' };
  notes.push(newNote);
  res.status(201).json(newNote);
});
app.put('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  if (req.body.title) note.title = req.body.title;
  if (req.body.content !== undefined) note.content = req.body.content;
  res.json(note);
});
app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(n => n.id !== req.params.id);
  res.json({ success: true });
});

app.get('/api/events', (req, res) => res.json(events));
app.post('/api/events', (req, res) => {
  const { title, description, startDate, endDate } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const newEvent = { id: Date.now().toString(), title, description: description || '', startDate: startDate || new Date().toISOString().split('T')[0], endDate: endDate || new Date().toISOString().split('T')[0] };
  events.push(newEvent);
  res.status(201).json(newEvent);
});
app.put('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Not found' });
  if (req.body.title) event.title = req.body.title;
  if (req.body.description !== undefined) event.description = req.body.description;
  if (req.body.startDate) event.startDate = req.body.startDate;
  if (req.body.endDate) event.endDate = req.body.endDate;
  res.json(event);
});
app.delete('/api/events/:id', (req, res) => {
  events = events.filter(e => e.id !== req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ FRI2PLAN API running on http://localhost:${PORT}` );
});
