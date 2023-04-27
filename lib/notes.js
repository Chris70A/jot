// Import fs and path from Node library.
const fs = require('fs');
const path = require('path');


function createNote(body, notesArray) {             // two arguments body and notesArray.
   
    const note = body;                              // Initialize note with the value of body
    
    notesArray.push(note);                          // Add note object to notesArray
    
   
    fs.writeFileSync(                               // File synchronously
        path.join(__dirname, '../db/notes.json'),   // Join relative path 
        JSON.stringify({ notesArray }, null, 2)     // Convert object to formatted JSON string.
      );

    return note; 
}


function removeNote(id, notes) {
    
    let notesArray = notes.filter(Element => {
        if (Element.id == id) {
            return false 
        } else {
            return true 
        }
    });

    
    let index = 0;
    notesArray.forEach(note => {
        note.id = index;
        index += 1;
    });

    
    fs.writeFileSync(
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify({ notesArray }, null, 2)
    );
    return notesArray;
}


module.exports = {
    createNote,
    removeNote
};