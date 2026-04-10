/**
 * CSV→schoolData.ts 生成スクリプト
 * Usage: node scripts/build-school-data.js
 */
const fs = require('fs');
const path = require('path');

// Read CSV
const csvPath = path.join(__dirname, '..', 'school-data-150-full.csv');
const csvText = fs.readFileSync(csvPath, 'utf-8');
const lines = csvText.trim().split('\n');
const header = lines[0].split(',');

// Parse CSV (handles quoted fields with commas)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length < 2) continue;
  rows.push({
    id: cols[0],
    name: cols[1],
    area: cols[2],
    prefecture: cols[3],
    coed: cols[4],
    address: cols[5],
    nearestStation: cols[6],
    walkMinutes: cols[7],
    sapixMin: parseInt(cols[8]),
    sapixMax: parseInt(cols[9]),
    yotsuyaMin: parseInt(cols[10]),
    yotsuyaMax: parseInt(cols[11]),
    schoolStyle: cols[12],
    explorationLevel: parseInt(cols[13]),
    aiEducationLevel: parseInt(cols[14]),
    digitalEnvironment: parseInt(cols[15] || cols[14]),
    futureOrientation: parseInt(cols[16]),
    passionLevel: parseInt(cols[17]),
    selfDriveLevel: parseInt(cols[18]),
    expressionLevel: parseInt(cols[19]),
    collaborationLevel: parseInt(cols[20]),
    commuteAreas: cols[21] ? cols[21].split(',').map(s => s.trim()) : [],
    features: cols[22] ? cols[22].split(',').map(s => s.trim()) : [],
  });
}

