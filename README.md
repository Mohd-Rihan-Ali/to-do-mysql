# To-Do MySQL

This repository houses the To-Do MySQL application, a simple to-do list management system built with Express.js on the server side and React.js on the client side, utilizing MySQL for data storage.

## Features

- **User Authentication**: Secure user authentication using bcrypt for password hashing.
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on to-do items.
- **Responsive Design**: The client-side application is designed to be responsive and work seamlessly across various devices.

## Installation

To run this application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:Mohd-Rihan-Ali/to-do-mysql.git
   ```

2. Navigate to the server directory and install server dependencies:
   ```bash
   cd to-do-mysql/server
   npm install
   ```

3. **Set up MySQL Database**:
   - Install MySQL on your system if not already installed.
   - Log in to MySQL:
     ```bash
     mysql -u your_username -p
     ```
   - Create a new database:
     ```sql
     CREATE DATABASE todo_db;
     ```

4. **Create Database Schemas**:
   - In the MySQL console, switch to the newly created database:
     ```sql
     USE todo_db;
     ```
   - Create the necessary tables:
     ```sql
     CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       password VARCHAR(255) NOT NULL
     );

     CREATE TABLE todos (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       user_id INT NOT NULL,
       completed BOOLEAN DEFAULT false,
       FOREIGN KEY (user_id) REFERENCES users(id)
     );
     ```

5. Navigate to the client directory and install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

6. Start the server:
   ```bash
   cd ../server
   node server.js
   ```

7. Start the client:
   ```bash
   cd ../client
   npm start
   ```

8. Access the application at `http://localhost:3000` in your browser.

## Dependencies

### Server

- **bcrypt**: Library for password hashing.
- **body-parser**: Middleware for parsing request bodies.
- **express**: Web framework for Node.js.
- **mysql**: MySQL database driver for Node.js.

### Client

- **@testing-library/jest-dom**: Testing utilities for Jest.
- **@testing-library/react**: Testing utilities for React components.
- **@testing-library/user-event**: Testing utilities for user interactions.
- **axios**: Promise-based HTTP client for the browser and Node.js.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: React package for DOM rendering.
- **react-scripts**: Configuration and scripts for Create React App.
- **web-vitals**: Library for tracking web vitals.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Rihan

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

Thank you for checking out To-Do MySQL! If you have any questions or feedback, please don't hesitate to get in touch. Happy coding! 🚀
