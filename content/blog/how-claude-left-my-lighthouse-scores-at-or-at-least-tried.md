---
title: How Claude Left My Lighthouse Scores at 100 (Or at Least Tried)
slug: how-claude-left-my-lighthouse-scores-at-or-at-least-tried
date: '2026-03-18T01:48:39.000Z'
description: 'A small Node.js agent that runs Lighthouse, turns the report into a plan and lets Claude Code fix the app in a loop until every score reaches 90+.'
tags:
  - claude-code
  - front-end-development
  - ai-agent
  - seo
  - tutorial
lang: en
translation: como-o-claude-deixou-meus-scores-do-lighthouse-em-100-ou-pelo-menos-tentou
mediumUrl: >-
  https://cefasgpereira.medium.com/how-claude-left-my-lighthouse-scores-at-100-or-at-least-tried-2a46184b9095
---

![How Claude Left My Lighthouse Scores at 100 (Or at Least Tried)](/blog/how-claude-left-my-lighthouse-scores-at-or-at-least-tried/01.webp)
*Photo by [Christopher Gower](https://unsplash.com/@cgower) on [Unsplash](https://unsplash.com/)*

If you work with front-end, you’ve already dealt with, are currently dealing with, or will deal with **Lighthouse** metrics. If you’re in the “will deal with” camp, here’s a quick explanation:

Lighthouse is a report tool that scans your web app and evaluates it across four areas: Performance (how fast it loads), Accessibility (whether it’s usable by different people), Best Practices (if you’re following recommended standards), and SEO (how easily it can be found by search engines). Scores range from 0 to 100, and anything below 90 usually indicates there’s room for improvement. For front-end developers, these metrics often reflect whether users stay and engage with the content or leave due to slow loading times, like when a hero image takes too long to appear on a slower connection.

This fits right into the broader conversation we’ve been having about building better web experiences, like when we discussed the [**“Benefits of semantic HTML that you can’t miss”**](/blog/benefits-of-semantic-html-that-you-cant-miss). Lighthouse is essentially the enforcer that checks whether your beautiful semantic markup actually performs in the wild, not just in theory.

I’m currently working on a public facing project, which means that the platform needs to be easily discoverable by users and perform well, especially on mobile devices, where most of our users live. Keeping our metrics above 90 is a recurring task, and frankly, a bit frustrating. You tweak an existing flow, and suddenly a page you were so proud of drops ten points.

That’s when I thought: what if AI handled this work? I pictured something like Prettier or ESLint. Tools you run after finishing a feature to clean things up and enforce standards. But this goes further: you can use AI to improve an application whose team never worried about these metrics but after some research they decided to care.

I had never used the Lighthouse CLI before, so I started there. Installed the package, then slowly built a dead-simple JavaScript agent to run this workflow. Here’s how it works:

## The Architecture

![Architecture diagram: your code goes to Lighthouse, the metrics become a prompt, Claude edits the code, and the loop repeats until the target score or the iteration limit](/blog/how-claude-left-my-lighthouse-scores-at-or-at-least-tried/02.webp)

### The Flow

**Audit:** Lighthouse CLI analyzes your app and spits out scores  
**Extract:** The script parses the JSON report for the four key metrics  
**Plan:** Generates a detailed prompt with current scores, specific failures, and an implementation strategy  
**Delegate:** Hands the prompt to Claude with clear instructions on what to fix  
**Implement:** Claude edits your codebase (yes, actually writes code)  
**Verify:** Script re-runs Lighthouse on the updated code  
**Judge:** Scores compared against your minimum threshold (e.g., 90)  
**Repeat:** Loop continues until scores hit the target OR max iterations reached (whichever comes first)

Think of it as putting Lighthouse and Claude in a room together and telling them not to come out until they’ve made peace.

## The Code

First of all, you will need to install lighthouse and also make sure that you have Chrome/Chromium installed.

```bash
npm install lighthouse
```

Here’s the agent code just copy and paste it into your codebase:

````javascript
#!/usr/bin/env node
'use strict';

/**
 * lighthouse-agent.js
 *
 * Runs Lighthouse, analyses the report, and emits an actionable plan for
 * Claude Code to implement. Repeats until all category scores reach the
 * target or the maximum number of iterations is exhausted.
 *
 * Usage:
 *   node lighthouse-agent.js [options]
 *
 * Options (CLI flags override env vars):
 *   --url=<url>              URL to audit          (env: LIGHTHOUSE_URL,            default: http://localhost:3000)
 *   --target=<0-100>         Minimum score         (env: LIGHTHOUSE_TARGET,         default: 90)
 *   --max-iterations=<n>     Max iterations        (env: LIGHTHOUSE_MAX_ITERATIONS, default: 3)
 *   --port=<n>               Local server port     (env: PORT,                      default: 3000)
 */

const { execSync, spawn } = require('child_process');
const fs   = require('fs');
const path = require('path');
const http  = require('http');
const https = require('https');

// ── Configuration ─────────────────────────────────────────────────────────────

const args = parseArgs(process.argv.slice(2));

const TARGET_URL     = args.url              || process.env.LIGHTHOUSE_URL            || 'http://localhost:3000';
const TARGET_SCORE   = Number(args.target    ?? process.env.LIGHTHOUSE_TARGET         ?? 90);
const MAX_ITERATIONS = Number(args['max-iterations'] ?? process.env.LIGHTHOUSE_MAX_ITERATIONS ?? 3);
const PORT           = Number(args.port      ?? process.env.PORT                      ?? 3000);

const ROOT        = __dirname;
const STATE_FILE  = path.join(ROOT, '.lighthouse-state.json');
const REPORT_FILE = path.join(ROOT, '.lighthouse-report.json');
const SUMMARY_FILE = path.join(ROOT, 'summary.md');

// ── Utilities ─────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const result = {};
  for (const arg of argv) {
    const m = arg.match(/^--([^=]+)(?:=(.+))?$/);
    if (m) result[m[1]] = m[2] !== undefined ? m[2] : true;
  }
  return result;
}

