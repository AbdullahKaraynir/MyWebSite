import { NextResponse } from "next/server";
import { syncGitHubProjects } from "@/lib/github/cache";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("refresh") === "true";

    const result = await syncGitHubProjects(forceRefresh);

    return NextResponse.json({
      success: true,
      projects: result.projects,
      updatedAt: result.updatedAt,
      fromCache: result.fromCache,
      error: result.error,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch portfolio projects",
      },
      { status: 500 }
    );
  }
}
