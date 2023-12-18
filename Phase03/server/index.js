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

      await pool.query(
        "INSERT INTO editor (ename) VALUES ($1) ON CONFLICT (ename) DO NOTHING",
        [ename]
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
  
   // Insert into the written_by table
   await pool.query(
    "INSERT INTO written_by (aname, title, edition, copy) VALUES ($1, $2, $3, $4)",
    [aname, title, edition, bookResult.rows[0].copy]
  );
    
  // Insert into the edited_by table
  await pool.query(
    "INSERT INTO edited_by (ename, title, edition, copy) VALUES ($1, $2, $3, $4)",
    [ename, title, edition, bookResult.rows[0].copy]
  );
  
      res.json(bookResult.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });
  

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

// Delete a book
app.delete("/books", async (req, res) => {
  try {
      const {
          title,
          edition,
          copy
      } = req.body;

      // Delete the book record
      const deletedBook = await pool.query(
          "DELETE FROM book WHERE title = $1 AND edition = $2 AND copy = $3 RETURNING *",
          [title, edition, copy]
      );

      res.json(deletedBook.rows[0]);
      console.log(deletedBook.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
  }
});

// Update availability of book
app.patch("/books/:title/:edition/:copy", async (req, res) => {
  const { title, edition, copy } = req.params;
  const { availability } = req.body;

  try {
    const response = await pool.query(
      "UPDATE book SET availability = $1 WHERE title = $2 AND edition = $3 AND copy = $4 RETURNING *",
      [availability, title, edition, copy]
    );

    if (response.rows.length === 0) {
      // Book with the given identifiers not found
      return res.status(404).json({ error: "Book not found" });
    }

    // Respond with the updated book
    res.json(response.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(3000, () => {
    console.log("server running on port 3000");
});