function log(msg) {
  process.stderr.write(`[lighthouse-agent] ${msg}\n`);
}

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch { /* fall through */ }
  }
  return { iteration: 0, history: [] };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function clearState() {
  [STATE_FILE, REPORT_FILE].forEach(f => { if (fs.existsSync(f)) fs.unlinkSync(f); });
}

// ── Server lifecycle ──────────────────────────────────────────────────────────

function waitForServer(url, timeoutMs = 180_000) {
  const lib = url.startsWith('https') ? https : http;
  const deadline = Date.now() + timeoutMs;

  return new Promise((resolve, reject) => {
    function attempt() {
      if (Date.now() > deadline) {
        return reject(new Error(`Server at ${url} did not become ready within ${timeoutMs / 1000}s`));
      }
      const req = lib.get(url, res => { res.resume(); resolve(); });
      req.on('error', () => setTimeout(attempt, 2000));
      req.setTimeout(3000, () => { req.destroy(); setTimeout(attempt, 2000); });
    }
    attempt();
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    log('Building production bundle (yarn build)…');
    try {
      execSync('yarn build', { stdio: 'inherit', cwd: ROOT });
    } catch (err) {
      return reject(new Error('yarn build failed — fix build errors before running Lighthouse'));
    }

    log(`Starting production server on port ${PORT} (yarn start)…`);
    const proc = spawn('yarn', ['start', '--port', String(PORT)], {
      stdio: 'ignore',
      cwd: ROOT,
      detached: false,
    });
    proc.on('error', reject);
    resolve(proc);
  });
}

function stopServer(proc) {
  if (!proc) return;
  try { proc.kill('SIGTERM'); } catch { /* already dead */ }
  log('Server stopped.');
}

// ── Lighthouse ────────────────────────────────────────────────────────────────

function runLighthouse(url) {
  log('Running Lighthouse…');
  // --no-sandbox required on many Linux environments; harmless elsewhere.
  const chromeFlags = '"--headless --no-sandbox --disable-gpu"';
  const cmd = [
    'npx --yes lighthouse',
    `"${url}"`,
    '--output=json',
    `--output-path="${REPORT_FILE}"`,
    '--form-factor=mobile',
    '--screenEmulation.mobile=true',
    '--screenEmulation.width=375',
    '--screenEmulation.height=667',
    '--screenEmulation.deviceScaleFactor=2',
    `--chrome-flags=${chromeFlags}`,
    '--quiet',
  ].join(' ');

  try {
    execSync(cmd, { stdio: ['ignore', 'ignore', 'inherit'], cwd: ROOT });
  } catch {
    throw new Error('Lighthouse run failed — ensure Chromium/Chrome is installed and the server is reachable');
  }

  return JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8'));
}

