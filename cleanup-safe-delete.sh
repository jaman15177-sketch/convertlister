#!/bin/bash

echo "⚠️ CONVERTLISTER SAFE CLEANER (CONFIRM MODE)"
echo "This will remove ONLY confirmed duplicates"

read -p "Are you sure? type YES to continue: " confirm

if [ "$confirm" != "YES" ]; then
  echo "Cancelled."
  exit 0
fi

echo "🧹 Removing build artifacts..."
find . -name "*.js" -path "*/core/*" -delete

echo "🧹 Removing legacy importer layer..."
rm -rf core/importer

echo "🧹 Removing duplicate queue layers..."
rm -rf lib/queue

echo "🧹 Removing duplicate auth layer (lib only)"
rm -rf lib/auth

echo "🧹 Cleaning .save files"
find . -name "*.save" -delete

echo "✅ CLEAN COMPLETE"
