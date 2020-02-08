pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                bat 'javac HelloWorld.java'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                bat 'java HelloWorld'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}