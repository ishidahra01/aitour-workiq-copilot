import { notFound } from "next/navigation";
import { getSiteProject } from "@/lib/data";
import SiteDetailClient from "./SiteDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SiteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = getSiteProject(id);

  if (!project) {
    notFound();
  }

  return <SiteDetailClient defaultProject={project} />;
}
