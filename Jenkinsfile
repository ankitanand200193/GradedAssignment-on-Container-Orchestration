pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'ankit200193'
    IMAGE_FRONTEND = "${DOCKER_HUB_USER}/learnerreport_frontend"
    IMAGE_BACKEND  = "${DOCKER_HUB_USER}/learnerreport_backend"
    DOCKER_CREDENTIALS = 'dockerhub-credentials'
    HELM_RELEASE = 'learnerapp'
    HELM_CHART_DIR = 'helm/mern-chart'
  }

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/ankitanand200193/GradedAssignment-on-Container-Orchestration.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          docker.build("${IMAGE_FRONTEND}:latest", './frontend')
          docker.build("${IMAGE_BACKEND}:latest", './backend')
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          script {
            sh """
              echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
              docker push ${IMAGE_FRONTEND}:latest
              docker push ${IMAGE_BACKEND}:latest
            """
          }
        }
      }
    }

    stage('Helm Deploy to Kubernetes') {
      steps {
        script {
          sh """
            helm upgrade --install ${HELM_RELEASE} ${HELM_CHART_DIR} \
              --namespace learner-app \
              --set frontend.image=${IMAGE_FRONTEND}:latest \
              --set backend.image=${IMAGE_BACKEND}:latest
          """
        }
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful!'
    }
    failure {
      echo '❌ Deployment failed. Check logs.'
    }
  }
}
