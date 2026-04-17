# Project: Interactive Intuition for Radnomness & Uncertainty

## Purpose

This project is an interactive web application designed to build intuition for randomness, sampling, and statistical behavior through direct interaction and simulation.

The goal is NOT to teach formal statistics through explanation.

The goal IS to help users develop a mental model of how statistics works by:

- running experiments
- observing outcomes
- noticing patterns

This project sits between:

- an educational product
- a thinking tool

---

## Target Users

Primary:

- technically literate users who encounter data or metrics
- includes students, analysts, engineers, product managers

Key assumption:

- users may know statistical terms but lack intuition

---

## Core Product Principles

These are strict constraints.

### 1. Interaction First

All understanding should come from:

- running simulations
- observing results

Avoid:

- long explanations
- static teaching

---

### 2. Minimal Explanation

Text should:

- guide attention
- suggest actions
- highlight patterns

Text should NOT:

- define terms
- lecture
- include formulas (for now)

---

### 3. One Idea per Experience

Each experience or lesson should focus on a single core idea.

For current prototype:

- how sample means behave
- how variability changes with sample size

---

### 4. Visual Simplicity

Charts must be:

- clean
- uncluttered
- easy to read at a glance

Avoid:

- unnecessary annotations
- complex overlays
- excessive controls

---

### 5. Immediate Feedback Loop

User actions should result in:

- immediate visual change

The core loop:

- click → observe → repeat

---

### 6. Emergence Over Explanation

The product should allow patterns to emerge:

- distributions forming over time
- variability becoming visible
- convergence becoming obvious

Avoid explaining what the user can see.

---

## Current Scope (v0)

Single-page application with three coordinated panels:

### 1. Population

- shows the source distribution
- selectable types

Purpose:

- define the "world" being sampled

---

### 2. Current Sample

- shows one sample drawn from the population
- points displayed on a single horizontal axis
- slight jitter only for visibility

Purpose:

- make sampling feel concrete and variable

---

### 3. Sampling Distribution

- histogram of sample means over repeated draws
- updates incrementally

Purpose:

- show how structure emerges from repeated sampling

---

## Interaction Model

Controls:

- population selector
- sample size slider
- draw one sample
- draw many samples
- run / pause continuous sampling
- reset

Behavior:

- continuous run mode repeatedly draws samples
- changing population or sample size resets state
- accumulation is visible and progressive

---

## Lesson Layer (Lightweight)

The application includes minimal guidance text.

This is NOT a full lesson system.

Instead:

- short prompts guide user exploration
- text reacts to state where appropriate

Examples:

- "Draw a few samples. What do you notice?"
- "Increase the sample size and run again."
- "Larger samples produce more stable averages."

---

## Non-Goals (Important)

Do NOT implement:

- full curriculum or course structure
- user accounts
- saving or persistence
- quizzes or assessments
- heavy text explanations
- statistical formulas or formal definitions (for now)

---

## Visual Design Guidelines

- use card-based layout
- consistent spacing and typography
- soft backgrounds, low contrast noise
- charts should feel embedded, not dominant

Charts:

- no legends unless necessary
- minimal annotation
- consistent color palette

---

## Future Direction (Not for v0)

Potential extensions:

- additional experiences:
  - variability of small samples
  - streaks and randomness
  - rare events
- transition into inference concepts
- multi-step guided lessons

These are NOT part of initial implementation.

---

## Implementation Notes

- Next.js (App Router)
- React components
- Plotly for charts
- client-side simulation logic
- no backend required

---

## Success Criteria (v0)

The app is successful if:

- users naturally click and explore without instruction
- repeated interaction feels satisfying
- users notice patterns without being told explicitly
- the experience feels intuitive, not academic

---

## Key Philosophy

This project is about:

> Helping users _feel_ how randomness behaves

Not about:

> Teaching statistics in a traditional way
