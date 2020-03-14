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
                    sleep 1
                    echo 'Stopping Backend...'
                    bat 'taskkill /IM \"node.exe\" /f'
                }
                dir('frontend_react'){
                    echo 'Installing Frontend...'
                    bat 'npm install'
                    echo 'Starting Frontend...'
                    bat 'start npm start'
                    sleep 1
                    echo 'Stopping Frontend'
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