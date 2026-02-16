#!/usr/bin/env node
/**
 * Send an email campaign to all Brevo list subscribers.
 *
 * Usage:
 *   node scripts/send-campaign.cjs --subject "Subject line" --html "<h1>Hello</h1><p>Body</p>"
 *   node scripts/send-campaign.cjs --subject "Subject" --html-file ./emails/announcement.html
 *   node scripts/send-campaign.cjs --subject "Subject" --html "<p>Hi</p>" --send-test "test@example.com"
 *   node scripts/send-campaign.cjs --subject "Subject" --html "<p>Hi</p>" --schedule "2026-03-01T10:00:00Z"
 *
 * Flags:
 *   --subject      (required) Email subject line
 *   --html         HTML body content (provide this OR --html-file)
 *   --html-file    Path to an HTML file to use as body
 *   --send-test    Send a test email to this address before sending to the full list.
 *                  The script will pause and ask for confirmation before the real send.
 *   --schedule     ISO 8601 datetime to schedule the campaign instead of sending immediately
 *   --dry-run      Create the campaign but do NOT send it. Prints the campaign ID.
 *   --name         Campaign name (defaults to subject line)
 *
 * Required env vars (reads from .env via dotenv):
 *   BREVO_API_KEY, BREVO_LIST_ID
 *
 * Sender: info@vibebrowser.app (Brevo sender ID 2)
 */

require("dotenv").config();
const fs = require("fs");
const readline = require("readline");

const BREVO_API_KEY = (process.env.BREVO_API_KEY || "").trim();
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID || "3");
const SENDER_EMAIL = "info@vibebrowser.app";
const SENDER_NAME = "Vibe Browser";

if (!BREVO_API_KEY) {
  console.error("Error: BREVO_API_KEY env var is required. Check your .env file.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Arg parsing
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const key = argv[i];
    if (key === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      console.error(`Missing value for ${key}`);
      process.exit(1);
    }
    switch (key) {
      case "--subject":
        args.subject = value;
        break;
      case "--html":
        args.html = value;
        break;
      case "--html-file":
        args.htmlFile = value;
        break;
      case "--send-test":
        args.sendTest = value;
        break;
      case "--schedule":
        args.schedule = value;
        break;
      case "--name":
        args.name = value;
        break;
      default:
        console.error(`Unknown flag: ${key}`);
        process.exit(1);
    }
    i++; // skip the value
  }
  return args;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function brevoPost(path, body) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`Brevo ${path} failed: ${res.status} ${JSON.stringify(json)}`);
  }
  return json;
}

function askConfirmation(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = parseArgs(process.argv);

  // Validate required args
  if (!args.subject) {
    console.error("Error: --subject is required.\n");
    console.error("Usage: node scripts/send-campaign.cjs --subject \"Subject\" --html \"<p>Body</p>\"");
    process.exit(1);
  }

  // Resolve HTML content
  let htmlContent = args.html;
  if (args.htmlFile) {
    if (!fs.existsSync(args.htmlFile)) {
      console.error(`Error: HTML file not found: ${args.htmlFile}`);
      process.exit(1);
    }
    htmlContent = fs.readFileSync(args.htmlFile, "utf-8");
  }
  if (!htmlContent) {
    console.error("Error: --html or --html-file is required.");
    process.exit(1);
  }

  const campaignName = args.name || args.subject;

  // Step 1: Create the campaign
  console.log("Creating email campaign...");
  console.log(`  Name:    ${campaignName}`);
  console.log(`  Subject: ${args.subject}`);
  console.log(`  Sender:  ${SENDER_NAME} <${SENDER_EMAIL}>`);
  console.log(`  List ID: ${BREVO_LIST_ID}`);

  const campaignBody = {
    name: campaignName,
    subject: args.subject,
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    type: "classic",
    htmlContent: htmlContent,
    recipients: { listIds: [BREVO_LIST_ID] },
  };

  if (args.schedule) {
    campaignBody.scheduledAt = args.schedule;
    console.log(`  Schedule: ${args.schedule}`);
  }

  const campaign = await brevoPost("/emailCampaigns", campaignBody);
  const campaignId = campaign.id;
  console.log(`Campaign created (ID: ${campaignId})`);

  if (args.dryRun) {
    console.log("\n--dry-run flag set. Campaign created but NOT sent.");
    console.log(`Campaign ID: ${campaignId}`);
    console.log("You can send it later from the Brevo dashboard or via API:");
    console.log(`  POST https://api.brevo.com/v3/emailCampaigns/${campaignId}/sendNow`);
    return;
  }

  // Step 2: Optionally send a test email
  if (args.sendTest) {
    console.log(`\nSending test email to ${args.sendTest}...`);
    await brevoPost(`/emailCampaigns/${campaignId}/sendTest`, {
      emailTo: [args.sendTest],
    });
    console.log("Test email sent. Check your inbox.");

    const answer = await askConfirmation("\nProceed with sending to all subscribers? (yes/no): ");
    if (answer !== "yes" && answer !== "y") {
      console.log("Aborted. Campaign was created but NOT sent.");
      console.log(`Campaign ID: ${campaignId} (you can send from Brevo dashboard)`);
      return;
    }
  }

  // Step 3: Send or schedule
  if (args.schedule) {
    console.log(`\nCampaign scheduled for ${args.schedule}.`);
    console.log(`Campaign ID: ${campaignId}`);
  } else {
    console.log("\nSending campaign to all subscribers NOW...");
    await brevoPost(`/emailCampaigns/${campaignId}/sendNow`, {});
    console.log("Campaign sent successfully!");
    console.log(`Campaign ID: ${campaignId}`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err.message || err);
  process.exit(1);
});
