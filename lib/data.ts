import { SiteProject } from "./types";

export const siteProjects: SiteProject[] = [
  {
    id: "site-a",
    name: "A市公園",
    municipality: "A市",
    location: "A市中央公園 北側エリア",
    status: "Cost Review",
    owner: "中村さん",
    lastUpdated: "2026-03-12",
    summary: {
      municipality: "候補地として登録済み。自治体条件はまだ整理前。",
      design: "現地確認前。設計に必要な前提情報を収集中。",
      issue: "判断材料が不足しており、案件像がまだ粗い。",
      nextAction: "関係者のメール・会話・資料を集めて案件情報を具体化する。",
    },
  },
  {
    id: "site-b",
    name: "B市駅前",
    municipality: "B市",
    location: "B市駅前広場 西口ロータリー付近",
    status: "Approval Pending",
    owner: "佐藤さん",
    lastUpdated: "2026-03-01",
    summary: {
      municipality: "駅前候補地として一次登録済み。詳細条件は未反映。",
      design: "概略配置のイメージのみあり、RF条件は未整理。",
      issue: "承認判断に必要な根拠がまだそろっていない。",
      nextAction: "既存資料を確認し、関係者レビューの土台を作る。",
    },
  },
  {
    id: "site-c",
    name: "C市住宅街",
    municipality: "C市",
    location: "C市南区 住宅街B丁目",
    status: "Design Review",
    owner: "高橋さん",
    lastUpdated: "2026-03-10",
    summary: {
      municipality: "住宅街エリアの候補地として登録済み。制約情報は未整理。",
      design: "設計検討の入口段階。比較に必要な材料が不足している。",
      issue: "関連会話や現地情報が散在していて全体像が見えにくい。",
      nextAction: "ヒアリング内容と過去資料を集約して初期案を固める。",
    },
  },
];

export function getSiteProject(id: string): SiteProject | undefined {
  return siteProjects.find((s) => s.id === id);
}
