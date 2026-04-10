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
  // 独自の強み・特色プログラム
  uniqueStrengths: { icon: string; title: string; detail: string }[];
  signaturePrograms: { name: string; description: string }[];
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
    uniqueStrengths: [
      { icon: "🔍", title: "自調自考の探究教育", detail: "生徒が自ら課題を設定し、調査・考察する独自の探究プログラムで、主体的な学びの姿勢を育成" },
      { icon: "🌍", title: "グローバルリーダー育成", detail: "海外研修・模擬国連・英語ディベートなど、国際舞台で活躍できる力を養う多彩なプログラム" },
      { icon: "💻", title: "先端ICT環境", detail: "1人1台端末とクラウド環境を活用した、デジタルネイティブ世代に最適な学習基盤" },
    ],
    signaturePrograms: [
      { name: "自調自考論文", description: "中3で全員が取り組む卒業研究論文。テーマ設定から発表まで一貫して自分の力で完成させる" },
      { name: "模擬国連プログラム", description: "全米模擬国連大会への参加実績多数。英語力と国際的視野を同時に鍛える" },
    ],
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
    uniqueStrengths: [
      { icon: "🔬", title: "本格サイエンス教育", detail: "大学レベルの実験設備を備え、医進・サイエンスコースでは研究者と連携した本格的な探究活動を実施" },
      { icon: "💻", title: "最先端ICT活用", detail: "全生徒がChromebookを持ち、Google Workspaceを活用したクラウドベースの協働学習を日常的に実践" },
      { icon: "🌐", title: "インターナショナルコース", detail: "ネイティブ教員による英語イマージョン教育で、帰国生・国際生と共に学ぶ多文化環境" },
    ],
    signaturePrograms: [
      { name: "医進・サイエンスコース", description: "大学・研究機関と連携した高度な理系教育。生徒が自ら研究テーマを設定し論文を執筆" },
      { name: "STEAM教育プログラム", description: "テクノロジーとアートを融合させた創造的な学びで、未来のイノベーターを育成" },
    ],
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
    uniqueStrengths: [
      { icon: "🧪", title: "探究型PBL授業", detail: "全教科でPBL（課題解決型学習）を導入し、教科横断的な「問い」から深い学びを実現" },
      { icon: "🌍", title: "真のグローバル教育", detail: "インターナショナルクラスでは授業の大半を英語で実施。多国籍の教員陣による本物の国際教育" },
      { icon: "🎨", title: "STEAM×探究の融合", detail: "サイエンス・テクノロジー・アートを横断する独自のSTEAM教育で創造的思考力を育成" },
    ],
    signaturePrograms: [
      { name: "基礎ゼミナール", description: "中1から始まる探究の基礎。問いの立て方・情報収集・論理的思考を段階的に習得" },
      { name: "メディアラボ", description: "最新のデジタル機器を活用した表現活動。映像制作やプログラミングを通じて発信力を磨く" },
    ],
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
    uniqueStrengths: [
      { icon: "🏛️", title: "知的自由の伝統", detail: "「ペンは剣よりも強し」の校訓のもと、生徒の知的好奇心を制限せず自由に伸ばす教育哲学" },
      { icon: "🎌", title: "名物・運動会", detail: "中高合同の大規模運動会は生徒が企画運営。リーダーシップと協働力を実践的に育む学校行事" },
      { icon: "📚", title: "圧倒的な進学実績", detail: "東大合格者数日本一を誇る学力育成力。切磋琢磨する仲間との出会いが最大の財産" },
    ],
    signaturePrograms: [
      { name: "開成運動会", description: "中1から高3まで縦割り8組で競う伝統行事。企画・運営を生徒が主導し、リーダーシップを育む" },
      { name: "自主的な部活動・同好会", description: "100以上の部活・同好会が活動。学問系からスポーツまで、生徒の多様な興味を支える環境" },
    ],
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
    uniqueStrengths: [
      { icon: "🎓", title: "最高水準の学力育成", detail: "女子校トップの進学実績を支える質の高い授業と、自ら学ぶ姿勢を重視した教育方針" },
      { icon: "🎎", title: "礼法教育", detail: "茶道・華道を通じた日本の伝統文化教育で、品格と教養を兼ね備えた女性を育成" },
      { icon: "🔬", title: "理系女子の育成", detail: "理系進学率が高く、実験・観察を重視した理科教育で科学的思考力を養う" },
    ],
    signaturePrograms: [
      { name: "礼法の授業", description: "週1回の礼法の時間で、日本の伝統的な作法と心構えを6年間かけて身につける" },
      { name: "理科実験プログラム", description: "充実した実験設備で、仮説検証型の本格的な理科実験を多数実施" },
    ],
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
    uniqueStrengths: [
      { icon: "🔭", title: "本物に触れる教育", detail: "標本室・天文台・植物園を備え、「本物に触れる」体験を通じて深い知的好奇心を育む" },
      { icon: "📝", title: "少人数ゼミ形式", detail: "1学年160名の少人数制で、教員と生徒が密に対話しながら学ぶゼミナール形式の授業" },
      { icon: "🌿", title: "自然豊かなキャンパス", detail: "武蔵野の自然に囲まれた広大なキャンパスで、五感を使った学びを日常的に体験" },
    ],
    signaturePrograms: [
      { name: "第二外国語必修", description: "中1から英語に加え、ドイツ語・フランス語・中国語・韓国語から1つを必修で学ぶ" },
      { name: "総合講座", description: "教科の枠を超えた独自のテーマ学習。生徒が主体的に調べ、考え、発表する探究の場" },
    ],
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
    uniqueStrengths: [
      { icon: "🎓", title: "一貫教育の安心感", detail: "大学までの一貫教育で受験に縛られず、幅広い教養と人間力をじっくり育てる環境" },
      { icon: "🤝", title: "多様性と人間力", detail: "様々な背景を持つ仲間との交流を通じて、社会性・コミュニケーション力・リーダーシップを養う" },
      { icon: "🎭", title: "充実した課外活動", detail: "文化祭・体育祭・修学旅行など、生徒主体の行事が豊富で、企画力と実行力を育成" },
    ],
    signaturePrograms: [
      { name: "労作展", description: "全生徒が1年かけて取り組む自由研究・制作の展覧会。テーマ設定から完成まで自分の力で挑む" },
      { name: "慶應連携プログラム", description: "大学の施設・教員を活用した特別授業や研究体験で、高度な学びに早期から触れる機会を提供" },
    ],
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
    uniqueStrengths: [
      { icon: "💭", title: "自由と教養の文化", detail: "校則がほぼなく、生徒の自主性を最大限に尊重。自由の中で自ら考え行動する力を育む" },
      { icon: "📖", title: "深い議論の文化", detail: "授業中の活発な議論を重視し、多角的な視点から物事を考える力と表現力を鍛える" },
      { icon: "🎪", title: "文化祭の伝統", detail: "3日間で1万人以上が来場する文化祭は、生徒が全て企画運営。創造力と実行力の集大成" },
    ],
    signaturePrograms: [
      { name: "教養総合", description: "教科横断型の独自科目。哲学・社会学・科学など多分野のテーマを深く掘り下げる" },
      { name: "麻布文化祭", description: "中1から高3まで全校で取り組む最大の学校行事。展示・公演・研究発表など多彩な表現の場" },
    ],
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
    uniqueStrengths: [
      { icon: "✝️", title: "キリスト教に基づく自由教育", detail: "「自分で考え、自分で決める」を大切にし、校則に頼らず生徒の内面的な成長を促す" },
      { icon: "📚", title: "幅広い教養教育", detail: "文理を問わず幅広い科目を学び、バランスの取れた知性と教養を身につける6年間" },
      { icon: "🎤", title: "発信力の育成", detail: "プレゼンテーション・ディベート・論文執筆など、自分の考えを発信する機会が豊富" },
    ],
    signaturePrograms: [
      { name: "聖書の授業", description: "週1回の聖書の時間で、生き方や価値観について深く考える機会を提供" },
      { name: "マグノリア祭", description: "生徒主体で企画運営する文化祭。学術研究発表から芸術作品まで、個性豊かな表現の場" },
    ],
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
    uniqueStrengths: [
      { icon: "⛪", title: "カトリック全人教育", detail: "「Men for Others, with Others」の精神のもと、他者への奉仕と共生の心を育む教育" },
      { icon: "🏔️", title: "鎌倉の自然環境", detail: "緑豊かな鎌倉の丘陵地に位置し、自然と共に学ぶ恵まれた教育環境" },
      { icon: "👥", title: "少人数の温かな学び", detail: "1学年180名の少人数制で、教員と生徒の距離が近く、きめ細やかな指導を実現" },
    ],
    signaturePrograms: [
      { name: "歩く大会", description: "鎌倉から箱根まで約50kmを歩く伝統行事。忍耐力と仲間との絆を深める" },
      { name: "奉仕活動プログラム", description: "地域のボランティア活動を通じて、社会貢献の精神と実践力を育む" },
    ],
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
    uniqueStrengths: [
      { icon: "🔬", title: "理系教育の充実", detail: "大学との連携による本格的な理系教育。実験・観察を重視し、科学的思考力を育成" },
      { icon: "💻", title: "ICT先進校", detail: "全教室に電子黒板を設置し、タブレットを活用した双方向型授業を展開" },
      { icon: "🌐", title: "グローバルプログラム", detail: "ニュージーランド・カナダへの海外研修やオンライン英会話で実践的な英語力を養成" },
    ],
    signaturePrograms: [
      { name: "科学実験プログラム", description: "大学の研究室と連携した本格的な実験授業。中学生から研究の面白さに触れる" },
      { name: "キャリアスタディ", description: "企業訪問・職業体験を通じて、将来のキャリアを主体的に考える力を育む" },
    ],
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
    uniqueStrengths: [
      { icon: "🎵", title: "音楽教育の伝統", detail: "音楽大学を併設する学園ならではの本格的な音楽教育。感性と表現力を豊かに育む" },
      { icon: "🌍", title: "グローバル教育の充実", detail: "多彩な海外研修プログラムと校内での国際交流で、世界で通用する力を養成" },
      { icon: "💡", title: "探究型学習", detail: "全教科で「問い」を大切にする授業設計。自ら考え、表現する力を段階的に育成" },
    ],
    signaturePrograms: [
      { name: "洗足フィルハーモニー", description: "全校生徒によるオーケストラ活動。音楽を通じた協働と表現力の育成" },
      { name: "海外研修プログラム", description: "アメリカ・イギリス・オーストラリアなど多方面への研修で、異文化理解と英語力を強化" },
    ],
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
    uniqueStrengths: [
      { icon: "🔍", title: "自調自考の深い探究", detail: "渋谷教育学園の教育理念「自調自考」を軸に、生徒が自ら問いを立て深く探究する文化" },
      { icon: "🌐", title: "世界水準の国際教育", detail: "ハーバード・イェールなど海外名門大学への進学実績。模擬国連でも世界的な活躍" },
      { icon: "📊", title: "データサイエンス教育", detail: "統計・プログラミングを活用したデータ分析の授業で、未来社会に必要なスキルを育成" },
    ],
    signaturePrograms: [
      { name: "自調自考論文", description: "高2で全員が取り組む1万字以上の研究論文。テーマ設定から発表まで自力で完成させる" },
      { name: "海外大学進学支援", description: "専門カウンセラーによるサポート体制で、海外名門大学への進学を強力にバックアップ" },
    ],
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
    uniqueStrengths: [
      { icon: "⛪", title: "カトリック精神の教育", detail: "「紳士たれ」の校訓のもと、高い学力と品格を兼ね備えた人間を育成する伝統校" },
      { icon: "📈", title: "神奈川トップの進学力", detail: "東大・医学部への高い合格実績を支える、体系的で質の高い授業カリキュラム" },
      { icon: "🎯", title: "きめ細やかな学習指導", detail: "放課後の補習・質問対応が充実し、一人ひとりの学力を確実に伸ばすサポート体制" },
    ],
    signaturePrograms: [
      { name: "聖光塾", description: "放課後の発展的学習プログラム。大学入試を見据えた高度な内容を段階的に学ぶ" },
      { name: "選択芸術プログラム", description: "音楽・美術・書道から選択し、感性と教養を育む。文化祭での発表が目標" },
    ],
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
    uniqueStrengths: [
      { icon: "🧵", title: "運針の精神", detail: "毎朝5分間の運針で集中力と忍耐力を養う伝統。この精神が全ての学びの基盤となる" },
      { icon: "📊", title: "理系教育の強さ", detail: "理系進学率が高く、数学・理科の授業時間を多く確保。女子の理系進学を強力に支援" },
      { icon: "🎯", title: "確実な学力向上", detail: "小テスト・補習・質問教室など、学力を着実に積み上げるきめ細やかな指導体制" },
    ],
    signaturePrograms: [
      { name: "毎朝の運針", description: "5分間、白い布に赤い糸で一針一針縫う。集中力・忍耐力・丁寧さを毎日鍛える" },
      { name: "桃李祭（文化祭）", description: "学術研究発表からパフォーマンスまで、生徒の多彩な才能が開花する学園最大の行事" },
    ],
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
    uniqueStrengths: [
      { icon: "🎯", title: "ドルトンプランの個別最適学習", detail: "一人ひとりの興味・関心・学習ペースに合わせた個別最適な学びを実現する革新的教育法" },
      { icon: "🏠", title: "ハウス制度", detail: "異学年混合のハウスで日常的に交流。年齢を超えた学び合いとコミュニティ意識を育む" },
      { icon: "🔧", title: "STEAM教育の充実", detail: "ファブラボ・3Dプリンター・レーザーカッターを備えた工房で、ものづくりと創造力を育成" },
    ],
    signaturePrograms: [
      { name: "アサインメント", description: "生徒が自分で学習計画を立て、自分のペースで課題に取り組むドルトンプランの中核" },
      { name: "ラボラトリー", description: "教科横断型の探究活動。生徒が自ら設定したテーマについて深く研究し発表する" },
    ],
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
    uniqueStrengths: [
      { icon: "🌐", title: "国際バカロレア(IB)教育", detail: "MYP認定校として、IBの教育理念に基づいた探究型・概念型の授業を全教科で展開" },
      { icon: "🗣️", title: "多言語教育", detail: "英語に加え、第二外国語も学べる環境。多言語・多文化理解を通じてグローバル人材を育成" },
      { icon: "🤔", title: "哲学対話の実践", detail: "「考えることを考える」哲学対話を通じて、批判的思考力と対話力を育む独自のプログラム" },
    ],
    signaturePrograms: [
      { name: "IBプログラム（MYP）", description: "国際バカロレアの中等教育プログラム。概念理解と探究を軸にした世界水準の教育" },
      { name: "パーソナルプロジェクト", description: "MYPの集大成として、生徒が自ら設定したテーマで長期的な研究・制作に取り組む" },
    ],
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
    uniqueStrengths: [
      { icon: "🌱", title: "21世紀型PBL教育", detail: "全教科でPBL（課題解決型学習）を導入し、「考え、議論し、表現する」力を育成" },
      { icon: "🌍", title: "インターナショナルな環境", detail: "ネイティブ教員による英語イマージョン教育と、多文化共生を体験できる学校環境" },
      { icon: "💡", title: "STEAM教育", detail: "理数系教育とアート・デザインを融合させた創造的な学びで、イノベーション力を育成" },
    ],
    signaturePrograms: [
      { name: "PBL型授業", description: "実社会の課題をテーマに、チームで調査・分析・提案を行う実践的な学びのスタイル" },
      { name: "グローバルスタディーズ", description: "海外の学校とのオンライン交流や短期留学で、実践的な国際コミュニケーション力を養成" },
    ],
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
    uniqueStrengths: [
      { icon: "🙏", title: "仏教精神の温かな校風", detail: "浄土宗の教えに基づく「共生（ともいき）」の精神で、思いやりと協調性を育む温かな環境" },
      { icon: "⚽", title: "文武両道の実践", detail: "部活動が盛んで、学業との両立を重視。心身ともにバランスの取れた成長を支援" },
      { icon: "🏫", title: "面倒見の良さ", detail: "教員と生徒の距離が近く、一人ひとりに寄り添った丁寧な指導が評判の伝統校" },
    ],
    signaturePrograms: [
      { name: "芝温泉（文化祭）", description: "ユニークな名称の文化祭は来場者数も多く、生徒の自主性と創造力が発揮される場" },
      { name: "宗教の時間", description: "仏教の教えを通じて、命の大切さや他者への思いやりについて深く考える機会を提供" },
    ],
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
    uniqueStrengths: [
      { icon: "🎨", title: "芸術教育の充実", detail: "美術・音楽・書道の授業時間が豊富で、感性と表現力を磨く独自のカリキュラム" },
      { icon: "📚", title: "自主性を重んじる教育", detail: "「自分の頭で考え、自分の言葉で表現する」ことを大切にし、主体的な学びの姿勢を育成" },
      { icon: "⚖️", title: "文理バランスの進学力", detail: "文系・理系ともに高い進学実績。生徒の多様な進路希望に応える充実した教育体制" },
    ],
    signaturePrograms: [
      { name: "吉祥祭（文化祭）", description: "クラス展示・部活発表・研究発表など、生徒の多彩な個性が輝く学園最大のイベント" },
      { name: "カナダ語学研修", description: "希望者対象のカナダ研修で、ホームステイと現地校体験を通じた実践的な英語力向上" },
    ],
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
