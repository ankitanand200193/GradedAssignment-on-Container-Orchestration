# Graded Assignment on Container Orchestration
--------
## Nohting to play in the code.

change only the frontend .env data from in the manifest file. 
env:
          - name: REACT_APP_API_BASE_URL
            value: http://127.0.0.1:52572 # this has to be updated with backend ```IP + nodeport```


--------
## Install kubernetes
Install kubernetes on ec2 worker and master post switching to root user using ```sudo su -``
project-root/

https://github.com/ankitanand200193/Ec2_Kubeadm-Installation-Guide


Problem:
When you install Kubernetes on an EC2 instance as the root user, the configuration file required to connect to the cluster is created only for the root user. This is why you can see the nodes as root, but the connection fails for your "ubuntu" user.

The connection failure for a non-root user like "ubuntu" is typically due to two main reasons:

    Missing Kubeconfig File: The kubectl command-line tool needs a configuration file, known as kubeconfig, to locate and authenticate with the Kubernetes cluster. When you initialize the cluster as root, this file is placed in the root user's home directory (/root/.kube/config). The "ubuntu" user does not have this file in its home directory (/home/ubuntu/.kube/config) by default.[1][2][3][4]

    Incorrect Permissions: Even if the kubeconfig file were accessible to the "ubuntu" user, it might not have the necessary permissions to read it if the file is owned by the root user.[5]

To resolve this, you need to provide the "ubuntu" user with the correct kubeconfig file and appropriate permissions


```mkdir -p /home/ubuntu/.kube```
```sudo cp -i /etc/kubernetes/admin.conf /home/ubuntu/.kube/config```
```sudo chown ubuntu:ubuntu /home/ubuntu/.kube/config```

--------
TO get the public IP of ec2 : ```curl ifconfig.me ```

-----

### Understanding the mongourl:

mongodb://mongo:27017/learnerCS
            │     │      └─ Database name
            │     └─ Port MongoDB listens on (default 27017)
            └─ Hostname (should match the **MongoDB service** name in K8s)

---------
## how to increase the disk storage of ec2 if taint found : disk-pressure
Increassing ec2 disk storage on console:

Run the following command while done with SSH
df -h
sudo growpart /dev/xvda 1
sudo resize2fs /dev/xvda1

-------------
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

----------------

### creating helm 

mkdir helm-charts && cd helm-charts
helm create mern-chart # it will create the whole files system and you have to just write into the files.

mern-chart/
├── Chart.yaml
├── values.yaml
└── templates/
    ├── frontend-deployment.yaml
    ├── frontend-service.yaml
    ├── backend-deployment.yaml
    └── backend-service.yaml

### deployment using helm

1. keep the service account : false by 
```
serviceAccount:
  create: false
```
2. since we are not using ingress, remove the notes.txt

rm mern-chart/templates/NOTES.txt

```helm install ankit-test-helm (helm deployment name) ./mern-chart```

```helm upgrade ankit-test-helm ./mern-chart```

```helm list`` 

```helm uninstall ankit-test-helm ```

Note: helm chart also has its namespace.


### Jenkins of 3rd ec2:

- jenkins
```

```
- docker
- kubectl
- helm

copy the kube config file of kubernetes to jenkins directory ```/var/lib/jenkins/.kube/config``



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

--------------
### kubenetes namespace hack:
Even if you declared namespace: learner-app inside the YAML, it's safer to explicitly set it while applying.

Run this:

kubectl apply -f mongo.yaml -n learner-app
kubectl apply -f backend.yaml -n learner-app
kubectl apply -f frontend.yaml -n learner-app
--------

### how to exec in mongo

kubectl exec -it mongo-5c748dfffc-qtvt6 -n learner-app  -- mongosh

show dbs
use learnerdb
show collections
db.admins.find().pretty()
----------------

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

| **GET Path**                                                       | **POST Path**                                                     |
|--------------------------------------------------------------------|-------------------------------------------------------------------|
| http://workernode_publicIP:FrontendNodeport/student/getstudent     | http://workernode_publicIP:backendNodeport/student/register       |
|                                                                    | http://workernode_publicIP:backendNodeport/student/login          |
|                                                                    | http://workernode_publicIP:backendNodeport/admin/register         |
|                                                                    | http://workernode_publicIP:backendNodeport/admin/login            |
| http://workernode_publicIP:FrontendNodeport/CareerService/getcareer| http://workernode_publicIP:backendNodeport/careerService/register |
|                                                                    | http://workernode_publicIP:backendNodeport/careerService/login    |
| http://workernode_publicIP:FrontendNodeport/faculty/getfaculty     | http://workernode_publicIP:backendNodeport/faculty/register       |
|                                                                    | http://workernode_publicIP:backendNodeport/faculty/login          |
| http://workernode_publicIP:FrontendNodeport/questions              | http://workernode_publicIP:backendNodeport/uploadQuestion         |
|                                                                    | http://workernode_publicIP:backendNodeport/batch/register         |
|                                                                    | http://workernode_publicIP:backendNodeport/attendance/register    |


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
