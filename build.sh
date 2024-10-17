#!/bin/bash

# CSCE35103 Project Setup

# Step 1: Install Java 21 (or higher)

# Check if Java 21 is installed
java -version 2>&1 | grep "21" > /dev/null
if [ $? -ne 0 ]; then
    echo "Java 21 is not installed. Installing Java 21..."

    # Update package list
    sudo apt update

    # Attempt to install OpenJDK 21
    sudo apt install -y openjdk-21-jdk

    # Verify installation
    java -version 2>&1 | grep "21" > /dev/null
    if [ $? -ne 0 ]; then
        echo "OpenJDK 21 is not available via apt. Please install Java 21 manually."
        exit 1
    fi

    # Set JAVA_HOME and update PATH
    export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
    export PATH=$JAVA_HOME/bin:$PATH

    # Update shell environment
    source ~/.bashrc

    # Verify Java version
    java --version
else
    echo "Java 21 is already installed."
fi

# Step 2: Navigate to backend in the project folder
cd backend

# Step 3: Build and run the backend

# First-time setup: Make mvn executable if necessary
if [ ! -x "apache-maven-3.9.9/bin/mvn" ]; then
    chmod +x apache-maven-3.9.9/bin/mvn
fi

echo "Building the backend..."
./apache-maven-3.9.9/bin/mvn -f pom.xml clean install

echo "Running the backend..."
./apache-maven-3.9.9/bin/mvn -f pom.xml spring-boot:run &

# Step 4: Wait a few seconds to ensure the backend starts
sleep 5

# Step 5: Navigate to the frontend folder
cd ../frontend

# Step 6: Build and run the frontend

# First-time setup
echo "Updating package list..."
sudo apt update

echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm

echo "Installing frontend dependencies..."
npm install

echo "Starting the frontend..."
npm start