// ── Score analysis ────────────────────────────────────────────────────────────

const CATEGORY_LABELS = {
  performance:      'Performance',
  accessibility:    'Accessibility',
  'best-practices': 'Best Practices',
  seo:              'SEO',
};

function extractScores(report) {
  const out = {};
  for (const id of Object.keys(CATEGORY_LABELS)) {
    out[id] = Math.round((report.categories[id]?.score ?? 0) * 100);
  }
  return out;
}

function allPass(scores) {
  return Object.values(scores).every(s => s >= TARGET_SCORE);
}

function failingAudits(report, categoryId) {
  const cat = report.categories[categoryId];
  if (!cat) return [];

  return cat.auditRefs
    .filter(ref => ref.weight > 0)                        // only weighted audits
    .map(ref => ({ weight: ref.weight, audit: report.audits[ref.id] }))
    .filter(({ audit: a }) => a && a.score !== null && a.score < 0.9)
    .sort((a, b) => a.audit.score - b.audit.score)        // worst first
    .slice(0, 12)
    .map(({ weight, audit: a }) => ({
      id:           a.id,
      title:        a.title,
      description:  (a.description || '').split('\n')[0].replace(/\[Learn.*?\]\(.*?\)/g, '').trim(),
      score:        Math.round((a.score ?? 0) * 100),
      displayValue: a.displayValue || null,
      weight,
    }));
}

// ── Plan generator ────────────────────────────────────────────────────────────

function buildPlan(report, scores, state) {
  const failing = Object.entries(scores).filter(([, s]) => s < TARGET_SCORE);
  const L = [];

  L.push(`# Lighthouse Agent — Iteration ${state.iteration} / ${MAX_ITERATIONS}`);
  L.push('');
  L.push('## Scores');
  L.push('| Category | Score | Target | Status |');
  L.push('|---|:---:|:---:|:---:|');
  for (const [id, score] of Object.entries(scores)) {
    const label  = CATEGORY_LABELS[id] || id;
    const status = score >= TARGET_SCORE ? '✅ Pass' : '❌ Fail';
    L.push(`| ${label} | **${score}** | ${TARGET_SCORE} | ${status} |`);
  }
  L.push('');

  if (failing.length === 0) {
    L.push('🎉 All categories pass the target score. No further action needed.');
    return L.join('\n');
  }

  L.push('## Your Mission');
  L.push(`You are a Next.js performance expert. Implement the fixes below in this codebase to raise every failing Lighthouse category to **≥ ${TARGET_SCORE}**.`);
  L.push('');
  L.push(`- Iterations remaining after this one: **${MAX_ITERATIONS - state.iteration}**`);
  L.push('- Apply ALL applicable fixes before finishing.');
  L.push('- Do **not** edit `lighthouse-agent.js`, `.lighthouse-state.json`, or `.lighthouse-report.json`.');
  L.push('');

  // Per-category failing audits
  for (const [categoryId, score] of failing) {
    const label   = CATEGORY_LABELS[categoryId] || categoryId;
    const audits  = failingAudits(report, categoryId);
    L.push(`---`);
    L.push(`## ${label} — ${score} / ${TARGET_SCORE}`);
    L.push('');

    if (audits.length === 0) {
      L.push('_No specific failing audits with weight > 0. Fixing other categories may improve this score indirectly._');
      L.push('');
      continue;
    }

    for (const a of audits) {
      L.push(`### ${a.title} (score: ${a.score})`);
      if (a.displayValue) L.push(`> Current value: ${a.displayValue}`);
      if (a.description)  L.push(`> ${a.description}`);
      L.push('');
    }
  }

  // General Next.js fixes cheat-sheet
  L.push('---');
  L.push('## Next.js Fixes Reference');
  L.push('');
  L.push('### Performance');
  L.push('- Replace `<img>` with `next/image`; set `width`, `height`, and `loading="lazy"` for below-fold images.');
  L.push('- Add `priority` prop to the largest above-fold image (LCP element).');
  L.push('- Use `next/script` with `strategy="lazyOnload"` for third-party scripts.');
  L.push('- Use `next/dynamic` with `{ ssr: false }` or `{ loading: () => <Spinner/> }` to code-split heavy components.');
  L.push('- Avoid importing full lodash; use per-method imports (`lodash/debounce`).');
  L.push('- Ensure fonts are loaded with `next/font` (self-hosted, no layout shift).');
  L.push('- Add `Cache-Control` headers to `next.config.js` for static assets.');
  L.push('');
  L.push('### Accessibility');
  L.push('- Set `<html lang="en">` in `pages/_document.tsx`.');
  L.push('- Add `alt` text to all `<img>` and `next/image` elements (use `alt=""` for decorative images).');
  L.push('- Add `aria-label` or visible text to icon-only buttons/links.');
  L.push('- Ensure color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text.');
  L.push('- Make sure every `<input>` has an associated `<label>` (or `aria-label`).');
  L.push('- Avoid positive `tabIndex` values.');
  L.push('');
  L.push('### Best Practices');
  L.push('- Serve all resources over HTTPS.');
  L.push('- Add `rel="noopener noreferrer"` to external `<a target="_blank">` links.');
  L.push('- Remove `console.log` calls or guard with `process.env.NODE_ENV !== "production"`.');
  L.push('- Ensure no deprecated APIs are used.');
  L.push('');
  L.push('### SEO');
  L.push('- Add a unique `<title>` and `<meta name="description">` to every page via `next/head`.');
  L.push('- Ensure links have descriptive text (avoid "click here", "read more" without context).');
  L.push('- Add `robots.txt` and `sitemap.xml` if missing.');
  L.push('- Do not use `<meta name="robots" content="noindex">` on public pages.');
  L.push('');
  L.push('---');
  L.push('## After Implementing Fixes');
  L.push('Run the agent again with the **same arguments** to measure the new scores:');
  L.push('```bash');
  L.push(`node lighthouse-agent.js --url="${TARGET_URL}" --target=${TARGET_SCORE} --max-iterations=${MAX_ITERATIONS}`);
  L.push('```');

  return L.join('\n');
}

