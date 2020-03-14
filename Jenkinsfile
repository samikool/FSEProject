pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                bat '.\\backend_js\\npm start'
                echo 'Started..'
                bat 'timeout 1'
                bat './backend_js/npm stop'
                echo 'Started..'
                bat 'timeout 1'
                bat './frontend_react/npm start'
                bat 'timeout 1'
                bat './frontend_react/npm stop'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                bat 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}