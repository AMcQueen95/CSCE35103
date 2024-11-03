#!/bin/bash

# Step 2: Set JAVA_HOME and PATH
export JAVA_HOME=/usr/lib/jvm/jdk-21.0.4-oracle-x64
export PATH=$JAVA_HOME/bin:$PATH

# Check if JAVA_HOME is correctly set
echo "JAVA_HOME is set to $JAVA_HOME"
java -version

# Step 3: Navigate to the backend directory
cd backend/apache-maven-3.9.9/bin
chmod +x mvn

# Step 4: Add Maven to PATH
export PATH=$(pwd):$PATH

# Step 5: Navigate back to the backend directory
cd ../../

# Step 6: Build and run the backend
echo "Building the backend..."
mvn -f ./pom.xml clean install
echo "Running the backend..."
mvn -f ./pom.xml spring-boot:run
