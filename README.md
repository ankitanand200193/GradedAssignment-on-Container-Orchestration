# Graded Assignment on Container Orchestration


project-root/
├── docker-compose.yml
├── learnerReportCS_frontend/
│   ├── Dockerfile
│   └── .env (for React)
├── learnerReportCS_backend/
│   ├── Dockerfile
│   └── .env (for Node)

## Frequent commands:

docker-compose up --build
kubectl get all --all-namespacescs


1. dockerfile
2. docker-compose
3. deployment file
4. service files
5. helm chart
6. Jenkins on ec2
7. goorvy code

### docker-composefile
In newer versions of Docker Compose (v2+), the version: field (e.g., version: '3.8') is deprecated and not required anymore.

The Compose spec now auto-detects features without needing the version tag.


### kubenetes namespace hack:
Even if you declared namespace: learner-app inside the YAML, it's safer to explicitly set it while applying.

Run this:

kubectl apply -f mongo.yaml -n learner-app
kubectl apply -f backend.yaml -n learner-app
kubectl apply -f frontend.yaml -n learner-app





## Pre-requisites
1. You have to post data using below POST register path
2. Keep the backend running
3. Remove the comment out of the faculty in the faculty models schema




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

### Schema data

#### admin

```
{
  "username": "jane.doe_admin",
  "email": "jane.doe@organization.com",
  "password": "Pa$$w0rdJD!2025"
}

{
  "username": "sys_admin_alpha",
  "email": "sysadmin.alpha@company.net",
  "password": "SecureAccessKey#789"
}
```
#### Student
```
[
  {"batchName": "Batch-A", "userId": 301, "username": "stud_ravi", "email": "ravi@student.com", "fullname": "Ravi Kumar", "phoneNo": "9000011111", "password": "stud123", "courseName": "MERN", "yearOfExp": 1, "qualification": "B.Tech"},
  {"batchName": "Batch-A", "userId": 302, "username": "stud_pooja", "email": "pooja@student.com", "fullname": "Pooja Sharma", "phoneNo": "9000011112", "password": "stud123", "courseName": "Python", "yearOfExp": 0, "qualification": "B.Sc"},
  {"batchName": "Batch-B", "userId": 303, "username": "stud_aman", "email": "aman@student.com", "fullname": "Aman Verma", "phoneNo": "9000011113", "password": "stud123", "courseName": "DevOps", "yearOfExp": 2, "qualification": "MCA"},
  {"batchName": "Batch-B", "userId": 304, "username": "stud_seema", "email": "seema@student.com", "fullname": "Seema Roy", "phoneNo": "9000011114", "password": "stud123", "courseName": "Cloud", "yearOfExp": 1, "qualification": "M.Tech"},
  {"batchName": "Batch-C", "userId": 305, "username": "stud_manish", "email": "manish@student.com", "fullname": "Manish Das", "phoneNo": "9000011115", "password": "stud123", "courseName": "Data Science", "yearOfExp": 0, "qualification": "BCA"},
  {"batchName": "Batch-C", "userId": 306, "username": "stud_divya", "email": "divya@student.com", "fullname": "Divya Singh", "phoneNo": "9000011116", "password": "stud123", "courseName": "Python", "yearOfExp": 1, "qualification": "B.Sc"},
  {"batchName": "Batch-D", "userId": 307, "username": "stud_nikhil", "email": "nikhil@student.com", "fullname": "Nikhil Patil", "phoneNo": "9000011117", "password": "stud123", "courseName": "AI/ML", "yearOfExp": 2, "qualification": "M.Tech"},
  {"batchName": "Batch-D", "userId": 308, "username": "stud_shweta", "email": "shweta@student.com", "fullname": "Shweta Jha", "phoneNo": "9000011118", "password": "stud123", "courseName": "Java", "yearOfExp": 1, "qualification": "B.Com"},
  {"batchName": "Batch-E", "userId": 309, "username": "stud_rohan", "email": "rohan@student.com", "fullname": "Rohan Joshi", "phoneNo": "9000011119", "password": "stud123", "courseName": "Fullstack", "yearOfExp": 0, "qualification": "B.A"},
  {"batchName": "Batch-E", "userId": 310, "username": "stud_priya", "email": "priya@student.com", "fullname": "Priya Mehta", "phoneNo": "9000011120", "password": "stud123", "courseName": "AWS", "yearOfExp": 1, "qualification": "MBA"}
]
```

