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
      sum + p.openIssues.filter((i) => i.status !== "Resolved").length,
    0
  );
  const inProgressCount = siteProjects.filter(
    (p) => p.status !== "Approved"
  ).length;

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">案件一覧</h1>
        <p className="mt-1 text-slate-500">
          5G基地局設置計画を一覧管理 — {totalProjects}件のアクティブな案件
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500">総案件数</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalProjects}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-slate-500">承認済み</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-slate-500">進行中</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{inProgressCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-xs text-slate-500">未解決論点</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{pendingIssues}</p>
        </div>
      </div>

      {/* Project table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">案件リスト</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  案件名
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  自治体 / 場所
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  ステータス
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  担当者
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  未解決論点
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  最終更新
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {siteProjects.map((project) => {
                const openIssueCount = project.openIssues.filter(
                  (i) => i.status !== "Resolved"
                ).length;
                return (
                  <Link
                    key={project.id}
                    href={`/sites/${project.id}`}
                    legacyBehavior
                  >
                    <tr
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      role="link"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">
                          {project.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-sm">{project.municipality}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 ml-5">
                          {project.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {project.owner}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {openIssueCount > 0 ? (
                            <>
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                              <span className="text-sm font-medium text-amber-700">
                                {openIssueCount}件
                              </span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-600">
                                なし
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {project.lastUpdated}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <ChevronRight className="w-4 h-4 text-slate-400" />
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
      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">
          ステータス別集計
        </h2>
        <div className="flex flex-wrap gap-3">
          {statusOrder.map((status) => {
            const count = siteProjects.filter((p) => p.status === status).length;
            return (
              <div
                key={status}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100"
              >
                <StatusBadge status={status} />
                <span className="text-sm font-semibold text-slate-700">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
