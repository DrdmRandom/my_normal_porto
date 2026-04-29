const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://strapi.cihuy-familly.my.id";

async function fetchCollection(path) {
  const response = await fetch(`${STRAPI_BASE_URL}${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload?.data) ? payload.data : [];
}

export async function getPortfolioData() {
  const [experiencesResult, projectsResult] = await Promise.allSettled([
    fetchCollection("/api/work-experiences-dawwis?populate=*"),
    fetchCollection("/api/projects-dawwis?populate=*")
  ]);

  if (experiencesResult.status === "rejected") {
    console.error("Failed to fetch work experiences from Strapi:", experiencesResult.reason);
  }

  if (projectsResult.status === "rejected") {
    console.error("Failed to fetch projects from Strapi:", projectsResult.reason);
  }

  const experiences =
    experiencesResult.status === "fulfilled" ? experiencesResult.value : [];
  const projects = projectsResult.status === "fulfilled" ? projectsResult.value : [];

  return {
    experiences,
    projects,
    sourceState: {
      experiences: {
        status: experiencesResult.status,
        error:
          experiencesResult.status === "rejected"
            ? String(experiencesResult.reason?.message || experiencesResult.reason)
            : null
      },
      projects: {
        status: projectsResult.status,
        error:
          projectsResult.status === "rejected"
            ? String(projectsResult.reason?.message || projectsResult.reason)
            : null
      }
    }
  };
}

export function splitTags(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
