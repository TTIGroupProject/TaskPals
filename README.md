# Task Pals

TaskPals is a comprehensive task management and service booking application designed to streamline the process of finding, scheduling, and reviewing service providers. The app connects customers with a diverse range of service providers, allowing users to browse, book, and review services all in one place. Key features include user authentication, service provider profiles, booking management, and a review system to ensure transparency and quality in service delivery.


## Tech Stack

**Client:** 

React: For building interactive and dynamic user interfaces.

**Server:** 

Flask: A lightweight web framework for Python that is used to create RESTful APIs and manage backend logic.

SQLAlchemy: An Object-Relational Mapping (ORM) library for managing database operations.

MySQL: A relational database management system used for storing and retrieving data.


## Run Locally - Backend Setup

Clone the project

```bash
  git clone https://github.com/TTIGroupProject/TaskPals.git
```

Navigate to the backend directory

```bash
  cd TaskPals/TaskPals_Backend
```

Create and activate a virtual environment

```bash
On Windows:
  python -m venv venv
  venv\Scripts\activate

On macOS/Linux:
  python3 -m venv venv
  source venv/bin/activate
```

Install dependencies

```bash
  pip install -r requirements.txt
```
Set up environment variables
```bash
Create a .env file in the TaskPals_Backend directory with the following contents, replacing the placeholders with your actual configuration values:

  MYSQL_DATABASE_URI=your_mysql_database_uri
  JWT_SECRET_KEY=your_jwt_secret_key
  UPLOAD_FOLDER=path_to_your_upload_folder
```
Run the Flask application
```bash
  python app.py
```
The server will start on http://localhost:5000.
## Run Locally - Frontend Setup
Navigate to the frontend directory
```bash
  cd ../TaskPals_Frontend
```
Install dependencies
```bash
  npm install
```
Start the frontend application
```bash
  npm run start
```
The React application will start on http://localhost:3000.
## Collaborators
We worked together as a team to develop this project. Here are the team members who contributed:

Rikki Abramson - @Rikki12345

Suri Roth - @SuriRoth

Bracha Fishman - @Brocha1357

Fraidy Lieber - @fl435

Feel free to connect with us on GitHub to see more of our work!

