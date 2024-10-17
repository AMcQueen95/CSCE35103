#!/bin/bash

# CSCE35103 Backend Setup

# Get the absolute path of the backend directory
BACKEND_DIR="$(cd "$(dirname "$0")" && pwd)"

# Step 1: Install Java 21 if not installed
java -version 2>&1 | grep "21" > /dev/null
if [ $? -ne 0 ]; then
    echo "Java 21 is not installed. Installing Java 21..."

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

        # Remove the downloaded tar.gz file
        rm jdk-21_linux-aarch64_bin.tar.gz
    else
        echo "Failed to download JDK 21 for ARM64. Exiting."
        exit 1
    fi

    # Return to the backend directory
    cd "$BACKEND_DIR"
else
    echo "Java 21 is already installed."
fi

# Step 2: Maven is installed within the project, no need to install globally

# Step 3: Make Maven executable if necessary
if [ ! -x "apache-maven-3.9.9/bin/mvn" ]; then
    chmod +x apache-maven-3.9.9/bin/mvn
fi

echo "Building the backend..."
./apache-maven-3.9.9/bin/mvn clean install

echo "Running the backend..."
./apache-maven-3.9.9/bin/mvn spring-boot:run