// ── Summary writer ────────────────────────────────────────────────────────────

function writeSummary(state) {
  const last    = state.history[state.history.length - 1];
  const success = last && allPass(last.scores);
  const L       = [];

  L.push('# Lighthouse Optimization Summary');
  L.push('');
  L.push(`| Setting | Value |`);
  L.push(`|---|---|`);
  L.push(`| URL | ${TARGET_URL} |`);
  L.push(`| Target score | ${TARGET_SCORE} |`);
  L.push(`| Max iterations | ${MAX_ITERATIONS} |`);
  L.push(`| Iterations run | ${state.iteration} |`);
  L.push('');
  L.push('## Score Progression');
  L.push('| Iteration | Performance | Accessibility | Best Practices | SEO |');
  L.push('|:---:|:---:|:---:|:---:|:---:|');
  for (const entry of state.history) {
    const s = entry.scores;
    L.push(`| ${entry.iteration} | ${s.performance} | ${s.accessibility} | ${s['best-practices']} | ${s.seo} |`);
  }
  L.push('');
  L.push('## Outcome');
  if (success) {
    L.push(`✅ All Lighthouse categories reached the target score of **${TARGET_SCORE}**.`);
  } else {
    L.push(`⚠️ Maximum iterations (${MAX_ITERATIONS}) reached. One or more categories may still be below the target of **${TARGET_SCORE}**.`);
    if (last) {
      const still = Object.entries(last.scores)
        .filter(([, s]) => s < TARGET_SCORE)
        .map(([id, s]) => `${CATEGORY_LABELS[id]} (${s})`);
      if (still.length) L.push(`Still failing: ${still.join(', ')}.`);
    }
  }
  L.push('');
  L.push('## What Was Changed');
  L.push('See the git log for the full list of changes made during this session:');
  L.push('```bash');
  L.push('git log --oneline');
  L.push('```');

  fs.writeFileSync(SUMMARY_FILE, L.join('\n'));
  log(`Summary written → ${SUMMARY_FILE}`);
}

// ── Entry point ───────────────────────────────────────────────────────────────

