// ============================================================
// TRAIL 私立中学相性診断 - 学校データ & スコアリングロジック
// Design: 古代図書館の冒険書スタイル
// ============================================================

export interface School {
  id: string;
  name: string;
  area: string;
  sapixDeviation: [number, number]; // [min, max]
  yotsuyaDeviation: [number, number];
  schoolStyle: "自由" | "規律" | "バランス";
  explorationLevel: number; // 1-5
  aiEducationLevel: number; // 1-5
  digitalEnvironment: number; // 1-5
  passionLevel: number; // 1-5
  selfDriveLevel: number; // 1-5
  expressionLevel: number; // 1-5
  collaborationLevel: number; // 1-5
  futureOrientation: number; // 1-5
  coed: "共学" | "男子校" | "女子校";
  features: string[];
  description: string;
  commuteAreas: string[];
}

export const schools: School[] = [
  {
    id: "s01",
    name: "渋谷教育学園渋谷中学校",
    area: "渋谷区",
    sapixDeviation: [56, 62],
    yotsuyaDeviation: [64, 68],
    schoolStyle: "自由",
    explorationLevel: 5,
    aiEducationLevel: 4,
    digitalEnvironment: 5,
    passionLevel: 5,
    selfDriveLevel: 5,
    expressionLevel: 5,
    collaborationLevel: 4,
    futureOrientation: 5,
    coed: "共学",
    features: ["探究", "国際", "自主性", "ICT"],
    description: "自調自考を教育理念に掲げ、生徒の自主性と探究心を最大限に伸ばす環境が整っています。",
    commuteAreas: ["渋谷", "新宿", "目黒", "世田谷"],
  },
  {
    id: "s02",
    name: "広尾学園中学校",
    area: "港区",
    sapixDeviation: [50, 58],
    yotsuyaDeviation: [60, 66],
    schoolStyle: "バランス",
    explorationLevel: 5,
    aiEducationLevel: 5,
    digitalEnvironment: 5,
    passionLevel: 4,
    selfDriveLevel: 4,
    expressionLevel: 4,
    collaborationLevel: 5,
    futureOrientation: 5,
    coed: "共学",
    features: ["ICT", "サイエンス", "国際", "医進"],
    description: "最先端のICT環境とサイエンス教育で、未来を切り拓く力を育む先進的な学校です。",
    commuteAreas: ["港区", "渋谷", "品川", "目黒"],
  },
  {
    id: "s03",
    name: "三田国際学園中学校",
    area: "世田谷区",
    sapixDeviation: [44, 54],
    yotsuyaDeviation: [56, 63],
    schoolStyle: "自由",
    explorationLevel: 5,
    aiEducationLevel: 4,
    digitalEnvironment: 5,
    passionLevel: 5,
    selfDriveLevel: 4,
    expressionLevel: 5,
    collaborationLevel: 5,
    futureOrientation: 5,
    coed: "共学",
    features: ["探究", "国際", "PBL", "STEAM"],
    description: "「発想の自由人」を育てることを目指し、探究型学習とグローバル教育を融合させた革新的な教育を展開しています。",
    commuteAreas: ["世田谷", "渋谷", "目黒", "大田"],
  },
  {
    id: "s04",
    name: "開成中学校",
    area: "荒川区",
    sapixDeviation: [62, 68],
    yotsuyaDeviation: [70, 72],
    schoolStyle: "自由",
    explorationLevel: 4,
    aiEducationLevel: 3,
    digitalEnvironment: 3,
    passionLevel: 5,
    selfDriveLevel: 5,
    expressionLevel: 4,
    collaborationLevel: 3,
    futureOrientation: 4,
    coed: "男子校",
    features: ["進学実績", "自主性", "伝統", "運動会"],
    description: "「ペンは剣よりも強し」の精神のもと、自由な校風で生徒の知的好奇心と自立心を育てます。",
    commuteAreas: ["荒川", "文京", "台東", "北区"],
  },
  {
    id: "s05",
    name: "桜蔭中学校",
    area: "文京区",
    sapixDeviation: [58, 64],
    yotsuyaDeviation: [68, 71],
    schoolStyle: "規律",
    explorationLevel: 3,
    aiEducationLevel: 3,
    digitalEnvironment: 3,
    passionLevel: 4,
    selfDriveLevel: 5,
    expressionLevel: 3,
    collaborationLevel: 3,
    futureOrientation: 4,
    coed: "女子校",
    features: ["進学実績", "礼法", "伝統", "理系"],
    description: "礼と学びの調和を大切にし、確かな学力と豊かな人間性を兼ね備えた女性を育成します。",
    commuteAreas: ["文京", "千代田", "台東", "豊島"],
  },
  {
    id: "s06",
    name: "武蔵中学校",
    area: "練馬区",
    sapixDeviation: [54, 60],
    yotsuyaDeviation: [64, 67],
    schoolStyle: "自由",
    explorationLevel: 5,
    aiEducationLevel: 3,
    digitalEnvironment: 3,
    passionLevel: 5,
    selfDriveLevel: 5,
    expressionLevel: 5,
    collaborationLevel: 3,
    futureOrientation: 4,
    coed: "男子校",
    features: ["探究", "自主性", "少人数", "本物体験"],
    description: "「自ら調べ自ら考える」を重視し、少人数教育で一人ひとりの知的探究心を深く育てます。",
    commuteAreas: ["練馬", "豊島", "板橋", "新宿"],
  },
  {
    id: "s07",
    name: "慶應義塾中等部",
    area: "港区",
    sapixDeviation: [52, 58],
    yotsuyaDeviation: [63, 67],
    schoolStyle: "バランス",
    explorationLevel: 4,
    aiEducationLevel: 3,
    digitalEnvironment: 4,
    passionLevel: 4,
    selfDriveLevel: 4,
    expressionLevel: 4,
    collaborationLevel: 5,
    futureOrientation: 4,
    coed: "共学",
    features: ["大学附属", "教養", "人間力", "多様性"],
    description: "「独立自尊」の精神を基盤に、幅広い教養と社会性を育む一貫教育を提供します。",
    commuteAreas: ["港区", "渋谷", "品川", "目黒"],
  },
  {
    id: "s08",
    name: "麻布中学校",
    area: "港区",
    sapixDeviation: [56, 62],
    yotsuyaDeviation: [66, 69],
    schoolStyle: "自由",
    explorationLevel: 5,
    aiEducationLevel: 3,
    digitalEnvironment: 3,
    passionLevel: 5,
    selfDriveLevel: 5,
    expressionLevel: 5,
    collaborationLevel: 4,
    futureOrientation: 4,
    coed: "男子校",
    features: ["自由", "教養", "議論", "個性"],
    description: "自由闊達な校風のもと、深い教養と独自の視点を持つ人間を育てる伝統校です。",
    commuteAreas: ["港区", "渋谷", "品川", "目黒"],
  },
  {
    id: "s09",
    name: "女子学院中学校",
    area: "千代田区",
    sapixDeviation: [56, 62],
    yotsuyaDeviation: [66, 69],
    schoolStyle: "自由",
    explorationLevel: 4,
    aiEducationLevel: 3,
    digitalEnvironment: 3,
    passionLevel: 4,
    selfDriveLevel: 5,
    expressionLevel: 4,
    collaborationLevel: 4,
    futureOrientation: 4,
    coed: "女子校",
    features: ["自由", "キリスト教", "自主性", "教養"],
    description: "キリスト教精神に基づく自由な教育で、自ら考え行動できる女性を育てます。",
    commuteAreas: ["千代田", "文京", "港区", "中央"],
  },
  {
    id: "s10",
    name: "栄光学園中学校",
    area: "鎌倉市",
    sapixDeviation: [52, 58],
    yotsuyaDeviation: [63, 66],
    schoolStyle: "バランス",
    explorationLevel: 4,
    aiEducationLevel: 3,
    digitalEnvironment: 3,
    passionLevel: 4,
    selfDriveLevel: 4,
    expressionLevel: 4,
    collaborationLevel: 4,
    futureOrientation: 4,
    coed: "男子校",
    features: ["カトリック", "自然", "教養", "少人数"],
    description: "鎌倉の豊かな自然の中で、カトリック精神に基づいた全人教育を実践しています。",
    commuteAreas: ["鎌倉", "横浜", "藤沢", "逗子"],
  },
  {
    id: "s11",
    name: "東京都市大学付属中学校",
    area: "世田谷区",
    sapixDeviation: [40, 50],
    yotsuyaDeviation: [52, 60],
    schoolStyle: "バランス",
    explorationLevel: 4,
    aiEducationLevel: 4,
    digitalEnvironment: 4,
    passionLevel: 4,
    selfDriveLevel: 3,
    expressionLevel: 4,
    collaborationLevel: 4,
    futureOrientation: 4,
    coed: "男子校",
    features: ["理系", "ICT", "探究", "グローバル"],
    description: "理系教育とICTを軸に、探究心と実践力を育む教育環境を提供しています。",
    commuteAreas: ["世田谷", "目黒", "大田", "渋谷"],
  },
  {
    id: "s12",
    name: "洗足学園中学校",
    area: "川崎市",
    sapixDeviation: [50, 58],
    yotsuyaDeviation: [62, 67],
    schoolStyle: "バランス",
    explorationLevel: 4,
    aiEducationLevel: 4,
    digitalEnvironment: 4,
    passionLevel: 4,
    selfDriveLevel: 4,
    expressionLevel: 5,
    collaborationLevel: 4,
    futureOrientation: 5,
    coed: "女子校",
    features: ["音楽", "国際", "探究", "ICT"],
    description: "音楽教育の伝統を持ちながら、グローバルな視野と探究力を育む先進的な女子校です。",
    commuteAreas: ["川崎", "横浜", "大田", "世田谷"],
  },
  {
    id: "s13",
    name: "渋谷教育学園幕張中学校",
    area: "千葉市",
    sapixDeviation: [56, 64],
    yotsuyaDeviation: [66, 70],
    schoolStyle: "自由",
    explorationLevel: 5,
    aiEducationLevel: 4,
    digitalEnvironment: 5,
    passionLevel: 5,
    selfDriveLevel: 5,
    expressionLevel: 5,
    collaborationLevel: 4,
    futureOrientation: 5,
    coed: "共学",
    features: ["探究", "国際", "自調自考", "ICT"],
    description: "自調自考の精神を基盤に、グローバルな視野と深い探究力を育む千葉の名門校です。",
    commuteAreas: ["千葉", "船橋", "習志野", "市川"],
  },
  {
    id: "s14",
    name: "聖光学院中学校",
    area: "横浜市",
    sapixDeviation: [54, 62],
    yotsuyaDeviation: [66, 69],
    schoolStyle: "規律",
    explorationLevel: 4,
    aiEducationLevel: 3,
    digitalEnvironment: 4,
    passionLevel: 4,
    selfDriveLevel: 4,
    expressionLevel: 3,
    collaborationLevel: 4,
    futureOrientation: 4,
    coed: "男子校",
    features: ["カトリック", "進学実績", "規律", "教養"],
    description: "カトリック精神に基づく規律ある教育で、高い学力と豊かな人間性を育てます。",
    commuteAreas: ["横浜", "川崎", "鎌倉", "藤沢"],
  },
  {
    id: "s15",
    name: "豊島岡女子学園中学校",
    area: "豊島区",
    sapixDeviation: [54, 60],
    yotsuyaDeviation: [65, 69],
    schoolStyle: "規律",
    explorationLevel: 3,
    aiEducationLevel: 3,
    digitalEnvironment: 4,
    passionLevel: 4,
    selfDriveLevel: 4,
    expressionLevel: 3,
    collaborationLevel: 4,
    futureOrientation: 4,
    coed: "女子校",
    features: ["進学実績", "運針", "規律", "理系"],
    description: "毎朝の運針に象徴される集中力と努力の精神で、確かな学力を育てる女子校です。",
    commuteAreas: ["豊島", "文京", "新宿", "板橋"],
  },
  {
    id: "s16",
    name: "ドルトン東京学園中等部",
    area: "調布市",
    sapixDeviation: [36, 44],
    yotsuyaDeviation: [48, 55],
    schoolStyle: "自由",
    explorationLevel: 5,
    aiEducationLevel: 5,
    digitalEnvironment: 5,
    passionLevel: 5,
    selfDriveLevel: 5,
    expressionLevel: 5,
    collaborationLevel: 5,
    futureOrientation: 5,
    coed: "共学",
    features: ["ドルトンプラン", "探究", "STEAM", "個別最適"],
    description: "ドルトンプランに基づく個別最適な学びで、一人ひとりの探究心と創造力を最大限に引き出します。",
    commuteAreas: ["調布", "世田谷", "狛江", "府中"],
  },
  {
    id: "s17",
    name: "開智日本橋学園中学校",
    area: "中央区",
    sapixDeviation: [38, 48],
    yotsuyaDeviation: [50, 58],
    schoolStyle: "バランス",
    explorationLevel: 5,
    aiEducationLevel: 4,
    digitalEnvironment: 4,
    passionLevel: 4,
    selfDriveLevel: 4,
    expressionLevel: 5,
    collaborationLevel: 5,
    futureOrientation: 5,
    coed: "共学",
    features: ["IB", "探究", "国際", "PBL"],
    description: "国際バカロレア（IB）の理念を取り入れた探究型教育で、世界で活躍できる人材を育成します。",
    commuteAreas: ["中央", "千代田", "台東", "江東"],
  },
  {
    id: "s18",
    name: "サレジアン国際学園中学校",
    area: "北区",
    sapixDeviation: [32, 40],
    yotsuyaDeviation: [45, 52],
    schoolStyle: "バランス",
    explorationLevel: 4,
    aiEducationLevel: 4,
    digitalEnvironment: 4,
    passionLevel: 4,
    selfDriveLevel: 3,
    expressionLevel: 4,
    collaborationLevel: 5,
    futureOrientation: 5,
    coed: "共学",
    features: ["PBL", "21世紀型", "国際", "STEAM"],
    description: "PBL型授業と21世紀型教育で、主体的に学び、社会に貢献できる人材を育成します。",
    commuteAreas: ["北区", "板橋", "豊島", "荒川"],
  },
  {
    id: "s19",
    name: "芝中学校",
    area: "港区",
    sapixDeviation: [46, 54],
    yotsuyaDeviation: [58, 63],
    schoolStyle: "バランス",
    explorationLevel: 3,
    aiEducationLevel: 3,
    digitalEnvironment: 3,
    passionLevel: 4,
    selfDriveLevel: 4,
    expressionLevel: 3,
    collaborationLevel: 4,
    futureOrientation: 3,
    coed: "男子校",
    features: ["伝統", "仏教", "温かさ", "文武両道"],
    description: "仏教精神に基づく温かな校風の中で、文武両道を実践する伝統ある男子校です。",
    commuteAreas: ["港区", "品川", "渋谷", "中央"],
  },
  {
    id: "s20",
    name: "吉祥女子中学校",
    area: "武蔵野市",
    sapixDeviation: [48, 54],
    yotsuyaDeviation: [60, 65],
    schoolStyle: "バランス",
    explorationLevel: 4,
    aiEducationLevel: 3,
    digitalEnvironment: 4,
    passionLevel: 4,
    selfDriveLevel: 4,
    expressionLevel: 4,
    collaborationLevel: 4,
    futureOrientation: 4,
    coed: "女子校",
    features: ["芸術", "自主性", "進学実績", "バランス"],
    description: "芸術教育と学力向上を両立させ、自主性と感性豊かな女性を育てる学校です。",
    commuteAreas: ["武蔵野", "三鷹", "杉並", "練馬"],
  },
];

