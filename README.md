# Graded Assignment on Container Orchestration

### Folder structure
```
learnerReportCS_backend_copy/Dockerfile
learnerReportCS_fronten_copy/Dockerfile
Jenkinsfile
Readme.md
manifest
screenshots
helm-charts/mern-chart/
             ├── Chart.yaml
             ├── values.yaml
             └── templates/
                    ├── frontend-deployment.yaml
                    ├── frontend-service.yaml
                    ├── backend-deployment.yaml
                    └── backend-service.yaml
                    ├── mongo-deployment.yaml
                    └── mongo-service.yaml
```
----------
## Ec2 setup

| EC2 Instance | Role              | Key Components                               |
| ------------ | ----------------- | -------------------------------------------- |
| EC2 #1       | Kubernetes Master | kubeadm-initialized, control-plane           |
| EC2 #2       | Kubernetes Worker | joined as a node, runs actual pods           |
| EC2 #3       | Jenkins Host      | Jenkins, Docker, kubectl, kubeconfig present |

---------
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
|----------------------------------------------------------------------------------------------------------------------------------------|

## Nothing to play in the code.

Change only the frontend .env data helm. 
env:
          - name: REACT_APP_API_BASE_URL
            value: http://127.0.0.1:52572 # this has to be updated with backend ```IP + nodeport```

## Install kubernetes:

#### Pre-requisites :
1. One ec2 for master node and another for ec2
2. Storage 16 GB
3. Inbound rule include : 30027, 30001, 5000 & 3000

#### Install kubernetes:

Install kubernetes on ec2 worker and master post switching to root user using ```sudo su -```

https://github.com/ankitanand200193/Ec2_Kubeadm-Installation-Guide

## Troubleshooting

### 1. Cluster inaccessible | ubuntu
**Problem**: Kubernetes cluster created as root user hence it is not allow ubuntu user to access it. 

**Solution** :When Kubernetes is installed as the root user on an EC2 instance, the kubeconfig file is created under /root/.kube/config, making it inaccessible to the "ubuntu" user. As a result, kubectl fails due to missing configuration or insufficient permissions. Copying the file and adjusting permissions resolves the issue.

```
mkdir -p /home/ubuntu/.kube
sudo cp -i /etc/kubernetes/admin.conf /home/ubuntu/.kube/config
sudo chown ubuntu:ubuntu /home/ubuntu/.kube/config
```

### 2. Understanding the Mongo url:

**Problem** : What is the significance of the mongo url elements?

**Solution** : 
```
mongodb://mongo:27017/learnerCS
            │     │        └─ Database name
            │     └─ Port MongoDB listens on (default 27017)
            └─ Hostname (should match the **MongoDB service** name in K8s)

```

### 3. Increase the disk storage of ec2 if node taint found : disk-pressure

**Problem**: Nodes are showing disk-pressure hence cannot create pods on the cluster. How to increase the size of the nodes?

**Solution** :Increassing ec2 disk storage on console, then SSH into the ec2 to apply them 
```
df -h
sudo growpart /dev/xvda 1
sudo resize2fs /dev/xvda1
```

### 4. Jenkins cluster access issue

**Problem**: Jenkins cannot access the Kubernetes cluster because it lacks the necessary credentials in its environment. By default, Jenkins doesn't have a kubeconfig file with appropriate user identity or permissions.

**Solution** : Copy the existing kubeconfig file (e.g., ~/.kube/config) — which typically contains the kubernetes-admin user with cluster-admin privileges — into Jenkins' environment. Jenkins doesn’t require a special user; it uses the credentials provided in the kubeconfig to authenticate and interact with the cluster.

### 5. Minikube TLS Handshake Timeout
**Problem**: The error Unable to connect to the server: net/http: TLS handshake timeout occurs when Minikube becomes unresponsive, often due to a poor network or stalled VM.

**Solution**: Check Minikube status, stop and remove the Minikube container (if using Docker), then run minikube delete --all --purge. Finally, restart Minikube with minikube start to fix the issue and restore connectivity.

### 6. Frontend always listen on port 3000:
**Problem**: Why is the frontend container listening on 3000 when the Dockerfile & Kubernetes manifest say 5000?

**Solution**: This typically happens when: The React development server (or your frontend framework) defaults to port 3000, and you didn’t override it properly.

### Port selection logic:

| Component                     | Network Type        | Why                                                                                                                   |
| ----------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 🟩 **Backend (Express/Node)** | `NodePort`          | So that **external clients** (like your local machine, Postman, frontend running outside cluster) can hit the backend |
| 🟦 **Frontend (React)**       | `NodePort`          | So the browser can access it via public IP                                                                            |
| 🟧 **MongoDB**                | `ClusterIP`         | Only backend needs access — no external exposure                                                                      |
| 🔁 **Frontend → Backend**     | `NodePort`          | A client-side app is an application that runs entirely in the user's browser (the client) — not on a server. Frontend will call backend from browser not from the cluster.                                                                                                                           |


