# OMNISTACK Founder Edition — Product Requirements Document

**Version:** 0.2
**Classification:** Founder Edition / Creative Product Development
**Authority model:** 🟢 Green — architecture, specification, and system design. 🔴 Red — Founder-locked creative, brand, IP, and canon decisions (not delegable).
**Implementation status:** 🔴 Software construction NOT AUTHORIZED. This document is specification-only.
**Document owner:** CC / Product Requirements & Systems Architecture
**Last amended:** 2026-08-16 — Amendment 001, *Interactive Games, TCG & Commercial Product Expansion v1.0* (see `amendments/`)

> This is the first fully written instantiation of the Founder Edition PRD in this repository. Section 1 records the baseline OMNISTACK lifecycle (Writer + Visual) as it existed prior to Amendment 001, at the depth needed to give downstream capability families something concrete to integrate with. Section 2 onward integrates Amendment 001 in full. Future amendments append to `amendments/amendment-log.md` and are folded into this document in place, the same way Amendment 001 is folded in here.

---

## 0. Document Control

| Field | Value |
|---|---|
| Product | OMNISTACK — Founder Edition creative/product operating system |
| PRD version | 0.2 |
| Amendment history | 001 — Interactive Products & Games (2026-08-16) |
| Controlling doctrine | Generated ≠ canon. Founder retains final creative, IP, franchise, and canon authority. No software implementation without a separate, explicit authorization. |
| Consequential legal/IP/trademark decisions | Always route to qualified external professional counsel. OMNISTACK never represents itself as legal approval. |

---

## 1. Baseline: Pre-Amendment OMNISTACK Lifecycle (Writer + Visual)

This section is preserved as the controlling baseline. Amendment 001 extends it; it does not replace, subordinate, or route through it.

### 1.1 Baseline lifecycle

```
Idea → Validation → IP / Story Development → Product Form Selection
                                                    │
                        ┌───────────────────────────┴───────────────────────────┐
                        ▼                                                       ▼
                      BOOK                                                   VISUAL
              Writer → Publishing                                Visual Development → Production
```

### 1.2 Baseline departments (existing, unchanged by this amendment)

- Creative Operations
- Story Development
- World / Canon / Continuity
- Visual Development / Art Direction
- Publishing
- Product Architecture
- Web Design
- Website Development & Operations
- Marketing / Social
- Legal / IP professional review

### 1.3 Baseline AI team routing (existing, unchanged)

| Seat | Function |
|---|---|
| Chad | Creative/product integration, editorial integrity, commercialization routing |
| Claude | Adversarial review, research, legal/commercial preparation evidence |
| Gem | Competitor scans, market trends, visual/market research |
| CC | Product requirements, system architecture, schemas, implementation specifications, QA gates |
| Codey | Prototype software, simulations, tooling, integrations |
| Story Architect | Narrative architecture |
| Character Architect | Character construction |
| World Architect | World / lore implications |
| Power System Architect | Abilities, costs, interactions, systemic pressure |
| Continuity & Canon Integration | Cross-IP lore and canon consistency |
| Visual Development / Art Direction | Visual language, visual canon |

### 1.4 Baseline governing doctrine (existing, unchanged)

- Generated ≠ canon.
- Founder retains final creative, IP, franchise, and canon authority.
- Consequential legal/IP conclusions require qualified external review; OMNISTACK never represents itself as legal approval.

Amendment 001 (below) does not modify any baseline rule. It adds new rules that apply specifically to interactive products and games, alongside the baseline rules, which remain fully controlling for Writer and Visual production.

---

## 2. Amendment 001 — Interactive Products & Games (Capability Family)

**Status:** ADOPTED into this PRD. Full source record preserved at `amendments/001-interactive-products-and-games.md`.
**Effect:** Adds **Interactive Products & Games** as a first-class OMNISTACK capability family, a peer to Book (Writer/Publishing) and Visual (Visual Development/Production) — not a subordinate of Publishing. Contains two production lanes: **OMNISTACK TCG Builder** and **OMNISTACK Indie Game Designer**. Both lanes are separate productions that share world, canon, visual, product, manufacturing, publishing, marketing, legal-review, and release infrastructure with the rest of OMNISTACK.
**Commercial intent:** Concept → playable prototype → validated product → protected brand/IP → manufactured/published commercial release → expansions → special editions → long-term live catalog.
**Implementation authority:** Not granted by this amendment. Specification only.

