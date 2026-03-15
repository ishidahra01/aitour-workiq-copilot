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
      municipality:
        "高さ制限15m・景観色指定あり。住民説明会は完了済み。自治体との協議は継続中。",
      design:
        "必要アンテナ高20mに対し、制限15mでカバレッジ85%（目標95%未達）。スモールセル2基追加で代替可能。",
      issue:
        "スモールセル追加に伴うコスト増（推定+¥8M）の承認が未了。PM判断待ち。",
      nextAction:
        "コスト承認後、自治体に最終設計を提出し、Approval Pendingへ移行する。",
    },
    municipalityConstraints: {
      heightLimitMeters: 15,
      colorRestriction: "景観条例により外装色はグレー系指定",
      residentMeetingStatus: "実施済み（2026-02-20）",
      municipalityApprovalStatus: "条件付き承認（高さ・色の遵守が条件）",
    },
    rfDesignConstraints: {
      requiredAntennaHeightMeters: 20,
      coverageAtAllowedHeightPercent: 85,
      targetCoveragePercent: 95,
      alternativeDesign: "スモールセル2基追加設置（エリア北東・南西に配置）",
      designStatus: "代替案検討中",
    },
    openIssues: [
      {
        id: "issue-a-1",
        title: "スモールセル追加コストの承認未了",
        severity: "High",
        status: "In Review",
        owner: "PM（中村さん）",
        note: "追加コスト約¥8Mに対するPM承認が必要。コスト試算は完了済み。",
      },
      {
        id: "issue-a-2",
        title: "高さ制限15mと必要アンテナ高20mのギャップ",
        severity: "High",
        status: "Open",
        owner: "鈴木さん（設計）",
        note: "15m設置時のカバレッジ不足（85%）を代替設計でカバーする方針で検討中。",
      },
      {
        id: "issue-a-3",
        title: "景観色指定への設計対応",
        severity: "Medium",
        status: "Open",
        owner: "設計チーム",
        note: "グレー系への外装変更が必要。コスト微増の可能性あり。",
      },
    ],
    approvals: [
      {
        id: "approval-a-1",
        role: "自治体要件確認",
        approver: "中村さん",
        status: "Pending",
      },
      {
        id: "approval-a-2",
        role: "設計要件確認",
        approver: "鈴木さん",
        status: "Pending",
      },
      {
        id: "approval-a-3",
        role: "コスト判断",
        approver: "PM",
        status: "Pending",
      },
    ],
  },
  {
    id: "site-b",
    name: "B市駅前",
    municipality: "B市",
    location: "B市駅前広場 西口ロータリー付近",
    status: "Approved",
    owner: "佐藤さん",
    lastUpdated: "2026-03-01",
    summary: {
      municipality:
        "高さ制限なし。景観規制も対象外エリア。住民説明会・自治体承認ともに完了。",
      design: "必要アンテナ高18mに対し制限なし。カバレッジ98%達成。設計確定済み。",
      issue: "特に重大な未解決論点なし。",
      nextAction: "施工準備フェーズへ移行。設備発注を開始。",
    },
    municipalityConstraints: {
      heightLimitMeters: 30,
      colorRestriction: "特になし",
      residentMeetingStatus: "実施済み（2026-01-15）",
      municipalityApprovalStatus: "承認済み",
    },
    rfDesignConstraints: {
      requiredAntennaHeightMeters: 18,
      coverageAtAllowedHeightPercent: 98,
      targetCoveragePercent: 95,
      alternativeDesign: "不要",
      designStatus: "設計確定",
    },
    openIssues: [
      {
        id: "issue-b-1",
        title: "設備発注リードタイムの確認",
        severity: "Low",
        status: "In Review",
        owner: "佐藤さん",
        note: "施工スケジュールへの影響確認中。重大な問題なし。",
      },
    ],
    approvals: [
      {
        id: "approval-b-1",
        role: "自治体要件確認",
        approver: "山田さん",
        status: "Approved",
      },
      {
        id: "approval-b-2",
        role: "設計要件確認",
        approver: "田中さん",
        status: "Approved",
      },
      {
        id: "approval-b-3",
        role: "コスト判断",
        approver: "PM",
        status: "Approved",
      },
    ],
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
      municipality:
        "高さ制限12m・静穏地域指定あり。住民説明会は未実施。自治体との協議開始前。",
      design:
        "必要アンテナ高16mに対し制限12m。カバレッジ不足が懸念。設計代替案を検討中。",
      issue: "住民説明会の日程調整が難航。設計・自治体の両方でPending事項が多い。",
      nextAction: "住民説明会の日程確定後、自治体協議を開始する。",
    },
    municipalityConstraints: {
      heightLimitMeters: 12,
      colorRestriction: "目立つ色は不可（住宅街景観配慮）",
      residentMeetingStatus: "未実施（日程調整中）",
      municipalityApprovalStatus: "確認中",
    },
    rfDesignConstraints: {
      requiredAntennaHeightMeters: 16,
      coverageAtAllowedHeightPercent: 78,
      targetCoveragePercent: 95,
      alternativeDesign: "スモールセル3基 + リピーター設置案を検討中",
      designStatus: "代替案検討中",
    },
    openIssues: [
      {
        id: "issue-c-1",
        title: "住民説明会の日程未確定",
        severity: "High",
        status: "Blocked",
        owner: "高橋さん",
        note: "自治会との日程調整が難航。自治体協議の前提条件のため、ブロッカーとなっている。",
      },
      {
        id: "issue-c-2",
        title: "高さ制限12mでのカバレッジ不足（78%）",
        severity: "High",
        status: "Open",
        owner: "設計チーム",
        note: "目標95%に対し78%。代替設計の詳細試算が必要。",
      },
      {
        id: "issue-c-3",
        title: "スモールセル設置に伴う近隣同意取得",
        severity: "Medium",
        status: "Open",
        owner: "高橋さん",
        note: "複数箇所設置が必要なため、各地権者との交渉が発生する見込み。",
      },
    ],
    approvals: [
      {
        id: "approval-c-1",
        role: "自治体要件確認",
        approver: "高橋さん",
        status: "Pending",
      },
      {
        id: "approval-c-2",
        role: "設計要件確認",
        approver: "伊藤さん",
        status: "Pending",
      },
      {
        id: "approval-c-3",
        role: "コスト判断",
        approver: "PM",
        status: "Pending",
      },
    ],
  },
];

export function getSiteProject(id: string): SiteProject | undefined {
  return siteProjects.find((s) => s.id === id);
}
