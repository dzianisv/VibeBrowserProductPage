#!/bin/bash
# Test script to verify warm-outreach skill is properly configured

echo "🔍 Verifying warm-outreach skill setup..."
echo ""

# Check directory structure
echo "1. Checking directory structure..."
if [ -d ".opencode/skills/warm-outreach" ]; then
    echo "   ✅ Skill directory exists"
else
    echo "   ❌ Skill directory not found"
    exit 1
fi

# Check SKILL.md exists
echo "2. Checking SKILL.md..."
if [ -f ".opencode/skills/warm-outreach/SKILL.md" ]; then
    echo "   ✅ SKILL.md exists"
else
    echo "   ❌ SKILL.md not found"
    exit 1
fi

# Check frontmatter
echo "3. Checking frontmatter..."
if head -n 20 .opencode/skills/warm-outreach/SKILL.md | grep -q "name: warm-outreach"; then
    echo "   ✅ name field correct"
else
    echo "   ❌ name field missing or incorrect"
    exit 1
fi

if head -n 20 .opencode/skills/warm-outreach/SKILL.md | grep -q "description:"; then
    echo "   ✅ description field present"
else
    echo "   ❌ description field missing"
    exit 1
fi

# Check supporting files
echo "4. Checking supporting files..."
EXPECTED_FILES=(
    "README.md"
    "playwriter-outreach-scripts.js"
    "quick-start-outreach.md"
    "outreach-tracking-template.md"
    "SUMMARY.md"
)

for file in "${EXPECTED_FILES[@]}"; do
    if [ -f ".opencode/skills/warm-outreach/$file" ]; then
        echo "   ✅ $file exists"
    else
        echo "   ⚠️  $file not found (optional)"
    fi
done

# Count lines and size
echo ""
echo "5. Skill statistics..."
LINES=$(wc -l .opencode/skills/warm-outreach/*.md .opencode/skills/warm-outreach/*.js 2>/dev/null | tail -1 | awk '{print $1}')
SIZE=$(du -sh .opencode/skills/warm-outreach/ | awk '{print $1}')
echo "   📝 Total lines: $LINES"
echo "   💾 Total size: $SIZE"

# Check skill name format
echo ""
echo "6. Validating skill name format..."
SKILL_NAME="warm-outreach"
if [[ $SKILL_NAME =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo "   ✅ Name format valid (lowercase, alphanumeric, hyphens)"
else
    echo "   ❌ Name format invalid"
    exit 1
fi

if [ ${#SKILL_NAME} -ge 1 ] && [ ${#SKILL_NAME} -le 64 ]; then
    echo "   ✅ Name length valid (1-64 chars)"
else
    echo "   ❌ Name length invalid"
    exit 1
fi

# Check description length
echo ""
echo "7. Checking description length..."
DESC=$(grep "^description:" .opencode/skills/warm-outreach/SKILL.md | cut -d':' -f2- | xargs)
DESC_LEN=${#DESC}
if [ $DESC_LEN -ge 1 ] && [ $DESC_LEN -le 1024 ]; then
    echo "   ✅ Description length valid ($DESC_LEN chars, max 1024)"
else
    echo "   ❌ Description length invalid ($DESC_LEN chars)"
    exit 1
fi

echo ""
echo "✅ All checks passed!"
echo ""
echo "🎉 The warm-outreach skill is properly configured!"
echo ""
echo "Try it with:"
echo "  opencode"
echo "  > Use the warm-outreach skill to help me with [YOUR GOAL]"
echo ""
