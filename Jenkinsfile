pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh javac HelloWorld.java
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh java HelloWorld
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}