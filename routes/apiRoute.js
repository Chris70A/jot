const router = require('express').Router();
const store = require('../db/store');

// Handle GET /notes
router.get('/notes', (req, res) => {
  store                                                     // Access store
    .getNotes()                                             // Get notes
    .then((notes) => {                                      // On success
      return res.json(notes);                               // Send notes as JSON
    })
    .catch((err) => res.status(500).json(err));
});


// Handle POST /notes
router.post('/notes', (req, res) => {
  store
    .addNote(req.body)                                      // Add note from body
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});



// Handle DELETE /notes/:id
router.delete('/notes/:id', (req, res) => {
  store
    .removeNote(req.params.id)                              // Remove note by id
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});



module.exports = router;