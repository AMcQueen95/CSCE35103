# Step 2: Maven is installed within the project

export JAVA_HOME=/usr/lib/jvm/jdk-21
export PATH=$JAVA_HOME/bin:$PATH

# Check if JAVA_HOME is correctly set
echo "JAVA_HOME is set to $JAVA_HOME"
java -version

# Step 3: Navigate to the backend directory
cd backend/apache-maven-3.9.9/bin
chmod +x mvn

# Step 4: Build and run the backend in the background

echo "Building the backend..."
./mvn -f ../../pom.xml clean install
echo "Running the backend..."
./mvn -f ../../pom.xml spring-boot:run