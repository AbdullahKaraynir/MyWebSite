/**
 * Technology detection engine. Analyzes dependency files (package.json, requirements.txt, etc.)
 * and GitHub languages breakdown to infer tech stack badges accurately.
 */

export function detectTechnologiesFromFile(
  filename: string,
  content: string
): string[] {
  const detected = new Set<string>();

  const filenameLower = filename.toLowerCase();

  // 1. Node / JavaScript / TypeScript projects (package.json)
  if (filenameLower === "package.json") {
    try {
      const pkg = JSON.parse(content);
      const allDeps = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {}),
      };

      if (allDeps["react"]) detected.add("React");
      if (allDeps["react-native"]) detected.add("React Native");
      if (allDeps["next"]) detected.add("Next.js");
      if (allDeps["vue"]) detected.add("Vue.js");
      if (allDeps["@angular/core"]) detected.add("Angular");
      if (allDeps["express"]) detected.add("Express");
      if (allDeps["nestjs"] || allDeps["@nestjs/core"]) detected.add("NestJS");
      if (allDeps["tailwindcss"]) detected.add("Tailwind CSS");
      if (allDeps["typescript"]) detected.add("TypeScript");
      if (allDeps["fastify"]) detected.add("Fastify");
      if (allDeps["prisma"] || allDeps["@prisma/client"]) detected.add("Prisma");
      if (allDeps["mongoose"]) detected.add("MongoDB");
      if (allDeps["pg"]) detected.add("PostgreSQL");
      if (allDeps["three"] || allDeps["@react-three/fiber"]) detected.add("Three.js");
    } catch {
      // Ignore JSON parse errors
    }
  }

  // 2. Python projects (requirements.txt / pyproject.toml)
  if (filenameLower === "requirements.txt" || filenameLower === "pyproject.toml") {
    const text = content.toLowerCase();
    if (text.includes("fastapi")) detected.add("FastAPI");
    if (text.includes("flask")) detected.add("Flask");
    if (text.includes("django")) detected.add("Django");
    if (text.includes("torch") || text.includes("pytorch")) detected.add("PyTorch");
    if (text.includes("tensorflow")) detected.add("TensorFlow");
    if (text.includes("ultralytics") || text.includes("yolo")) detected.add("YOLO");
    if (text.includes("opencv")) detected.add("OpenCV");
    if (text.includes("roboflow")) detected.add("Roboflow");
    if (text.includes("pandas")) detected.add("Pandas");
    if (text.includes("numpy")) detected.add("NumPy");
    if (text.includes("scikit-learn")) detected.add("Scikit-Learn");
  }

  // 3. .NET / C# projects (.csproj)
  if (filenameLower.endsWith(".csproj")) {
    const text = content.toLowerCase();
    detected.add("C#");
    if (text.includes("microsoft.aspnetcore")) detected.add("ASP.NET Core");
    if (text.includes("entityframeworkcore") || text.includes("entityframework")) {
      detected.add("Entity Framework Core");
    }
  }

  // 4. Flutter / Dart (pubspec.yaml)
  if (filenameLower === "pubspec.yaml") {
    detected.add("Flutter");
    detected.add("Dart");
    if (content.includes("firebase")) detected.add("Firebase");
  }

  // 5. Rust (Cargo.toml)
  if (filenameLower === "cargo.toml") {
    detected.add("Rust");
  }

  // 6. Java / Kotlin (pom.xml)
  if (filenameLower === "pom.xml" || filenameLower.endsWith(".gradle")) {
    detected.add("Java");
    if (content.toLowerCase().includes("spring-boot") || content.toLowerCase().includes("springframework")) {
      detected.add("Spring Boot");
    }
  }

  // 7. PHP (composer.json)
  if (filenameLower === "composer.json") {
    if (content.toLowerCase().includes("laravel/framework")) detected.add("Laravel");
  }

  return Array.from(detected);
}

/**
 * Combines GitHub primary language, languages breakdown, README detected techs, and dependency files
 * into a clean deduplicated tech stack array.
 */
export function buildFinalTechStack(
  primaryLanguage: string | null,
  languagesBreakdown: Record<string, number>,
  fileDetectedTechs: string[],
  readmeTechs: string[]
): string[] {
  const stack = new Set<string>();

  if (primaryLanguage) {
    stack.add(primaryLanguage);
  }

  // Include top languages from breakdown (>5% of code or top 3)
  const totalBytes = Object.values(languagesBreakdown).reduce((a, b) => a + b, 0);
  if (totalBytes > 0) {
    Object.entries(languagesBreakdown).forEach(([lang, bytes]) => {
      if (bytes / totalBytes > 0.05) {
        stack.add(lang);
      }
    });
  }

  fileDetectedTechs.forEach((t) => stack.add(t));
  readmeTechs.forEach((t) => stack.add(t));

  return Array.from(stack);
}
