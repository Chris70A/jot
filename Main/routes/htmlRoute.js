const path = require('path');
const router = require('express').Router();




router.get('/notes', (req, res) => {

  res.sendFile(path.join(__dirname, '../public/notes.html'));        // Send notes.html

});




router.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, '../public/index.html'));        // Send index.html

});




module.exports = router;
