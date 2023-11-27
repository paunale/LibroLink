const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: '3306',
  database: 'librolink',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();
//Sesiune//
const sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'librolink',
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
  createDatabaseTable: true, // Add this line to create the sessions table if not exists
});

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

passport.serializeUser((user, done) => {
  done(null, user); // Store the entire user object in the session
});

passport.deserializeUser(async (req, user, done) => {
  const userId = user.ID;

  if (userId && req.session.passport && req.session.passport.user && req.session.passport.user.ID === userId) {
    const query = 'SELECT * FROM users WHERE ID = ?';

    try {
      const [results] = await db.execute(query, [userId]);

      if (results.length === 0) {
        return done(null, false);
      }

      const deserializedUser = {
        ID: results[0].ID,
        email: results[0].email,
      };

      done(null, deserializedUser);
    } catch (error) {
      console.error('Error deserializing user:', error);
      done(error, false);
    }
  } else {
    done(null, false);
  }
});


//Autentificare//
async function authenticateUser(email, password, done) {
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  try {
    const [results] = await db.execute(query, [email, password]);

    if (results.length > 0) {
      return done(null, { ID: results[0].ID, email: results[0].email });
    } else {
      return done(null, false, { message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return done(error);
  }
}


app.post('/login', (req, res, next) => {
  // Check if the user is already authenticated
  if (req.isAuthenticated()) {
    return res.status(200).json({ success: true, message: 'Already authenticated' });
  }

  // If not authenticated, proceed with authentication
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      // Set the user in the session
      req.session.passport = { user: { ID: user.ID, email: user.email } };

      // Save the session and then send the response
      req.session.save((saveErr) => {
        if (saveErr) {
          return next(saveErr);
        }

        console.log('After login - isAuthenticated:', req.isAuthenticated());
        console.log('Session after login:', req.session);

        // Send the response after the session is saved
        res.status(200).json({ success: true, message: 'Login successful' });
      });
    });
  })(req, res, next);
});


//Inregistrarea//
app.post('/register', async (req, res) => {
  const { prenume, nume, email, password } = req.body;
  const query = 'INSERT INTO users (prenume, nume, email, password) VALUES (?, ?, ?, ?)';

  try {
    await db.execute(query, [prenume, nume, email, password]);
    res.status(200).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});


//Logout//
app.post('/logout', (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    console.log('Utilizatgorul este autentificat, urmeaza logout');

    // Using req.logout() with a callback function
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).json({ success: false, message: 'Logout failed' });
      }

      // Clear the session cookie
      res.clearCookie('connect.sid', {
        path: '/', 
        httpOnly: true,
        secure: false,
        sameSite: 'None',
      });

      // Destroy the session
      req.session.destroy((destroyErr) => {
        if (destroyErr) {
          console.error('Error destroying session:', destroyErr);
          return res.status(500).json({ success: false, message: 'Logout failed' });
        }

        console.log('User logged out');
        return res.status(200).json({ success: true, message: 'Logout successful' });
      });
    });
  } else {
    // If the user is not authenticated, treat it as a successful logout
    console.log('Utilizatorul nu este autentificat');
    return res.status(200).json({ success: true, message: 'Logout successful' });
  }
});



//Verificare sesiune//
app.get('/check-session', (req, res) => {
  console.log('Before check session - isAuthenticated:', req.isAuthenticated());
  console.log('Session during check session:', req.session);

  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    console.log('Inside if condition - isAuthenticated:', req.isAuthenticated());
    res.status(200).json({ loggedIn: true, user: req.user });
    console.log('Logged in');
  } else {
    console.log('Inside else condition - isAuthenticated:', req.isAuthenticated());
    console.log('Login failed: User not logged in');
    res.status(200).json({ loggedIn: false });
  }
});
// ... (your existing imports and configurations)


//Cautare//


/*app.get('/books', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ success: false, message: 'Search query parameter is missing' });
  }

  const searchQuery = `
    SELECT * FROM books
    WHERE author LIKE ? OR name LIKE ?;
  `;

  const searchTerm = `%${query}%`;

  console.log('Received search query:', query);
  console.log('SQL query:', searchQuery, searchTerm);

  try {
    const [results] = await db.execute(searchQuery, [searchTerm, searchTerm]);

    res.status(200).json({ success: true, books: results });
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ success: false, message: 'Error searching books' });
  }
});
*/

// ... (your existing imports and configurations)

// Update the /books endpoint with promise-based queries
app.get('/books', async (req, res) => {
  try {
    const { genre } = req.query;

    if (!genre) {
      return res.status(400).json({ success: false, message: 'Genre parameter is missing' });
    }

    const query = 'SELECT * FROM books WHERE genre = ?';

    const [results] = await db.query(query, [genre]);

    res.status(200).json({ success: true, books: results });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ success: false, message: 'Error fetching books' });
  }
});