// ============================================================
// 診断フォームの型定義
// ============================================================

export interface DiagnosisInput {
  grade: string;
  deviationStandard: "sapix" | "yotsuya";
  deviationRange: string;
  // 現在の適性（お子さまの今の強み）
  currentStrengths: string[];
  // 伸ばしたい能力
  desiredGrowth: string[];
  // 性格・学びのスタイル
  explorationPower: number;
  passionLevel: number;
  selfDrive: number;
  expressionPower: number;
  collaborationPower: number;
  futureOrientation: number;
  // 環境
  schoolStyle: "自由" | "規律" | "バランス" | "こだわらない";
  coedPreference: "共学" | "男子校" | "女子校" | "こだわらない";
  // 通学条件（任意）
  includeCommute: boolean;
  commuteTime: string;
}

// ============================================================
// 適性・伸ばしたい能力の選択肢
// ============================================================

export const STRENGTH_OPTIONS = [
  { value: "exploration", label: "探究心", desc: "知りたい・調べたいが止まらない", icon: "🔍" },
  { value: "logic", label: "論理的思考", desc: "筋道を立てて考えるのが得意", icon: "🧩" },
  { value: "creativity", label: "創造力", desc: "新しいアイデアを生み出すのが好き", icon: "💡" },
  { value: "expression", label: "表現力", desc: "自分の考えを伝えるのが上手", icon: "🎤" },
  { value: "persistence", label: "粘り強さ", desc: "最後まで諦めずにやり遂げる", icon: "💪" },
  { value: "sociability", label: "社交性", desc: "友達と協力するのが得意", icon: "🤝" },
  { value: "concentration", label: "集中力", desc: "一つのことに深く没頭できる", icon: "🎯" },
  { value: "curiosity", label: "好奇心", desc: "いろんなことに興味を持つ", icon: "✨" },
  { value: "leadership", label: "リーダーシップ", desc: "みんなをまとめるのが得意", icon: "👑" },
  { value: "independence", label: "自立心", desc: "自分で考えて行動できる", icon: "🚀" },
];

