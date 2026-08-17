import { NextResponse } from "next/server";
import crypto from "crypto";
import { syncGitHubProjects } from "@/lib/github/cache";

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

/**
 * Validates the GitHub HMAC SHA-256 signature against the raw request body.
 */
function verifySignature(payload: string, signature: string | null): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn("GITHUB_WEBHOOK_SECRET is not configured. Webhook request ignored.");
    return false;
  }
  if (!signature) {
    return false;
  }

  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = `sha256=${hmac.update(payload).digest("hex")}`;

  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-hub-signature-256");
    const event = request.headers.get("x-github-event");

    // REQUIREMENT: Verify signature & deny unauthenticated requests
    if (WEBHOOK_SECRET && !verifySignature(rawBody, signature)) {
      return NextResponse.json(
        { success: false, message: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    // Supported events: push, repository, create, delete
    const supportedEvents = ["push", "repository", "create", "delete", "ping"];
    if (event && !supportedEvents.includes(event)) {
      return NextResponse.json({
        success: true,
        message: `Event '${event}' received but ignored (not relevant)`,
      });
    }

    if (event === "ping") {
      return NextResponse.json({ success: true, message: "Ping event acknowledged" });
    }

    // Trigger full project cache re-synchronization
    console.log(`GitHub webhook triggered event '${event}'. Re-synchronizing portfolio projects...`);
    const syncResult = await syncGitHubProjects(true);

    return NextResponse.json({
      success: true,
      message: "Portfolio project cache updated successfully via GitHub Webhook",
      updatedAt: syncResult.updatedAt,
      projectCount: syncResult.projects.length,
    });
  } catch (error: any) {
    console.error("Error processing GitHub webhook:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process webhook" },
      { status: 500 }
    );
  }
}
