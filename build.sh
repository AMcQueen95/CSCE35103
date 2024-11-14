#!/bin/bash

# CSCE35103 Project Setup

# Get the absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Step 1: Install Java 21 manually if not installed
java -version 2>&1 | grep "21" > /dev/null
if [ $? -ne 0 ]; then
    echo "Java 21 is not installed. Installing Java 21 manually..."

    # Detect system architecture
    ARCH=$(uname -m)
    if [ "$ARCH" == "x86_64" ]; then
        JAVA_DEB_URL="https://download.oracle.com/java/21/archive/jdk-21.0.4_linux-x64_bin.deb"
    elif [ "$ARCH" == "aarch64" ]; then
        JAVA_DEB_URL="https://download.oracle.com/java/21/archive/jdk-21.0.4_linux-aarch64_bin.deb"
    else
        echo "Unsupported architecture: $ARCH"
        exit 1
    fi

    sudo apt update
    sudo apt install -y wget tar
    cd ~/Downloads
    wget $JAVA_DEB_URL

    # Extract filename from URL
    DEB_FILE=$(basename $JAVA_DEB_URL)
    
    if [ -f "$DEB_FILE" ]; then
        sudo dpkg -i $DEB_FILE
        
        export JAVA_HOME=/usr/lib/jvm/jdk-21.0.4-oracle-x64
        export PATH=$JAVA_HOME/bin:$PATH
        echo "export JAVA_HOME=/usr/lib/jvm/jdk-21.0.4-oracle-x64" >> ~/.bashrc
        echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.bashrc
        source ~/.bashrc
        java --version
        rm $DEB_FILE
    else
        echo "Failed to download JDK 21. Exiting."
        exit 1
    fi

    cd "$SCRIPT_DIR"
else
    echo "Java 21 is already installed."

    # Set JAVA_HOME and PATH if Java is already installed
    export JAVA_HOME=/usr/lib/jvm/jdk-21.0.4-oracle-x64
    export PATH=$JAVA_HOME/bin:$PATH
    echo "JAVA_HOME is set to $JAVA_HOME"
fi

echo "granting permission to run backend.sh"
chmod +x backend.sh
echo "granting permission to run frontend.sh"
chmod +x frontend.sh
