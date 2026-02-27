import { useState } from "react";

const data = [
  {
    id: 1,
    rank: "01",
    title: "Visual Similarity Search",
    category: "Tool Use",
    categoryColor: "#F59E0B",
    traditional: "User uploads image, perceptual hash or color histogram match returns visually similar assets.",
    agentic: "Agent invokes CLIP embedding tool to encode the uploaded image, runs composition analysis, style classification, and color palette tools in parallel. Synthesizes a multi-signal ranking far beyond pixel similarity.",
    pattern: "Parallel Visual Tool Orchestration",
    patternDetail: "Agent fans out to CLIPEmbeddingTool, CompositionAnalysisTool, StyleClassifierTool, and ColorPaletteTool. Merges cosine similarity scores across all tool outputs with learned fusion weights.",
    icon: "🖼️",
    steps: ["Encode uploaded image", "CLIP embedding search", "Composition analysis", "Style classification", "Multi-signal fusion"]
  },
  {
    id: 2,
    rank: "02",
    title: "Creative Brief to Asset Discovery",
    category: "Planning",
    categoryColor: "#EC4899",
    traditional: "User manually splits brief into keywords and runs multiple separate searches.",
    agentic: "Agent reads the full creative brief such as 'Q4 holiday campaign for luxury skincare, warm tones, aspirational'. Decomposes into mood, color palette, subject matter, and style era. Plans and sequences searches across editorial, lifestyle, and abstract asset pools.",
    pattern: "Goal Decomposition + Sequential Planning",
    patternDetail: "ReAct loop: parse brief, extract N intent dimensions, generate sub-query plan, execute in priority order, synthesize into cohesive mood-board. Agent re-plans if coverage gaps are detected.",
    icon: "✍️",
    steps: ["Parse creative brief", "Extract intent dimensions", "Generate sub-query plan", "Sequence multi-index search", "Synthesize mood board"]
  },
  {
    id: 3,
    rank: "03",
    title: "Automated Quality and Compliance Reflection",
    category: "Reflection",
    categoryColor: "#8B5CF6",
    traditional: "Pre-computed quality scores assigned at upload time with static compliance flags.",
    agentic: "Agent evaluates its own search results for resolution adequacy, release compliance, watermark artifacts, and aesthetic coherence. Removes sub-threshold assets, explains why, then re-ranks the clean set.",
    pattern: "Self-Auditing Result Curation",
    patternDetail: "Post-retrieval critic loop: QualityAuditAgent scores each result across resolution, metadata completeness, and release status. If more than 20% are flagged, agent reflects, filters, and triggers re-retrieval with stricter constraints.",
    icon: "🔍",
    steps: ["Retrieve initial results", "Quality audit each asset", "Compliance check", "Reflect and filter", "Re-rank clean set"]
  },
  {
    id: 4,
    rank: "04",
    title: "Natural Language Descriptive Search",
    category: "Tool Use",
    categoryColor: "#F59E0B",
    traditional: "Tag-based keyword matching on manually annotated metadata fields.",
    agentic: "User types 'golden hour portrait of a woman laughing on a rooftop in Tokyo'. Agent invokes scene parsing, subject detection, geo-context, emotion classifier, and dense caption embedding tools, all concurrently mapped to the asset index.",
    pattern: "Multi-Attribute Parallel Tool Execution",
    patternDetail: "Agent decomposes natural language into structured attribute slots: lighting, subject, emotion, location, and composition. Each slot is dispatched to a specialist tool. Results are intersected via a learned attribute-weight matrix.",
    icon: "💬",
    steps: ["Parse NL description", "Scene and lighting tool", "Subject and emotion tool", "Geo-context tool", "Attribute intersection"]
  },
  {
    id: 5,
    rank: "05",
    title: "Iterative Mood Board Refinement",
    category: "Reflection",
    categoryColor: "#8B5CF6",
    traditional: "User manually curates board with no feedback loop back to the search system.",
    agentic: "Agent observes which assets the user pins versus skips. Reflects on the emerging aesthetic pattern, updates a latent style vector, self-critiques whether new suggestions match the inferred direction, and regenerates recommendations batch by batch.",
    pattern: "Feedback-Driven Self-Reflection Loop",
    patternDetail: "Agent maintains a style scratchpad. After each pin or skip: infer delta preference, update style vector, critique current queue, purge stale suggestions if drift is detected, generate fresh batch aligned to updated vector.",
    icon: "🎨",
    steps: ["Observe pin and skip signals", "Infer style delta", "Update latent vector", "Critique current queue", "Regenerate aligned batch"]
  },
  {
    id: 6,
    rank: "06",
    title: "Conceptual and Abstract Theme Search",
    category: "Planning",
    categoryColor: "#EC4899",
    traditional: "Abstract queries like 'hope' or 'disruption' return poor results via keyword match.",
    agentic: "Agent decomposes abstract concept into visual metaphors, symbolic associations, and color psychology. Plans a multi-stage search from literal manifestations to symbolic representations to editorial interpretations to abstract compositions.",
    pattern: "Concept Decomposition + Multi-Stage Planning",
    patternDetail: "Agent builds a concept graph: 'disruption' maps to broken patterns, lightning, collision, fragmentation, and contrasting colors. Plans search in 4 stages from concrete to abstract. Aggregates and re-ranks by semantic distance from root concept.",
    icon: "💡",
    steps: ["Decompose abstract concept", "Build visual metaphor graph", "Stage 1: literal search", "Stages 2 to 4: symbolic", "Rank by conceptual proximity"]
  },
  {
    id: 7,
    rank: "07",
    title: "License and Rights Compliance Agent",
    category: "Multi-Agent",
    categoryColor: "#10B981",
    traditional: "User manually filters by license type with legal checks done post-download.",
    agentic: "RightsAgent validates license scope across editorial versus commercial and geo-restrictions. ModelReleaseAgent checks people in frame for valid releases. PropertyReleaseAgent flags trademarked locations. ComplianceCoordinatorAgent synthesizes the verdict before results surface.",
    pattern: "Parallel Compliance Multi-Agent Verification",
    patternDetail: "Three specialized agents run concurrently on each candidate asset: RightsAgent, ModelReleaseAgent, and PropertyReleaseAgent. CoordinatorAgent collects pass or fail from each, computes a composite compliance score, and blocks non-compliant assets pre-display.",
    icon: "⚖️",
    steps: ["RightsAgent: license check", "ModelReleaseAgent: verify", "PropertyReleaseAgent: location", "Coordinator: score", "Block pre-display"]
  },
  {
    id: 8,
    rank: "08",
    title: "Trend-Aware and Campaign-Synchronized Search",
    category: "Tool Use",
    categoryColor: "#F59E0B",
    traditional: "Static trending collections updated weekly by the editorial team.",
    agentic: "Agent subscribes to real-time trend signals including social media color and aesthetic trends, seasonal calendar events, and industry design reports. Invokes TrendDetectionTool, SeasonalContextTool, DesignZeitgeistTool, and AudienceSignalTool to dynamically re-weight search ranking.",
    pattern: "Event-Triggered Reactive Tool Chain",
    patternDetail: "On each search request, agent fetches live trend context via tool calls. Injects trend-relevance scores as ranking features alongside semantic similarity. Adapts ranking weights by vertical such as ad agency, blogger, or enterprise.",
    icon: "📈",
    steps: ["Fetch live trend signals", "Seasonal context tool", "Design zeitgeist tool", "Audience signal tool", "Inject trend-aware ranking"]
  },
  {
    id: 9,
    rank: "09",
    title: "Cross-Collection Style-Matching Curation",
    category: "Multi-Agent",
    categoryColor: "#10B981",
    traditional: "Search scoped to a single collection type with users switching tabs manually.",
    agentic: "QueryRouterAgent dispatches style-matched sub-queries to PhotoAgent, VectorAgent, IllustrationAgent, FootageAgent, and MusicAgent simultaneously. CurationAgent deduplicates, normalizes style-coherence scores, and returns a unified multi-format board.",
    pattern: "Fan-Out and Fan-In Multi-Format Federation",
    patternDetail: "Router uses style embedding to determine relevant format agents. Parallel execution across 5 domain agents. CurationAgent applies cross-format style coherence normalization, penalizing format-diverse results with aesthetic inconsistency.",
    icon: "🗂️",
    steps: ["Style embedding classification", "Fan-out to format agents", "Parallel domain search", "Style-coherence normalization", "Fan-in unified board"]
  },
  {
    id: 10,
    rank: "10",
    title: "Personalized Search and Contributor Affinity",
    category: "Reflection",
    categoryColor: "#8B5CF6",
    traditional: "Generic results regardless of user history with no contributor preference modeling.",
    agentic: "Agent builds a continuous preference model from download history, collection saves, and rejection signals. After each session, reflects on whether served results aligned with the inferred user aesthetic identity, critiques drift, and recalibrates the personal ranking layer.",
    pattern: "Longitudinal Self-Reflection + Profile Recalibration",
    patternDetail: "Post-session reflection loop: compare served results to download and reject vectors, measure preference drift, if KL-divergence exceeds threshold trigger profile recalibration, update personal ranking weights stored in the user preference store.",
    icon: "👤",
    steps: ["Track download and reject", "Build preference model", "Post-session reflection", "Measure preference drift", "Recalibrate ranking layer"]
  }
];