export const GROWTH_OPTIONS = [
  { value: "exploration", label: "探究力", desc: "自ら問いを立て深く学ぶ力", icon: "🔍" },
  { value: "global", label: "国際力", desc: "英語力・異文化理解・グローバル視野", icon: "🌍" },
  { value: "science", label: "理系力", desc: "科学的思考・実験・データ分析", icon: "🔬" },
  { value: "expression", label: "表現力", desc: "プレゼン・文章・芸術的表現", icon: "🎨" },
  { value: "digital", label: "デジタル力", desc: "プログラミング・AI・ICTスキル", icon: "💻" },
  { value: "selfDrive", label: "自走力", desc: "自分で計画し実行する力", icon: "🚀" },
  { value: "collaboration", label: "協働力", desc: "チームで課題を解決する力", icon: "🤝" },
  { value: "humanPower", label: "人間力", desc: "教養・礼節・豊かな人間性", icon: "📚" },
];

// ============================================================
// スコアリングロジック
// ============================================================

export interface SchoolScore {
  school: School;
  totalScore: number;
  deviationScore: number;
  styleScore: number;
  explorationScore: number;
  passionScore: number;
  selfDriveScore: number;
  futureScore: number;
  techScore: number;
  strengthMatchScore: number;
  growthMatchScore: number;
  matchComment: string;
}

