# Graded Assignment on Container Orchestration

## Pre-requisites
1. You have to post data using below POST register path
2. Keep the backend running
3. 

## Issues in backend

1. .env file was named as config.env
2. index.js .env file path is modified ```require("dotenv").config({ path: ".env" });```
3. **PORT** is missing in the .env file.
4. comment out the HASH_KEY and JWT_SECRET_KEY in the .env file.

## Get & POST API Endpoints

| **GET Path**                                 | **POST Path**                                |
|---------------------------------------------|----------------------------------------------|
| http://localhost:3000/student/getstudent     | http://localhost:3000/student/register       |
|                                              | http://localhost:3000/student/login          |
|                                             | http://localhost:3000/admin/register         |
|                                             | http://localhost:3000/admin/login            |
| http://localhost:3000/careerService/getcareer| http://localhost:3000/careerService/register |
|                                              | http://localhost:3000/careerService/login    |
| http://localhost:3000/faculty/getfaculty     | http://localhost:3000/faculty/register       |
|                                              | http://localhost:3000/faculty/login          |
| http://localhost:3000/questions              | http://localhost:3000/uploadQuestion         |
|                                              | http://localhost:3000/batch/register         |
|                                              | http://localhost:3000/attendance/register    |




## To know the endpoint of your database:

Tip to Debug in Future

If you're ever unsure about the full route, just:

    Look at ```app.use("/prefix", ...) in index.js```

    Look at ``router.<method>("/path", ...) in your route file```

Put them together:
```app.use("/prefix", ...) + router.post("/path") = POST /prefix/path```


## Issue in upload controller file:
### ✅ **Crisp Summary of Issue & Fix**

---

### 🔴 **Issue**

* Used undefined variable `que`.
* Incorrectly used `newQuestion.save({...})` without creating `newQuestion`.
* Mixed `.then()` with `async/await`.
* Missing validation for `question_title`.

---

### ✅ **Fix**

* Removed `if (que)` block.
* Replaced with:
  `const newQuestion = new Questions({ ...req.body });`
  `await newQuestion.save();`
* Used clean `async/await`.
* Added `question_title` to validation.

---


