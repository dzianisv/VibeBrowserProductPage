#!/bin/bash

echo "🧪 Quick Layout Test for VibeBrowser"
echo "===================================="
echo ""

# Test production site
URL="https://www.vibebrowser.app"
echo "Testing: $URL"
echo ""

# Fetch the page
HTML=$(curl -s "$URL")

# Check for critical elements
echo "Checking critical elements..."

if echo "$HTML" | grep -q '<header'; then
  echo "✅ Header found"
else
  echo "❌ Header missing"
fi

if echo "$HTML" | grep -q '<main'; then
  echo "✅ Main content found"
else
  echo "❌ Main content missing"
fi

if echo "$HTML" | grep -q 'Join Waitlist'; then
  echo "✅ Waitlist button found"
else
  echo "❌ Waitlist button missing"
fi

if echo "$HTML" | grep -q 'Vibe Browser'; then
  echo "✅ Title found"
else
  echo "❌ Title missing"
fi

# Check for images
IMAGE_COUNT=$(echo "$HTML" | grep -o '<img' | wc -l)
echo "📊 Images found: $IMAGE_COUNT"

# Check for buttons
BUTTON_COUNT=$(echo "$HTML" | grep -o '<button' | wc -l)
echo "📊 Buttons found: $BUTTON_COUNT"

# Check page size
PAGE_SIZE=$(echo "$HTML" | wc -c)
echo "📊 Page size: $((PAGE_SIZE / 1024))KB"

echo ""
echo "✨ Quick test complete!"