"use client";

import { useEffect, useMemo, useState } from "react";

const DURATION = 6200;

const scenes = [
  {
    eyebrow: "01 / SET DIRECTION",
    title: "A goal enters one shell.",
    copy: "The Neuron is the user-facing router. It turns intent into a durable recipe map without doing the implementation itself.",
    focus: ["goal", "neuron", "recipe"],
  },
  {
    eyebrow: "02 / CHALLENGE DRIFT",
    title: "A fresh outside view checks the direction.",
    copy: "Curiosity interrogates gaps and assumptions. Its clean context helps the Neuron refine decisions, outcomes, and the recipe map.",
    focus: ["neuron", "curiosity", "recipe"],
  },
  {
    eyebrow: "03 / DECOMPOSE",
    title: "The recipe becomes a route.",
    copy: "The Neuron declares outcomes and editable steps. Each ready step launches one Planner with the relevant recipe context.",
    focus: ["recipe", "step", "planner"],
  },
  {
    eyebrow: "04 / GROUND THE WORK",
    title: "The Planner draws the real work graph.",
    copy: "Dependencies form the action DAG. A Shape is an optional pitfall checklist; compiled Specialist guidance is attached only where expertise is needed.",
    focus: ["planner", "shape", "specialist", "action"],
  },
  {
    eyebrow: "05 / EXECUTE + RE-PROVE",
    title: "Fresh shells build, then independently review.",
    copy: "Workers execute one action or a small batch. Reviewer legs re-run the acceptance evidence in a separate shell before the Planner closes the step.",
    focus: ["action", "worker", "reviewer", "planner"],
  },
  {
    eyebrow: "06 / STAY RESPONSIVE",
    title: "Events keep the whole graph awake.",
    copy: "Rx streams carry messages, worklog changes, and lifecycle signals. Monitor wakes shells immediately; CRON is the safety-net heartbeat.",
    focus: ["neuron", "planner", "worker", "reviewer", "rx", "cron"],
  },
];

const sources = [
  ["Shared vocabulary + object graph", "docs/guides/architecture-vocabulary.md"],
  ["Neuron phases + routing protocol", "docs/guides/neuron-protocol-reference.md"],
  ["Planner DAG + Shape shelf", "docs/guides/planner-phase-author.md"],
  ["Worker/reviewer dispatch loop", "docs/guides/planner-phase-drive.md"],
  ["Specialist training contract", "docs/guides/specialist-training.md"],
  ["Rx + heartbeat cadence", "docs/guides/loop-and-heartbeat.md"],
];

function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "mark mark--small" : "mark"} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Node({ id, label, detail, className = "" }: { id: string; label: string; detail: string; className?: string }) {
  return (
    <div className={`node node--${id} ${className}`} data-node={id}>
      <span className="node__signal" />
      <strong>{label}</strong>
      <small>{detail}</small>
    </div>
  );
}

