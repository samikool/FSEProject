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
                    bat 'taskkill /IM \"node.exe\" /f'
                }
            }
        }
        stage('Test') {
            steps {
                dir('backend_js'){
                    echo "Running test"
                    bat 'npm test'
                }
            }
        }
        stage('Analyze'){
            steps{
                echo 'Analyzing with SonarQube'
                bat 'sonar-scanner.bat -D"sonar.projectKey=FSEProject" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.login=9b47ef59dc4b08502e92f04a49aaf291a458e597"'
                echo 'hope this works'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}