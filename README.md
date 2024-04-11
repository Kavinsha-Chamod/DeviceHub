
How to run the project
 Installation instructions for the Application to run in localhost
1. Extract the winRaR file to the local storage.
2. Open the project structure in VS code
3. To navigate to the backend server – cd Backend
4. Install the Backend dependencies before start the server – npm install
5. To get start the Backend server – nodemon server then it runs on
http://localhost:4000
6. Open a new terminal in VS Code
7. Navigate to frontend – cd frontend
8. Install the Frontend dependencies – npm install then it runs on
http://localhost:3000
9. Start the Frontend – npm start
10. Now the both Backend and Frontend is up and running
 NOTE – I have used google cloud storage to store images in the application. So if any user
wants to run the application user should have my google application credentials file which
is called filekey.json. I have attached it along with this file so user can save it in their local
storage and add the file to the environment variable. Variable name
GOOGLE_APPLICATION_CREDENTIALS and the path where you downloaded the file
path. After that user can use the application without any errors.