app.get('/books/:bookId', async (req, res) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({ success: false, message: 'BookId parameter is missing' });
  }

  const query = 'SELECT * FROM books WHERE ID = ?';

  try {
    const [results] = await db.execute(query, [bookId]);

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    const book = results[0];
    res.status(200).json({ success: true, book });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ success: false, message: 'Error fetching book' });
  }
});


// ... (your existing routes)




//Adugare//

app.post('/add-book', async (req, res) => {
  const { name, author, genre, description } = req.body;

  // Validate the input (add your own validation logic)

  try {
    // Perform the database insertion
    await db.execute('INSERT INTO books (name, author, genre, description) VALUES (?, ?, ?, ?)', [name, author, genre, description]);

    // Send a success response
    res.status(200).json({ success: true, message: 'Book added successfully' });
  } catch (error) {
    // Handle database errors
    console.error('Error adding book:', error);
    res.status(500).json({ success: false, message: 'Error adding book to the database' });
  }
});



// Cautare
app.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ success: false, message: 'Search query parameter is missing' });
  }

  const searchQuery = `
    SELECT * FROM books
    WHERE author LIKE ? OR name LIKE ?;
  `;

  const searchTerm = `%${query}%`;

  console.log('Received search query:', query);
  console.log('SQL query:', searchQuery, searchTerm);

  try {
    const [results] = await db.execute(searchQuery, [searchTerm, searchTerm]);

    res.status(200).json({ success: true, books: results });
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ success: false, message: 'Error searching books' });
  }
});
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};


app.post('/update-genres', ensureAuthenticated, async (req, res) => {
  const { genres } = req.body;

  // Assuming you have a logged-in user, retrieve the user ID from the session
  const userId = req.isAuthenticated() ? req.user.ID : null;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }

  try {
    // Update the user's favorite genres in the database
    const updateGenresQuery = 'UPDATE users SET favorite_genres = ? WHERE ID = ?';
    await db.execute(updateGenresQuery, [JSON.stringify(genres), userId]);

    res.status(200).json({ success: true, message: 'Genres updated successfully' });
  } catch (error) {
    console.error('Error updating genres:', error);
    res.status(500).json({ success: false, message: 'Error updating genres' });
  }
});


app.get('/recommended-books', ensureAuthenticated, async (req, res) => {
  // Ensure the user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }

  const userId = req.user.ID;

  // Query to get the favorite genres of the user
  const getUserGenresQuery = 'SELECT favorite_genres FROM users WHERE ID = ?';

  try {
    const [userResults] = await db.execute(getUserGenresQuery, [userId]);

    // Check if the user is not found
    if (userResults.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('userResults:', userResults);

    // Extract the favorite_genres field
    const userGenresField = userResults[0].favorite_genres;

    console.log('userGenresField:', userGenresField);

    // Ensure that userGenres is an array of exactly 3 genres
    let userGenres;
    if (Array.isArray(userGenresField) && userGenresField.length === 3) {
      userGenres = userGenresField;
      console.log('userGenres:', userGenres);
    } else {
      // If it's not an array or doesn't have exactly 3 genres, default to an empty array
      userGenres = [];
    }

    // Check if the user has no favorite genres
    if (userGenres.length === 0) {
      return res.status(200).json({ success: true, message: 'User has no favorite genres', books: [] });
    }

    const getRecommendedBooksQuery = 'SELECT * FROM books WHERE genre IN (?)';

console.log('getRecommendedBooksQuery:', getRecommendedBooksQuery, userGenres);

// Create an array of placeholders based on the number of genres
const placeholders = userGenres.map(() => '?').join(',');

// Use the placeholders in the query
const queryWithPlaceholders = getRecommendedBooksQuery.replace('?', placeholders);

const [booksResults] = await db.execute(queryWithPlaceholders, userGenres);

console.log('booksResults:', booksResults);

    res.status(200).json({ success: true, books: booksResults });
  } catch (error) {
    console.error('Error fetching recommended books:', error);

    // Log the detailed error information
    console.error('Detailed error:', error);

    res.status(500).json({ success: false, message: 'Error fetching recommended books' });
  }
});

app.post('/makereview/:bookId', ensureAuthenticated, async (req, res) => {
  const { bookId } = req.params;
  const { text, rating } = req.body;

  // Ensure the user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }

  // Validate input (add your own validation logic)

  try {
    // Insert the review into the reviews database
    const insertReviewQuery = 'INSERT INTO reviews (book_id, review_text, rating) VALUES (?, ?, ?)';
    await db.execute(insertReviewQuery, [bookId, text, rating]);

    res.status(200).json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    // Handle database errors
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Error adding review to the database' });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// ... (your existing routes)

