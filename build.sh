#!/bin/bash

# CSCE35103 Project Setup

# Step 1: Install Java 21 manually if not installed

# Check if Java 21 is installed
java -version 2>&1 | grep "21" > /dev/null
if [ $? -ne 0 ]; then
    echo "Java 21 is not installed. Installing Java 21 manually..."

    # Update package list
    sudo apt update

    # Install dependencies
    sudo apt install -y wget tar

    # Download JDK 21 for ARM64
    cd ~/Downloads
    wget https://download.oracle.com/java/21/latest/jdk-21_linux-aarch64_bin.tar.gz

    # Check if download was successful
    if [ -f "jdk-21_linux-aarch64_bin.tar.gz" ]; then
        # Extract the archive
        sudo mkdir -p /usr/lib/jvm
        sudo tar -xzvf jdk-21_linux-aarch64_bin.tar.gz -C /usr/lib/jvm

        # Set JAVA_HOME and update PATH
        export JAVA_HOME=/usr/lib/jvm/jdk-21
        export PATH=$JAVA_HOME/bin:$PATH

        # Update shell environment
        echo "export JAVA_HOME=/usr/lib/jvm/jdk-21" >> ~/.bashrc
        echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.bashrc
        source ~/.bashrc

        # Verify Java version
        java --version
    else
        echo "Failed to download JDK 21 for ARM64. Exiting."
        exit 1
    fi
else
    echo "Java 21 is already installed."
fi

# Step 2: Install Maven if not installed
if ! command -v mvn &> /dev/null; then
    echo "Maven is not installed. Installing Maven..."
    sudo apt install -y maven
else
    echo "Maven is already installed."
fi

# Step 3: Navigate to backend in the project folder
cd "$(dirname "$0")/backend"

# Step 4: Build and run the backend

# First-time setup: Make mvn executable if necessary
if [ ! -x "apache-maven-3.9.9/bin/mvn" ]; then
    chmod +x apache-maven-3.9.9/bin/mvn
fi

echo "Building the backend..."
./apache-maven-3.9.9/bin/mvn -f pom.xml clean install

echo "Running the backend..."
./apache-maven-3.9.9/bin/mvn -f pom.xml spring-boot:run &

# Step 5: Wait a few seconds to ensure the backend starts
sleep 5

# Step 6: Navigate back to the main project directory
cd ..

# Step 7: Navigate to the frontend folder
echo "Navigating to the frontend directory..."
cd frontend

# Ensure that the package.json file exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in the frontend directory."
    exit 1
fi

# Step 8: Build and run the frontend

# First-time setup
echo "Updating package list..."
sudo apt update

echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm

# Install build-essential for compiling native addons (useful on ARM64)
sudo apt install -y build-essential

echo "Installing frontend dependencies..."
npm install

# Handle possible issues with npm install on ARM64
if [ $? -ne 0 ]; then
    echo "npm install failed. Trying with --force..."
    npm install --force
fi

echo "Starting the frontend..."
npm start
