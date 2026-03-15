import Link from "next/link";
import { siteProjects } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import {
  MapPin,
  User,
  AlertCircle,
  Clock,
  ChevronRight,
  CheckCircle,
  Activity,
} from "lucide-react";

const statusOrder = [
  "Planning",
  "Design Review",
  "Cost Review",
  "Approval Pending",
  "Approved",
] as const;

export default function HomePage() {
  const totalProjects = siteProjects.length;
  const approvedCount = siteProjects.filter(
    (p) => p.status === "Approved"
  ).length;
  const pendingIssues = siteProjects.reduce(
    (sum, p) =>
      sum + (p.openIssues ?? []).filter((i) => i.status !== "Resolved").length,
    0
  );
  const inProgressCount = siteProjects.filter(
    (p) => p.status !== "Approved"
  ).length;

  return (
    <div>
      {/* Page title bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900">案件一覧</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            5G基地局設置計画 — {totalProjects}件のアクティブな案件
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">総案件数</p>
            <p className="text-xl font-bold text-gray-900">{totalProjects}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">承認済み</p>
            <p className="text-xl font-bold text-green-600">{approvedCount}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">進行中</p>
            <p className="text-xl font-bold text-amber-600">{inProgressCount}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">未解決論点</p>
            <p className="text-xl font-bold text-red-600">{pendingIssues}</p>
          </div>
        </div>
      </div>

      {/* Project table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            案件リスト
          </h2>
          <span className="text-xs text-gray-400">{totalProjects}件</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  案件名
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  自治体 / 場所
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  ステータス
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  担当者
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  未解決論点
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  最終更新
                </th>
                <th className="px-5 py-2.5 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siteProjects.map((project) => {
                const openIssueCount = (project.openIssues ?? []).filter(
                  (i) => i.status !== "Resolved"
                ).length;
                return (
                  <Link
                    key={project.id}
                    href={`/sites/${project.id}`}
                    legacyBehavior
                  >
                    <tr
                      className="hover:bg-blue-50 transition-colors cursor-pointer"
                      role="link"
                    >
                      <td className="px-5 py-3">
                        <span className="font-semibold text-gray-900">
                          {project.name}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{project.municipality}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 ml-5">
                          {project.location}
                        </div>
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
                        {openIssueCount > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                            <AlertCircle className="w-3 h-3" />
                            {openIssueCount}件
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3" />
                            なし
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
                  </Link>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
          ステータス別集計
        </h2>
        <div className="flex flex-wrap gap-2">
          {statusOrder.map((status) => {
            const count = siteProjects.filter((p) => p.status === status).length;
            return (
              <div
                key={status}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border border-gray-200"
              >
                <StatusBadge status={status} />
                <span className="text-sm font-semibold text-gray-700">
                  {count}件
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