## Frequent commands:
```
kubectl get all --all-namespaces
minikube service frontend -n learner-app  
kubectl config set-context --current --namespace=learner-app
curl ifconfig.me
```
----------------


### Deployment using helm :Test

```
mkdir helm-charts && cd helm-charts
helm create mern-chart # it will create the whole files system and you have to just write into the files.


serviceAccount:
  create: false   # Kubernetes automatically attaches the default ServiceAccount from the namespace if none is specified.

rm mern-chart/templates/NOTES.txt # we are not using ingress.
helm install ankit-anand-learnerapp  (helm deployment name) ./mern-chart
helm upgrade ankit-anand-learnerapp  ./mern-chart
helm list
helm uninstall ankit-test-helm

```

Note: helm chart also has its namespace.


### Jenkins on EC2:

#### EC2 pre-requisites
1.  t2.medium (at least 2 GB RAM)
2.  Security Group: 
          Allow SSH (port 22) – your IP 
          Allow HTTP (port 8080) – your IP or 0.0.0.0/0 (for Jenkins access)

#### Jenkins installation :
1. Install Jenkins
   
```
# run the following at once
sudo apt update
sudo apt upgrade -y
sudo apt install openjdk-17-jre -y
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null
 echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins -y
sudo systemctl enable jenkins
sudo systemctl start jenkins

```
2. http://EC2-Public-IP:8080
3. unlock the passoword : ``` sudo cat /var/lib/jenkins/secrets/initialAdminPassword ```
4. Install docker, kubectl and helm so that jenkins can run the resources.

   **Helm installation:**
   ```
   curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
   chmod 700 get_helm.sh
   ./get_helm.sh
   ```
   **Docker installation:**
   ```
   sudo apt-get update
   sudo apt-get install -y docker.io
   sudo systemctl enable --now docker

   ```

   **Kubectl installation:**
   ```
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"

   echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check

   sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

   chmod +x kubectl
   mkdir -p ~/.local/bin
   mv ./kubectl ~/.local/bin/kubectl
   # and then append (or prepend) ~/.local/bin to $PATH

   kubectl version --client

   ```
5. Create a directory to save the kube config : ```sudo mkdir /var/lib/jenkins/.kube``` and modify permission ```sudo chown -R jenkins:jenkins /var/lib/jenkins/.kube``
6. Copy the .kube/config from your cluster and save at the jenkins location    ```sudo mkdir /var/lib/jenkins/.kube/config```
7. sudo systemctl restart jenkins
8. Add DockerHub credential to Jenkins
   8.1 Go to: Jenkins → Manage Jenkins → Credentials → Global
   8.2 Click “Add Credentials”
   8.3 Type: Username with password
   8.4 Set:ID: dockerhub-credentials; Username: your DockerHub username: Password: DockerHub password or personal access token(PAT) then save
   **Note**: PAT should be with read, write and delete access 



### How Jenkins perform tasks on kubernetes cluster
```
[Jenkins EC2 (with kubectl)] 
        |
        |---> Connects to Kubernetes master (EC2 #1) via kubeconfig
                        |
                        |---> Kubernetes decides where to run pods
                                |
                                |---> Pods get scheduled on Worker Node (EC2 #2)

```
------

### How to exec in mongo container running in pod?

```kubectl exec -it [pod name] -n learner-app  -- mongosh```

Commands to run on the shell
1. show dbs
2. use learnerdb
3. show collections
4. db.admins.find().pretty()

----------------

#### How to disable Disable windows firewall:

1. Disable Firewall Temporarily (for testing only)

 Not recommended long-term.

```netsh advfirewall set allprofiles state off```

Re-enable it after testing:

```netsh advfirewall set allprofiles state on```

------

## Issues in backend source code

1. .env file was named as config.env
2. index.js .env file path is modified ```require("dotenv").config({ path: ".env" });```
3. **PORT** is missing in the .env file.
4. comment out the HASH_KEY and JWT_SECRET_KEY in the .env file.


#### To know the endpoint of your database:

Tip to Debug in Future

If you're ever unsure about the full route, just:
Look at ```app.use("/prefix", ...) in index.js```
Look at ``router.<method>("/path", ...) in your route file```

Put them together:
```app.use("/prefix", ...) + router.post("/path") = POST /prefix/path```


---

#### Sample date uploaded to backend using ```POSTMAN`` to check if frontend calls the backend admin data to login on frontend.

Postman Url: http://workernode_publicIP:backendNodeport/admin/register
```
{
  "username": "Ankit_Anand",
  "email": "jane.do@organization.com",
  "password": "Pa$$w0rdJD!2025"
}

{
  "username": "jane.doe_admin",
  "email": "ankit.anand@organization.com",
  "password": "Pa$$w0rdJD!2025"
}

```

## Results :

## Helm creating the app:

![Alt]()


## Frontend UI:

![Alt]()

## Backend UI:

![Alt]()

## IP | Ec2 dashboard

![Alt]()

## Jenkins pipeline build

![Alt]()

## Postman --> Backend | data ingestion

![Alt]()

## Frontend communicates to backend

![Alt]()



