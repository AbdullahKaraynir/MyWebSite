import { NextResponse } from "next/server";
import { syncGitHubProjects } from "@/lib/github/cache";

const SYNC_SECRET = process.env.GITHUB_SYNC_SECRET;

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const secretHeader = request.headers.get("x-sync-secret");

    const providedSecret = authHeader?.replace(/^Bearer\s+/i, "") || secretHeader;

    // REQUIREMENT: Must not be publicly accessible without authentication
    if (SYNC_SECRET && providedSecret !== SYNC_SECRET) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid or missing sync secret" },
        { status: 401 }
      );
    }

    console.log("Manual sync endpoint triggered. Refreshing portfolio cache from GitHub API...");
    const syncResult = await syncGitHubProjects(true);

    return NextResponse.json({
      success: true,
      message: "Portfolio project cache manually synchronized successfully",
      updatedAt: syncResult.updatedAt,
      projectsCount: syncResult.projects.length,
      projects: syncResult.projects,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Manual sync failed" },
      { status: 500 }
    );
  }
}
