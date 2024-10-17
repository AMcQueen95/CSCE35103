#!/bin/bash

# CSCE35103 Project Setup

# Get the absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Step 1: Install Java 21 manually if not installed
java -version 2>&1 | grep "21" > /dev/null
if [ $? -ne 0 ]; then
    echo "Java 21 is not installed. Installing Java 21 manually..."
    sudo apt update
    sudo apt install -y wget tar
    cd ~/Downloads
    wget https://download.oracle.com/java/21/archive/jdk-21.0.4_linux-x64_bin.deb
    if [ -f "jdk-21_linux-x64_bin.deb" ]; then
        sudo mkdir -p /usr/lib/jvm
        sudo tar -xzvf jdk-21_linux-x64_bin.deb -C /usr/lib/jvm
        export JAVA_HOME=/usr/lib/jvm/jdk-21
        export PATH=$JAVA_HOME/bin:$PATH
        echo "export JAVA_HOME=/usr/lib/jvm/jdk-21" >> ~/.bashrc
        echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.bashrc
        source ~/.bashrc
        java --version
        rm jdk-21_linux-x64_bin.deb
    else
        echo "Failed to download JDK 21 for ARM64. Exiting."
        exit 1
    fi
    cd "$SCRIPT_DIR"
else
    echo "Java 21 is already installed."
fi

# Step 2: Maven is installed within the project

# Step 3: Navigate to the backend directory
cd "$SCRIPT_DIR/backend"

# Step 4: Build and run the backend in the background
if [ ! -x "apache-maven-3.9.9/bin/mvn" ]; then
    chmod +x apache-maven-3.9.9/bin/mvn
fi
echo "Building the backend..."
./apache-maven-3.9.9/bin/mvn clean install
echo "Running the backend..."
./apache-maven-3.9.9/bin/mvn spring-boot:run &

# Step 5: Navigate to the frontend directory
cd "$SCRIPT_DIR/frontend"

if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in the frontend directory."
    exit 1
fi

echo "Updating package list..."
sudo apt update

echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm build-essential

echo "Installing frontend dependencies..."
npm install || npm install --force

# Step 6: Run the frontend in the background
echo "Starting the frontend..."
npm start &

# Step 7: Wait for both processes to finish
wait
