pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir('backend_js'){
                    echo 'Installing Backend...'
                    bat 'npm install'
                    echo 'Starting Backend...'
                    bat 'start npm start'
                    bat 'timeout 1'
                    bat 'Stopping...'
                    bat 'npm stop'
                }
                dir('frontend_react'){
                    echo 'Installing Frontend...'
                    bat 'npm install'
                    echo 'Starting Frontend...'
                    bat 'start npm start'
                    bat 'timeout 1'
                    bat 'npm stop'
                }
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