#!/bin/bash

# Script to link and setup Vercel environment variables

echo "Linking Vercel project..."

# Create .vercel directory with project config
mkdir -p .vercel

# You need to get your Vercel org/team ID and project ID from your Vercel dashboard
# For now, we'll use the CLI to set environment variables after manual linking

echo "Setting up environment variables..."

# Add SUPABASE_PROJECT_URL
echo "https://svhdffutjfzislubdzos.supabase.co" | vercel env add SUPABASE_PROJECT_URL production --force
echo "https://svhdffutjfzislubdzos.supabase.co" | vercel env add SUPABASE_PROJECT_URL preview --force
echo "https://svhdffutjfzislubdzos.supabase.co" | vercel env add SUPABASE_PROJECT_URL development --force

# Add SUPABASE_API_KEY
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aGRmZnV0amZ6aXNsdWJkem9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1OTI2MTgsImV4cCI6MjA3MTE2ODYxOH0.m-kYpaksMvL9ex6bp8YUcTLwEFK3HqS-ePMTHDLdN5Q" | vercel env add SUPABASE_API_KEY production --force
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aGRmZnV0amZ6aXNsdWJkem9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1OTI2MTgsImV4cCI6MjA3MTE2ODYxOH0.m-kYpaksMvL9ex6bp8YUcTLwEFK3HqS-ePMTHDLdN5Q" | vercel env add SUPABASE_API_KEY preview --force
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aGRmZnV0amZ6aXNsdWJkem9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1OTI2MTgsImV4cCI6MjA3MTE2ODYxOH0.m-kYpaksMvL9ex6bp8YUcTLwEFK3HqS-ePMTHDLdN5Q" | vercel env add SUPABASE_API_KEY development --force

echo "✅ Environment variables added!"
echo ""
echo "Now run: vercel --prod"