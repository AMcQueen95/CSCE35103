#!/bin/bash
# CSCE35103 Project Setup (Linux ARM64)

# Step 1: Check Java version and install OpenJDK 21 (ARM64) if needed
java -version 2>&1 | grep "21" > /dev/null
if [ $? -ne 0 ]; then
    echo "Installing OpenJDK 21 (ARM64)..."
    sudo apt update
    sudo apt install -y openjdk-21-jdk
    export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-arm64
    export PATH=$JAVA_HOME/bin:$PATH
    source ~/.bashrc
    java --version
else
    echo "OpenJDK 21 (ARM64) is already installed."
fi

# Step 2: Install Maven if not installed
if ! command -v mvn &> /dev/null; then
    echo "Maven not found. Installing Maven..."
    sudo apt install -y maven
else
    echo "Maven is already installed."
fi

# Step 3: Install Node.js and npm if not installed
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing Node.js and npm..."
    sudo apt install -y nodejs npm
else
    echo "Node.js and npm are already installed."
fi

# Step 4: Navigate to backend folder and build project
cd ~/Documents/GitHub/CSCE35103/backend
if [ ! -f "pom.xml" ]; then
    echo "Error: pom.xml not found in backend directory."
    exit 1
fi

echo "Building and running the backend..."
mvn clean install
mvn spring-boot:run &

# Step 5: Frontend setup
echo "Setting up frontend..."
cd ~/Documents/GitHub/CSCE35103/frontend
npm install
npm start