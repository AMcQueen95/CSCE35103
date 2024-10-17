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

        # Find the extracted JDK directory name
        JDK_DIR=$(tar -tf jdk-21_linux-aarch64_bin.tar.gz | head -1 | cut -f1 -d"/")

        # Set JAVA_HOME and update PATH
        export JAVA_HOME=/usr/lib/jvm/$JDK_DIR
        export PATH=$JAVA_HOME/bin:$PATH

        # Update shell environment for future sessions
        echo "export JAVA_HOME=$JAVA_HOME" >> ~/.bashrc
        echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.bashrc

        # Source the updated bashrc
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

# Ensure JAVA_HOME is set correctly for the current session
export JAVA_HOME=$(grep 'export JAVA_HOME' ~/.bashrc | tail -1 | cut -d'=' -f2)
export PATH=$JAVA_HOME/bin:$PATH

echo "JAVA_HOME is set to $JAVA_HOME"

# Step 2: Maven is installed within the project, no need to install globally

# Step 3: Navigate to the backend directory (already in BACKEND_DIR)
cd "$BACKEND_DIR"

# Step 4: Make Maven executable if necessary
if [ ! -x "apache-maven-3.9.9/bin/mvn" ]; then
    chmod +x apache-maven-3.9.9/bin/mvn
fi

echo "Building the backend..."

# Use the project's Maven and ensure JAVA_HOME is used
./apache-maven-3.9.9/bin/mvn -Djava.home="$JAVA_HOME" clean install

echo "Running the backend..."

# Run the backend without '&' to keep it in the foreground
./apache-maven-3.9.9/bin/mvn -Djava.home="$JAVA_HOME" spring-boot:run
