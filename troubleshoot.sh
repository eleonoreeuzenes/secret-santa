#!/bin/bash

echo "=== Fixing Frontend Build Issue ==="

# Go to frontend directory
cd client

echo "1. Installing dependencies..."
npm install

echo "2. Building Angular app..."
npm run build

echo "3. Checking build output..."
ls -la dist/

# Check if files are in a subdirectory
if [ -d "dist" ]; then
    echo "Contents of dist directory:"
    find dist -type f -name "*.html" -o -name "*.js" -o -name "*.css" | head -10
    
    # Check if index.html exists in dist or subdirectory
    if [ -f "dist/index.html" ]; then
        echo "✓ Found index.html in dist/"
    else
        echo "✗ No index.html in dist/, checking subdirectories..."
        SUBDIRS=$(find dist -name "index.html" -type f)
        if [ -n "$SUBDIRS" ]; then
            echo "Found index.html in: $SUBDIRS"
            echo "You need to update docker-compose.yml volume path!"
        else
            echo "❌ No index.html found anywhere in dist/"
        fi
    fi
else
    echo "❌ No dist directory was created!"
fi

cd ..

echo "4. Restarting frontend container..."
docker-compose restart frontend

echo "5. Checking container again..."
docker-compose exec frontend ls -la /usr/share/nginx/html/