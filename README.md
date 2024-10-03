# CSCE35103

Software Engineering lazer tag project

## Project Setup

### Requirements:

- Java 21 (or higher)
- Maven
- Node.js

## Instructions to Run Project

1. Visit https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html and download Linux x64 Debian Package. Navigate to the `Download` folder.
2. Run the following commands to install JDK-21 and change the path variables:
   ```bash
   sudo apt install default-jre
   sudo dpkg -i jdk-21.0.3_linux-x64_bin.deb
   export JAVA_HOME=/usr/lib/jvm/jdk-21-oracle-x64
   export PATH=$JAVA_HOME/bin:$PATH
   source ~/.bashrc
   java --version
   ```
3. Navigate to the `bin` folder inside the 'apache-maven-3.9.9' folder inside 'backend' folder.
4. Run the following commands to build and run the backend:
   ```bash

   chmod +x mvn
   ./mvn -f ../../pom.xml clean install
   ./mvn -f ../../pom.xml spring-boot:run
   ```
5. Navigate to the `frontend` folder
6. Run the following commands to build and run the frontend:
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   npm install
   npm start
   ```
## Contributors

eli-bosch -> Eli Bosch,<br>
greenbeast2005 -> Rylan Davidson,<br>
AMcQueen95 -> Aiden McQueen,<br>
CaseOnPoint -> Cason Parkinson
