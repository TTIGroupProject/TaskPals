#!/bin/bash

echo "Starting TaskPals Applications"

# Change directory to React front-end and set it up
cd /home/site/wwwroot/TaskPals_Frontend || { echo "Directory /home/site/wwwroot/TaskPals_Frontend not found"; exit 1; }
npm install
npm run build

# Change directory to Python back-end and start the Flask app using gunicorn
cd /home/site/wwwroot/TaskPals_Backend || { echo "Directory /home/site/wwwroot/TaskPals_Backend not found"; exit 1; }
gunicorn --bind=0.0.0.0:8000 app:app