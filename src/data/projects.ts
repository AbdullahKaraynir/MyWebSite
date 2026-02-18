export interface Project {
  id: string;
  techStack: string[];
  githubLink: string;
  demoLink?: string;
}

export const projects: Project[] = [
  {
    id: "recycleye",
    techStack: ["Python", "YOLOv8n", "React Native", "FastAPI", "Roboflow"],
    githubLink: "https://github.com/AbdullahKaraynir/recycleye_app",
  },
  {
    id: "screwtrue",
    techStack: ["Python", "ML/AI", "OpenCV", "Roboflow", "React Native", "FastAPI"],
    githubLink: "https://github.com/AbdullahKaraynir/ScrewTrue",
  },
  {
    id: "ecommerceapp",
    techStack: ["ASP.NET Core 8", "Entity Framework Core", "SQL Server", "JSON", "CSS", "HTML", "Bootstrap"],
    githubLink: "https://github.com/AbdullahKaraynir/ECommerceApp",
  },
  {
    id: "fitcore",
    techStack: ["Flutter", "Firebase", "Dart"],
    githubLink: "https://github.com/AbdullahKaraynir/FitCore",
  },
];
