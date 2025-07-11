pipeline {
  agent any

  environment {
    DOCKER_HUB_USER     = 'ankit200193'
    IMAGE_FRONTEND      = "${DOCKER_HUB_USER}/learnerreport_frontend"
    IMAGE_BACKEND       = "${DOCKER_HUB_USER}/learnerreport_backend"
    DOCKER_CREDENTIALS  = 'dockerhub-credentials'
    HELM_RELEASE        = 'Ankit-Anand-learnerapp'
    HELM_CHART_DIR      = 'helm-charts/mern-chart'
    KUBE_NAMESPACE      = 'learner-app'
  }

  stages {

    stage('Checkout Code') {
      steps {
        echo '🔄 Checking out source code...'
        git branch: 'main', url: 'https://github.com/ankitanand200193/GradedAssignment-on-Container-Orchestration.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          echo '🔨 Building Docker images...'
          docker.build("${IMAGE_FRONTEND}:latest", './learnerReportCS_frontend_copy')
          docker.build("${IMAGE_BACKEND}:latest", './learnerReportCS_backend_copy')
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          script {
            echo '📦 Pushing images to DockerHub...'
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
          echo '🚀 Deploying to Kubernetes using Helm...'
          sh """
            echo "🔧 Checking/Creating namespace '${KUBE_NAMESPACE}'..."
            kubectl get namespace ${KUBE_NAMESPACE} || kubectl create namespace ${KUBE_NAMESPACE}

            echo "📦 Deploying Helm release '${HELM_RELEASE}'..."
            helm upgrade --install ${HELM_RELEASE} ${HELM_CHART_DIR} \
              --namespace ${KUBE_NAMESPACE} \
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
      echo '❌ Deployment failed. Check logs for details.'
    }
  }
}
