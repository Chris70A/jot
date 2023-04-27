const util = require('util');
const fs = require('fs');



const { v1: uuidv1 } = require('uuid');                                // Import uuid for unique ids


// Promisify readFile and writeFile
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



class Store {

  read() {                                                  // Read method
    return readFileAsync('db/db.json', 'utf8');
  }


  write(note) {                                                 // Write method
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }



  getNotes() {                                                  // Get notes method
    return this.read().then((notes) => {                        // Read notes
      let parsedNotes;                                          // Initialize var

      
      try {
        parsedNotes = [].concat(JSON.parse(notes));             // Parse notes
      } catch (err) {
        parsedNotes = [];                                        // Empty array
      }

      return parsedNotes;                                        // Return array
    });
  }



  addNote(note) {
    const { title, text } = note;                                   // Destructure note object


    if (!title || !text) {                                         // Check for title & text
      throw new Error("Cannot be blank");                          // Error if missing
    }


    const newNote = { title, text, id: uuidv1() };                 // Create new note with ID


    return this.getNotes()                                          // Retrieve existing notes
      .then((notes) => [...notes, newNote])                         // Add new note to list
      .then((updatedNotes) => this.write(updatedNotes))             // Save updated list
      .then(() => newNote);                                         // Return new note
    }
  



  removeNote(id) {
   
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
    }


}



module.exports = new Store();