// Existing s01-s20 data (uniqueStrengths, signaturePrograms, description)
const existingData = {
  s001: {
    description: "自調自考を教育理念に掲げ、生徒の自主性と探究心を最大限に伸ばす環境が整っています。",
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
  s002: {
    description: "最先端のICT環境とサイエンス教育で、未来を切り拓く力を育む先進的な学校です。",
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
  s003: {
    description: "「発想の自由人」を育てることを目指し、探究型学習とグローバル教育を融合させた革新的な教育を展開しています。",
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
  s004: {
    description: "「ペンは剣よりも強し」の精神のもと、自由な校風で生徒の知的好奇心と自立心を育てます。",
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
  s005: {
    description: "礼と学びの調和を大切にし、確かな学力と豊かな人間性を兼ね備えた女性を育成します。",
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
  s006: {
    description: "「自ら調べ自ら考える」を重視し、少人数教育で一人ひとりの知的探究心を深く育てます。",
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
  s007: {
    description: "「独立自尊」の精神を基盤に、幅広い教養と社会性を育む一貫教育を提供します。",
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
  s008: {
    description: "自由闊達な校風のもと、深い教養と独自の視点を持つ人間を育てる伝統校です。",
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
  s009: {
    description: "キリスト教精神に基づく自由な教育で、自ら考え行動できる女性を育てます。",
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
  s010: {
    description: "鎌倉の豊かな自然の中で、カトリック精神に基づいた全人教育を実践しています。",
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
  s011: {
    description: "理系教育とICTを軸に、探究心と実践力を育む教育環境を提供しています。",
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
  s012: {
    description: "音楽教育の伝統を持ちながら、グローバルな視野と探究力を育む先進的な女子校です。",
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
  s013: {
    description: "自調自考の精神を基盤に、グローバルな視野と深い探究力を育む千葉の名門校です。",
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
  s014: {
    description: "カトリック精神に基づく規律ある教育で、高い学力と豊かな人間性を育てます。",
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
  s015: {
    description: "毎朝の運針に象徴される集中力と努力の精神で、確かな学力を育てる女子校です。",
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
  s016: {
    description: "ドルトンプランに基づく個別最適な学びで、一人ひとりの探究心と創造力を最大限に引き出します。",
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
  s017: {
    description: "国際バカロレア（IB）の理念を取り入れた探究型教育で、世界で活躍できる人材を育成します。",
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
  s018: {
    description: "PBL型授業と21世紀型教育で、主体的に学び、社会に貢献できる人材を育成します。",
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
  s019: {
    description: "仏教精神に基づく温かな校風の中で、文武両道を実践する伝統ある男子校です。",
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
  s020: {
    description: "芸術教育と学力向上を両立させ、自主性と感性豊かな女性を育てる学校です。",
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
};

// Feature-based auto-generation for new schools
function generateDescription(row) {
  const f = row.features;
  const style = row.schoolStyle;
  const coed = row.coed;

  const typeStr = coed === "男子校" ? "男子校" : coed === "女子校" ? "女子校" : "学校";

  if (f.includes("大学附属")) return `大学附属ならではの一貫教育で、受験にとらわれない幅広い教養と人間力を育む${typeStr}です。`;
  if (f.includes("公立")) return `公立ならではの多様性と充実した探究教育で、確かな学力と主体性を育む学校です。`;
  if (f.includes("国立")) return `国立校ならではの先進的な教育研究と自由な学びの環境で、高い知性と探究力を育む学校です。`;
  if (f.includes("探究") && f.includes("国際")) return `探究型学習と国際教育を両輪に、グローバル社会で活躍できる力を育む${typeStr}です。`;
  if (f.includes("探究") && f.includes("STEAM")) return `探究学習とSTEAM教育を融合させ、創造力と科学的思考力を育む${typeStr}です。`;
  if (f.includes("探究") && f.includes("PBL")) return `PBL型の探究学習を通じて、主体的に課題を発見し解決する力を育む${typeStr}です。`;
  if (f.includes("探究")) return `探究型の学びを大切にし、生徒一人ひとりの知的好奇心を伸ばす${typeStr}です。`;
  if (f.includes("理系") && f.includes("STEAM")) return `理系教育とSTEAM教育に力を入れ、科学的思考力と創造力を育む${typeStr}です。`;
  if (f.includes("理系") && f.includes("ICT")) return `理系教育とICT環境を活かし、テクノロジーに強い人材を育成する${typeStr}です。`;
  if (f.includes("理系") && f.includes("サイエンス")) return `本格的なサイエンス教育で、科学への情熱と論理的思考力を育む${typeStr}です。`;
  if (f.includes("理系")) return `理系教育に定評があり、科学的な思考力と実践力を伸ばす${typeStr}です。`;
  if (f.includes("ICT") && f.includes("プログラミング")) return `ICT教育とプログラミングに注力し、デジタル時代を切り拓く力を育む${typeStr}です。`;
  if (f.includes("ICT")) return `先進的なICT環境を活かした教育で、未来を生き抜く力を育む${typeStr}です。`;
  if (f.includes("カトリック") || f.includes("キリスト教")) return `キリスト教の教えに基づく教育で、豊かな人間性と確かな学力を育む${typeStr}です。`;
  if (f.includes("仏教")) return `仏教精神に基づく温かな教育で、心の成長と学力向上を両立する${typeStr}です。`;
  if (f.includes("国際") && f.includes("帰国生")) return `帰国生の受け入れ体制が充実し、多文化共生の中でグローバルな力を育む${typeStr}です。`;
  if (f.includes("国際")) return `国際教育に力を入れ、英語力と異文化理解力を育む${typeStr}です。`;
  if (f.includes("自由")) return `自由な校風のもとで生徒の自主性を尊重し、個性豊かな人間を育てる${typeStr}です。`;
  if (f.includes("進学実績") && f.includes("文武両道")) return `高い進学実績と文武両道を両立し、バランスの取れた人材を育成する${typeStr}です。`;
  if (f.includes("進学実績")) return `確かな進学実績に裏打ちされた教育力で、生徒の可能性を最大限に引き出す${typeStr}です。`;
  if (f.includes("伝統") && f.includes("教養")) return `伝統と教養を大切にし、豊かな人間性と確かな学力を育む${typeStr}です。`;
  if (f.includes("文武両道")) return `文武両道を重視し、学業と部活動の両立を通じてたくましい人間を育てる${typeStr}です。`;
  if (f.includes("少人数")) return `少人数教育できめ細やかな指導を実現し、一人ひとりの成長を支える${typeStr}です。`;
  if (f.includes("スポーツ")) return `スポーツと学業の両立を大切にし、心身ともにたくましい人間を育てる${typeStr}です。`;
  if (style === "自由") return `自由な校風の中で個性を伸ばし、主体的に学ぶ力を育む${typeStr}です。`;
  if (style === "規律") return `規律ある教育環境の中で、確かな学力と礼節を身につける${typeStr}です。`;
  return `バランスの取れた教育で、生徒一人ひとりの個性と可能性を伸ばす${typeStr}です。`;
}

// Icon pool by feature category
const iconsByCategory = {
  探究: ["🔍", "🧪", "📝"],
  国際: ["🌍", "🌐", "✈️"],
  理系: ["🔬", "⚗️", "🧬"],
  ICT: ["💻", "📱", "🖥️"],
  STEAM: ["🔧", "⚙️", "🛠️"],
  サイエンス: ["🔬", "🧪", "🌡️"],
  進学実績: ["📈", "🎓", "📊"],
  伝統: ["🏛️", "📜", "🎎"],
  教養: ["📚", "📖", "🎭"],
  自由: ["🕊️", "🌈", "💫"],
  自主性: ["🚀", "💪", "⭐"],
  文武両道: ["⚽", "🏃", "🎯"],
  カトリック: ["⛪", "✝️", "🕊️"],
  キリスト教: ["⛪", "✝️", "🕊️"],
  仏教: ["🙏", "🪷", "☸️"],
  PBL: ["💡", "🧩", "🎯"],
  バランス: ["⚖️", "🎯", "📊"],
  温かさ: ["🤗", "🏫", "💝"],
  少人数: ["👥", "🏫", "📝"],
  自然: ["🌿", "🏔️", "🌳"],
  音楽: ["🎵", "🎶", "🎼"],
  芸術: ["🎨", "🖌️", "🎭"],
  グローバル: ["🌍", "🌐", "✈️"],
  大学附属: ["🎓", "🏫", "📚"],
  公立: ["🏫", "📝", "🎯"],
  スポーツ: ["⚽", "🏃", "🏆"],
  規律: ["📏", "🎯", "📋"],
  新設校: ["🌱", "✨", "🆕"],
  留学: ["✈️", "🌍", "🌐"],
  ものづくり: ["🔧", "⚙️", "🛠️"],
  医進: ["🏥", "🩺", "💊"],
  フランス語: ["🇫🇷", "🗣️", "📖"],
  ドイツ語: ["🇩🇪", "🗣️", "📖"],
  礼法: ["🎎", "🏛️", "📜"],
  英語: ["🗣️", "📖", "🌐"],
  特待: ["🏆", "⭐", "📈"],
  園芸: ["🌱", "🌻", "🌿"],
};

function getIconForFeature(feature) {
  const icons = iconsByCategory[feature] || ["📌", "⭐", "💎"];
  return icons[Math.floor(Math.random() * icons.length)];
}

function generateUniqueStrengths(row) {
  const f = row.features;
  const strengths = [];
  const usedIcons = new Set();

  // Feature-based strength generation templates
  const strengthTemplates = {
    探究: { title: "探究型学習の充実", detail: "生徒が自ら問いを立て、調査・分析・発表する探究学習で主体的な学びの力を育成" },
    国際: { title: "国際教育プログラム", detail: "海外研修や異文化交流を通じて、グローバルな視野と実践的な英語力を養成" },
    理系: { title: "理系教育の充実", detail: "充実した実験設備と体系的なカリキュラムで、科学的思考力と探究心を育成" },
    ICT: { title: "先進的ICT教育", detail: "1人1台端末とICT環境を活かした双方向型授業で、デジタルリテラシーを育成" },
    STEAM: { title: "STEAM教育の実践", detail: "科学・技術・工学・アート・数学を横断する学びで、創造力と問題解決力を養成" },
    サイエンス: { title: "本格サイエンス教育", detail: "大学や研究機関と連携した本格的な科学教育で、研究者マインドを育む" },
    進学実績: { title: "確かな進学実績", detail: "体系的な学習指導と充実したサポート体制で、生徒の目標達成を力強く後押し" },
    伝統: { title: "伝統校の教育力", detail: "長年の教育実績に裏打ちされた指導ノウハウで、確かな学力と人間力を育成" },
    教養: { title: "幅広い教養教育", detail: "文理の枠を超えた幅広い学びで、豊かな知性と教養を身につける環境" },
    自由: { title: "自由な校風と自主性", detail: "生徒の自主性を最大限に尊重し、自ら考え行動する力を育む自由闊達な環境" },
    自主性: { title: "自主性を重視する教育", detail: "生徒が自ら考え、判断し、行動する力を育む教育方針で、主体的な学びを実現" },
    文武両道: { title: "文武両道の実践", detail: "学業と部活動の両立を重視し、バランスの取れた成長を支える充実した環境" },
    カトリック: { title: "カトリック精神の教育", detail: "キリスト教の教えに基づく人間教育で、他者への思いやりと奉仕の心を育む" },
    キリスト教: { title: "キリスト教に基づく教育", detail: "キリスト教の精神を土台に、豊かな人間性と他者を思いやる心を育む" },
    仏教: { title: "仏教精神に基づく教育", detail: "仏教の教えを通じて、命の尊さと他者への思いやりを学ぶ心の教育" },
    PBL: { title: "PBL型授業の実践", detail: "実社会の課題に取り組むPBL型授業で、課題発見力と解決力を育成" },
    バランス: { title: "バランスの取れた教育", detail: "学力・人間性・社会性をバランスよく育む、充実した教育プログラム" },
    温かさ: { title: "温かな学校コミュニティ", detail: "教員と生徒の距離が近く、一人ひとりに寄り添った丁寧な指導を実践" },
    少人数: { title: "少人数制のきめ細やかな指導", detail: "少人数クラスで一人ひとりに目が行き届く、きめ細やかな教育を実現" },
    自然: { title: "自然豊かな学習環境", detail: "緑豊かなキャンパスで、自然と触れ合いながら豊かな感性と学びを育む" },
    大学附属: { title: "大学附属校の一貫教育", detail: "大学までの一貫教育で受験に縛られず、幅広い教養と人間力をじっくり育成" },
    グローバル: { title: "グローバル教育の推進", detail: "海外研修や国際交流プログラムを通じて、世界で活躍できる力を養成" },
    公立: { title: "公立校ならではの教育", detail: "多様な生徒が集う公立校で、社会性と協調性を育みながら高い学力を実現" },
    音楽: { title: "充実した音楽教育", detail: "本格的な音楽教育を通じて、感性と表現力、協調性を豊かに育む" },
    芸術: { title: "芸術教育の充実", detail: "美術・音楽などの芸術教育で、豊かな感性と創造力を育む環境" },
    スポーツ: { title: "充実したスポーツ環境", detail: "充実した運動施設と指導体制で、心身の成長を支えるスポーツ教育" },
    規律: { title: "規律ある学習環境", detail: "規律を大切にする教育で、集中力と自律心を養い、確かな学力を育成" },
    新設校: { title: "新しい教育への挑戦", detail: "従来の枠にとらわれない新しい教育モデルで、未来を切り拓く力を育成" },
    医進: { title: "医学部進学サポート", detail: "医学部進学に特化したカリキュラムと指導体制で、将来の医療人を育成" },
    ものづくり: { title: "ものづくり教育", detail: "実際に手を動かすものづくり体験を通じて、創造力と技術力を育む" },
    礼法: { title: "礼法教育の伝統", detail: "日本の伝統的な礼法を学び、品格と教養を兼ね備えた人間性を育成" },
    園芸: { title: "園芸教育プログラム", detail: "植物を育てる体験を通じて、生命への敬意と忍耐力、観察力を育む" },
    帰国生: { title: "帰国生の受け入れ体制", detail: "帰国生の経験を活かし、多文化共生の中で互いに学び合う環境" },
    フランス語: { title: "フランス語教育", detail: "英語に加えフランス語を学び、多言語・多文化への理解を深める環境" },
    ドイツ語: { title: "ドイツ語教育", detail: "英語に加えドイツ語を学び、ヨーロッパ文化への理解を深める教育" },
    英語: { title: "英語教育の充実", detail: "ネイティブ教員や多彩なプログラムで、実践的な英語力を育む環境" },
    留学: { title: "留学プログラム", detail: "海外留学の機会を提供し、異文化の中で生きた語学力と国際感覚を養成" },
    ESD: { title: "ESD（持続可能な開発教育）", detail: "地球規模の課題を学び、持続可能な社会の担い手を育てる教育" },
    フィールドワーク: { title: "フィールドワーク学習", detail: "教室を飛び出し、現地調査や体験学習を通じて実践的な学びを深める" },
    IB: { title: "国際バカロレア教育", detail: "IBの理念に基づく探究型カリキュラムで、世界水準の学力と思考力を育成" },
    AL: { title: "アクティブラーニング", detail: "対話的・協働的な学びを通じて、主体的に考え表現する力を育成" },
    EGG: { title: "EGGプログラム", detail: "独自の探究プログラムで、課題発見力と解決力を段階的に育成" },
    道徳: { title: "道徳教育の充実", detail: "豊かな心と正しい判断力を育む道徳教育で、人間としての成長を支援" },
    セルフサイエンス: { title: "セルフサイエンス教育", detail: "自分自身を科学的に理解し、自己成長につなげる独自の教育プログラム" },
    哲学: { title: "哲学教育", detail: "「なぜ？」を大切にする哲学的対話で、深い思考力と自分の言葉で語る力を育成" },
    自走力: { title: "自走力の育成", detail: "自分で目標を立て計画的に学ぶ力を育む教育で、自立した学習者を育成" },
    プログラミング: { title: "プログラミング教育", detail: "実践的なプログラミング教育で、論理的思考力とデジタルスキルを育成" },
    平和: { title: "平和教育", detail: "平和の尊さを学び、世界の平和に貢献できる人間を育てる教育" },
    改革: { title: "教育改革への挑戦", detail: "従来の教育を見直し、新しい時代に必要な力を育む革新的な取り組み" },
    運動会: { title: "運動会の伝統", detail: "生徒主体で運営する伝統の運動会で、リーダーシップと団結力を育成" },
    工藤勇一校長: { title: "校長主導の教育改革", detail: "「自律」を軸とした教育改革で、生徒が主体的に学ぶ環境を構築" },
    医歯薬: { title: "医歯薬系進学サポート", detail: "医歯薬学部への進学を目指す生徒を、きめ細やかな指導で支援" },
    特待: { title: "特待生制度", detail: "優秀な生徒の学びを支援する特待生制度で、意欲ある生徒の成長を後押し" },
    個性: { title: "個性を尊重する教育", detail: "一人ひとりの個性を大切にし、それぞれの強みを伸ばす教育環境" },
    議論: { title: "議論の文化", detail: "授業や課外活動で活発な議論を行い、論理的思考力と表現力を鍛える" },
    人間力: { title: "人間力の育成", detail: "知識だけでなく、社会性・協調性・リーダーシップなど総合的な人間力を育成" },
    多様性: { title: "多様性を活かす教育", detail: "多様なバックグラウンドの生徒が集い、互いの違いを尊重し学び合う環境" },
    本物体験: { title: "本物に触れる体験学習", detail: "本物の素材や環境に触れる体験を重視し、深い理解と感性を育む教育" },
    アメフト: { title: "アメフトの名門", detail: "全国レベルのアメフト部を擁し、スポーツを通じた人間形成にも力を入れる" },
    教育研究: { title: "教育研究の最先端", detail: "国立大学附属校として最先端の教育研究を実践し、新しい学びのモデルを追求" },
    ジェンダー: { title: "ジェンダー教育", detail: "性別にとらわれない多様な生き方を考え、一人ひとりの可能性を広げる教育" },
    海洋教育: { title: "海洋教育プログラム", detail: "海に面した立地を活かし、ヨット実習や海洋調査など本物の海洋体験を提供" },
    皇室: { title: "皇室ゆかりの伝統", detail: "皇室ゆかりの伝統校として、格式ある教育環境で品格と教養を育成" },
    論文: { title: "論文指導の充実", detail: "中学生から論文執筆に取り組み、論理的な文章力と研究力を段階的に育成" },
    実学: { title: "実学重視の教育", detail: "社会で活きる実践的な知識とスキルを重視した、実学志向の教育" },
  };

  const featureOrder = [...f];
  // Ensure we get 3 different strengths
  const added = new Set();
  for (const feat of featureOrder) {
    if (added.size >= 3) break;
    const tmpl = strengthTemplates[feat];
    if (tmpl && !added.has(tmpl.title)) {
      let icon = getIconForFeature(feat);
      while (usedIcons.has(icon)) {
        const pool = iconsByCategory[feat] || ["📌", "⭐", "💎"];
        icon = pool[Math.floor(Math.random() * pool.length)];
        if (pool.every(i => usedIcons.has(i))) { icon = "✨"; break; }
      }
      usedIcons.add(icon);
      strengths.push({ icon, title: tmpl.title, detail: tmpl.detail });
      added.add(tmpl.title);
    }
  }

  // Fill remaining slots
  while (strengths.length < 3) {
    const remaining = Object.keys(strengthTemplates).filter(k => {
      const t = strengthTemplates[k];
      return !added.has(t.title);
    });
    if (remaining.length === 0) break;
    const key = remaining[0];
    const tmpl = strengthTemplates[key];
    let icon = getIconForFeature(key);
    while (usedIcons.has(icon)) {
      icon = "✨";
      break;
    }
    usedIcons.add(icon);
    strengths.push({ icon, title: tmpl.title, detail: tmpl.detail });
    added.add(tmpl.title);
  }

  return strengths;
}

function generateSignaturePrograms(row) {
  const f = row.features;
  const programs = [];

  const programTemplates = {
    探究: [
      { name: "探究学習プログラム", description: "生徒が自らテーマを設定し、調査・分析・発表まで一貫して取り組む主体的な学びの時間" },
    ],
    国際: [
      { name: "国際交流プログラム", description: "海外の姉妹校との交流や短期留学で、異文化理解と実践的な語学力を養成" },
    ],
    理系: [
      { name: "理数教育プログラム", description: "実験・観察を重視した理数教育で、科学的思考力と探究心を段階的に育成" },
    ],
    ICT: [
      { name: "ICT活用学習", description: "タブレットやクラウドツールを日常的に活用し、情報活用力とデジタルスキルを育成" },
    ],
    STEAM: [
      { name: "STEAM教育プログラム", description: "科学・技術・アートを融合した創造的な学びで、イノベーション力を育む" },
    ],
    進学実績: [
      { name: "進学サポートプログラム", description: "個別指導や補習体制を充実させ、生徒一人ひとりの進路目標達成を支援" },
    ],
    PBL: [
      { name: "PBL型授業", description: "実社会の課題をテーマに、チームで調査・分析・提案を行う実践的な学びのスタイル" },
    ],
    文武両道: [
      { name: "部活動プログラム", description: "学業と両立できる充実した部活動環境で、心身の成長とチームワークを育成" },
    ],
    カトリック: [
      { name: "宗教教育プログラム", description: "キリスト教の教えを通じて、生き方や人との関わりについて深く考える時間" },
    ],
    キリスト教: [
      { name: "聖書の学び", description: "聖書を通じて、愛と奉仕の精神を学び、豊かな人間性を育む宗教教育" },
    ],
    仏教: [
      { name: "仏教行事・宗教教育", description: "仏教の教えを通じて、命の尊さと他者への思いやりを学ぶ心の教育" },
    ],
    大学附属: [
      { name: "大学連携プログラム", description: "附属大学の施設や教員を活用した特別授業で、高度な学びに触れる機会を提供" },
    ],
    公立: [
      { name: "特色ある教育活動", description: "公立校ならではの多様性を活かし、地域と連携した特色ある学びを展開" },
    ],
    自由: [
      { name: "自主活動プログラム", description: "生徒の自主的な活動を支援し、企画力・実行力・リーダーシップを育む" },
    ],
    教養: [
      { name: "教養講座", description: "幅広い分野の学びを通じて、豊かな知性と教養を身につける特別プログラム" },
    ],
    少人数: [
      { name: "個別指導体制", description: "少人数を活かしたきめ細やかな個別指導で、一人ひとりの学力を確実に伸ばす" },
    ],
    温かさ: [
      { name: "メンタリングプログラム", description: "教員と生徒の信頼関係を基盤に、学習面・生活面で寄り添う丁寧なサポート" },
    ],
    自然: [
      { name: "自然体験プログラム", description: "豊かな自然環境を活かした体験学習で、感性と科学的な観察力を育む" },
    ],
    サイエンス: [
      { name: "サイエンスラボ", description: "最新の実験設備を活用した本格的な科学実験で、研究者としての基礎力を育成" },
    ],
    グローバル: [
      { name: "グローバル教育プログラム", description: "海外研修や国際交流を通じて、世界で通用するコミュニケーション力を養成" },
    ],
    伝統: [
      { name: "伝統行事", description: "長年受け継がれてきた学校行事を通じて、帰属意識と仲間との絆を深める" },
    ],
    バランス: [
      { name: "総合学習プログラム", description: "教科横断的な学びで、幅広い知識と思考力をバランスよく育成" },
    ],
    ものづくり: [
      { name: "ものづくり工房", description: "3Dプリンターや工作機器を使った実践的なものづくり体験で、創造力を育む" },
    ],
    フィールドワーク: [
      { name: "フィールドワーク実習", description: "教室を飛び出し、現地での調査・観察を通じて実践的な学びを深める" },
    ],
    規律: [
      { name: "生活指導プログラム", description: "規律ある生活習慣の確立を支援し、自律心と責任感を育む指導" },
    ],
    芸術: [
      { name: "芸術教育プログラム", description: "美術・音楽・演劇など多彩な芸術活動で、感性と表現力を磨く" },
    ],
    スポーツ: [
      { name: "スポーツプログラム", description: "充実した施設と指導体制で、技術向上と人間形成を両立するスポーツ教育" },
    ],
    ESD: [
      { name: "ESD教育プログラム", description: "持続可能な社会の実現に向けて、地域・世界の課題に取り組む実践的な学び" },
    ],
    IB: [
      { name: "IBカリキュラム", description: "国際バカロレアの理念に基づく探究型学習で、世界水準の思考力を育成" },
    ],
    医進: [
      { name: "医進サポートプログラム", description: "医学部進学に向けた特別カリキュラムと個別指導で、将来の医療人を支援" },
    ],
    留学: [
      { name: "海外留学プログラム", description: "長期・短期の留学制度で、本物の異文化体験と語学力向上の機会を提供" },
    ],
    帰国生: [
      { name: "帰国生支援プログラム", description: "帰国生の多様な経験を活かし、一般生との相互学習を促進する環境" },
    ],
    プログラミング: [
      { name: "プログラミング教育", description: "実践的なプログラミング学習で、論理的思考力とデジタルクリエイティブ力を育成" },
    ],
    新設校: [
      { name: "新しい学びの創造", description: "従来の教育の枠にとらわれない革新的な学びのプログラムを次々と開発" },
    ],
    礼法: [
      { name: "礼法の授業", description: "日本の伝統的な作法と心構えを学び、品格と教養を身につける教育" },
    ],
    海洋教育: [
      { name: "海洋教育プログラム", description: "ヨット実習や海洋調査など、海を教材にした実践的な体験学習" },
    ],
  };

  const added = new Set();
  for (const feat of f) {
    if (programs.length >= 2) break;
    const tmpls = programTemplates[feat];
    if (tmpls) {
      for (const tmpl of tmpls) {
        if (!added.has(tmpl.name) && programs.length < 2) {
          programs.push(tmpl);
          added.add(tmpl.name);
        }
      }
    }
  }

  // Fill remaining
  while (programs.length < 2) {
    programs.push({ name: "特色教育プログラム", description: "学校の特色を活かした独自の教育活動で、生徒の多様な力を伸ばす" });
    break;
  }

  return programs;
}

// Generate schoolSpecificOpeners for all 150 schools
function generateOpener(row) {
  const f = row.features;
  const style = row.schoolStyle;

  if (f.includes("探究") && f.includes("国際")) return `探究型学習と国際教育が融合するこの学校で、お子さまの視野が世界に広がる可能性を感じます。`;
  if (f.includes("探究") && f.includes("STEAM")) return `探究とSTEAMが融合する環境で、お子さまの創造力と科学的思考がさらに伸びるでしょう。`;
  if (f.includes("探究") && f.includes("PBL")) return `PBL型の探究学習が、お子さまの主体的に課題を発見し解決する力を育ててくれそうです。`;
  if (f.includes("探究")) return `探究型の学びを大切にするこの学校で、お子さまの知的好奇心がさらに広がるでしょう。`;
  if (f.includes("理系") && f.includes("サイエンス")) return `本格的なサイエンス教育が、お子さまの科学への情熱を大きく育ててくれるでしょう。`;
  if (f.includes("理系") && f.includes("ICT")) return `理系教育とICT環境の融合が、お子さまのテクノロジーへの関心を伸ばしてくれそうです。`;
  if (f.includes("理系") && f.includes("STEAM")) return `理系とSTEAMの教育環境が、お子さまの科学的思考と創造力を育ててくれるでしょう。`;
  if (f.includes("理系")) return `充実した理系教育が、お子さまの科学的思考力と探究心を伸ばしてくれるでしょう。`;
  if (f.includes("ICT") && f.includes("プログラミング")) return `ICTとプログラミング教育が充実したこの学校で、お子さまのデジタルスキルが大きく伸びそうです。`;
  if (f.includes("ICT")) return `先進的なICT環境が、お子さまのデジタル時代を生き抜く力を育ててくれるでしょう。`;
  if (f.includes("大学附属")) return `大学附属ならではのゆとりある教育で、お子さまの幅広い教養と人間力が育まれるでしょう。`;
  if (f.includes("公立")) return `公立校ならではの多様な環境で、お子さまの社会性と学力がバランスよく育つでしょう。`;
  if (f.includes("国立")) return `国立校の先進的な教育環境が、お子さまの高い知性と探究力を育ててくれるでしょう。`;
  if (f.includes("カトリック") || f.includes("キリスト教")) return `キリスト教の教えに基づく教育環境が、お子さまの心と知性を豊かに育ててくれるでしょう。`;
  if (f.includes("仏教")) return `仏教精神に基づく温かな環境が、お子さまの人間的な成長を支えてくれるでしょう。`;
  if (f.includes("国際") && f.includes("帰国生")) return `多文化共生の環境が、お子さまの国際的な感覚をさらに伸ばしてくれるでしょう。`;
  if (f.includes("国際")) return `国際教育に力を入れるこの学校で、お子さまのグローバルな視野が広がるでしょう。`;
  if (f.includes("自由") && f.includes("自主性")) return `自由な校風の中で自主性を大切にする環境が、お子さまの個性を最大限に引き出してくれそうです。`;
  if (f.includes("自由")) return `自由な校風の中で、お子さまの自ら考え行動する力が大きく伸びるでしょう。`;
  if (f.includes("進学実績") && f.includes("文武両道")) return `高い進学実績と文武両道の環境が、お子さまのバランスの取れた成長を支えてくれるでしょう。`;
  if (f.includes("進学実績")) return `確かな進学実績を支える教育力が、お子さまの目標達成を力強く後押ししてくれるでしょう。`;
  if (f.includes("文武両道")) return `文武両道を大切にする校風が、お子さまの心身のバランスの取れた成長を支えてくれるでしょう。`;
  if (f.includes("伝統") && f.includes("教養")) return `伝統と教養を大切にするこの学校で、お子さまの豊かな人間性が育まれるでしょう。`;
  if (f.includes("少人数")) return `少人数教育のきめ細やかさが、お子さま一人ひとりの力を確実に伸ばしてくれそうです。`;
  if (f.includes("温かさ")) return `温かな学校コミュニティが、お子さまの安心感と成長意欲を支えてくれるでしょう。`;
  if (f.includes("STEAM")) return `STEAM教育の充実した環境が、お子さまの創造力と問題解決力を育ててくれるでしょう。`;
  if (f.includes("スポーツ")) return `スポーツと学業を両立する環境が、お子さまのたくましい成長を支えてくれるでしょう。`;
  if (style === "自由") return `自由な教育環境の中で、お子さまの個性と可能性が大きく花開くことでしょう。`;
  if (style === "規律") return `規律ある教育環境が、お子さまの確かな学力と自律心を育ててくれるでしょう。`;
  return `この学校のバランスの取れた教育が、お子さまの多面的な成長を支えてくれるでしょう。`;
}

// ===== Build output =====

let output = `// ============================================================
// TRAIL 私立中学相性診断 - 学校データ & スコアリングロジック
// Design: 古代図書館の冒険書スタイル
// ============================================================

export interface School {
  id: string;
  name: string;
  area: string;
  address: string;
  nearestStation: string;
  walkMinutes: string;
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

export const schools: School[] = [\n`;

for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  const existing = existingData[row.id];
  const desc = existing ? existing.description : generateDescription(row);
  const strengths = existing ? existing.uniqueStrengths : generateUniqueStrengths(row);
  const programs = existing ? existing.signaturePrograms : generateSignaturePrograms(row);

  output += `  {
    id: "${row.id}",
    name: "${row.name}",
    area: "${row.area}",
    address: "${row.address}",
    nearestStation: "${row.nearestStation}",
    walkMinutes: "${row.walkMinutes}",
    sapixDeviation: [${row.sapixMin}, ${row.sapixMax}],
    yotsuyaDeviation: [${row.yotsuyaMin}, ${row.yotsuyaMax}],
    schoolStyle: "${row.schoolStyle}",
    explorationLevel: ${row.explorationLevel},
    aiEducationLevel: ${row.aiEducationLevel},
    digitalEnvironment: ${row.digitalEnvironment},
    passionLevel: ${row.passionLevel},
    selfDriveLevel: ${row.selfDriveLevel},
    expressionLevel: ${row.expressionLevel},
    collaborationLevel: ${row.collaborationLevel},
    futureOrientation: ${row.futureOrientation},
    coed: "${row.coed}",
    features: [${row.features.map(f => `"${f}"`).join(', ')}],
    description: "${desc}",
    commuteAreas: [${row.commuteAreas.map(a => `"${a}"`).join(', ')}],
    uniqueStrengths: [
${strengths.map(s => `      { icon: "${s.icon}", title: "${s.title}", detail: "${s.detail}" },`).join('\n')}
    ],
    signaturePrograms: [
${programs.map(p => `      { name: "${p.name}", description: "${p.description}" },`).join('\n')}
    ],
  },\n`;
}

output += `];

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
  return 0;
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

`;

// Generate schoolSpecificOpeners map
output += `function generateMatchComment(input: DiagnosisInput, school: School, rank: number): string {
  const comments: string[] = [];

  // School-specific opening based on features and name
  const schoolSpecificOpeners: Record<string, string> = {\n`;

for (const row of rows) {
  const existing = existingData[row.id];
  let opener;
  // Use existing openers for s001-s020 (mapped from old s01-s20 keys)
  const oldId = row.id.replace(/^s0+/, 's').replace(/^s(\d)$/, 's0$1');
  const existingOpeners = {
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

  // Convert s001 → s1 style for lookup
  const lookupId = row.id.replace(/^s0*/, 's');
  if (existingOpeners[lookupId]) {
    opener = existingOpeners[lookupId];
  } else {
    opener = generateOpener(row);
  }

  output += `    ${row.id}: "${opener}",\n`;
}

output += `  };

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

  return comments.slice(0, 2).join("\\n");
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

    // Weighted total - 偏差値を重視しつつバランスよく
    const totalScore =
      deviationScore * 0.30 +
      styleScore * 0.10 +
      explorationScore * 0.10 +
      passionScore * 0.05 +
      selfDriveScore * 0.05 +
      futureScore * 0.05 +
      techScore * 0.10 +
      strengthMatchScore * 0.10 +
      growthMatchScore * 0.15;

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

  // 偏差値スコアが30未満の学校は除外
  const filtered = scored.filter(s => s.deviationScore >= 30);
  const finalScored = filtered.length >= 3 ? filtered : scored;

  finalScored.sort((a, b) => b.totalScore - a.totalScore);

  const top3 = finalScored.slice(0, 3);
  top3.forEach((item, index) => {
    item.matchComment = generateMatchComment(input, item.school, index + 1);
  });

  return top3;
}
`;

// Write output
const outPath = path.join(__dirname, '..', 'client', 'src', 'lib', 'schoolData.ts');
fs.writeFileSync(outPath, output, 'utf-8');
console.log(`Generated ${outPath} with ${rows.length} schools.`);
