pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                javac HelloWorld.java
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                java HelloWorld
                echo 'maybe'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}