function getDeviationValue(range: string): [number, number] {
  const ranges: Record<string, [number, number]> = {
    "30-35": [30, 35],
    "36-40": [36, 40],
    "41-45": [41, 45],
    "46-50": [46, 50],
    "51-55": [51, 55],
    "56-60": [56, 60],
    "61-65": [61, 65],
    "66-70": [66, 70],
    "71+": [71, 75],
  };
  return ranges[range] || [45, 55];
}

function calculateDeviationScore(
  input: DiagnosisInput,
  school: School
): number {
  const [userMin, userMax] = getDeviationValue(input.deviationRange);
  const [schoolMin, schoolMax] =
    input.deviationStandard === "sapix"
      ? school.sapixDeviation
      : school.yotsuyaDeviation;

  const userMid = (userMin + userMax) / 2;
  const schoolMid = (schoolMin + schoolMax) / 2;
  const diff = Math.abs(userMid - schoolMid);

  if (diff <= 3) return 100;
  if (diff <= 6) return 80;
  if (diff <= 10) return 60;
  if (diff <= 15) return 40;
  return 20;
}

function calculateStyleScore(input: DiagnosisInput, school: School): number {
  if (input.schoolStyle === "こだわらない") return 70;
  if (input.schoolStyle === school.schoolStyle) return 100;
  if (
    input.schoolStyle === "バランス" ||
    school.schoolStyle === "バランス"
  )
    return 60;
  return 30;
}

