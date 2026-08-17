import Link from "next/link";
import { notFound } from "next/navigation";
import { Github, ExternalLink, Star, GitFork, ArrowLeft, Calendar, Tag, ShieldCheck, AlertCircle } from "lucide-react";
import { getCachedProjects, syncGitHubProjects } from "@/lib/github/cache";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const cache = getCachedProjects();
  const project = cache?.projects.find((p) => p.id === id.toLowerCase());

  if (!project) {
    return {
      title: "Project Detail | Abdullah Karaynir",
    };
  }

  return {
    title: `${project.name} | Abdullah Karaynir Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  
  // Attempt sync or read cache
  const syncData = await syncGitHubProjects(false);
  const project = syncData.projects.find((p) => p.id === id.toLowerCase());

  if (!project) {
    notFound();
  }

  const formattedDate = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-28">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:underline dark:text-blue-400"
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>

        {/* Header Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {project.name}
            </h1>
            {project.isFeatured && (
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-400/20 dark:text-amber-300 border border-amber-500/20">
                Featured Project
              </span>
            )}
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {project.description}
          </p>

          {/* Banner / Image */}
          {project.imageUrl && (
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="max-h-96 w-full object-contain p-2"
              />
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Github size={18} />
              <span>View Repository</span>
            </a>

            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {/* Tech Stack & Features */}
          <div className="space-y-8 md:col-span-2">
            {/* Tech Stack */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/80">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                <Tag size={18} className="text-blue-500" />
                <span>Technologies & Frameworks</span>
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features parsed from README */}
            {project.readme?.features && project.readme.features.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/80">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Key Features</h2>
                <ul className="mt-4 space-y-2">
                  {project.readme.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/80">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Repository Stats</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Star size={16} className="text-amber-500" />
                    <span>Stars</span>
                  </dt>
                  <dd className="font-semibold text-slate-900 dark:text-white">{project.stars}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <GitFork size={16} className="text-blue-500" />
                    <span>Forks</span>
                  </dt>
                  <dd className="font-semibold text-slate-900 dark:text-white">{project.forks}</dd>
                </div>
                {project.openIssues !== undefined && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <AlertCircle size={16} className="text-rose-500" />
                      <span>Open Issues</span>
                    </dt>
                    <dd className="font-semibold text-slate-900 dark:text-white">{project.openIssues}</dd>
                  </div>
                )}
                {project.license && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      <span>License</span>
                    </dt>
                    <dd className="font-semibold text-slate-900 dark:text-white">{project.license}</dd>
                  </div>
                )}
                {formattedDate && (
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
                    <dt className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Calendar size={16} className="text-slate-400" />
                      <span>Last Updated</span>
                    </dt>
                    <dd className="text-xs font-semibold text-slate-900 dark:text-white">{formattedDate}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