### 2.1 Updated OMNISTACK lifecycle

The baseline lifecycle (§1.1) is superseded by the following, which preserves the BOOK and VISUAL branches unchanged and adds TCG and GAME as peer branches, all reconnecting downstream at Franchise Development:

```
Idea → Validation → IP / Story Development → Product Form Selection
                                                    │
        ┌───────────────┬───────────────────┬───────────────────┐
        ▼                ▼                   ▼                   ▼
      BOOK             VISUAL               TCG                GAME
  Writer →       Visual Development →  TCG Builder →      Indie Game Designer →
  Publishing        Production        Product Manufacturing   Game Production →
                                       → Organized Play      Distribution / Live Ops
        │                │                   │                   │
        └────────────────┴─────────┬─────────┴───────────────────┘
                                    ▼
                         Franchise Development
                     → Expansion → Licensing → Adaptation
                  → Special Editions → Collector Products
                          → Cross-media development
```

Every generic-lifecycle stage now reads, for interactive products, as:

```
Story / IP → Game Concept → Rules Architecture → Prototype → Playtesting → Balance
→ Visual Development → Canon Validation → Product Engineering → Commercial/Legal Readiness
→ Manufacturing / Digital Build → Distribution → Launch → Organized Play / Community
→ Expansion → Special Editions → Long-Term Franchise
```

### 2.2 Shared vs. lane-specific infrastructure

TCG Builder and Indie Game Designer are **separate production lanes** with independent GDDs/Game Design Bibles, backlogs, builds, and QA states. They **share**, rather than duplicate:

- World, canon, and continuity (via World Architect / Continuity & Canon Integration — §1.3)
- Visual development and art direction infrastructure (§2.7, §2.14 — visual asset ≠ visual generation ≠ visual canon decision, per baseline doctrine)
- Product architecture and manufacturing/prepress infrastructure (§2.9, §2.10)
- Publishing infrastructure (baseline Publishing department, extended for physical/digital game products)
- Marketing / social infrastructure (baseline, extended for game launches and organized play)
- Legal-review infrastructure (baseline Legal/IP professional review, extended per §2.11)
- Release/launch infrastructure (baseline release process, extended for manufacturing lead times and storefront certification)

---

### 2.3 OMNISTACK TCG Builder

A complete end-to-end Trading Card Game creation, testing, production, commercialization, and expansion operating system. Its job is to help build an actual game — not to be a card generator.

#### 2.3.1 TCG project creation

**Identity fields:** working title, final title, parent IP, standalone or franchise-connected, intended audience, age rating target, competitive/casual/collectible emphasis, physical/digital/hybrid, solo/multiplayer, player count, typical match duration, complexity target.

**Commercial model** (none selected automatically — Founder/design choice): booster-based TCG, expandable card game, living-card-game-style model, fixed deck system, starter-set model, draftable product, collectible battle game, narrative card game, cooperative system, hybrid board/card game.

#### 2.3.2 Game Design Bible (required for every TCG)

Core fields: core fantasy, player fantasy, victory condition, loss conditions, turn structure, resource system, card zones, deck construction, hand rules, draw rules, mulligan, combat/conflict system, timing system, priority system, keywords, card types, rarity, factions/colors/affinities/houses/schools, board state, randomness, interaction windows, hidden information, comeback mechanics, snowball risks, match length, complexity budget.

**Readiness gate:** the system must be able to answer *"What meaningful decisions does the player make every turn?"* If it cannot, the game is not ready to proceed.

#### 2.3.3 Card type architecture

Customizable card-class templates (not mandatory categories — each game defines its own taxonomy): Character, Creature, Unit, Hero, Leader, Champion, Spell, Action, Reaction, Event, Location, Realm, Equipment, Weapon, Armor, Artifact, Relic, Vehicle, Resource, Mission, Quest, Condition, Token, Transformation, Companion, Faction, Structure.

#### 2.3.4 Card schema builder