#### faculty 
```
[
  {"userId": 201, "username": "fac_amit", "email": "amit@fac.com", "fullname": "Amit Kumar", "phoneNo": "9090909090", "password": "fac123", "department": "CS", "skills": "Java", "about": "Senior Lecturer"},
  {"userId": 202, "username": "fac_kiran", "email": "kiran@fac.com", "fullname": "Kiran Desai", "phoneNo": "8080808080", "password": "fac123", "department": "IT", "skills": "Python", "about": "Trainer"},
  {"userId": 203, "username": "fac_rekha", "email": "rekha@fac.com", "fullname": "Rekha Sharma", "phoneNo": "7070707070", "password": "fac123", "department": "Maths", "skills": "Statistics", "about": "Guest Faculty"},
  {"userId": 204, "username": "fac_manoj", "email": "manoj@fac.com", "fullname": "Manoj Tiwari", "phoneNo": "6060606060", "password": "fac123", "department": "Physics", "skills": "Mechanics", "about": "Assistant Professor"},
  {"userId": 205, "username": "fac_ritu", "email": "ritu@fac.com", "fullname": "Ritu Verma", "phoneNo": "5050505050", "password": "fac123", "department": "CS", "skills": "Node.js", "about": "Mentor"},
  {"userId": 206, "username": "fac_nitin", "email": "nitin@fac.com", "fullname": "Nitin Goel", "phoneNo": "4040404040", "password": "fac123", "department": "CS", "skills": "DevOps", "about": "Lead Instructor"},
  {"userId": 207, "username": "fac_vandana", "email": "vandana@fac.com", "fullname": "Vandana S", "phoneNo": "3030303030", "password": "fac123", "department": "HR", "skills": "Soft Skills", "about": "Counselor"},
  {"userId": 208, "username": "fac_samir", "email": "samir@fac.com", "fullname": "Samir Bhatt", "phoneNo": "2020202020", "password": "fac123", "department": "Placement", "skills": "Career Coach", "about": "Support"},
  {"userId": 209, "username": "fac_kajal", "email": "kajal@fac.com", "fullname": "Kajal Ahuja", "phoneNo": "1010101010", "password": "fac123", "department": "Admin", "skills": "Operations", "about": "Admin Head"},
  {"userId": 210, "username": "fac_pranav", "email": "pranav@fac.com", "fullname": "Pranav S", "phoneNo": "1122334455", "password": "fac123", "department": "Tech", "skills": "React", "about": "Intern"}
]

```


#### careerServiceLogin 

```
[
  {"email": "kumar@cs.com", "password": "cs123", "userType": "careerService"},
  {"email": "jyoti@cs.com", "password": "cs123", "userType": "careerService"},
  {"email": "rahul@cs.com", "password": "cs123", "userType": "careerService"},
  {"email": "diya@cs.com", "password": "cs123", "userType": "careerService"},
  {"email": "raj@cs.com", "password": "cs123", "userType": "careerService"},
  {"email": "nidhi@cs.com", "password": "cs123", "userType": "careerService"},
  {"email": "sonu@cs.com", "password": "cs123", "userType": "careerService"},
  {"email": "varun@cs.com", "password": "cs123", "userType": "careerService"},
  {"email": "shilpa@cs.com", "password": "cs123", "userType": "careerService"},
  {"email": "anu@cs.com", "password": "cs123", "userType": "careerService"}
]
```
#### careerServiceRegister

``` 
[
  {"userId": 101, "username": "cs_kumar", "email": "kumar@cs.com", "fullname": "Kumar S", "phoneNo": "9898989898", "password": "cs123", "department": "IT"},
  {"userId": 102, "username": "cs_jyoti", "email": "jyoti@cs.com", "fullname": "Jyoti M", "phoneNo": "8888888888", "password": "cs123", "department": "Placement"},
  {"userId": 103, "username": "cs_rahul", "email": "rahul@cs.com", "fullname": "Rahul G", "phoneNo": "7777777777", "password": "cs123", "department": "HR"},
  {"userId": 104, "username": "cs_diya", "email": "diya@cs.com", "fullname": "Diya M", "phoneNo": "6666666666", "password": "cs123", "department": "Tech"},
  {"userId": 105, "username": "cs_raj", "email": "raj@cs.com", "fullname": "Raj P", "phoneNo": "9999999999", "password": "cs123", "department": "IT"},
  {"userId": 106, "username": "cs_nidhi", "email": "nidhi@cs.com", "fullname": "Nidhi J", "phoneNo": "9988776655", "password": "cs123", "department": "Support"},
  {"userId": 107, "username": "cs_sonu", "email": "sonu@cs.com", "fullname": "Sonu B", "phoneNo": "8877665544", "password": "cs123", "department": "Support"},
  {"userId": 108, "username": "cs_varun", "email": "varun@cs.com", "fullname": "Varun D", "phoneNo": "9988771234", "password": "cs123", "department": "HR"},
  {"userId": 109, "username": "cs_shilpa", "email": "shilpa@cs.com", "fullname": "Shilpa T", "phoneNo": "8877443322", "password": "cs123", "department": "Admin"},
  {"userId": 110, "username": "cs_anu", "email": "anu@cs.com", "fullname": "Anu R", "phoneNo": "9988770000", "password": "cs123", "department": "Tech"}
]

```