async function main() {
  log('─────────────────────────────────────────');
  log(`URL:            ${TARGET_URL}`);
  log(`Target score:   ${TARGET_SCORE}`);
  log(`Max iterations: ${MAX_ITERATIONS}`);
  log('─────────────────────────────────────────');

  const state = loadState();
  state.iteration += 1;
  saveState(state);

  const isLocal = /localhost|127\.0\.0\.1/.test(TARGET_URL);
  let serverProcess = null;

  try {
    if (isLocal) {
      serverProcess = await startServer();
      log('Waiting for server to be ready…');
      await waitForServer(TARGET_URL);
      log('Server is ready.');
    }

    const report = runLighthouse(TARGET_URL);
    const scores = extractScores(report);

    log(`Scores → Performance: ${scores.performance} | Accessibility: ${scores.accessibility} | Best Practices: ${scores['best-practices']} | SEO: ${scores.seo}`);

    state.history.push({ iteration: state.iteration, scores });
    saveState(state);

    const done      = allPass(scores);
    const exhausted = state.iteration >= MAX_ITERATIONS;

    if (done || exhausted) {
      writeSummary(state);
      clearState();
      if (done)      log('✅ All scores meet the target. Done!');
      else           log('⚠️  Max iterations reached. See summary.md for details.');
    }

    // Always emit the plan (even on completion, so the final scores are visible)
    process.stdout.write(buildPlan(report, scores, state) + '\n');

  } finally {
    stopServer(serverProcess);
  }
}

main().catch(err => {
  log(`Fatal: ${err.message}`);
  process.exit(1);
});
````

And here’s the prompt I used to make Claude build and run the application, then actually interact with the script, run the workflow, and apply the necessary fixes to the codebase.

````markdown
# Lighthouse Optimization Loop

## Your Role
You are a Next.js performance expert. Your job is to iteratively improve the Lighthouse scores of this application until every category reaches the minimum target score or the maximum number of iterations is exhausted.

## Before You Start — Ask the User
Ask the user for the following two values before doing anything else:
1. **Target score** — the minimum acceptable Lighthouse score for every category (0–100). Default: 90.
2. **Max iterations** — the maximum number of build → audit → fix cycles to run. Default: 3.

Do not proceed until the user provides (or confirms) these values.

## The Loop

Repeat the following cycle until **all category scores ≥ target** or **max iterations is reached**:

### Step 1 — Build
Run the production build:
```bash
yarn build
```
If the build fails, stop immediately and report the error to the user. Do not continue.

### Step 2 — Start the server
Start the production server in the background on the default port (3000):
```bash
yarn start &
```
Wait until the server is ready before proceeding (poll `http://localhost:3000` if needed).

### Step 3 — Run the Lighthouse agent
Run the audit and capture its output:
```bash
node lighthouse-agent.js --url="http://localhost:3000" --target=<TARGET_SCORE> --max-iterations=<MAX_ITERATIONS>
```
Replace `<TARGET_SCORE>` and `<MAX_ITERATIONS>` with the values confirmed in the pre-flight step.

### Step 4 — Stop the server
Kill the background server process before making any code changes:
```bash
kill $(lsof -ti:3000) 2>/dev/null || true
```

### Step 5 — Read the plan
Read the output from Step 3. It contains:
- Current scores per category
- A list of failing audits with weights and descriptions
- A Next.js fixes reference cheat-sheet

If all scores already pass, skip to **Done**.

### Step 6 — Implement fixes
Apply every applicable fix listed in the plan to the codebase.

**Rules you must follow:**
- Do **not** install or remove any package (npm/yarn) without first asking the user and waiting for explicit approval.
- Do **not** make assumptions about intent — if a fix is ambiguous or could be implemented in multiple ways, ask the user to clarify before proceeding.
- Do **not** modify `lighthouse-agent.js`, `.lighthouse-state.json`, or `.lighthouse-report.json`.
- Keep changes minimal and focused — do not refactor code unrelated to the failing audits.
- After implementing all fixes, briefly summarise what you changed and why.

Then go back to **Step 1** for the next iteration.

## Done
When the loop ends (all scores pass or max iterations reached), create or edit `summary.md` and present its contents to the user.
````

## Final Thoughts

I set the minimum score to 90 and capped it at 5 iterations. My app went from **60, 77, 96, 92** to **92, 100, 96, 100**. Pretty satisfying. I can still fine-tune here and there, but honestly? I’m impressed. I even had Claude auto-generate a summary of all changes at the end so I could review them.

Of course, like any AI-assisted work, you need to keep a tight leash. In my case, the AI removed some packages, killed a few flows and honestly? They deserved it. They worked, but users barely touched them, and we weren’t maintaining that code anyway. As the clean code philosophers say: *“The best code is the code you don’t have to write.”*

Drop your contributions below, this flow can definitely be improved. And if anyone from the Lighthouse team is reading this: I’m sorry for automating the rage you usually inspire manually. Blame Claude, it was its idea.
