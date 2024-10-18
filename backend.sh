# Step 2: Maven is installed within the project

# Step 3: Navigate to the backend directory
cd backend/apache-maven-3.9.9/mvn
chmod +x mvn

# Step 4: Build and run the backend in the background

echo "Building the backend..."
./mvn -f ../../pom.xml clean install
echo "Running the backend..."
./mvn -f ../../pom.xml spring-boot:run