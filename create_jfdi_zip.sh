#!/bin/bash

# Navigate to the correct directory
cd /workspaces/jfdi0-1

# Create a zip file of all contents
zip -r JFDI.zip .

echo "JFDI.zip has been created in the /workspaces/jfdi0-1 directory."
echo "To download the file:"
echo "1. Look for JFDI.zip in the VSCode file explorer"
echo "2. Right-click on JFDI.zip"
echo "3. Select 'Download' from the context menu"