Structured fields per card type; schema is per-game (different games may use entirely different schemas). Example (Character Card): Card ID, Card name, Set, Collector number, Faction, Cost, Type, Subtype, Keywords, Attack, Defense, Health, Speed, Ability text, Flavor text, Rarity, Artist, Canon status, Rules version, Print version, Legal format status, Visual asset, Alternate art variants, Errata state.

#### 2.3.5 Rules Engine

Maintains a machine-readable representation of game rules, tracking: legal actions, timing windows, targeting, costs, triggers, replacement effects, prevention effects, simultaneous events, zone transitions, state-based checks, victory checks, keyword definitions, exception hierarchy.

**Governing doctrine:** Card text may create exceptions to rules, but exceptions must be explicit and traceable. The engine must identify contradictions (e.g., a base rule that units cannot attack the turn they enter, versus a card granting an implicit attack trigger on entry that the engine does not have an explicit exception for) and **flag them rather than silently deciding.**

#### 2.3.6 Keyword system

Per-keyword record: keyword, definition, reminder text, timing, applicable card types, stacking behavior, exceptions, first set introduced, current rules version, deprecated?, renamed?, localization notes. Prevents keyword drift across expansions.

#### 2.3.7 Faction / color / archetype design

Per faction: strengths, weaknesses, resource behavior, signature mechanics, forbidden mechanics, playstyle, tempo profile, control profile, risk/reward profile, card advantage profile, lore, visual language, color/style system. System flags when every faction converges toward doing everything — healthy faction architecture requires meaningful asymmetry.

#### 2.3.8 Balance Engine

Per-card tracking: resource efficiency, stats-per-cost, card advantage, tempo, removal efficiency, reach, combo potential, repeatability, tutorability, resilience, recursion, win-rate contribution, pick rate, deck inclusion rate, matchup performance.

Flags: under-costed cards, dominant archetypes, non-games, infinite loops, overly consistent combos, oppressive lock states, dead cards, unplayable factions, first-player advantage, excessive variance, excessive tutoring, runaway resource generation.

**Doctrine:** balance data informs design; it does not replace design judgment.

#### 2.3.9 Combo & Interaction Detection (TCG Intelligence)

Builds a card-interaction graph across the card pool to surface potential infinite loops and unintended combo chains (e.g., Card A + Card B + Card C creating an unbounded loop) for designer review — a dedicated intelligence function, not a blocking gate.

#### 2.3.10 Deck Builder & Archetype Lab

Deck construction, sideboards, commanders/leaders where applicable, format restrictions, legality, curve analysis, resource distribution, card-type ratios, archetype detection, synergy scoring, test hands, probability calculations, draw odds, mulligan simulations. Archetype vocabulary (aggro, control, midrange, combo, tempo, ramp, swarm, mill, attrition, toolbox, tribal, alternate win condition) is a reference taxonomy, not a requirement — games are not required to use these terms.

#### 2.3.11 Playtesting System

Per-session data: game version, rules version, decks, players, experience level, winner, turns, duration, first player, cards played, cards never used, disputes, confusing rules, emotional high points, boring stretches, broken interactions, perceived fairness, fun score, replay intention.

**Stages:** Internal Theory Test → Developer Test → Closed Alpha → Blind Rules Test → Closed Beta → Public Demo → Preproduction Validation.

**Doctrine:** blind testing is mandatory before rules are considered done. If players cannot play from the written rules without the designer present to explain, the rules are not finished.

#### 2.3.12 Rulebook Builder

Generates and maintains, from one governed rules source: Quick Start Rules, Full Rulebook, Comprehensive Rules, Keyword Glossary, FAQ, Errata, Tournament Rules, Organized Play Policy. No conflicting parallel rulebooks.

#### 2.3.13 Set Builder

Per-set record: Set code, Set name, Set number, Release role, Story/theme, Mechanics introduced, Mechanics returning, Total cards, rarity distribution, faction distribution, archetype support, draft environment, chase cards, starter compatibility, collector variants, release date, legality, rotation date if applicable.

#### 2.3.14 Set Skeleton

Before individual card design begins: total card count and rarity distribution (example: 240-card set — 80 Common / 60 Uncommon / 55 Rare / 35 Epic / 10 Legendary), allocated across factions, card types, costs, mechanics, archetypes, interaction, removal, resources, build-around cards. Exact distributions are game-specific.