#### batchRegistration 

```
[
  {"BatchName": "Batch-A", "StartDate": "2025-04-01", "TotalEnroll": 25, "StatusActive": 1, "Dropout": 2},
  {"BatchName": "Batch-B", "StartDate": "2025-04-05", "TotalEnroll": 20, "StatusActive": 1, "Dropout": 1},
  {"BatchName": "Batch-C", "StartDate": "2025-04-10", "TotalEnroll": 30, "StatusActive": 1, "Dropout": 0},
  {"BatchName": "Batch-D", "StartDate": "2025-04-15", "TotalEnroll": 18, "StatusActive": 1, "Dropout": 3},
  {"BatchName": "Batch-E", "StartDate": "2025-04-20", "TotalEnroll": 22, "StatusActive": 1, "Dropout": 1},
  {"BatchName": "Batch-F", "StartDate": "2025-04-25", "TotalEnroll": 28, "StatusActive": 0, "Dropout": 4},
  {"BatchName": "Batch-G", "StartDate": "2025-05-01", "TotalEnroll": 35, "StatusActive": 1, "Dropout": 0},
  {"BatchName": "Batch-H", "StartDate": "2025-05-05", "TotalEnroll": 24, "StatusActive": 0, "Dropout": 2},
  {"BatchName": "Batch-I", "StartDate": "2025-05-10", "TotalEnroll": 19, "StatusActive": 1, "Dropout": 1},
  {"BatchName": "Batch-J", "StartDate": "2025-05-15", "TotalEnroll": 27, "StatusActive": 1, "Dropout": 0}
]

```

#### Attendance

```
[
  {
    "BatchName": "Batch-A",
    "StudentName": "Ravi Kumar",
    "Date": { "presentDate": ["2025-06-01", "2025-06-03"], "absentDate": ["2025-06-02"] },
    "TotalClass": 3
  },
  {
    "BatchName": "Batch-A",
    "StudentName": "Pooja Sharma",
    "Date": { "presentDate": ["2025-06-01"], "absentDate": ["2025-06-02", "2025-06-03"] },
    "TotalClass": 3
  },
  {
    "BatchName": "Batch-B",
    "StudentName": "Aman Verma",
    "Date": { "presentDate": ["2025-06-01", "2025-06-02", "2025-06-03"], "absentDate": [] },
    "TotalClass": 3
  },
  {
    "BatchName": "Batch-B",
    "StudentName": "Seema Roy",
    "Date": { "presentDate": [], "absentDate": ["2025-06-01", "2025-06-02", "2025-06-03"] },
    "TotalClass": 3
  },
  {
    "BatchName": "Batch-C",
    "StudentName": "Manish Das",
    "Date": { "presentDate": ["2025-06-02"], "absentDate": ["2025-06-01", "2025-06-03"] },
    "TotalClass": 3
  },
  {
    "BatchName": "Batch-C",
    "StudentName": "Divya Singh",
    "Date": { "presentDate": ["2025-06-03"], "absentDate": ["2025-06-01", "2025-06-02"] },
    "TotalClass": 3
  },
  {
    "BatchName": "Batch-D",
    "StudentName": "Nikhil Patil",
    "Date": { "presentDate": ["2025-06-01", "2025-06-03"], "absentDate": ["2025-06-02"] },
    "TotalClass": 3
  },
  {
    "BatchName": "Batch-D",
    "StudentName": "Shweta Jha",
    "Date": { "presentDate": ["2025-06-01", "2025-06-02"], "absentDate": ["2025-06-03"] },
    "TotalClass": 3
  },
  {
    "BatchName": "Batch-E",
    "StudentName": "Rohan Joshi",
    "Date": { "presentDate": ["2025-06-01"], "absentDate": ["2025-06-02", "2025-06-03"] },
    "TotalClass": 3
  },
  {
    "BatchName": "Batch-E",
    "StudentName": "Priya Mehta",
    "Date": { "presentDate": ["2025-06-02", "2025-06-03"], "absentDate": ["2025-06-01"] },
    "TotalClass": 3
  }
]

```
---


