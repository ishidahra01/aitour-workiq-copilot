"use client";

import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ChevronRight,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { SiteProject } from "@/lib/types";

type SiteProjectRowProps = {
  project: SiteProject;
  detailsReady: boolean;
};

export function SiteProjectRow({
  project,
  detailsReady,
}: SiteProjectRowProps) {
  const router = useRouter();

  const navigateToDetails = () => {
    router.push(`/sites/${project.id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    navigateToDetails();
  };

  return (
    <tr
      className="cursor-pointer transition-colors hover:bg-blue-50 focus-visible:bg-blue-50"
      role="link"
      tabIndex={0}
      onClick={navigateToDetails}
      onKeyDown={handleKeyDown}
      aria-label={`${project.name} の詳細を開く`}
    >
      <td className="px-5 py-3">
        <span className="font-semibold text-gray-900">{project.name}</span>
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-1.5 text-gray-700">
          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span>{project.municipality}</span>
        </div>
        <div className="text-xs text-gray-400 mt-0.5 ml-5">{project.location}</div>
      </td>
      <td className="px-5 py-3">
        <StatusBadge status={project.status} />
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-1.5 text-gray-600">
          <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {project.owner}
        </div>
      </td>
      <td className="px-5 py-3">
        {detailsReady ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <AlertCircle className="w-3 h-3" />
            整理中
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <Clock className="w-3 h-3" />
            初期登録
          </span>
        )}
      </td>
      <td className="px-5 py-3 text-gray-500 text-xs">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          {project.lastUpdated}
        </div>
      </td>
      <td className="px-5 py-3">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </td>
    </tr>
  );
}