# CSCE35103

Software Engineering lazer tag project

## Project Setup

### Requirements:

- Java 21 (or higher)
- Maven
- Node.js

## Instructions to Run Project

1. Navigate to the `frontend` folder
2. Run the following commands to build and run the frontend:
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   npm install
   npm start
   ```
3. Navigate to the `install` folder
4. Visit https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html and download Linux x64 Debian Package. Navigate to the `Download` folder.

5. Run the following commands to install JDK-21 and change the path variables:
   sudo apt install default-jre
   sudo dpkg -i jdk.deb
   export JAVA_HOME=/usr/lib/jvm/jdk-21-oracle-x64
   export PATH=$JAVA_HOME/bin:$PATH
   source ~/.bashrc
   java --version

6. Navigate to the `backend` folder.
7. Run the following commands to build and run the backend:
   ```bash
   chmod +x mvn
   ./mvn -f ../../pom.xml clean install
   ./mvn -f ../../pom.xml spring-boot:run
   ```

## Contributors

eli-bosch -> Eli Bosch,<br>
greenbeast2005 -> Rylan Davidson,<br>
AMcQueen95 -> Aiden McQueen,<br>
CaseOnPoint -> Cason Parkinson
