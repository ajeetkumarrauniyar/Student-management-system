// Importing necessary libraries
let express = require('express');
let app = express();
const storage = require('node-persist');
let bodyParser = require('body-parser');

// Using bodyParser middleware for parsing requests as, body-parse has been deprecated from express 4.0 onwards
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Defining the port for the server
const port = 5000;

// Initializing the storage
storage.init();


// Welcome screen route
app.get('/', (req, res) => {
    // Create an HTML welcome message
    const welcomeMessage = `
        <html>
        <head>
            <title>Welcome to the Student Management System</title>
            <style>
            .button-container {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 40px;
            }
    
            .button {
                background-color: #007BFF;
                color: white;
                padding: 15px 20px;
                margin: 20px;
                cursor: pointer;
                font-size: xx-large;
                text-decoration: none;
                font-weight: 900;
            }
    
            .button:hover {
                background-color: #0056b3;
            }
    
            .search-form {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px auto;
                max-width: 400px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #f5f5f5;
            }
    
            .search-input {
                flex: 1;
                padding: 10px;
                font-size: large;
                border: none;
                border-radius: 5px;
            }
            .search-button {
                background-color: #007BFF;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                margin-left: 10px;
                cursor: pointer;
                font-size: large;
                font-weight: 700;
            }
    
            .search-button:hover {
                background-color: #0056b3;
            }
            .search-result {
                margin-top: 20px;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #f5f5f5;
            }
        </style>
        </head>
        
        <body style="text-align: center;">
            <h1 style="color: blue; font-size: 60px;">Welcome to the <span style="color: orange;"><br>Student Management System </span> </h1>
            <div class="search-container">
                <h2>Search Student by ID</h2>
                <form class="search-form" action="/searchStudent" method="POST">
                    <input class="search-input" type="text" name="studentId" placeholder="Enter Student ID">
                    <button class="search-button" type="submit">Search</button>
                </form>
            </div>
            <div class="button-container">
                <a href="/allStudents" class="button">View All Students</a>
                <a href="/topper" class="button">Find Topper</a>
            </div>
        </body>
        </html>
    `;

    // Send the HTML welcome message as the response
    res.send(welcomeMessage);
});


// Handling POST (Adding) request to add Student data to the storage
app.post("/student", async (req, res) => {
    // Extracting data from the request body (destructuring)
    const { student_id, student_name, gpa } = req.body;

    // Creating a student data object
    const studentData = {
        id: student_id,
        name: student_name,
        gpa: gpa
    };

    // Storing the student data in storage
    await storage.setItem(student_id, studentData);


    // Sending a success response
    res.send("Added Student Successfully!");
});


// Handling GET (Retrieving) request to retrieve all student data from the storage
app.get('/allStudents', async (req, res) => {
    let htmlCode = `
        <html>
        <head>
            <title>All Students Data</title>
        </head>
        <body>
            <h1 style="color: blue; text-align: center;">All Students Data</h1>
    `;

    // Retrieving all student data from storage
    const students = await storage.values();

    // Loop through the student data and formatting it for display
    for (let i = 0; i < students.length; i++) {
        htmlCode += `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                <h2>Student ID: ${students[i].id}</h2>
                <p>Name: ${students[i].name}</p>
                <p>GPA: ${students[i].gpa}</p>
            </div>
        `;
    }

    htmlCode += `
        <p><a href="/">Back to Home</a></p>
        </body>
        </html>
    `;

    // Sending the formatted HTML response
    res.send(htmlCode);
});


// Handling GET request to retrieve student data by ID from the storage
app.get('/student/:id', async (req, res) => {
    // Checking if the requested student data exists in storage
    if ((await storage.keys()).includes(req.params.id)) {
        // Retrieving the student data by ID
        const studentData = await storage.getItem(req.params.id);
        // Creating HTML response for displaying student data
        const htmlCode = `
            <html>
            <head>
                <title>Student Data</title>
            </head>
            <body>
                <h1 style="color: green; text-align: center;">Student Data</h1>
                <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                    <h2>Student ID: ${studentData.id}</h2>
                    <p>Name: ${studentData.name}</p>
                    <p>GPA: ${studentData.gpa}</p>
                </div>
                <p><a href="/">Back to Home</a></p>
            </body>
            </html>
        `;
        // Sending the HTML response with student data
        res.send(htmlCode);
    } else {
        // Sending a message indicating that no student was found
        res.send("<h1>No Student Found!</h1>");
    }
});


//  Handling GET request to find the top-performing student data from the storage
app.get('/topper', async (req, res) => {
    let topper = null;

    // Retrieving all student data from storage
    const students = await storage.values();

    // Finding the student with the highest GPA
    for (let i = 0; i < students.length; i++) {
        if (!topper || students[i].gpa > topper.gpa) {
            topper = students[i];
        }
    }

    if (topper) {
        // Creating HTML response for displaying the top-performing student data
        const htmlCode = `
            <html>
            <head>
                <title>Topper Student Data</title>
            </head>
            <body>
                <h1 style="color: red; text-align: center;">Topper Student Data</h1>
                <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                    <h2>Student ID: ${topper.id}</h2>
                    <p>Name: ${topper.name}</p>
                    <p>GPA: ${topper.gpa}</p>
                </div>
                <p><a href="/" style="text-align:center">Back to Home</a></p>
            </body>
            </html>
        `;

        // Sending the HTML response with top-performing student data
        res.send(htmlCode);
    } else {
        // Sending a message indicating that no student data was found
        res.send("<h1>No Student Data Found!</h1>");
    }
});


// Handling POST route for searching students by student ID
app.post('/searchStudent', async (req, res) => {
    const studentId = req.body.studentId;

    // Check if the student ID exists in storage
    if ((await storage.keys()).includes(studentId)) {
        const studentData = await storage.getItem(studentId);
        const htmlCode = `
            <html>
            <head>
                <title>Search Result</title>
            </head>
            <body>
                <h1 style="color: orange; text-align: center;">Search Result</h1>
                <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                    <h2>Student ID: ${studentData.id}</h2>
                    <p>Name: ${studentData.name}</p>
                    <p>GPA: ${studentData.gpa} </p>
                </div>
                <p><a href="/">Back to Home</a></p>
            </body>
            </html>
        `;
        res.send(htmlCode);
    } else {
        const errorMessage = `
            <html>
            <head>
                <title>Search Result</title>
            </head>
            <body>
                <h1 style="color: orange; text-align: center;">Search Result</h1>
                <p>No Student Found with ID: ${studentId}</p>
                <p><a href="/">Back to Home</a></p>
            </body>
            </html>
        `;
        res.send(errorMessage);
    }
});


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});