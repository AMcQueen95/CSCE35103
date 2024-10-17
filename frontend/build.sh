#!/bin/bash

# CSCE35103 Frontend Setup

# Get the absolute path of the frontend directory
FRONTEND_DIR="$(cd "$(dirname "$0")" && pwd)"

# Ensure that the package.json file exists
if [ ! -f "$FRONTEND_DIR/package.json" ]; then
    echo "Error: package.json not found in the frontend directory."
    exit 1
fi

# Step 1: Update package list
echo "Updating package list..."
sudo apt update

# Step 2: Install Node.js and npm if not installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js and npm..."
    sudo apt install -y nodejs npm
else
    echo "Node.js and npm are already installed."
fi

# Install build-essential for compiling native addons (useful on ARM64)
sudo apt install -y build-essential

# Step 3: Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Handle possible issues with npm install on ARM64
if [ $? -ne 0 ]; then
    echo "npm install failed. Trying with --force..."
    npm install --force
fi

# Step 4: Start the frontend
echo "Starting the frontend..."
npm start