#### 2.3.15 Draft / Limited Environment

Where the TCG supports booster draft or sealed play, a dedicated Limited Design module tracks: archetype pairs/groups, fixing, removal density, bomb density, curve availability, combat tricks, color/faction signals, synergy requirements, dead picks, pack collation. Constructed balance and limited balance require separate testing.

#### 2.3.16 Rarity System

Evaluated by complexity, splashiness, build-around potential, desired limited frequency, lore prominence, collectibility, and printing constraints — not merely power. Reference classes (customizable names): Common, Uncommon, Rare, Epic, Legendary, Mythic, Promo.

#### 2.3.17 Collector System

Collector numbers, foil variants, alternate art, borderless, extended art, serialized cards, promotional cards, event promos, convention exclusives, founder editions, artist proofs, signature editions, premium finishes, etched foil, holo treatments, anniversary editions.

**Doctrine:** special editions must never gate the basic player's access to the game.

#### 2.3.18 Visual Development integration

Connects directly to shared Visual Development infrastructure (§2.2) for: character art, creature art, locations, artifacts, card frames, symbols, faction marks, icons, backs, booster packaging, starter boxes, playmats, tokens, counters, rulebook art, promotional art.

**Controlling separation:** Visual Asset ≠ Visual Generation ≠ Visual Canon Decision. Baseline doctrine (§1.4) applies without modification: **generated ≠ canon.**

#### 2.3.19 Card Frame Builder

Controlled card templates managing: title zone, art box, resource/cost, stats, type line, rules box, flavor text, rarity symbol, collector number, copyright line, legal line, artist credit, set symbol, foil indicators, accessibility considerations. Templates require safe zones and print-bleed controls.

#### 2.3.20 Print Prepress

Tracks card dimensions, bleed, trim, safe zone, DPI, color profile, black treatment, finishing, cardstock, coating, foil layer, spot UV, die cutting, collation, packaging, proof versions. No card art proceeds to production without a preflight pass.

#### 2.3.21 Manufacturing Module

Manufacturer RFQs, minimum order quantities, prototype cost, unit cost, freight, customs, packaging, warehousing, fulfillment, damage allowance, reprint thresholds, lead time, proof approval, production sample, manufacturing agreement, quality control.

**Cost model (true landed cost, not the printer quote alone):** printing + packaging + freight + duties + warehousing + fulfillment + payment fees + distributor/retailer margin + returns/damage.

#### 2.3.22 Commercialization pipeline

```
Concept → Rules Prototype → Playable Alpha → Validated Beta → Product Definition
→ Brand Clearance → IP / Trademark Review → Manufacturing Feasibility → Pricing
→ Distribution Strategy → Marketing → Preorders / Crowdfunding (if used)
→ Production → Launch → Post-launch Support
```

#### 2.3.23 Trademark & IP Readiness workflow

Organizes (does **not** determine registrability or grant legal approval): game title candidates, logo candidates, brand-use evidence, creator/contributor records, work-for-hire/license records, artwork provenance, music provenance, trademark-search preparation, classification questions, specimen preparation records, filing deadlines, renewal/maintenance calendar, international expansion considerations, domain/social handle availability.

**Professional-review boundary:** consequential trademark and copyright decisions route to qualified IP counsel. OMNISTACK never represents a conclusion here as legal approval.

#### 2.3.24 Licensing & Rights

Per external contribution (artist, designer, writer, developer, composer, manufacturer, photographer, font, stock asset, software library, licensed IP), tracks: owner, license, territory, duration, commercial rights, sublicensing, modification permission, exclusivity, credit requirement. No mystery assets at publication time.

#### 2.3.25 Product Family Architecture

Plans the TCG as a product ecosystem, not a single box: Core Game → Starter Set → Booster Set 1 → Expansion 1 → Expansion 2 → Special Edition → Collector Edition → Tournament Kit → Beginner Product → Premium Decks → Anniversary Release → Crossover Set → Digital Companion. Every product requires an explicit strategic role.

#### 2.3.26 Expansion Roadmap

