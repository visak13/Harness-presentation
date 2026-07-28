"use client";

import { useEffect, useState } from "react";

const DURATION = 7200;

const scenes = [
  {
    eyebrow: "01 / THE OUTER LOOP",
    title: "One shell stays with you.",
    copy: "The Neuron shell keeps refining direction with the user. It owns the recipe map, routes decisions, and remains available while delegated work runs elsewhere.",
    focus: ["neuron", "recipe", "user-loop"],
  },
  {
    eyebrow: "02 / AUTONOMY",
    title: "The conversation continues. So does the work.",
    copy: "Pool launches a Planner for a ready recipe step. The Planner launches fresh Worker and Reviewer shells. The outer Neuron does not become the execution bottleneck.",
    focus: ["neuron", "pool", "planner", "worker", "reviewer", "spawn"],
  },
  {
    eyebrow: "03 / FOCUSED ROLES",
    title: "Every shell gets one job and fewer tools.",
    copy: "Role-specific tool surfaces keep each context narrow: Neuron routes, Planner coordinates, Worker builds, and Reviewer re-proves. Expertise arrives as compiled guidance, not a shared chat history.",
    focus: ["neuron", "planner", "worker", "reviewer", "tools", "specs"],
  },
  {
    eyebrow: "04 / LIVE COORDINATION",
    title: "Messages travel both ways.",
    copy: "Broker carries addressed questions, answers, findings, and steering. Rx subscriptions feed blue Monitor lines inside each shell, waking the right role as soon as something changes.",
    focus: ["neuron", "planner", "worker", "reviewer", "broker", "monitor", "messages"],
  },
  {
    eyebrow: "05 / SHARED STATE",
    title: "Context stays small. State stays connected.",
    copy: "Recipe, step, plan, action, message, session, and lock are objects. Agents reach them through scoped CRUD tools; the FSM owns legal lifecycle transitions and reconciles reality before the next move.",
    focus: ["fsm", "objects", "crud", "tools", "recipe", "plan"],
  },
  {
    eyebrow: "06 / SEPARATION OF CONCERNS",
    title: "Each layer solves one kind of problem.",
    copy: "Vocabulary names the system. Guides teach judgment. Shapes help planning. Specs carry expertise. Tools bound action. Rx wakes. CRON backs it up. Roles stay focused on the task at hand.",
    focus: ["concerns", "guides", "shapes", "specs", "rx", "cron", "tools", "vocab"],
  },
];

const sources = [
  ["System nouns, object graph, and three planes", "docs/guides/architecture-vocabulary.md"],
  ["Neuron ownership and routing phases", "docs/guides/neuron-protocol-reference.md"],
  ["Planner DAG, Shapes, and action authoring", "docs/guides/planner-phase-author.md"],
  ["Worker/reviewer dispatch and flowback", "docs/guides/planner-phase-drive.md"],
  ["Event plane and Monitor subscriptions", "docs/guides/reactive-streams.md"],
  ["Monitor-first cadence and CRON backstop", "docs/guides/loop-and-heartbeat.md"],
  ["FSM ownership boundary", "docs/design/FSM-RESPONSIBILITY.md"],
  ["Per-role tool and CRUD scopes", "src/edp_claude/tools/roles.py"],
];

type ShellProps = {
  id: string;
  role: string;
  title: string;
  lines: string[];
  monitor: string;
  tools: string;
  compact?: boolean;
  active: Set<string>;
};

function ClaudeGlyph({ small = false }: { small?: boolean }) {
  return <span className={small ? "claude-glyph claude-glyph--small" : "claude-glyph"} aria-hidden="true">✳</span>;
}

function ClaudeShell({ id, role, title, lines, monitor, tools, compact = false, active }: ShellProps) {
  const hot = active.has(id) || active.has("all");
  return (
    <article className={`cc-shell cc-shell--${id} ${compact ? "cc-shell--compact" : ""} ${hot ? "is-active" : ""}`} data-kind="shell">
      <header className="cc-shell__bar">
        <span><ClaudeGlyph small /> Claude Code</span>
        <i /><i /><i />
      </header>
      <div className="cc-shell__role"><span>ROLE</span><strong>{role}</strong><small>{title}</small></div>
      <div className="cc-shell__terminal">
        {lines.map((line, index) => <p key={line}><b className={index === lines.length - 1 ? "term-dot term-dot--green" : "term-dot"} />{line}</p>)}
      </div>
      <div className="cc-shell__input"><span>›</span><i /></div>
      <div className="cc-shell__monitor"><b>MONITOR</b><span>{monitor}</span></div>
      <footer><b>TOOL SURFACE</b><span>{tools}</span></footer>
    </article>
  );
}

function Service({ id, label, kind, detail, active }: { id: string; label: string; kind: string; detail: string; active: Set<string> }) {
  return (
    <div className={`service service--${id} ${active.has(id) || active.has("all") ? "is-active" : ""}`} data-kind="service">
      <span>{kind}</span><strong>{label}</strong><small>{detail}</small>
    </div>
  );
}

