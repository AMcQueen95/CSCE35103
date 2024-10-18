# Step 2: Maven is installed within the project

# Step 3: Navigate to the backend directory
cd "$SCRIPT_DIR/backend"

# Step 4: Build and run the backend in the background
if [ ! -x "apache-maven-3.9.9/bin" ]; then
    chmod +x apache-maven-3.9.9/bin
fi
echo "Building the backend..."
./mvn -f ../../pom.xml clean install
echo "Running the backend..."
./mvn -f ../../pom.xml spring-boot:run