const mongoose = require('mongoose');

// Schéma pour les Tâches
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  dueDate: String,
  createdAt: { type: Date, default: Date.now }
});

// Schéma pour les Notes
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  createdAt: { type: Date, default: Date.now }
});

// Schéma pour les Événements
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: String,
  endDate: String,
  createdAt: { type: Date, default: Date.now }
});

// Créer les modèles
const Task = mongoose.model('Task', taskSchema);
const Note = mongoose.model('Note', noteSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = { Task, Note, Event };
