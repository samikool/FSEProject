pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                bat 'cd ./backend_js'
                bat 'npm install'
                bat 'npm start'
                echo 'Started..'
                bat 'timeout 1'
                bat 'npm stop'
                echo 'Started..'
                bat 'timeout 1'
                bat 'cd ../frontend_react'
                bat 'npm install'
                bat 'npm start'
                bat 'timeout 1'
                bat 'npm stop'
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