function Legend() {
  return (
    <div className="legend" aria-label="Visual legend">
      <span><i className="legend__shell" />Claude Code shell</span>
      <span><i className="legend__service" />Infrastructure service</span>
      <span><i className="legend__object" />State object</span>
      <span><i className="legend__guide" />Guidance layer</span>
    </div>
  );
}

export default function Home() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const active = new Set(scenes[scene].focus);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setScene((value) => (value + 1) % scenes.length), DURATION);
    return () => window.clearTimeout(timer);
  }, [scene, playing]);

  const choose = (index: number, pause = true) => {
    setScene(index);
    if (pause) setPlaying(false);
  };

  const onStageKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") choose((scene + 1) % scenes.length);
    if (event.key === "ArrowLeft") choose((scene - 1 + scenes.length) % scenes.length);
  };

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top"><ClaudeGlyph small /><span>EDA / CLAUDE HARNESS</span></a>
        <div className="topbar__meta"><span>A 60 SECOND SYSTEM TOUR</span><button onClick={() => setSourcesOpen(true)}>Source map ↗</button></div>
      </nav>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="kicker">AUTONOMY THROUGH SEPARATION OF CONCERNS</p>
          <h1>Stay in the conversation.<br /><em>Let the system keep moving.</em></h1>
          <p className="lede">The Claude harness turns one user-facing shell into a coordinated system of focused shells, shared state, and live two-way communication.</p>
          <button className="watch" onClick={() => { setScene(0); setPlaying(true); document.querySelector(".story")?.scrollIntoView({ behavior: "smooth" }); }}><span>▶</span>Watch how autonomy emerges</button>
        </div>

        <div className="hero-shell-wrap">
          <div className="hero-shell-label"><span>SHELL</span>A Claude Code process with its own context</div>
          <article className="hero-shell" aria-label="Illustration of a Claude Code Neuron shell">
            <header><span><ClaudeGlyph small /> Claude Code</span><i /><i /><i /></header>
            <div className="hero-shell__terminal">
              <p><b />/neuron Ship a reliable release</p>
              <p><b className="green" />Refining outcomes with you.</p>
              <p className="muted">Planner is driving step 02 in the background.</p>
              <p><b className="green" />Worker finding received through Broker.</p>
            </div>
            <div className="hero-shell__composer"><span>›</span><em>Keep iterating on the design...</em></div>
            <div className="hero-shell__monitor"><strong>MONITOR</strong><span>2 subscriptions · 3 shells active · listening</span></div>
          </article>
          <div className="hero-role-label"><span>ROLE</span>Neuron · router and recipe owner</div>
        </div>
      </section>

      <section className="definition-strip" aria-label="Core distinctions">
        <div><span>01</span><strong>SHELL</strong><p>A separate Claude Code process and context.</p></div>
        <div><span>02</span><strong>ROLE</strong><p>The focused responsibility inside that shell.</p></div>
        <div><span>03</span><strong>SERVICE</strong><p>Infrastructure for spawn, messages, and state.</p></div>
        <div><span>04</span><strong>OBJECT</strong><p>Durable shared truth that survives any shell.</p></div>
      </section>

      <section className="story" aria-label="Animated harness walkthrough" tabIndex={0} onKeyDown={onStageKeyDown}>
        <div className="story__header">
          <div><p className="eyebrow">{scenes[scene].eyebrow}</p><h2 key={`title-${scene}`}>{scenes[scene].title}</h2></div>
          <p key={`copy-${scene}`} className="story__copy">{scenes[scene].copy}</p>
        </div>
        <Legend />

        <div className={`system-stage system-stage--${scene}`} key={`stage-${scene}`}>
          <div className={`lane lane--foreground ${active.has("user-loop") ? "is-active" : ""}`}><span>FOREGROUND · DIRECTION LOOP</span><small>the shell that stays with the user</small></div>
          <div className="lane lane--background"><span>BACKGROUND · EXECUTION LOOP</span><small>fresh contexts continue autonomously</small></div>

          <ClaudeShell
            id="neuron" role="NEURON" title="outer shell"
            lines={["Refining the recipe with user", "Outcome 03 updated", "Background finding received"]}
            monitor="broker inbox · recipe events · pool"
            tools="recipe CRUD · consult · spawn planner"
            active={active}
          />

          <div className="service-rack">
            <p>INFRASTRUCTURE</p>
            <Service id="pool" kind="SPAWN SERVICE" label="POOL" detail="sessions + locks" active={active} />
            <Service id="broker" kind="MESSAGE SERVER" label="BROKER" detail="addressed two-way comms" active={active} />
            <Service id="fsm" kind="STATE ENGINE" label="FSM" detail="legal lifecycle transitions" active={active} />
          </div>

          <ClaudeShell
            id="planner" role="PLANNER" title="one recipe step"
            lines={["DAG has 3 ready actions", "Worker question answered", "Review leg queued"]}
            monitor="worklog · broker · pool · flowback"
            tools="plan/action CRUD · spawn worker"
            compact active={active}
          />
          <ClaudeShell
            id="worker" role="WORKER" title="one action"
            lines={["Loaded compiled guidance", "Implementing bounded action"]}
            monitor="answers · steer"
            tools="read context · work · record status"
            compact active={active}
          />
          <ClaudeShell
            id="reviewer" role="REVIEWER" title="independent proof"
            lines={["Fresh context loaded", "Re-running acceptance"]}
            monitor="answers · steer"
            tools="read evidence · verify · verdict"
            compact active={active}
          />

          <div className={`tool-gate ${active.has("tools") || active.has("crud") ? "is-active" : ""}`}><span>SCOPED TOOL LAYER</span><small>minimum verbs per role</small></div>

          <div className={`object-store ${active.has("objects") || active.has("recipe") || active.has("plan") ? "is-active" : ""}`} data-kind="object">
            <p>OBJECT GRAPH · SHARED STATE</p>
            <div>{["recipe", "step", "plan", "action", "message", "session", "lock"].map((item) => <span key={item}>{item}</span>)}</div>
            <small>CRUD: what is true now?</small>
          </div>

          <div className={`packet packet--question ${active.has("messages") ? "is-active" : ""}`}>question →</div>
          <div className={`packet packet--finding ${active.has("messages") ? "is-active" : ""}`}>← finding</div>
          <div className={`spawn-line ${active.has("spawn") ? "is-active" : ""}`}><span>POOL SPAWNS FRESH SHELLS</span></div>
          <div className={`crud-line ${active.has("crud") ? "is-active" : ""}`}><span>READ · UPDATE · RECONCILE</span></div>

          <div className={`concern-shelf ${active.has("concerns") ? "is-active" : ""}`} data-kind="guide">
            <p>SEPARATE CONCERNS · COMPOSED AT THE MOMENT OF NEED</p>
            <div>
              <span className={active.has("vocab") ? "is-hot" : ""}><b>VOCABULARY</b>same nouns</span>
              <span className={active.has("guides") ? "is-hot" : ""}><b>GUIDES</b>role judgment</span>
              <span className={active.has("shapes") ? "is-hot" : ""}><b>SHAPES</b>planning patterns</span>
              <span className={active.has("specs") ? "is-hot" : ""}><b>SPECS</b>expert craft</span>
              <span className={active.has("rx") || active.has("monitor") ? "is-hot" : ""}><b>RX / MONITOR</b>wake now</span>
              <span className={active.has("cron") ? "is-hot" : ""}><b>CRON</b>wake later</span>
            </div>
          </div>
        </div>

        <div className="controls">
          <button className="play-toggle" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause animation" : "Play animation"}>{playing ? "Ⅱ" : "▶"}</button>
          <div className="chapters" role="tablist" aria-label="Animation chapters">
            {scenes.map((item, index) => (
              <button key={item.eyebrow} className={index === scene ? "is-current" : index < scene ? "is-past" : ""} onClick={() => choose(index)} aria-label={`Chapter ${index + 1}: ${item.title}`} aria-selected={index === scene} role="tab">
                <span>{String(index + 1).padStart(2, "0")}</span><i>{index === scene && playing && <b style={{ animationDuration: `${DURATION}ms` }} />}</i>
              </button>
            ))}
          </div>
          <button className="next" onClick={() => choose((scene + 1) % scenes.length)}>Next →</button>
        </div>
      </section>

      <section className="summary">
        <p className="kicker">WHY THIS CAN RUN AUTONOMOUSLY</p>
        <h2>The outer shell holds direction. Background shells hold tasks. Services hold coordination. Objects hold truth.</h2>
        <div className="summary__equation"><span>USER ↔ NEURON</span><i>while</i><span>PLANNER → WORKER → REVIEWER</span><i>over</i><span>BROKER + POOL + FSM</span></div>
      </section>

      <footer>
        <div><ClaudeGlyph small /><strong>EDA / Claude Harness</strong></div>
        <p>A visual index of the architecture—not a replacement specification.</p>
        <button onClick={() => setSourcesOpen(true)}>Open canonical references ↗</button>
      </footer>

      {sourcesOpen && (
        <div className="drawer-wrap" role="dialog" aria-modal="true" aria-labelledby="source-title" onMouseDown={() => setSourcesOpen(false)}>
          <aside className="drawer" onMouseDown={(event) => event.stopPropagation()}>
            <button className="drawer__close" onClick={() => setSourcesOpen(false)} aria-label="Close source map">×</button>
            <p className="eyebrow">MAINTENANCE CONTRACT</p>
            <h2 id="source-title">Read the source, not a second summary.</h2>
            <p>Paths resolve from the <code>claude/</code> harness root. Check these reference points whenever the base project changes.</p>
            <ol>{sources.map(([label, path]) => <li key={path}><span>{label}</span><code>{path}</code></li>)}</ol>
            <p className="drawer__note">The animation stays intentionally conceptual. Protocol details and edge cases belong in the canonical guides and implementation.</p>
          </aside>
        </div>
      )}
    </main>
  );
}
