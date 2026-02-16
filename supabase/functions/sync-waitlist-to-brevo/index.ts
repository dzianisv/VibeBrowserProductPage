/**
 * Supabase Edge Function: sync-waitlist-to-brevo
 *
 * Syncs any waitlist entries that haven't been synced to Brevo yet.
 * Designed to be invoked daily via pg_cron + pg_net.
 *
 * Environment variables (set via `supabase secrets set`):
 *   BREVO_API_KEY  — Brevo API key
 *   BREVO_LIST_ID  — Brevo list ID (default: 3)
 *
 * The function uses the service_role key (auto-available as SUPABASE_SERVICE_ROLE_KEY)
 * to query and update the waitlist table, bypassing RLS.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface WaitlistEntry {
  id: number;
  email: string;
  tier: string | null;
  referral_source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

Deno.serve(async (req) => {
  try {
    // Only allow POST (from pg_cron) or manual invocations
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    const brevoListId = Number(Deno.env.get("BREVO_LIST_ID") || "3");

    if (!brevoApiKey) {
      return new Response(
        JSON.stringify({ error: "BREVO_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch entries that haven't been synced to Brevo yet
    const { data: entries, error: fetchError } = await supabase
      .from("vibebrowser_waitlist")
      .select("id, email, tier, referral_source, utm_source, utm_medium, utm_campaign")
      .eq("synced_to_brevo", false)
      .order("created_at", { ascending: true })
      .limit(500); // process in batches to stay within edge function time limits

    if (fetchError) {
      console.error("Supabase query error:", fetchError);
      return new Response(
        JSON.stringify({ error: "Failed to query waitlist", detail: fetchError.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!entries || entries.length === 0) {
      console.log("No unsynced entries found.");
      return new Response(
        JSON.stringify({ message: "No entries to sync", synced: 0 }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${entries.length} unsynced entries.`);

    let synced = 0;
    let errors = 0;
    const failedIds: number[] = [];

    for (const entry of entries as WaitlistEntry[]) {
      try {
        const res = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            email: entry.email.toLowerCase(),
            listIds: [brevoListId],
            updateEnabled: true,
            attributes: {
              TIER: entry.tier || "free",
              SOURCE: entry.referral_source || null,
              UTM_SOURCE: entry.utm_source || null,
              UTM_MEDIUM: entry.utm_medium || null,
              UTM_CAMPAIGN: entry.utm_campaign || null,
            },
          }),
        });

        if (res.ok || (res.status === 400 && (await res.text()).includes("duplicate_parameter"))) {
          // Success or already exists in Brevo — mark as synced
          const { error: updateError } = await supabase
            .from("vibebrowser_waitlist")
            .update({ synced_to_brevo: true })
            .eq("id", entry.id);

          if (updateError) {
            console.error(`Failed to mark entry ${entry.id} as synced:`, updateError);
            errors++;
            failedIds.push(entry.id);
          } else {
            synced++;
          }
        } else {
          const body = await res.text();
          console.error(`Brevo error for ${entry.email}: ${res.status} ${body}`);
          errors++;
          failedIds.push(entry.id);
        }

        // Brevo rate limit: 10 req/s on free tier
        await new Promise((r) => setTimeout(r, 120));
      } catch (err) {
        console.error(`Error syncing ${entry.email}:`, err);
        errors++;
        failedIds.push(entry.id);
      }
    }

    const result = {
      message: "Sync complete",
      total: entries.length,
      synced,
      errors,
      failedIds: failedIds.length > 0 ? failedIds : undefined,
    };

    console.log("Sync result:", JSON.stringify(result));

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
