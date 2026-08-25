"use client";

import { useState } from "react";

type BookPage = {
  kicker: string;
  title: string;
  meta?: string;
  intro?: string;
  details?: { label: string; text: string }[];
  timeline?: { year: string; company: string; role: string }[];
};

type Spread = { left: BookPage; right: BookPage };

const spreads: Spread[] = [
  {
    left: {
      kicker: "PROLOGUE · 序章",
      title: "在四段实习里，反复回答同一个问题",
      intro:
        "如何在用户体验、业务价值与技术边界之间，找到值得被验证的那个解法？",
      details: [
        { label: "起点", text: "从脉脉的客户、广告与运营复盘，建立商业视角。" },
        { label: "深入", text: "在百度和小米，把搜索需求与穿戴体验拆成可交付的产品方案。" },
        { label: "进阶", text: "在快手进入复杂流量分发，在消耗、DAU、时长和体验之间做取舍。" },
      ],
    },
    right: {
      kicker: "TIMELINE · 时间线",
      title: "从商业现场，走向 AI 产品化",
      timeline: [
        { year: "2023.08—10", company: "脉脉 · 收入策略部", role: "商业化运营实习生" },
        { year: "2024.01—03", company: "百度 · 搜索产品部", role: "游戏垂类产品经理实习生" },
        { year: "2025.04—09", company: "小米 · 可穿戴产品部", role: "软件产品经理实习生" },
        { year: "2025.12—2026.06", company: "快手 · 商业化流量产品中心", role: "流量策略产品实习生" },
      ],
    },
  },
  {
    left: {
      kicker: "01 · KUAISHOU",
      title: "快手｜分发效率与 AI 探索",
      meta: "商业化流量产品中心 · 策略产品实习生 · 2025.12—2026.06",
      details: [
        {
          label: "发现页外流提效",
          text: "背景：外流消耗同比下滑，99% 请求仅有 1—2 个候选物料。动作：拆解供给与竞争链路，设计精排扩量与有边界抬价。结果：外流曝光 +11.129%、实际消耗 +3.363%，商业化全局后验约 +0.4%，方案上线。",
        },
        {
          label: "LLM 用户—物料相似分",
          text: "背景：冷启物料与低 Load 人群匹配效率低。动作：将相似分接入精排，用 3 组小流量实验检验覆盖、重合与增量转化。分析：首版覆盖率仅 3.98%，51.51% 物料原系统已可通过，未带来实际消耗增量；因此停止调阈值，转向 eCPC 出价因子方案。",
        },
        {
          label: "UE 实验复盘",
          text: "作为算法联络与实验分析角色，识别到多组方案“曝光增长但消耗不跟随、时长偏负”，判断旧机制放大了低质量边际流量，推动重审优化目标。",
        },
      ],
    },
    right: {
      kicker: "01 · KUAISHOU",
      title: "快手｜用户体验精细化治理",
      meta: "先建立度量，再谈策略与自动化",
      details: [
        {
          label: "广告重复度评测 & Agent MVP",
          text: "从视觉、内容、商品三维建立 0—3 级金标准，每周双人标注约 400 名高曝光用户。一期记录 3,862 次下滑、88 次重复感知，重复率约 2.28%。在内部平台搭建判重 Agent MVP，跑通输入—判断—汇总链路，但因准确率与效率不足未正式部署。",
        },
        {
          label: "多样性治理",
          text: "推进频控底表时效性优化与刷内行业打散；一、二级行业重复分别显著下降 4.142% 和 4.793%。DAU +0.009%、时长 +0.042% 为方向性结果，不将其包装为显著增长。",
        },
        {
          label: "双列精细化干预",
          text: "参与从粗放保护转向 Uplift 人群干预：在保留主要体验收益的同时，双列时长 +0.842%、DAU +0.043%，总消耗折损收敛至 -4.27%，兑换比优化至 5.07。",
        },
        {
          label: "联盟外投回捞 DAU",
          text: "通过高价值/低活人群分层、LT 出价和增量归因识别真实回流，低活人群 DAU +0.023%，单用户召回成本从约 4 元降至 1.58 元，日均增量 DAU 约 1 万，扩量至约 10% 流量。",
        },
      ],
    },
  },
  {
    left: {
      kicker: "02 · XIAOMI",
      title: "小米｜把“不好用”拆成用户旅程",
      meta: "可穿戴产品部 · 软件产品经理实习生 · 2025.04—09",
      details: [
        {
          label: "通知链路与保活设置",
          text: "背景：“无法及时收到消息”位居表环客诉前三。动作：定位 Android 引导长、入口深和提醒弱，简化新手流、调整热区、增加长期弱提醒并整合保活入口。结果：上线两周，“忽略电池优化”成功率 54% → 62%，重点活跃用户通知开启率 67% → 81%。",
        },
        {
          label: "触感体验升级",
          text: "背景：波形单一、语义重叠、长波余震。动作：从时域、频域、强度和启停时间拆解竞品，建立 5 类 11 个基础波形语义库，优化 30+ 场景。结果：组织 300+ 人内部测试，材料记录高频交互体验超过 OPPO、75% 场景与华为相当（仅适用于当时内部口径）。",
        },
      ],
    },
    right: {
      kicker: "03 · BAIDU",
      title: "百度｜从搜索意图到信息结构",
      meta: "搜索产品部 MEG · 游戏垂类产品实习生 · 2024.01—03",
      details: [
        {
          label: "数据追踪与竞品复验",
          text: "监控游戏垂类主动搜索 DAU、次留等指标，转为可视化图表；按月复验与抖音对比中落败的 case，协助盘点新卡片 AB 实验转化。",
        },
        {
          label: "游戏下载卡",
          text: "背景：用户行为显示约 7% 攻略类搜索需求未被满足。动作：在卡片中补充结构化攻略、评分和奖项，完成调研、资源收集、PRD 与走查支持。结果：资源长点率 +2.20%，跳点率 +1.88%。",
        },
        {
          label: "游戏狂欢活动",
          text: "为厂商联运活动新增搜索流量入口，优化首屏并为现金激励活动准备智能搜索题库。推广期材料记录游戏搜索平均 PV +35 万/天，人均搜索激发频次 +2。",
        },
      ],
    },
  },
  {
    left: {
      kicker: "04 · MAIMAI",
      title: "脉脉｜从客户需求到投后复盘",
      meta: "收入策略部 · 商业化运营实习生 · 2023.08—10",
      details: [
        {
          label: "需求与售前",
          text: "针对华为布局社交招聘的需求，参与需求对接并完成 74 页售前服务方案，将招聘目标、平台人群、内容与广告能力组织为解决方案。",
        },
        {
          label: "投放与内容运营",
          text: "协助秋招期 200+ 家互联网与游戏公司的招聘广告配置；运营中兴、小红书招聘热帖与全局话题，进入热榜 Top 3，累计曝光 300 万+。",
        },
        {
          label: "SQL 与投后复盘",
          text: "使用 SQL 查询目标人群 MAU，将模糊客户需求校准为可覆盖、可衡量的运营对象；调取曝光 UV、主动搜索 PV、互动人数等数据，结合竞品提出运营建议。",
        },
      ],
    },
    right: {
      kicker: "EPILOGUE · 方法",
      title: "我不只收集“漂亮指标”",
      intro:
        "很多产品故事的价值，不在于结果永远正向，而在于能否说清哪个假设成立、哪个不成立，下一步为什么值得继续。",
      details: [
        { label: "01 定义", text: "把主观感受、客诉或业务目标，转成可观测的问题。" },
        { label: "02 拆解", text: "区分链路、人群、候选供给、竞争力与不同指标层级。" },
        { label: "03 验证", text: "用小流量实验、分层对照、评测金标准和负向结果做决策。" },
        { label: "04 转化", text: "把分析结论翻译为产品结构、策略边界与可执行的下一步。" },
      ],
    },
  },
];