function calculateAttributeScore(
  userValue: number,
  schoolValue: number
): number {
  const diff = Math.abs(userValue - schoolValue);
  if (diff === 0) return 100;
  if (diff === 1) return 80;
  if (diff === 2) return 55;
  if (diff === 3) return 30;
  return 15;
}

// 現在の適性と学校の特徴のマッチング
function calculateStrengthMatch(strengths: string[], school: School): number {
  if (strengths.length === 0) return 60; // 未選択の場合は中立

  const strengthToSchoolMap: Record<string, (s: School) => number> = {
    exploration: (s) => s.explorationLevel,
    logic: (s) => Math.max(s.explorationLevel, s.selfDriveLevel),
    creativity: (s) => s.expressionLevel,
    expression: (s) => s.expressionLevel,
    persistence: (s) => s.selfDriveLevel,
    sociability: (s) => s.collaborationLevel,
    concentration: (s) => s.selfDriveLevel,
    curiosity: (s) => s.explorationLevel,
    leadership: (s) => s.collaborationLevel,
    independence: (s) => s.selfDriveLevel,
  };

  let totalScore = 0;
  let count = 0;
  for (const str of strengths) {
    const getter = strengthToSchoolMap[str];
    if (getter) {
      const schoolVal = getter(school);
      // 高い適性 × 学校の高い特徴 = 良いマッチ
      totalScore += schoolVal >= 4 ? 100 : schoolVal >= 3 ? 70 : 40;
      count++;
    }
  }
  return count > 0 ? totalScore / count : 60;
}

