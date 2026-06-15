#!/bin/bash

echo "=== CONVERTLISTER DUPLICATE DRY RUN ==="

echo ""
echo "🔴 JS/TS DUPLICATES:"
find core src -type f \( -name "*.js" -o -name "*.ts" \) | sed 's/\.ts$//;s/\.js$//' | sort | uniq -d

echo ""
echo "🔴 LEGACY CORE LAYER:"
find core -type f -maxdepth 1

echo ""
echo "🔴 IMPORTER vs IMPORTERS:"
ls core/importer 2>/dev/null
ls core/importers 2>/dev/null

echo ""
echo "🔴 QUEUE DUPLICATES:"
ls lib/queue src/lib/queue core/jobos/queue 2>/dev/null

echo ""
echo "🔴 AUTH DUPLICATES:"
ls src/auth lib/auth src/lib/auth 2>/dev/null

echo ""
echo "=== DONE ==="
