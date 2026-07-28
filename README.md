# EDA Claude Harness — animated overview

A short, animated presentation of the Claude Code harness in `eda-base3/claude`.

The page is intentionally a visual index, not a parallel architecture document. Its maintenance drawer points future agents to the canonical files under the Claude harness root:

- `docs/guides/architecture-vocabulary.md`
- `docs/guides/neuron-protocol-reference.md`
- `docs/guides/planner-phase-author.md`
- `docs/guides/planner-phase-drive.md`
- `docs/guides/specialist-training.md`
- `docs/guides/loop-and-heartbeat.md`

## Local preview

```powershell
npm install
npm run dev
```

## GitHub Pages

The workflow in `.github/workflows/pages.yml` builds the static export and publishes it from `main`. In repository Settings → Pages, set the source to **GitHub Actions** once if it is not already selected.