Multi-year planner tracking: narrative arc, mechanics introduced, mechanics retired, faction evolution, power creep, complexity creep, reprints, rotation, accessibility, new-player entry points, collector strategy, organized play, manufacturing windows.

**Doctrine:** every expansion must create new decisions, not merely bigger numbers.

#### 2.3.27 Special Editions

Explicitly supported edition types: Founder Edition, First Edition, Collector Edition, Deluxe Edition, Anniversary Edition, Convention Edition, Tournament Edition, Art Edition, Foil Edition, Serialized Edition, Retail Exclusive, Kickstarter/Crowdfunding Edition, Regional Edition, Holiday Edition, Crossover Edition. Per edition: product ID, print quantity, contents, differences, legal status, MSRP, manufacturing cost, target audience, release channel.

#### 2.3.28 Organized Play

Tournament formats, casual formats, league system, event kit, judge/rules program, tournament software integration, banned/restricted list, format legality, seasonal rankings, championship structure, promo support. Not mandatory for every game; built into the system.

#### 2.3.29 Live Game Management

Post-launch state (Development → Live Operations) tracks: errata, balance changes, bans, restrictions, FAQs, rules revisions, player complaints, metagame data, product availability, reprints, counterfeit reports, community health, upcoming expansions. A TCG is not finished when the first box ships.

#### 2.3.30 Digital Companion (optional)

Card database, deck builder, collection tracker, rules search, tournament locator, event registration, account system, QR-linked cards, lore entries, digital redemption, organized-play records. Connects to the Website Development & Operations Department (baseline §1.2).

---

### 2.4 OMNISTACK Indie Game Designer

Broader than the TCG lane: supports commercially viable tabletop games, board games, card games, RPGs, tactical/strategy games, digital games, visual novels, narrative adventures, platformers, RPG video games, simulation games, puzzle games, mobile games, PC games, and console-ready projects where capability allows. Does not assume every game requires the same development process.

#### 2.4.1 Game Concept Studio

Every project begins with: game premise, player fantasy, genre, platform, audience, number of players, session length, core loop, secondary loop, progression, failure state, win state, emotional promise, replayability, differentiation.

**Core-loop test:** *"What does the player repeatedly do that is fun?"* If the only answer is lore, visuals, or story, the game loop is not developed.

#### 2.4.2 Game Design Document (GDD)

Governed GDD containing: high concept, game pillars, core gameplay, mechanics, controls, progression, economy, combat, AI behavior, levels, story, characters, world, missions, UI/UX, audio, art direction, accessibility, monetization, platform, technical requirements, analytics, QA, release plan. Every major system has an owner and a version.

#### 2.4.3 Prototype Workflow

Paper Prototype → Mechanics Prototype → Graybox → Vertical Slice → Alpha → Beta → Release Candidate → Gold / Launch. Not every game requires every stage; the system recognizes all of them.

#### 2.4.4 Game Mechanics Lab

Per mechanic: purpose, input, output, player choice, feedback, failure, exploit risk, interaction with other mechanics, difficulty, tutorial requirement, accessibility concern.

#### 2.4.5 Narrative game integration

Connects directly to baseline Story Architect, Writing Architect, Character Architect, World Architect, Power System Architect, Continuity & Canon Integration (§1.3). Narrative-game records: quest, branch, choice, consequence, dialogue, character state, reputation, relationship state, flags, endings, canon status — enabling true branching narrative rather than detached screenplay files.

#### 2.4.6 Level / Mission Design

Per level/mission: objective, starting state, location, required mechanic, enemies/challenges, pacing, reward, failure, tutorial purpose, narrative purpose, secrets, replay hooks, QA state.

#### 2.4.7 Economy Design

Tracks sources, sinks, currencies, prices, rewards, crafting, upgrades, inflation, progression gates, grind, premium currency where applicable. Flags: infinite farming, broken sinks, useless currencies, exploit loops, grind walls.

#### 2.4.8 Difficulty System

Challenge curve, enemy scaling, puzzle complexity, resource scarcity, punishment, checkpoints, accessibility options, difficulty modes. Difficulty is not synonymous with inconvenience.

#### 2.4.9 Player Experience Intelligence

Maps Learn → Understand → Experiment → Master → Express, then flags: tutorial overload, information gaps, sudden difficulty spikes, unclear feedback, meaningless choices, repetitive play.