// 伸ばしたい能力と学校の特徴のマッチング
function calculateGrowthMatch(growthAreas: string[], school: School): number {
  if (growthAreas.length === 0) return 60;

  const growthToSchoolMap: Record<string, (s: School) => number> = {
    exploration: (s) => s.explorationLevel,
    global: (s) => (s.features.some(f => ["国際", "IB", "グローバル"].includes(f)) ? 5 : s.collaborationLevel >= 4 ? 3 : 2),
    science: (s) => (s.features.some(f => ["理系", "サイエンス", "STEAM"].includes(f)) ? 5 : s.aiEducationLevel >= 4 ? 4 : 2),
    expression: (s) => s.expressionLevel,
    digital: (s) => Math.max(s.aiEducationLevel, s.digitalEnvironment),
    selfDrive: (s) => s.selfDriveLevel,
    collaboration: (s) => s.collaborationLevel,
    humanPower: (s) => (s.features.some(f => ["教養", "伝統", "礼法", "仏教", "カトリック"].includes(f)) ? 5 : s.collaborationLevel >= 4 ? 3 : 2),
  };

  let totalScore = 0;
  let count = 0;
  for (const area of growthAreas) {
    const getter = growthToSchoolMap[area];
    if (getter) {
      const schoolVal = getter(school);
      totalScore += schoolVal >= 4 ? 100 : schoolVal >= 3 ? 65 : 30;
      count++;
    }
  }
  return count > 0 ? totalScore / count : 60;
}

