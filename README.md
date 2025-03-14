#FitTrack-Server

##Description
FitTrack Server is the backend for the FitTrack fitness tracking application. It provides a RESTful API to manage workouts, exercises, goals, and progress tracking. 
Built with Node.js, Express, and MySQL, it ensures efficient data management and seamless integration with the FitTrack client.

###Installation
1. Clone the Repository: git clone https://github.com/antointhesky/FitTrack-server.git
2. Navigate to the Server Directory: cd FitTrack-Server
3. Install Dependencies: npm install
   
###Set Up the Database
1. Ensure you have MySQL installed and running.
2. Create a new MySQL database (e.g., fittrack_db).
3. Update the database connection settings in the .env file:
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=fittrack_db
4. Run the database migrations and seed the initial data:
npm run migrate
npm run seed

###Run Locally
Start the Server: npm start


