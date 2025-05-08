#!/bin/bash
echo "Setting file permissions..."
chown -R nginx:nginx /var/www/html
chmod -R 755 /var/www/html
echo "setting permission completed ------------------------------------------------------------------"