const projects = [
  {
    no: "01",
    type: "AI 协作开发 · 可试玩",
    title: "瞬息全宇宙：逃离贝果",
    text: "把电影中的追逐、坍塌与平行人生转为 2—3 分钟可体验的网页游戏。用统一迷宫 + 参数化宇宙控制开发成本，以坍塌值、收集和跃迁建立短时生存循环。",
    tags: ["互动原型", "AI 协作", "游戏机制"],
    href: "https://celia099.github.io/Everything-Everywhere-All-at-Once/",
    action: "打开试玩",
    image: "/comic-grid.jpg",
  },
  {
    no: "02",
    type: "AI 产品 · 开发中",
    title: "受监督的求职提效 Agent",
    text: "将“帮我求职”拆成候选人证据、JD 匹配、简历定制、自我评价与反馈学习的可监督状态机，设定事实引用、人工审批和长期偏好边界。目前已建立规则与组件架构，完整流程尚在验证。",
    tags: ["Workflow", "Human-in-the-loop", "Skills"],
    href: null,
    action: "暂未公开",
    image: "/flying-book.jpg",
  },
  {
    no: "03",
    type: "AI 评测 · 企业内部 MVP",
    title: "广告重复度评测 Agent",
    text: "在人工金标准之上验证大模型判重，完成相邻广告素材输入、多维判断、汇总与 HTML 输出链路。联调暴露出准确率、单次 2—3 分钟耗时与批处理问题，未包装为已上线产品。",
    tags: ["金标准", "Agent MVP", "失败复盘"],
    href: null,
    action: "内部项目",
    image: "/desert-well.jpg",
  },
  {
    no: "04",
    type: "数据分析 · 课程第一",
    title: "购物平台销售数据深度分析",
    text: "用 R 完成描述统计、RFM 聚类与 LTV 分析，从会员数减少 57% 与复购疲软中识别高消费活跃会员流失，输出产品组合、忠诚度计划与供应链建议。",
    tags: ["RFM", "LTV", "经营诊断"],
    href: null,
    action: "分析项目",
    image: "/desert-well.jpg",
  },
  {
    no: "05",
    type: "创新创业 · 北京市一等奖",
    title: "法学星球",
    text: "调研 27 个竞品并访谈五院四系学生，以保研与法学素质教育切入产品。跨平台发布 50+ 条内容，小红书关注 2,200+、浏览 4.4 万+，积累 6 个百人群、14 单与 1 万元+收入（采用该版本单一口径）。",
    tags: ["需求研究", "0→1", "内容增长"],
    href: null,
    action: "创赛项目",
    image: "/rose-garden.jpg",
  },
  {
    no: "06",
    type: "海外创业 · 北京市一等奖",
    title: "氢轮工作室",
    text: "从欧洲高山骑行的轻量化需求切入，联合代工厂开模，通过 Instagram 与骑行社区触达专业玩家，并探索从直销到欧洲经销商的渠道模式。精确利润口径待进一步确认，因此本页不展示未完全核实的月利润数字。",
    tags: ["市场选择", "供应链", "海外渠道"],
    href: null,
    action: "创赛项目",
    image: "/little-prince-planet.jpg",
  },
];