#### 2.4.10 Game Art Pipeline

Connects to shared Visual Development infrastructure (§2.2) for characters, enemies, creatures, environments, props, weapons, UI, icons, animation references, concept art, splash art, loading art, cinematic storyboards. Same controlling separation as §2.3.18: generated ≠ canon ≠ final production asset.

#### 2.4.11 Audio System

Tracks music, ambience, SFX, voice acting, dialogue, licensing, composer, stems, loops, implementation state.

#### 2.4.12 Engine / Technology decision

Supports planning around Unreal Engine, Unity, Godot, web technologies, custom engines, and tabletop/manual systems. Engine selection is requirements-driven, not hype-driven.

#### 2.4.13 Development Backlog

Epics, features, stories/tasks, bugs, technical debt, content tasks, asset tasks, QA, blockers, milestones. Integrates with OMNISTACK handoffs and Role Seats (§2.6).

#### 2.4.14 Version & Build Management

Build number, branch/version, platform, changelog, known bugs, save compatibility, test status, release channel.

#### 2.4.15 QA

Functional testing, gameplay testing, regression, balance, performance, compatibility, save corruption, controller/input, localization, accessibility, platform requirements, exploit testing.

#### 2.4.16 Commercial Indie Game Pipeline

```
Idea → Market Validation → Game Design → Prototype → Playtest → Vertical Slice → Budget
→ IP / Brand Review → Production → Alpha → Beta → Storefront Preparation
→ Certification (where applicable) → Launch → Patches → DLC / Expansion
→ Special Editions → Sequels / Franchise
```

#### 2.4.17 Store & Distribution Readiness

Plans for: direct website sales, Steam-type PC storefronts, console storefronts, mobile app stores, itch/indie marketplaces, retail distribution, crowdfunding, physical game shops, conventions, wholesale. Exact platform requirements must be checked at publication time (they change).

#### 2.4.18 Monetization

Supported models: premium purchase, free demo, episodic, DLC, expansion packs, cosmetic purchases, subscriptions, crowdfunding, collector editions, physical/digital bundles. **Doctrine:** the system never assumes predatory monetization is necessary.

#### 2.4.19 Expansion & DLC Planner

Tracks DLC, expansion, sequel, remaster, definitive edition, collector edition, soundtrack, art book, tabletop adaptation, TCG adaptation, novel/comic tie-in — creating direct interoperability with the existing IP architecture (baseline §1).

---

### 2.5 Navigation: GAMES module

New first-class OMNISTACK main-navigation entry:

```
GAMES
├── DASHBOARD
├── TCG BUILDER
│   ├── Game
│   ├── Cards
│   ├── Sets
│   ├── Rules
│   ├── Keywords
│   ├── Decks
│   ├── Balance
│   ├── Playtests
│   ├── Production
│   └── Organized Play
├── INDIE GAME DESIGNER
│   ├── Concept
│   ├── GDD
│   ├── Mechanics
│   ├── Narrative
│   ├── Levels
│   ├── Economy
│   ├── Art
│   ├── Audio
│   ├── Builds
│   └── QA
├── COMMERCIAL
│   ├── Product Plan
│   ├── Budget
│   ├── IP / Trademark Readiness
│   ├── Rights
│   ├── Manufacturing
│   ├── Distribution
│   ├── Stores
│   └── Launch
└── FRANCHISE
    ├── Expansions
    ├── DLC
    ├── Editions
    ├── Crossovers
    └── Licensing
```

29 named screens total across 4 top-level sections plus a dashboard.

---

### 2.6 Shared data entities

Added to the future Founder Edition schema as relational views over one governed system (not separate uncontrolled databases):

Game · Game Version · Ruleset · Rule · Keyword · Card · Card Type · Card Version · Set · Deck · Archetype · Playtest · Playtest Result · Balance Issue · Interaction/Combo · Format · Tournament · Product SKU · Edition · Manufacturing Quote · Manufacturer · Print Run · Game Build · Mechanic · Level · Mission · Quest · Dialogue Node · Economy · Game Asset · Rights Record · Trademark Readiness Record · Expansion · DLC · Patch.

---

