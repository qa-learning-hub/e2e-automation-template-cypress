def title = 'BF - QA Learning Hub - E2E Automation Template Cypress'
def gitMessage = ''
def gitAuthor = ''
def cypressRunUrl = 'https://cloud.cypress.io/projects/your_project_id/runs/'
def slackChannel = 'e2e-automation-tests-notice'
def slackResponse = slackSend(channel: slackChannel, message: "🚀 Starting build for ${title}: ${env.BUILD_URL}")
def latestReportJson = ''
def latestReportHtml = ''

pipeline {
    agent any
    tools { nodejs 'node' }
    triggers { cron('H 22 * * 1-5') }

    environment {
        NODE_VERSION = '18'
        CYPRESS_ENV = 'qa'
        CYPRESS_BASE_URL = 'https://qa.example.com'
        CYPRESS_BROWSER = 'chrome'
        SNYK_TOKEN = credentials('snyk-token')
        SNYK_PROJECT_URL = "https://app.snyk.io/org/example/project/example-id"
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    echo "📥 Cloning the repository..."
                    checkout scm
                    gitAuthor = sh(script: 'git log --format="%an" | head -1', returnStdout: true).trim()
                    gitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                }
            }
        }

        stage('Setup Environment & Install Dependencies') {
            steps {
                script {
                    echo "📦 Setting up environment and installing dependencies..."
                    sh """
                        bash -l -c ". \$HOME/.nvm/nvm.sh; nvm install ${NODE_VERSION}; nvm use ${NODE_VERSION}"
                        rm -rf node_modules && npm install
                    """
                }
            }
        }

        stage('Lint Code') {
            steps {
                script {
                    echo "🔍 Running ESLint..."
                    sh 'npm run lint'
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                script {
                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        echo "🚀 Running E2E tests..."
                        slackSend(channel: "${slackResponse.threadId}", color: 'good', message: "👨‍💻 Last commit by ${gitAuthor}: ${gitMessage}")
                        sh "CYPRESS_ENV=${CYPRESS_ENV} npx cypress run --browser ${CYPRESS_BROWSER}"
                    }
                }
            }
        }

        stage('Generate & Publish Reports') {
            steps {
                script {
                    echo "📊 Generating reports..."
                    sh """
                        npx mochawesome-merge cypress/reports/*.json > cypress/reports/Automation_Report.json
                        npx mochawesome-report-generator --reportFilename Automation_Report cypress/reports/Automation_Report.json
                    """

                    latestReportJson = sh(script: "ls -t cypress/reports/Automation_Report*.json | head -n 1", returnStdout: true).trim()
                    latestReportHtml = sh(script: "ls -t cypress/reports/Automation_Report*.html | head -n 1", returnStdout: true).trim()

                    echo "Latest JSON Report: ${latestReportJson}"
                    echo "Latest HTML Report: ${latestReportHtml}"

                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'cypress/reports/',
                        reportFiles: latestReportHtml,
                        reportName: 'Cypress Test Report'
                    ])
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Archiving reports and cleaning up..."
                archiveArtifacts artifacts: "${latestReportJson},${latestReportHtml}", fingerprint: true
                cleanWs()
            }
        }

        failure {
            script {
                echo "❌ The execution failed. Sending Slack alert..."
                def testResults = readJSON file: latestReportJson
                def totalTests = testResults.stats.tests
                def totalFailures = testResults.stats.failures
                def totalSkipped = testResults.stats.skipped
                def totalPasses = testResults.stats.passes
                def totalPending = testResults.stats.pending
                def snykReport = readJSON file: 'Snyk_Report.json'
                def totalVulnerabilities = snykReport.vulnerabilities.size()
                def vulnerabilities = snykReport.vulnerabilities.collect { vuln ->
                    "🔍 Title: ${vuln.title} | Severity: ${vuln.severity}"
                }.join('\n')

                slackSend(channel: "${slackResponse.threadId}", color: 'danger', message: """
                    ❌ *${title} Failed* (Build ${currentBuild.number})
                    - Total Tests: ${totalTests}
                    - Failures: ${totalFailures}
                    - Skipped: ${totalSkipped}
                    - Passed: ${totalPasses}
                    - Pending: ${totalPending}
                    - Vulnerabilities: ${totalVulnerabilities}
                    🔗 Cypress Run: ${cypressRunUrl}
                    🔗 Snyk Report: ${SNYK_PROJECT_URL}
                    ${vulnerabilities}
                """)
            }
        }

        success {
            script {
                echo "✅ Execution was successful. Sending Slack notification..."
                slackSend(channel: "${slackResponse.threadId}", color: 'good', message: """
                    ✅ *${title} Success* (Build ${currentBuild.number})
                    - Total Tests: ${totalTests}
                    - Failures: ${totalFailures}
                    - Skipped: ${totalSkipped}
                    - Passed: ${totalPasses}
                    - Pending: ${totalPending}
                    - Vulnerabilities: ${totalVulnerabilities}
                    🔗 Cypress Run: ${cypressRunUrl}
                    🔗 Snyk Report: ${SNYK_PROJECT_URL}
                """)
            }
        }
    }
}
