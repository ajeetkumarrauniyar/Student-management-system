```markdown
# Student Management System README

This is a simple Student Management System built with Node.js and Express. It allows you to perform various operations related to student data, such as adding students, retrieving all students, finding the topper, and searching for students by ID.

## Getting Started

To get started with this Student Management System, follow these steps:

1. Clone the repository:

   ```bash
   git clone [https://github.com/ajeetkumarrauniyar/Student-management-system]
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node server.js
   ```

4. Access the application in your browser at [http://localhost:5000](http://localhost:5000).

## Features

### Add Student

You can add a new student by sending a POST request to `/student` with the following JSON data:

```json
{
  "student_id": "unique_student_id",
  "student_name": "Student Name",
  "gpa": 4.0
}
```

### Retrieve All Students

To retrieve a list of all students, simply visit the `/allStudents` route in your browser. You will see a list of all students with their details.

### Find Topper

You can find the top-performing student by visiting the `/topper` route. The system will display the student with the highest GPA.

### Search Student by ID

To search for a student by ID, submit a POST request to `/searchStudent` with the following JSON data:

```json
{
  "studentId": "unique_student_id"
}
```

## Example Usage

Here are some example requests and responses:

### Adding a Student

- **Request:**

  ```json
  POST /student
  {
    "student_id": "s001",
    "student_name": "John Doe",
    "gpa": 3.8
  }
  ```

- **Response:**

  Student added successfully!

### Retrieving All Students

- **Request:**

  Visit [http://localhost:5000/allStudents](http://localhost:5000/allStudents) in your browser.

- **Response:**

  ![All Students](/screenshots/all_students.png)

### Finding the Topper

- **Request:**

  Visit [http://localhost:5000/topper](http://localhost:5000/topper) in your browser.

- **Response:**

  ![Topper](/screenshots/topper.png)

### Searching for a Student by ID

- **Request:**

  ```json
  POST /searchStudent
  {
    "studentId": "s002"
  }
  ```

- **Response:**

  ![Search Result](/screenshots/search_result.png)

## Screenshots

Screenshots of the application:

- All Students
  ![All Students](/screenshots/all_students.png)

- Topper
  ![Topper](/screenshots/topper.png)

- Search Result
  ![Search Result](/screenshots/search_result.png)

## Author

- [Ajeet Kumar](https://github.com/ajeetkumarrauniyar)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