### 2.7 Department architecture

New operating division: **Interactive Entertainment & Game Products Division**

| Department | Owns |
|---|---|
| TCG Design Department | Rules, cards, sets, decks, balance, playtesting |
| Indie Game Design Department | Mechanics, gameplay systems, GDDs, level/mission design, prototypes |
| Game Production Department | Development coordination, builds, asset integration, QA, milestones |
| Game Product & Manufacturing Department | Physical-game specifications, vendors, quotes, production, packaging |
| Organized Play & Community Department | Tournaments, leagues, judge/rules support, player ecosystem |

Integrates with existing baseline departments (§1.2): Creative Operations, Visual Development/Art Direction, Story Development, World/Canon/Continuity, Publishing, Product Architecture, Web Design, Website Development & Operations, Marketing/Social, Legal/IP professional review.

### 2.8 Role Seats

Future human/AI-swappable seats (seats are permanent even if operators change): Game Creative Director, Lead TCG Designer, Card Systems Designer, Set Designer, Balance Designer, Rules Editor, Playtest Coordinator, Game Designer, Systems Designer, Level Designer, Narrative Designer, Game Producer, Technical Game Designer, QA Lead, Game Product Manager, Manufacturing Coordinator, Organized Play Manager, Community Manager.

### 2.9 AI team routing (games-specific additions)

Extends baseline routing (§1.3) — same seats, scope extended to games:

| Seat | Games-specific scope |
|---|---|
| Chad | Creative/product integration, editorial integrity, commercialization routing |
| Claude | Adversarial rule review, balance claims, research, legal/commercial preparation evidence |
| Gem | Competitor scans, player/market trends, visual/game-market research |
| CC | Product requirements, system architecture, schemas, implementation specifications, QA gates |
| Codey | Prototype software, simulations, rules engines, card database, deck builder, probability tools, game systems, integrations |
| Story / Character / World / Power System Architects, Continuity & Canon Integration | Same baseline scope (§1.3), applied to game narrative and systemic design |
| Visual Development / Art Direction | Game visual language, character art, card art, UI references, visual canon |

External qualified professionals remain required for consequential legal/IP review (unchanged from baseline).

---

### 2.10 Founder-locked rules (games-specific, layered on baseline §1.4)

1. Playable before printable.
2. Fun before collectibility.
3. Generated art does not become canon or commercial production art merely by existing.
4. No expansion fixes a broken base game.
5. No rarity level exists only to manufacture artificial power.
6. No game mechanic is canon merely because it appears in a prototype.
7. No trademark filing, licensing conclusion, or IP-clearance conclusion is represented as legally approved without qualified review.
8. Every expansion must create meaningful new decisions rather than only numerical escalation.
9. Every commercially released product must have rights provenance for its text, code, art, audio, fonts, branding, and licensed assets.
10. The player experience controls game design; lore serves the game when the product is a game.
11. Founder retains final creative, IP, franchise, and canon authority.

---

### 2.11 Approval gates & professional-review boundaries

Synthesized from the pipelines in §2.3.22 and §2.4.16, so every stage transition has an explicit owner and gate type.

| Gate | Applies to | Gate type | Owner |
|---|---|---|---|
| Design readiness ("what's the turn-by-turn decision?" / "what's the fun loop?") | TCG, Indie Game | Design gate | Lead TCG Designer / Game Designer |
| Rules-engine contradiction flags resolved | TCG | Design gate (never auto-resolved) | Rules Editor |
| Blind playtest pass (rules usable without designer present) | TCG, Indie Game | Quality gate | Playtest Coordinator / QA Lead |
| Balance sign-off (informs, does not replace judgment) | TCG | Design gate | Balance Designer |
| Canon Validation | TCG, Indie Game | 🔴 Founder-locked | Founder + Continuity & Canon Integration |
| Visual Canon Decision (generated asset → canon/production asset) | TCG, Indie Game | 🔴 Founder-locked | Founder + Visual Development / Art Direction |
| Brand Clearance | TCG, Indie Game | Professional-review gated | Legal/IP counsel |
| IP / Trademark Review | TCG, Indie Game | 🔒 Professional-review required, non-delegable | Qualified external IP counsel |
| Rights provenance complete (no mystery assets) | TCG, Indie Game | Compliance gate | Game Product Manager / Legal |
| Manufacturing Feasibility & preflight pass | TCG (physical), Indie Game (physical SKUs) | Quality/compliance gate | Manufacturing Coordinator |
| Manufacturing agreement / QC sign-off | TCG, Indie Game | Compliance gate | Manufacturing Coordinator + Legal |
| Storefront certification (platform-specific) | Indie Game | External platform gate | Game Producer |
| Franchise / expansion "new decisions, not just bigger numbers" | TCG, Indie Game | 🔴 Founder-locked design gate | Founder + Game Creative Director |
| Launch readiness (commercial + legal + manufacturing + marketing aligned) | TCG, Indie Game | Cross-functional gate | Game Product Manager |
| Software implementation authorization | TCG, Indie Game | 🔴 Founder-locked, separate from this PRD | Founder |