const skills = [
  { name: "需求洞察", en: "INSIGHT", proof: "从客诉、搜索行为、竞品落败 case 与用户访谈中定义真问题" },
  { name: "数据分析", en: "ANALYTICS", proof: "SQL、RFM、LTV、漏斗拆解、人群分层与指标可视化" },
  { name: "AI 应用", en: "AI APPLICATION", proof: "模型能力选型、业务场景映射、金标准、Agent MVP 与负向实验迭代" },
  { name: "策略实验", en: "EXPERIMENT", proof: "精排、出价、广告体验、AB/CUPED 思路与收益—风险保护栏" },
  { name: "产品定义", en: "PRODUCT", proof: "用户旅程、信息架构、交互流、软硬件语义与 PRD 交付" },
  { name: "商业落地", en: "BUSINESS", proof: "客户方案、广告运营、0→1 商业验证、海外渠道与跨团队推进" },
];

export default function Home() {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turning, setTurning] = useState<"next" | "prev" | null>(null);

  const turnPage = (direction: "next" | "prev") => {
    if (turning) return;
    const next = direction === "next" ? spreadIndex + 1 : spreadIndex - 1;
    if (next < 0 || next >= spreads.length) return;
    setTurning(direction);
    window.setTimeout(() => {
      setSpreadIndex(next);
      setTurning(null);
    }, 310);
  };

  const renderPage = (page: BookPage, side: "left" | "right") => (
    <article className={`book-page ${side}`}>
      <p className="page-kicker">{page.kicker}</p>
      <h3>{page.title}</h3>
      {page.meta && <p className="page-meta">{page.meta}</p>}
      {page.intro && <p className="page-intro">{page.intro}</p>}
      {page.details && (
        <div className="detail-list">
          {page.details.map((detail) => (
            <div className="detail" key={detail.label}>
              <h4>{detail.label}</h4>
              <p>{detail.text}</p>
            </div>
          ))}
        </div>
      )}
      {page.timeline && (
        <div className="career-timeline">
          {page.timeline.map((item) => (
            <div className="career-stop" key={item.year}>
              <time>{item.year}</time>
              <div><strong>{item.company}</strong><span>{item.role}</span></div>
            </div>
          ))}
        </div>
      )}
      <span className="folio" aria-hidden="true">{side === "left" ? spreadIndex * 2 + 1 : spreadIndex * 2 + 2}</span>
    </article>
  );

  return (
    <main>
      <nav className="site-nav" aria-label="页面导航">
        <a className="nav-name" href="#home">姚岩岩</a>
        <div>
          <a href="#experience">经历</a>
          <a href="#projects">项目</a>
          <a href="#skills">能力</a>
          <a href="#contact">联系</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">PORTFOLIO · 2026</p>
          <h1>姚岩岩</h1>
          <p className="direction">AI 产品 · 策略产品 · 增长产品</p>
          <p className="intro">
            我从用户真正在意的问题出发，把模糊感受变成可定义的需求，
            把业务假设变成可验证的产品。
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#experience">翻开我的故事 <span aria-hidden="true">↓</span></a>
            <a className="ghost-link" href="https://github.com/celia099" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <dl className="hero-facts">
            <div><dt>4</dt><dd>段产品/商业化实习</dd></div>
            <div><dt>3</dt><dd>类 AI 应用实践</dd></div>
            <div><dt>6</dt><dd>项能力证据</dd></div>
          </dl>
        </div>
        <figure className="hero-art">
          <img src="/little-prince-planet.jpg" alt="小王子站在星球上，身边是星星与行星" />
          <figcaption>B–612 · 从一颗小行星开始</figcaption>
        </figure>
      </section>

      <section className="experience-section" id="experience">
        <div className="section-heading book-heading">
          <p className="chapter">CHAPTER I · EXPERIENCE</p>
          <h2>一本关于“如何做决定”的实习故事</h2>
          <p>点击箭头或下方页码翻阅。每一页都保留了背景、动作、数据与判断。</p>
        </div>
        <div className="book-stage">
          <button className="book-arrow prev" onClick={() => turnPage("prev")} disabled={spreadIndex === 0} aria-label="上一页">←</button>
          <div className={`book ${turning ? `turning-${turning}` : ""}`} aria-live="polite">
            {renderPage(spreads[spreadIndex].left, "left")}
            {renderPage(spreads[spreadIndex].right, "right")}
          </div>
          <button className="book-arrow next" onClick={() => turnPage("next")} disabled={spreadIndex === spreads.length - 1} aria-label="下一页">→</button>
        </div>
        <div className="pagination" aria-label="经历页码">
          {spreads.map((spread, index) => (
            <button key={spread.left.kicker} className={index === spreadIndex ? "active" : ""} onClick={() => !turning && setSpreadIndex(index)} aria-label={`第 ${index + 1} 组书页`}>
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-heading projects-heading">
          <p className="chapter">CHAPTER II · PROJECTS</p>
          <h2>把好奇心变成可试玩、可验证、可复盘的项目</h2>
          <p>AI 不是一个装饰性标签。我更在意它是否真正进入了问题定义、产品机制或评测闭环。</p>
        </div>
        <div className="comic-grid">
          {projects.map((project, index) => (
            <article className={`project-panel panel-${index + 1}`} key={project.title}>
              <div className="panel-art" style={{ backgroundImage: `linear-gradient(180deg, transparent 25%, rgba(22,24,39,.82) 100%), url(${project.image})` }}>
                <span className="project-no">{project.no}</span>
                <p>{project.type}</p>
              </div>
              <div className="panel-copy">
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer">{project.action} ↗</a>
                ) : (
                  <span className="muted-action">{project.action}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="rose-backdrop" aria-hidden="true" />
        <div className="section-heading skills-heading">
          <p className="chapter">CHAPTER III · CAPABILITY GARDEN</p>
          <h2>我的能力不是一棵孤立的树，而是一片相互供养的玫瑰花田</h2>
          <p>每一朵花都长在真实项目的证据上：洞察定义方向，数据检验假设，AI 和产品设计把判断变成可使用的系统。</p>
        </div>
        <div className="rose-field">
          {skills.map((skill, index) => (
            <article className={`skill-rose rose-${index + 1}`} key={skill.name}>
              <div className="rose-mark" aria-hidden="true"><span /><span /><span /><span /><i /></div>
              <p>{skill.en}</p>
              <h3>{skill.name}</h3>
              <div className="stem" aria-hidden="true" />
              <small>{skill.proof}</small>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact">
        <img src="/flying-book.jpg" alt="小王子拉着群鸟飞离星球" />
        <div className="footer-copy">
          <p className="chapter">LAST PAGE · CONTACT</p>
          <h2>如果你也在思考 AI 如何真正进入业务与工作流，欢迎来聊聊。</h2>
          <p>姚岩岩 · AI 产品 / 策略产品 / 增长产品</p>
          <div className="contact-links">
            <a href="https://github.com/celia099" target="_blank" rel="noreferrer"><span>GitHub</span><strong>github.com/celia099 ↗</strong></a>
            <a href="https://celia099.github.io/Everything-Everywhere-All-at-Once/" target="_blank" rel="noreferrer"><span>Featured project</span><strong>Universe Leap ↗</strong></a>
          </div>
          <p className="contact-note">当前资料未包含可公开邮箱或手机号，因此暂以 GitHub 作为联系入口。</p>
        </div>
        <p className="copyright">© 2026 Yanyan Yao · Built with evidence, curiosity & a little starlight.</p>
      </footer>
    </main>
  );
}
