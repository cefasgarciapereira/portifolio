---
title: Como o Claude Deixou Meus Scores do Lighthouse em 100 (Ou Pelo Menos Tentou)
slug: como-o-claude-deixou-meus-scores-do-lighthouse-em-100-ou-pelo-menos-tentou
date: '2026-03-18T01:48:39.000Z'
description: 'Um agente simples em Node.js que roda o Lighthouse, transforma o relatório em um plano e deixa o Claude Code corrigir o app em loop até todo score passar de 90.'
tags:
  - claude-code
  - front-end-development
  - ai-agent
  - seo
  - tutorial
lang: pt
translation: how-claude-left-my-lighthouse-scores-at-or-at-least-tried
---

![Como o Claude Deixou Meus Scores do Lighthouse em 100 (Ou Pelo Menos Tentou)](/blog/how-claude-left-my-lighthouse-scores-at-or-at-least-tried/01.webp)
*Foto de [Christopher Gower](https://unsplash.com/@cgower) no [Unsplash](https://unsplash.com/)*

Se você trabalha com front-end, já lidou, está lidando ou vai lidar com as métricas do **Lighthouse**. Se você está no time do “vai lidar”, aqui vai uma explicação rápida:

O Lighthouse é uma ferramenta de relatórios que analisa sua aplicação web e a avalia em quatro áreas: Performance (o quão rápido ela carrega), Acessibilidade (se ela pode ser usada por pessoas diferentes), Boas Práticas (se você está seguindo os padrões recomendados) e SEO (o quão facilmente ela é encontrada pelos buscadores). As notas vão de 0 a 100, e qualquer coisa abaixo de 90 normalmente indica que há espaço para melhorar. Para quem trabalha com front-end, essas métricas costumam refletir se os usuários ficam e interagem com o conteúdo ou vão embora por causa da lentidão, como quando a imagem principal demora demais para aparecer numa conexão mais lenta.

Isso se encaixa bem na conversa mais ampla que temos tido sobre construir experiências web melhores, como quando falamos sobre os [**“Benefícios do HTML semântico que você não pode ignorar”**](/blog/beneficios-do-html-semantico-que-voce-nao-pode-ignorar). O Lighthouse é basicamente o fiscal que confere se aquele seu markup semântico lindo performa de verdade no mundo real, e não só na teoria.

Atualmente estou trabalhando em um projeto público, o que significa que a plataforma precisa ser fácil de encontrar e ter boa performance, principalmente em dispositivos móveis, onde vive a maior parte dos nossos usuários. Manter as métricas acima de 90 é uma tarefa recorrente e, sinceramente, um pouco frustrante. Você mexe em um fluxo existente e, de repente, uma página da qual você tinha tanto orgulho cai dez pontos.

Foi aí que pensei: e se a IA cuidasse desse trabalho? Imaginei algo como o Prettier ou o ESLint, ferramentas que você roda depois de terminar uma feature para arrumar as coisas e garantir os padrões. Mas isso vai além: dá para usar IA para melhorar uma aplicação cujo time nunca se preocupou com essas métricas, mas que, depois de alguma pesquisa, decidiu se importar.

Eu nunca tinha usado o Lighthouse CLI, então comecei por aí. Instalei o pacote e, aos poucos, construí um agente em JavaScript extremamente simples para executar esse fluxo. Funciona assim:

## A Arquitetura

![Diagrama da arquitetura: seu código vai para o Lighthouse, as métricas viram um prompt, o Claude edita o código e o loop se repete até atingir o score alvo ou o limite de iterações](/blog/how-claude-left-my-lighthouse-scores-at-or-at-least-tried/02.webp)

### O Fluxo

**Auditar:** o Lighthouse CLI analisa sua aplicação e devolve os scores  
**Extrair:** o script lê o relatório JSON e pega as quatro métricas principais  
**Planejar:** gera um prompt detalhado com os scores atuais, as falhas específicas e uma estratégia de implementação  
**Delegar:** entrega o prompt ao Claude com instruções claras do que corrigir  
**Implementar:** o Claude edita sua base de código (sim, ele escreve código de verdade)  
**Verificar:** o script roda o Lighthouse de novo no código atualizado  
**Julgar:** os scores são comparados com o mínimo definido (por exemplo, 90)  
**Repetir:** o loop continua até os scores atingirem a meta OU o número máximo de iterações ser alcançado (o que vier primeiro)

Pense nisso como colocar o Lighthouse e o Claude juntos numa sala e avisar que eles só saem quando fizerem as pazes.

## O Código

Antes de tudo, você vai precisar instalar o lighthouse e garantir que tem o Chrome/Chromium instalado.

```bash
npm install lighthouse
```

Aqui está o código do agente, é só copiar e colar na sua base de código:

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

E aqui está o prompt que usei para fazer o Claude buildar e rodar a aplicação, interagir com o script, executar o fluxo e aplicar as correções necessárias na base de código.

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

## Considerações Finais

Defini o score mínimo em 90 e limitei a 5 iterações. Meu app foi de **60, 77, 96, 92** para **92, 100, 96, 100**. Bem satisfatório. Ainda dá para ajustar uma coisa aqui e outra ali, mas, sinceramente? Fiquei impressionado. Ainda pedi para o Claude gerar automaticamente um resumo de todas as mudanças no final, para eu poder revisar.

Claro que, como todo trabalho assistido por IA, é preciso manter as rédeas curtas. No meu caso, a IA removeu alguns pacotes, matou alguns fluxos e, sinceramente? Eles mereceram. Funcionavam, mas os usuários quase não usavam, e nós nem estávamos mantendo aquele código. Como dizem os filósofos do clean code: *“O melhor código é aquele que você não precisa escrever.”*

Deixe suas contribuições, esse fluxo com certeza pode ser melhorado. E se alguém do time do Lighthouse estiver lendo: desculpa por automatizar a raiva que vocês normalmente inspiram de forma manual. A culpa é do Claude, a ideia foi dele.