const categories = [
  { name: "All", color: "#888" },
  { name: "Reflection", color: "#8B5CF6" },
  { name: "Tool Use", color: "#F59E0B" },
  { name: "Planning", color: "#EC4899" },
  { name: "Multi-Agent", color: "#10B981" }
];

const categoryStats = {
  "Reflection":  { count: 3, desc: "Agent evaluates and recalibrates its own outputs" },
  "Tool Use":    { count: 3, desc: "Specialist tools for visual intelligence" },
  "Planning":    { count: 2, desc: "Multi-stage creative decomposition" },
  "Multi-Agent": { count: 2, desc: "Parallel agent verification and federation" }
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = activeCategory === "All" ? data : data.filter(d => d.category === activeCategory);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: "#e0e0e0",
    }}>

      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(160deg, #0d0505 0%, #080808 40%, #050810 100%)",
        borderBottom: "1px solid #1a1a1a",
        padding: "52px 48px 40px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 15% 60%, rgba(245,158,11,0.08) 0%, transparent 45%),
            radial-gradient(circle at 85% 25%, rgba(139,92,246,0.07) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(16,185,129,0.04) 0%, transparent 35%)
          `,
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "linear-gradient(#ffffff03 1px, transparent 1px), linear-gradient(90deg, #ffffff03 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none"
        }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div style={{
              background: "linear-gradient(135deg, #F59E0B, #EC4899)",
              color: "white",
              padding: "5px 14px",
              fontSize: "11px",
              letterSpacing: "3px",
              fontWeight: "700",
              clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)"
            }}>PRINCIPAL SEARCH AI</div>
            <div style={{ color: "#333", fontSize: "12px", letterSpacing: "2px" }}>// VISUAL ASSET PLATFORM</div>
          </div>

          <div style={{ marginBottom: "6px" }}>
            <span style={{ fontSize: "clamp(13px, 2vw, 17px)", fontWeight: "400", color: "#4a4a4a", letterSpacing: "1px" }}>
              From Keyword to Intelligence
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(30px, 4.8vw, 54px)",
            fontWeight: "800",
            margin: "0 0 14px",
            letterSpacing: "-1px",
            lineHeight: 1.08,
          }}>
            <span style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Agentic Search</span>{" "}
            <span style={{ color: "#f0f0f0" }}>Design Patterns</span>{" "}
            <span style={{ color: "#f0f0f0" }}>for Visual Media</span>{" "}
            <span style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Platforms</span>
          </h1>

          <p style={{ color: "#555", fontSize: "14px", letterSpacing: "1.5px", margin: "0 0 6px" }}>
            10 USE CASES &nbsp;·&nbsp; 4 AGENTIC PATTERNS &nbsp;·&nbsp; PRODUCTION ARCHITECTURES
          </p>
          <p style={{ color: "#3a3a3a", fontSize: "13px", margin: 0, fontStyle: "italic" }}>
            Rajani Maski &nbsp;·&nbsp; AI-assisted content
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: "16px", marginTop: "40px", flexWrap: "wrap" }}>
          {Object.entries(categoryStats).map(([cat, { count, desc }]) => {
            const color = categories.find(c => c.name === cat)?.color;
            return (
              <div key={cat} style={{
                background: `${color}0a`,
                border: `1px solid ${color}22`,
                borderLeft: `3px solid ${color}`,
                padding: "14px 20px",
                minWidth: "180px"
              }}>
                <div style={{ fontSize: "30px", fontWeight: "800", color, lineHeight: 1 }}>{count}</div>
                <div style={{ fontSize: "11px", color, letterSpacing: "2px", marginTop: "3px", fontWeight: "700" }}>{cat.toUpperCase()}</div>
                <div style={{ fontSize: "12px", color: "#4a4a4a", marginTop: "5px" }}>{desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div style={{
        display: "flex", gap: "8px", padding: "16px 48px",
        borderBottom: "1px solid #141414", background: "#0a0a0a",
        flexWrap: "wrap", alignItems: "center"
      }}>
        <span style={{ fontSize: "10px", color: "#333", letterSpacing: "3px", marginRight: "8px" }}>FILTER BY PATTERN</span>
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            style={{
              padding: "7px 18px",
              background: activeCategory === cat.name
                ? `linear-gradient(135deg, ${cat.color}dd, ${cat.color}99)`
                : "transparent",
              border: `1px solid ${activeCategory === cat.name ? "transparent" : cat.color + "44"}`,
              color: activeCategory === cat.name ? "#000" : cat.color,
              fontSize: "12px",
              letterSpacing: "1.5px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: "700",
              transition: "all 0.15s",
              borderRadius: "2px"
            }}
          >
            {cat.name.toUpperCase()}
            {cat.name !== "All" && (
              <span style={{ marginLeft: "7px", opacity: 0.7, fontSize: "11px" }}>
                {categoryStats[cat.name]?.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Cards ── */}
      <div style={{ padding: "24px 48px 64px", maxWidth: "1280px" }}>
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              style={{
                borderLeft: `3px solid ${item.categoryColor}`,
                background: isExpanded
                  ? `linear-gradient(135deg, #111 0%, ${item.categoryColor}06 100%)`
                  : "#0c0c0c",
                marginBottom: "8px",
                cursor: "pointer",
                transition: "background 0.2s",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Watermark rank */}
              <div style={{
                position: "absolute",
                right: "64px", top: "50%",
                transform: "translateY(-50%)",
                fontSize: "72px",
                fontWeight: "900",
                color: isExpanded ? `${item.categoryColor}09` : "#0f0f0f",
                lineHeight: 1,
                pointerEvents: "none",
                transition: "color 0.2s",
                userSelect: "none"
              }}>{item.rank}</div>

              {/* Card header */}
              <div style={{
                display: "flex", alignItems: "flex-start", gap: "20px",
                padding: "22px 64px 22px 22px",
                position: "relative"
              }}>
                <div style={{
                  fontSize: "22px", fontWeight: "900",
                  color: `${item.categoryColor}30`,
                  lineHeight: 1, minWidth: "38px",
                  paddingTop: "4px"
                }}>{item.rank}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Title row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
                    <span style={{ fontSize: "22px" }}>{item.icon}</span>
                    <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "700", color: "#f0f0f0" }}>
                      {item.title}
                    </h3>
                    <span style={{
                      padding: "3px 12px",
                      background: `${item.categoryColor}18`,
                      border: `1px solid ${item.categoryColor}33`,
                      color: item.categoryColor,
                      fontSize: "10px",
                      letterSpacing: "2px",
                      fontWeight: "700"
                    }}>
                      {item.category.toUpperCase()}
                    </span>
                    <span style={{
                      padding: "3px 12px",
                      background: "#111",
                      border: "1px solid #222",
                      color: "#555",
                      fontSize: "10px",
                      letterSpacing: "0.8px"
                    }}>
                      {item.pattern}
                    </span>
                  </div>

                  {/* Pipeline steps */}
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0" }}>
                    {item.steps.map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{
                          padding: "4px 12px",
                          background: "#141414",
                          border: "1px solid #1e1e1e",
                          fontSize: "12px",
                          color: "#555",
                          whiteSpace: "nowrap"
                        }}>{step}</div>
                        {i < item.steps.length - 1 && (
                          <span style={{ color: item.categoryColor, fontSize: "11px", padding: "0 2px", opacity: 0.5 }}>▸</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  position: "absolute", right: "20px", top: "26px",
                  color: isExpanded ? item.categoryColor : "#2a2a2a",
                  fontSize: "15px",
                  transition: "transform 0.2s, color 0.2s",
                  transform: isExpanded ? "rotate(180deg)" : "none"
                }}>▼</div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{ padding: "0 26px 28px 80px" }}>
                  <div style={{
                    height: "1px",
                    background: `linear-gradient(90deg, ${item.categoryColor}55, transparent)`,
                    marginBottom: "22px"
                  }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    {/* Before */}
                    <div style={{
                      background: "#080808",
                      border: "1px solid #1a1a1a",
                      borderLeft: "2px solid #B9191933",
                      padding: "20px"
                    }}>
                      <div style={{
                        fontSize: "11px", letterSpacing: "2px", color: "#B91919bb",
                        marginBottom: "12px", fontWeight: "700"
                      }}>
                        BEFORE — TRADITIONAL
                      </div>
                      <p style={{ margin: 0, fontSize: "14px", color: "#555", lineHeight: 1.8 }}>
                        {item.traditional}
                      </p>
                    </div>

                    {/* After */}
                    <div style={{
                      background: `${item.categoryColor}06`,
                      border: `1px solid ${item.categoryColor}22`,
                      borderLeft: `2px solid ${item.categoryColor}88`,
                      padding: "20px"
                    }}>
                      <div style={{
                        fontSize: "11px", letterSpacing: "2px", color: item.categoryColor,
                        marginBottom: "12px", fontWeight: "700"
                      }}>
                        AFTER — AGENTIC
                      </div>
                      <p style={{ margin: 0, fontSize: "14px", color: "#b0b0b0", lineHeight: 1.8 }}>
                        {item.agentic}
                      </p>
                    </div>
                  </div>

                  {/* Pattern detail */}
                  <div style={{
                    marginTop: "14px",
                    background: "#0a0a0a",
                    border: `1px solid ${item.categoryColor}1a`,
                    borderTop: `2px solid ${item.categoryColor}44`,
                    padding: "20px"
                  }}>
                    <div style={{
                      fontSize: "11px", letterSpacing: "2px", color: item.categoryColor,
                      marginBottom: "10px", fontWeight: "700"
                    }}>
                      DESIGN PATTERN — {item.pattern.toUpperCase()}
                    </div>
                    <p style={{ margin: 0, fontSize: "14px", color: "#777", lineHeight: 1.8 }}>
                      {item.patternDetail}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Footer legend ── */}
      <div style={{
        background: "#060606",
        borderTop: "1px solid #141414",
        padding: "28px 48px",
        display: "flex", gap: "0", flexWrap: "wrap", alignItems: "center"
      }}>
        <div style={{
          fontSize: "10px", color: "#333", letterSpacing: "3px",
          marginRight: "36px"
        }}>PATTERN LEGEND</div>
        {[
          { label: "REFLECTION",   color: "#8B5CF6", desc: "Self-evaluate and recalibrate" },
          { label: "TOOL USE",     color: "#F59E0B", desc: "Visual intelligence tools" },
          { label: "PLANNING",     color: "#EC4899", desc: "Creative decomposition" },
          { label: "MULTI-AGENT",  color: "#10B981", desc: "Parallel agent verification" }
        ].map((p, i) => (
          <div key={p.label} style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 28px 10px 0",
            borderRight: i < 3 ? "1px solid #1a1a1a" : "none",
            marginRight: i < 3 ? "28px" : "0"
          }}>
            <div style={{
              width: "32px", height: "32px",
              background: `${p.color}15`,
              border: `1px solid ${p.color}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0
            }}>
              <div style={{ width: "10px", height: "10px", background: p.color, borderRadius: "1px" }} />
            </div>
            <div>
              <div style={{ fontSize: "12px", color: p.color, letterSpacing: "1.5px", fontWeight: "700" }}>{p.label}</div>
              <div style={{ fontSize: "11px", color: "#444", marginTop: "2px" }}>{p.desc}</div>
            </div>
          </div>
        ))}

        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: "14px", color: "#555", fontWeight: "600" }}>Rajani Maski</div>
          <div style={{ fontSize: "12px", color: "#333", marginTop: "3px", fontStyle: "italic" }}>AI-assisted content</div>
        </div>
      </div>
    </div>
  );
}