function generateMatchComment(input: DiagnosisInput, school: School, rank: number): string {
  const comments: string[] = [];

  // School-specific opening based on features and name
  const schoolSpecificOpeners: Record<string, string> = {
    s01: "自調自考の精神が息づくこの学校で、お子さまの知的好奇心がさらに広がる可能性を感じます。",
    s02: "最先端のICT環境とサイエンス教育が、お子さまの未来への扉を開いてくれるでしょう。",
    s03: "探究型学習とグローバル教育の融合が、お子さまの「発想する力」を大きく伸ばしてくれそうです。",
    s04: "自由な校風の中で知的好奇心を追求できる環境が、お子さまの可能性を広げてくれるでしょう。",
    s05: "確かな学力と豊かな人間性を育む伝統ある環境が、お子さまの成長を支えてくれるでしょう。",
    s06: "少人数教育で一人ひとりに寄り添う環境が、お子さまの探究心を深く育ててくれそうです。",
    s07: "幅広い教養と社会性を育む一貫教育が、お子さまの人間力を豊かにしてくれるでしょう。",
    s08: "自由闊達な校風のもとで、お子さまの独自の視点と深い教養が花開く場所です。",
    s09: "自ら考え行動する力を育む自由な教育が、お子さまの自主性をさらに伸ばしてくれるでしょう。",
    s10: "豊かな自然の中での全人教育が、お子さまの心と知性をバランスよく育ててくれそうです。",
    s11: "理系教育とICTを軸にした実践的な学びが、お子さまの可能性を広げてくれるでしょう。",
    s12: "音楽教育の伝統とグローバルな視野が融合した環境で、お子さまの表現力が輝きそうです。",
    s13: "自調自考の精神とグローバルな視野が、お子さまの探究力を大きく伸ばしてくれるでしょう。",
    s14: "規律ある教育の中で、高い学力と豊かな人間性がバランスよく育まれる環境です。",
    s15: "集中力と努力の精神を大切にする環境が、お子さまの確かな学力を支えてくれるでしょう。",
    s16: "個別最適な学びの環境が、お子さま一人ひとりの探究心と創造力を最大限に引き出してくれます。",
    s17: "国際バカロレアの理念を取り入れた探究型教育が、お子さまの世界を広げてくれるでしょう。",
    s18: "PBL型授業と21世紀型教育が、お子さまの主体的な学びの力を育ててくれそうです。",
    s19: "温かな校風の中で文武両道を実践する環境が、お子さまの人間力を豊かに育ててくれるでしょう。",
    s20: "芸術と学力を両立させる教育方針が、お子さまの感性と知性をバランスよく伸ばしてくれそうです。",
  };

  if (schoolSpecificOpeners[school.id]) {
    comments.push(schoolSpecificOpeners[school.id]);
  }

  // 伸ばしたい能力に基づくコメント
  const growthComments: Record<string, string> = {
    exploration: "探究力を伸ばしたいというご希望に、この学校の探究型カリキュラムがしっかり応えてくれるでしょう。",
    global: "国際力を育みたいというお気持ちに、グローバルな学びの機会が豊富なこの環境はぴったりです。",
    science: "理系の力を伸ばしたいお子さまにとって、充実した実験・研究環境が大きな魅力となるでしょう。",
    expression: "表現力を磨きたいというご希望に、発表やプレゼンの機会が多いこの学校は理想的です。",
    digital: "デジタルスキルを伸ばしたいお子さまに、先進的なICT環境が力強い味方になってくれます。",
    selfDrive: "自走力を育みたいというお気持ちに、自主性を重んじるこの学校の教育方針が合っています。",
    collaboration: "協働力を伸ばしたいお子さまにとって、チームで学ぶ機会が豊富なこの環境は最適です。",
    humanPower: "豊かな人間力を育みたいというご希望に、教養と礼節を大切にするこの学校の伝統が応えてくれます。",
  };

  // 伸ばしたい能力のうち、学校の特徴と合致するものをコメントに追加
  if (input.desiredGrowth.length > 0) {
    const matchedGrowth = input.desiredGrowth.find(g => growthComments[g]);
    if (matchedGrowth) {
      comments.push(growthComments[matchedGrowth]);
    }
  }

  // 現在の適性に基づくコメント
  const strengthComments: { score: number; comment: string }[] = [];
  if (input.currentStrengths.includes("exploration") && school.explorationLevel >= 4) {
    strengthComments.push({ score: school.explorationLevel, comment: "お子さまの探究心の強さが、この学校の学びの文化と見事に調和しています。" });
  }
  if (input.currentStrengths.includes("independence") && school.selfDriveLevel >= 4) {
    strengthComments.push({ score: school.selfDriveLevel, comment: "自立心のあるお子さまが、のびのびと才能を発揮できる環境が整っています。" });
  }
  if (input.currentStrengths.includes("creativity") && school.expressionLevel >= 4) {
    strengthComments.push({ score: school.expressionLevel, comment: "創造力豊かなお子さまの個性が、この学校で大きく花開くことでしょう。" });
  }
  if (input.currentStrengths.includes("sociability") && school.collaborationLevel >= 4) {
    strengthComments.push({ score: school.collaborationLevel, comment: "社交性のあるお子さまが、多様な仲間と切磋琢磨できる環境です。" });
  }

  strengthComments.sort((a, b) => b.score - a.score);
  const attrIndex = Math.min(rank - 1, strengthComments.length - 1);
  if (strengthComments.length > 0 && attrIndex >= 0) {
    comments.push(strengthComments[attrIndex].comment);
  }

  if (comments.length === 0) {
    comments.push(
      "お子さまの個性と可能性が、この学校の教育環境の中で新たな輝きを見せるかもしれません。"
    );
  }

  return comments.slice(0, 2).join("\n");
}