export default function Home() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const active = useMemo(() => new Set(scenes[scene].focus), [scene]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setScene((value) => (value + 1) % scenes.length), DURATION);
    return () => window.clearTimeout(timer);
  }, [scene, playing]);

  const choose = (index: number) => {
    setScene(index);
    setPlaying(false);
  };

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="EDA harness overview">
          <Mark small />
          <span>EDA / CLAUDE HARNESS</span>
        </a>
        <div className="topbar__meta">
          <span>60 SECOND TOUR</span>
          <button className="source-trigger" onClick={() => setSourcesOpen(true)}>Source map ↗</button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="kicker">A LIVING MAP FOR LONG-RUNNING AGENT WORK</p>
          <h1>One goal.<br /><em>Many clean contexts.</em></h1>
          <p className="lede">A short visual story of how the Claude harness keeps direction, expertise, execution, and independent review connected.</p>
          <button className="watch" onClick={() => { setScene(0); setPlaying(true); }}>
            <span className="watch__icon">▶</span>
            Watch the loop
          </button>
        </div>
        <div className="hero__aside" aria-hidden="true">
          <span className="orbit orbit--one" />
          <span className="orbit orbit--two" />
          <Mark />
          <span className="hero__aside-label">DIRECTION<br />WITHOUT<br />DRIFT</span>
        </div>
      </section>

      <section className="story" aria-label="Animated harness walkthrough">
        <div className="story__header">
          <div>
            <p className="eyebrow">{scenes[scene].eyebrow}</p>
            <h2 key={`title-${scene}`}>{scenes[scene].title}</h2>
          </div>
          <p key={`copy-${scene}`} className="story__copy">{scenes[scene].copy}</p>
        </div>

        <div className={`stage stage--${scene}`} key={`stage-${scene}`}>
          <div className="stage__grain" />
          <div className="connector connector--goal" />
          <div className="connector connector--curiosity" />
          <div className="connector connector--recipe" />
          <div className="connector connector--planner" />
          <div className="connector connector--shape" />
          <div className="connector connector--specialist" />
          <div className="connector connector--worker" />
          <div className="connector connector--reviewer" />
          <div className="pulse pulse--one" />
          <div className="pulse pulse--two" />
          <div className="pulse pulse--three" />

          <Node id="goal" label="GOAL" detail="user intent" className={active.has("goal") ? "is-active" : ""} />
          <Node id="neuron" label="NEURON" detail="router · recipe owner" className={active.has("neuron") ? "is-active" : ""} />
          <Node id="curiosity" label="CURIOSITY" detail="clean-context challenge" className={active.has("curiosity") ? "is-active" : ""} />
          <Node id="recipe" label="RECIPE" detail="decisions · outcomes · steps" className={active.has("recipe") ? "is-active" : ""} />
          <Node id="step" label="READY STEP" detail="one bounded outcome" className={active.has("step") ? "is-active" : ""} />
          <Node id="planner" label="PLANNER" detail="one per recipe step" className={active.has("planner") ? "is-active" : ""} />
          <Node id="shape" label="SHAPE" detail="optional pattern guide" className={active.has("shape") ? "is-active" : ""} />
          <Node id="specialist" label="COMPILED DOC" detail="reusable expert rules" className={active.has("specialist") ? "is-active" : ""} />
          <Node id="action" label="ACTION DAG" detail="real dependencies" className={active.has("action") ? "is-active" : ""} />
          <Node id="worker" label="WORKER" detail="build + prove" className={active.has("worker") ? "is-active" : ""} />
          <Node id="reviewer" label="REVIEWER" detail="fresh-shell re-proof" className={active.has("reviewer") ? "is-active" : ""} />
          <div className={`rail rail--rx ${active.has("rx") ? "is-active" : ""}`}><span>RX / MONITOR</span><i /><i /><i /><i /></div>
          <div className={`cron ${active.has("cron") ? "is-active" : ""}`}><span>CRON</span><small>safety net</small></div>
        </div>

        <div className="controls">
          <button className="play-toggle" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause animation" : "Play animation"}>
            {playing ? "Ⅱ" : "▶"}
          </button>
          <div className="chapters" role="tablist" aria-label="Animation chapters">
            {scenes.map((item, index) => (
              <button
                key={item.eyebrow}
                className={index === scene ? "is-current" : index < scene ? "is-past" : ""}
                onClick={() => choose(index)}
                aria-label={`Chapter ${index + 1}: ${item.title}`}
                aria-selected={index === scene}
                role="tab"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i>{index === scene && playing && <b style={{ animationDuration: `${DURATION}ms` }} />}</i>
              </button>
            ))}
          </div>
          <button className="next" onClick={() => choose((scene + 1) % scenes.length)}>Next →</button>
        </div>
      </section>

      <section className="summary">
        <p className="kicker">THE WHOLE SYSTEM, IN ONE LINE</p>
        <h2>Recipe remembers. Planner coordinates. Fresh shells execute. Rx keeps everyone listening.</h2>
        <div className="summary__flow" aria-label="Harness flow summary">
          {['GOAL', 'RECIPE', 'PLAN', 'ACTION', 'PROOF'].map((label, index) => (
            <div key={label}><span>{index + 1}</span><strong>{label}</strong>{index < 4 && <i>→</i>}</div>
          ))}
        </div>
      </section>

      <footer>
        <div><Mark small /><strong>EDA / Claude Harness</strong></div>
        <p>This page is a visual index, not a second specification. Follow the source map for current behavior.</p>
        <button onClick={() => setSourcesOpen(true)}>Open canonical references ↗</button>
      </footer>

      {sourcesOpen && (
        <div className="drawer-wrap" role="dialog" aria-modal="true" aria-labelledby="source-title" onMouseDown={() => setSourcesOpen(false)}>
          <aside className="drawer" onMouseDown={(event) => event.stopPropagation()}>
            <button className="drawer__close" onClick={() => setSourcesOpen(false)} aria-label="Close source map">×</button>
            <p className="eyebrow">MAINTENANCE CONTRACT</p>
            <h2 id="source-title">Read the source, not a summary.</h2>
            <p>Paths resolve from the <code>claude/</code> harness root. These are the reference points to check whenever the base project changes.</p>
            <ol>
              {sources.map(([label, path]) => <li key={path}><span>{label}</span><code>{path}</code></li>)}
            </ol>
            <p className="drawer__note">The animation deliberately stays high-level. Behavioral details and edge cases belong in the guides above.</p>
          </aside>
        </div>
      )}
    </main>
  );
}
