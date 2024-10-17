# Step 5: Navigate to the frontend directory
cd "./frontend"

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
npm start