const fs = require('fs');
const path = require('path');

// Define the directory name
const directoryName = 'new-directory';

// Define the full path to the directory
const directoryPath = path.join(__dirname, directoryName);

// Check if the directory already exists
if (!fs.existsSync(directoryPath)) {
    // Create the directory
    fs.mkdirSync(directoryPath);
    console.log(`Directory '${directoryName}' created successfully.`);
} else {
    console.log(`Directory '${directoryName}' already exists.`);
}