---

### 2.12 Commercial end state

- **TCG Builder target:** a documented, playtested, balanced, rights-cleared, brand-ready, manufacture-ready, commercially packaged game with a sustainable expansion and collector strategy — not "I made some cards."
- **Indie Game Designer target:** a validated game design capable of moving through prototype, production, QA, commercial release, post-launch support, and franchise expansion under controlled ownership — not "I have a game idea."

---

## 3. Controlled Amendment Disposition (Amendment 001)

| Item | Disposition |
|---|---|
| OMNISTACK TCG Builder | 🟢 ADD |
| TCG Commercialization Pipeline | 🟢 ADD |
| Card/Rules Intelligence | 🟢 ADD |
| Set & Expansion Builder | 🟢 ADD |
| Deck/Archetype Lab | 🟢 ADD |
| Balance & Combo Intelligence | 🟢 ADD |
| Playtest Management | 🟢 ADD |
| Manufacturing & Prepress | 🟢 ADD |
| Collector/Special Edition System | 🟢 ADD |
| Organized Play | 🟢 ADD |
| Trademark/IP Readiness | 🟢 ADD, professional-review gated |
| Indie Game Designer | 🟢 ADD |
| GDD / Mechanics / Level Design | 🟢 ADD |
| Game Production & QA | 🟢 ADD |
| Game Commercialization | 🟢 ADD |
| DLC / Expansion / Edition Planning | 🟢 ADD |
| Interactive Entertainment & Game Products Division | 🟢 ADD |
| Founder creative/canon authority | 🔒 PROTECTED |
| Software implementation | 🔴 NOT AUTHORIZED YET |

---

## 4. Downstream Specification Sequence

This PRD amendment is architecture and requirements only. It authorizes — but does not itself complete — the following specification sequence, each of which is its own document gated on this PRD:

1. TCG Builder Specification
2. Indie Game Designer Specification
3. Game Data Model Extension
4. Rules/Balance Intelligence Specification
5. Visual/Asset Integration Specification
6. Commercial Product & Manufacturing Specification
7. IP/Trademark Readiness Specification
8. Organized Play / Live Operations Specification
9. Technical Implementation (requires separate, explicit implementation authorization — not granted here)

---

## 5. Handoff Record

| Field | Value |
|---|---|
| From | OMNISTACK Founder Amendment Intake |
| To | CC / Product Requirements & Systems Architecture |
| Status | Amendment 001 integrated into Founder Edition PRD v0.2 |
| Priority | High |
| Authority | Green for specification integration; Red for Founder-locked creative, brand, IP, and canon decisions |
| Action taken | Integrated Amendment 001 as a first-class capability family (Interactive Products & Games), preserved the existing Writer + Visual lifecycle unmodified, placed TCG/game development as a peer production branch alongside Publishing (not underneath it), and enumerated every screen (§2.5), data entity (§2.6), Role Seat (§2.8), approval gate and professional-review boundary (§2.11), and downstream specification (§4) required for TCG and indie-game commercialization. |
| Explicitly not done | No software construction. No trademark, copyright, or licensing determination. No Founder-locked creative/canon/IP decision was made on the Founder's behalf. |
| Next action | Founder review of this integrated PRD; on approval, begin downstream specification sequence (§4) starting with the TCG Builder Specification and Indie Game Designer Specification. |