export function calculateScores(input: DiagnosisInput): SchoolScore[] {
  // Filter by coed preference
  let filteredSchools = schools;
  if (input.coedPreference !== "こだわらない") {
    filteredSchools = schools.filter(
      (s) => s.coed === input.coedPreference
    );
    if (filteredSchools.length < 3) {
      filteredSchools = schools;
    }
  }

  const scored: SchoolScore[] = filteredSchools.map((school) => {
    const deviationScore = calculateDeviationScore(input, school);
    const styleScore = calculateStyleScore(input, school);
    const explorationScore = calculateAttributeScore(
      input.explorationPower,
      school.explorationLevel
    );
    const passionScore = calculateAttributeScore(
      input.passionLevel,
      school.passionLevel
    );
    const selfDriveScore = calculateAttributeScore(
      input.selfDrive,
      school.selfDriveLevel
    );
    const futureScore = calculateAttributeScore(
      input.futureOrientation,
      school.futureOrientation
    );
    const techScore = calculateAttributeScore(
      Math.max(input.futureOrientation, input.explorationPower),
      Math.max(school.aiEducationLevel, school.digitalEnvironment)
    );
    const strengthMatchScore = calculateStrengthMatch(input.currentStrengths, school);
    const growthMatchScore = calculateGrowthMatch(input.desiredGrowth, school);

    // Weighted total - 適性と成長希望を重視
    const totalScore =
      deviationScore * 0.20 +
      styleScore * 0.10 +
      explorationScore * 0.10 +
      passionScore * 0.05 +
      selfDriveScore * 0.05 +
      futureScore * 0.05 +
      techScore * 0.10 +
      strengthMatchScore * 0.15 +
      growthMatchScore * 0.20;

    return {
      school,
      totalScore: Math.round(totalScore * 10) / 10,
      deviationScore,
      styleScore,
      explorationScore,
      passionScore,
      selfDriveScore,
      futureScore,
      techScore,
      strengthMatchScore,
      growthMatchScore,
      matchComment: "",
    };
  });

  scored.sort((a, b) => b.totalScore - a.totalScore);

  const top3 = scored.slice(0, 3);
  top3.forEach((item, index) => {
    item.matchComment = generateMatchComment(input, item.school, index + 1);
  });

  return top3;
}
