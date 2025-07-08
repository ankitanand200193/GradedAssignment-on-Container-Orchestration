# Graded Assignment on Container Orchestration

## Nohting to play in the code.

change only the frontend .env data from in the manifest file. 
env:
          - name: REACT_APP_API_BASE_URL
            value: http://127.0.0.1:52572 # this has to be updated with backend ```IP + nodeport```


--------
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
minikube service frontend -n learner-app 
kubectl config set-context --current --namespace=learner-app


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

### changes into frontend code to call backend in kubernetes enviroment:

And in the .env file used for building the frontend Docker image:

REACT_APP_BACKEND_URL=http://backend-service:3001

Then rebuild your frontend Docker image and apply the new image to your frontend Deployment in Kubernetes.

backend-service : name of backend service.

### how to exec in mongo

kubectl exec -it mongo-5c748dfffc-qtvt6 -n learner-app  -- mongosh

show dbs
use learnerdb
show collections
db.admins.find().pretty()

#### Disable windows firewall:
3. Disable Firewall Temporarily (for testing only)

⚠️ Not recommended long-term.

netsh advfirewall set allprofiles state off

Then test Minikube. If it works now, firewall was the issue.

Re-enable it after testing:

netsh advfirewall set allprofiles state on

---------

### Minikube TLS Handshake Timeout - Quick Fix Guide**

**Q: I got a `TLS handshake timeout` error with Minikube. What caused it and how do I fix it?**
A: The error `Unable to connect to the server: net/http: TLS handshake timeout` usually indicates a slow or unstable internet connection or an unresponsive Minikube cluster. To fix it:

1. **Check Minikube status:**

```bash
minikube status
```

2. **Force stop Minikube depending on your driver:**

* **Docker:**

```bash
docker stop minikube
docker rm minikube
```

3. **Clean up everything (optional but recommended):**

```bash
minikube delete --all --purge
```

4. **Start fresh Minikube instance:**

```bash
minikube start
```

This sequence resets your Minikube setup and resolves the TLS handshake issue.

------
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

🧩 Why is your frontend container listening on 3000 when your Dockerfile & Kubernetes manifest say 5000?

This typically happens when:
✅ The React development server (or your frontend framework) defaults to port 3000, and you didn’t override it properly.


## EC2
Jenkins: local
docker, kubernertes, helm: ec2

### install kubectl:

   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

   sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

   kubectl version --client
