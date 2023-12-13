const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware//
app.use(cors());
app.use(express.json());

//ROUTES//

//create a book
app.post("/books", async (req, res) => {
    try {
      const {
        title,
        edition,
        category,
        availability,
        additional_notes,
        room,
        shelf,
        pname,
        fname,
        dname,
        year,
        aname, // Author's name
        ename, // Editor's name
        // copy,
      } = req.body;

       // Check if dname is provided; if not, set it to "n/a"
    const donorName = dname || 'n/a';

    // Insert into the donor table
    await pool.query(
      "INSERT INTO donor (dname) VALUES ($1) ON CONFLICT (dname) DO NOTHING",
      [donorName]
    );

    // Check if fname is provided; if not, set it to "n/a"
    const facultyName = fname || 'n/a';

    // Insert into the faculty table
    await pool.query(
      "INSERT INTO faculty (fname) VALUES ($1) ON CONFLICT (fname) DO NOTHING",
      [facultyName]
    );
  
     // Insert into the location table
     await pool.query(
        "INSERT INTO location (room, shelf) VALUES ($1, $2) ON CONFLICT (room, shelf) DO NOTHING",
        [room, shelf]
      );

      await pool.query(
        "INSERT INTO publisher (pname) VALUES ($1) ON CONFLICT (pname) DO NOTHING",
        [pname]
      );

      await pool.query(
        "INSERT INTO author (aname) VALUES ($1) ON CONFLICT (aname) DO NOTHING",
        [aname]
      );

   

      // Insert into the book table
      const bookResult = await pool.query(
        "INSERT INTO book (title, edition, category, availability, additional_notes, room, shelf, pname, fname, dname, year) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
        [
          title,
          edition,
          category,
          availability,
          additional_notes,
          room,
          shelf,
          pname,
          fname,
          dname,
          year,
        ]
      );
  
  
    
  
      res.json(bookResult.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
// app.post("/books", async (req, res) => {
//     try {
//         const { title, edition, copy, category, availability, additional_notes, room, shelf, pname, fname, dname, year } = req.body;
//         const newBook = await pool.query(
//             "INSERT INTO book (title, edition, copy, category, availability, additional_notes, room, shelf, pname, fname, dname, year) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
//             [title, edition, copy, category, availability, additional_notes, room, shelf, pname, fname, dname, year]
//         );

//         res.json(newBook.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

//get all books

app.get("/books", async (req, res) => {
    try {
        const allBooks = await pool.query(
            "SELECT b.*, w.aname AS author_name, e.ename AS editor_name FROM book b LEFT JOIN written_by w ON b.title = w.title AND b.edition = w.edition AND b.copy = w.copy LEFT JOIN edited_by e ON b.title = e.title AND b.edition = e.edition AND b.copy = e.copy"
            );
        res.json(allBooks.rows);
   
    } catch (err) {
        console.error(err.message);
    }
});

//get a book

app.get("/books/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const book = await pool.query("SELECT * FROM book WHERE book_id = $1", [id]);
        res.json(book.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a book

app.put("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, edition, copy, category, availability, additional_notes, room, shelf, pname, fname, dname, year } = req.body;
        const updateBook = await pool.query(
            "UPDATE book SET title = $1, edition = $2, copy = $3, category = $4, availability = $5, additional_notes = $6, room = $7, shelf = $8, pname = $9, fname = $10, dname = $11, year = $12 WHERE book_id = $13",
            [title, edition, copy, category, availability, additional_notes, room, shelf, pname, fname, dname, year, id]
        );
        res.json("Book was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a book

app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBook = await pool.query("DELETE FROM book WHERE book_id = $1", [id]);
        res.json("Book was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});


app.listen(3000, () => {
    console.log("server running on port 3000");
});



