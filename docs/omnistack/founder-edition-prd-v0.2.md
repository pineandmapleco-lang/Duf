OMNISTACK Founder Edition
=========================

# Product Requirements Document v0.2

**Product owner:** Malachi Dawkins — Final Executive Authority
**Status:** CONTROLLED DRAFT — EXECUTIVE REVIEW REQUIRED
**Dependencies:** OMNISTACK Commercial Product Charter v0.1; Amendment 001 — *Interactive Games, TCG & Commercial Product Expansion v1.0*
**Baseline date:** August 14, 2026 (v0.1) · **Amended:** August 16, 2026 (v0.2, Amendment 001 integrated)
**Implementation authority:** NOT GRANTED

> **v0.2 note:** This version integrates Amendment 001 into v0.1 in place. New or amendment-sourced content is marked **🆕 A001**. Everything else is carried over from v0.1 unchanged. The full pre-amendment v0.1 text is preserved for audit at `docs/omnistack/amendments/founder-edition-prd-v0.1-source.md`. A known gap is flagged in §18 and §19: Amendment 001 assumes pre-existing creative-pipeline infrastructure (Story Architect, World Architect, Visual Development, Publishing, the "Generated ≠ canon" doctrine) that does not appear anywhere in PRD v0.1. That infrastructure is not fabricated here — it is called out as unresolved.

> **PRD PURPOSE** Define the smallest commercially credible Founder Edition that proves governed work, Role Seat portability, progressive business maturity, financial command and trust readiness without becoming an unsafe financial or legal execution platform. 🆕 A001: v0.2 extends this purpose to cover a founder taking an interactive-product or game business through the same governed maturity path, without becoming an unsafe manufacturing, legal, or IP-determination platform.

---

## 1. Product Overview

OMNISTACK Founder Edition is the first commercial implementation of the OMNISTACK operating standard. It guides a founder through business setup, activates an appropriate operating structure, allows roles to be assigned to humans or AI, controls work through handoffs and approvals, and connects business earnings to disciplined reinvestment and long-term family wealth preparation.

### Primary outcome

A founder can operate one business through a recoverable system and prepare to add additional ventures without rebuilding the organization from scratch. 🆕 A001: this now explicitly includes a venture whose product *is* a game or trading card game — the same Role Seat, handoff, and approval-gate machinery applies; §21 defines the domain-specific requirements it must satisfy.

### Design doctrine

- Simple at first use; progressively deeper as maturity increases.
- Operator-neutral; responsibilities do not disappear with staffing changes.
- Recommendation before automation; authorization before action.
- Financial education and governance without pretending to replace professionals.
- Customer data separated from product logic and updates.
- Evidence, authority and next action visible on material work.
- 🆕 A001 — Playable before printable; fun before collectibility (see §21.7).
- 🆕 A001 — Generated creative/game assets do not become canon or production-ready by merely existing; a human Founder-locked decision is required (see §21.7).

---

## 2. Personas and Jobs to Be Done

| Persona | Condition | Job to be done |
|---|---|---|
| Idea-stage founder | Many concepts, limited validation | Choose what deserves time and money |
| Owner-operator | Business depends on founder memory | Create repeatable operations and financial control |
| Delegating founder | Hiring employees, contractors or AI help | Transfer work without losing authority or quality |
| Portfolio builder | Second venture or asset emerging | Separate entities while coordinating capital and services |
| Legacy-minded owner | Family depends on founder and business | Prepare ownership, education and succession records |
| 🆕 A001 Creative/game founder | Building a TCG or indie game toward commercial release | Move a game from concept through playtesting, balance, IP readiness and manufacturing to a rights-cleared commercial product, without skipping a gate |

### Core jobs

- Help me decide whether an idea is worth pursuing.
- Show me what my business needs at its current stage.
- Tell every operator what they own, may decide and must deliver.
- Let me replace an AI role with an employee—or the reverse—without breaking the workflow.
- Show me what cash is committed, available or dangerous to spend.
- Make reinvestment decisions measurable.
- Help me use credit responsibly and understand exposure.
- Help me connect business success to family stability, assets and succession.
- Prepare organized records for my CPA, attorney, lender, insurer and adviser.
- 🆕 A001 Help me take a game or TCG from concept to a rights-cleared, manufacturable, tournament-supportable commercial product without the rules, balance, or legal-readiness work being skipped.

---

## 3. Founder Edition Product Boundary

| Included | Excluded |
|---|---|
| Planning, records, dashboards and decision support | Custody or movement of customer funds |
| Role Seats and operator assignment | Autonomous hiring, firing or compensation changes |
| Financial classification and scenario planning | Tax returns, legal opinions or investment guarantees |
| Credit registry and borrowing review | Automated credit applications |
| Trust-readiness and succession preparation | Trust drafting or universal entity prescriptions |
| Automation registry and bounded workflow actions | Unlogged or irreversible autonomous actions |
| Update and add-on framework | Open third-party marketplace in v1 |
| 🆕 A001 Game/TCG design specification, rules/balance/playtest tracking, manufacturing-readiness and IP-readiness records | 🆕 A001 Card-game rules-engine *execution* (i.e., running an actual match), autonomous manufacturing purchase orders, and any trademark/copyright registrability or legal-approval determination |

---

## 4. Initial Information Architecture

| Object | Required relationships | Critical fields |
|---|---|---|
| Account/User | Organizations, memberships | Identity, role, permissions, consent |
| Organization | Portfolio, businesses, people | Name, maturity, jurisdiction label, settings |
| Business | Portfolio, departments, goals, finances | Stage, entity status, owner, active modules |
| Department | Business, Role Seats | Mission, services, leader, activation state |
| Role Seat | Department, operator, work | Authority, outputs, KPIs, permissions, version |
| Operator | Role Seats, tasks | Human/AI/contractor type, availability, access |
| Project/Task | Business, owner, approvals | Status, priority, authority, next action, due date |
| Handoff | Work item, sender, recipient | Sources, assignment, deliverable, gate, disposition |
| Decision | Project, evidence, approver | Question, options, rationale, date, impact |
| SOP/Knowledge | Role Seat, source, version | Owner, status, effective date, supersession |
| Financial Record | Business, category, period | Class, amount, restriction, source, review |
| Capital Proposal | Business, financial records | Thesis, risk, payback, approval, actual result |
| Credit Facility | Business, lender | Limit, balance, rate, guarantee, repayment source |
| Asset/Ownership Record | Business, person or planned structure | Type, title holder, value source, restrictions |
| Readiness Item | Owner, professional category | Needed evidence, status, reviewer, expiration |
| Automation | Trigger, action, Role Seat | Permission, logs, fallback, kill switch, version |
| 🆕 A001 Game | Business, Department, Role Seats | Title, stage, commercial model, canon status |
| 🆕 A001 Ruleset / Rule / Keyword | Game | Version, exception hierarchy, contradiction-flag state |
| 🆕 A001 Card / Card Type / Card Version | Game, Set | Schema, cost, rarity, canon status, print version |
| 🆕 A001 Set / Expansion / DLC / Patch | Game, Cards, Product SKU | Code, skeleton, rarity distribution, release/rotation date |
| 🆕 A001 Deck / Archetype / Format | Game, Cards | Legality, curve, synergy score, banned/restricted state |
| 🆕 A001 Playtest / Playtest Result / Balance Issue / Interaction (Combo) | Game, Ruleset, Deck | Stage, participants, fun score, flag type, evidence |
| 🆕 A001 Product SKU / Edition / Manufacturing Quote / Manufacturer / Print Run | Business, Game | Print quantity, MSRP, cost components, lead time, QC status |
| 🆕 A001 Rights Record / Trademark Readiness Record | Business, Game, Asset | Owner, license, territory, filing status, review trigger |
| 🆕 A001 Game Build / Mechanic / Level / Mission / Quest / Dialogue Node / Economy / Game Asset | Game, Department | Version, owner, canon status, QA state |
| 🆕 A001 Tournament | Game, Format | Structure, banned/restricted list, seasonal ranking |

---

## 5. Essential Departments and Initial Role Seats

| Department | Initial Role Seats | Activation |
|---|---|---|
| Executive Operations | Founder/Executive, Chief of Staff, Decision & Handoff Controller | Always |
| Strategy & Research | Idea Validator, Market Researcher | Idea onward |
| Revenue & Customer | Offer Architect, Sales/CRM Operator, Customer Experience Operator | Validation/launch |
| Operations & Delivery | Operations Manager, Project Manager, Quality Reviewer | Launch/operating |
| Finance & Risk | Financial Controller, Capital Allocation Analyst, Compliance Coordinator | Formation onward |
| People, Knowledge & Automation | People/Role Seat Manager, Knowledge Manager, Automation Steward | Delegation onward |
| 🆕 A001 Interactive Entertainment & Game Products | Game Creative Director, Lead TCG Designer, Card Systems Designer, Set Designer, Balance Designer, Rules Editor, Playtest Coordinator, Game Designer, Systems Designer, Level Designer, Narrative Designer, Game Producer, Technical Game Designer, QA Lead, Game Product Manager, Manufacturing Coordinator, Organized Play Manager, Community Manager | Games module activation (a business elects an interactive-product/game active module) |

The Founder Edition may ship with fifteen visible seats and consolidate low-volume responsibilities under the founder. Activation rules must prevent the user from seeing a fictional enterprise bureaucracy before it is useful. 🆕 A001: the same consolidation rule applies to the Interactive Entertainment & Game Products Division — a solo game founder should see one or two seats (e.g., Game Designer, folded into the founder) until playtest volume, manufacturing activity, or team size justifies more.

---

## 6. Functional Requirements

| ID | Requirement | Acceptance summary |
|---|---|---|
| FR-001 | Guided maturity assessment | System recommends a stage and explains the evidence; user confirms or overrides. |
| FR-002 | Progressive module activation | Only stage-relevant departments, views and checklists activate by default. |
| FR-003 | Idea portfolio | Capture, score, compare, hold, reject or advance opportunities with evidence. |
| FR-004 | Business creation wizard | Create a business record, separation checklist, goals and launch work queue. |
| FR-005 | Role Seat library | Create, clone and version Role Seats from governed templates. |
| FR-006 | Operator assignment | Assign AI, human, hybrid, contractor or vacant state with effective dates. |
| FR-007 | Operator swap | Transfer queue and controlled knowledge; require access reauthorization and audit record. |
| FR-008 | Work protocol | Create handoffs with required authority, source, deliverable, gate and next action fields. |
| FR-009 | Status control | Enforce authorized transitions and preserve blocked/rejected reasons. |
| FR-010 | Approval gate | Route material decisions to named approvers; AI cannot self-approve restricted classes. |
| FR-011 | Decision register | Record question, options, rationale, evidence, approver and impact. |
| FR-012 | SOP and knowledge control | Version procedures and link them to Role Seats and work. |
| FR-013 | Weekly executive review | Summarize goals, exceptions, cash, decisions, risks and next actions. |
| FR-014 | Financial classification | Classify cash and transfers without treating balances as available profit. |
| FR-015 | Reserve tracking | Track tax, operating, payroll, emergency and designated reserves. |
| FR-016 | Capital proposal | Score reinvestment against return, payback, cash flow, risk and opportunity cost. |
| FR-017 | Investment thesis review | Compare expected and actual results on a required review date. |
| FR-018 | Credit registry | Track utilization, rates, due dates, guarantees, collateral and purpose. |
| FR-019 | Credit-risk flags | Flag missing repayment source, promotional expiration and unsupported borrowing. |
| FR-020 | Business-family transfer record | Require a transfer class, authority, evidence and professional-review trigger. |
| FR-021 | Asset and ownership map | Record legal title as documented and distinguish current from proposed structure. |
| FR-022 | Trust-readiness checklist | Organize questions and evidence for qualified professional review. |
| FR-023 | Succession readiness | Record responsibilities, successor candidates, knowledge gaps and emergency authority. |
| FR-024 | Family education plan | Track age-appropriate competencies without exposing restricted records. |
| FR-025 | Automation registry | Document trigger, permission, action, owner, log, fallback and kill switch. |
| FR-026 | Exception center | Surface blocked work, failed automations, overdue approvals and financial warnings. |
| FR-027 | Export | Export controlled records in common human-readable and machine-readable formats. |
| FR-028 | Update-safe configuration | Separate core schema, customer records and declared customizations. |
| FR-029 | Audit trail | Log material changes to authority, roles, financial records and automations. |
| FR-030 | Professional review routing | Generate a preparation packet without presenting it as professional approval. |
| 🆕 FR-031 | Game project intake | Capture TCG/game identity and commercial-model fields; no commercial model is auto-selected. |
| 🆕 FR-032 | Game Design Bible & core-decision test | Block a game from leaving concept stage until "what meaningful decision does the player make every turn?" is answered. |
| 🆕 FR-033 | Card/content schema builder | Support per-game custom card-type taxonomies and schemas; no single schema is enforced across games. |
| 🆕 FR-034 | Rules-engine contradiction flag | Detect and flag card-text-vs-base-rule contradictions; the system never silently resolves them. |
| 🆕 FR-035 | Keyword registry | Version keywords across sets, with reminder text, stacking behavior and deprecation state; flag drift. |
| 🆕 FR-036 | Balance engine | Score per-card efficiency/advantage/tempo/combo metrics and flag imbalance signals; output informs, does not replace, design judgment. |
| 🆕 FR-037 | Combo/interaction graph | Build a card-interaction graph and surface potential infinite loops or unintended chains for review. |
| 🆕 FR-038 | Deck/archetype lab | Support deck construction, curve analysis, draw-probability calculation and archetype detection. |
| 🆕 FR-039 | Playtest tracking | Record structured sessions across defined stages; require a logged blind-test pass before rules move to "done." |
| 🆕 FR-040 | Governed rulebook generation | Generate Quick Start, Full, Comprehensive rules, glossary, FAQ and errata from one governed rules source; no conflicting parallel rulebooks. |
| 🆕 FR-041 | Set builder & skeleton | Define set records and rarity/type/faction/mechanic skeletons before individual card design begins. |
| 🆕 FR-042 | Collector/special-edition registry | Track edition product ID, print quantity, contents and MSRP; a special edition can never gate base-game access. |
| 🆕 FR-043 | Print prepress preflight gate | Require a bleed/trim/safe-zone/DPI/color-profile preflight pass before card art proceeds to production. |
| 🆕 FR-044 | Manufacturing module & landed-cost model | Track RFQs, MOQ, lead time and QC/proof approval; compute true landed cost (printing + packaging + freight + duties + warehousing + fulfillment + fees + margin + returns), not the printer quote alone. |
| 🆕 FR-045 | Trademark/IP readiness workflow | Organize filing-preparation evidence (title/logo candidates, provenance, classification questions, deadlines); never asserts registrability or legal approval. |
| 🆕 FR-046 | Rights & licensing ledger | Require an owner/license/territory/rights record for every external contribution; no set is marked publishable with an unresolved asset. |
| 🆕 FR-047 | Organized play & live-game operations registry | Track formats, banned/restricted lists, event kits, and post-launch errata/balance-change/reprint history against version. |
| 🆕 FR-048 | GDD builder & prototype-stage tracking (Indie Game) | Generate a versioned, owned GDD and track a project's position across Paper → Graybox → Vertical Slice → Alpha → Beta → RC → Gold. |
| 🆕 FR-049 | Economy exploit-risk flags | Flag infinite-farming, broken-sink, dead-currency and exploit-loop risk in tracked game economies. |
| 🆕 FR-050 | Storefront/distribution readiness | Track platform-specific certification and distribution-channel requirements at time of publication (not hardcoded, since they change). |

---

## 7. Role Seat Specification

| Field group | Required fields |
|---|---|
| Identity | Name, department, purpose, version, effective date |
| Accountability | Responsibilities, outcomes, KPIs, reporting cadence |
| Authority | May decide, must escalate, prohibited actions, approval thresholds |
| Work contract | Inputs, outputs, service level, handoff rules, verification gates |
| Capability | Required skills, tools, model/certification requirements, training |
| Access | Systems, data classes, permission scope, expiry and approver |
| Continuity | SOPs, sources, active queue, backup operator, offboarding checklist |
| Operator | Type, identity, start/end dates, availability and performance status |

This specification applies uniformly to every Role Seat, including the 🆕 A001 Interactive Entertainment & Game Products seats in §5 and §21.6 — no separate seat schema was introduced for games.

### Operator swap workflow

1. Freeze new assignments if the role is sensitive.
2. Inventory active work, deadlines, approvals and access.
3. Select and qualify the replacement operator.
4. Reauthorize permissions; do not copy credentials.
5. Transfer controlled SOPs, sources, decisions and work queue.
6. Run a supervised sample assignment.
7. Verify output against the same gate used for the previous operator.
8. Close old access and record the effective transfer.

---

## 8. Financial Command Requirements

### Cash allocation

The system must support configurable allocation buckets for taxes, operating expenses, payroll, owner compensation, reserves, profit distributions, debt reduction, growth, equipment, marketing, employee development, intellectual property, asset acquisition, family wealth goals and giving. It must not ship with universal percentages presented as correct for every business.

### Capital proposal states

DRAFT → EVIDENCE NEEDED → PROFESSIONAL REVIEW (when triggered) → APPROVAL → FUNDED → IN EXECUTION → RETURN REVIEW → CLOSED / CORRECTIVE ACTION

*🆕 A001: Manufacturing Quotes (§21) are a Capital Proposal subtype and pass through this same state machine — a print run cannot reach FUNDED without the landed-cost breakdown required by FR-044.*

### Financial guardrails

- No bank or brokerage credentials stored in plain text.
- No automatic transfer in v1.
- No borrowing recommendation without repayment source and downside disclosure.
- No transfer to family categorized as a generic expense.
- No "profit" label derived solely from account balance.
- No trust or tax recommendation presented as approved without professional sign-off.
- All projections label assumptions and are distinguishable from actuals.

---

## 9. Wealth, Trust and Legacy Requirements

| Capability | Founder Edition behavior | Boundary |
|---|---|---|
| Asset inventory | Record asset type, title evidence, restrictions and review date | No appraisal |
| Ownership map | Show documented current ownership and separately model proposals | No legal conclusion |
| Trust readiness | Collect goals, questions and required documents | No trust drafting |
| Succession | Map emergency and long-term control responsibilities | No legal transfer |
| Family governance | Mission, meetings, education and participation rules | No forced family policy |
| Professional packet | Export organized questions and records for review | Not proof of professional approval |

### Age-appropriate family learning

The system may track competencies such as saving, budgeting, work, ownership, taxes, credit, investing, business operations, risk, philanthropy and stewardship. Access to underlying family or company records must be permissioned separately from the learning plan.

---

## 10. Automation and AI Requirements

| Control | Requirement |
|---|---|
| Identity | Every automated action identifies the responsible Role Seat and automation version. |
| Permission | Actions operate under least privilege and within declared data classes. |
| Review | Restricted decisions pause for named human approval. |
| Evidence | Recommendations preserve sources, assumptions and confidence. |
| Logging | Trigger, input, output, failure and correction are recorded. |
| Fallback | A manual process exists for critical workflows. |
| Kill switch | Authorized user can suspend an automation immediately. |
| Portability | Core workflows are not irreversibly tied to one AI provider. |
| Privacy | Customer data is not repurposed for another customer or the commercial master. |

*🆕 A001: the Rules Engine (FR-034) and Balance Engine (FR-036) are automations under this section — they must identify themselves, log every flag they raise, and never auto-resolve a rules contradiction or auto-apply a balance change. A human Role Seat (Rules Editor / Balance Designer) is the required review step.*

---

## 11. Nonfunctional Requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-001 | Security | Least privilege, secure authentication, encryption and sensitive-action reauthentication. |
| NFR-002 | Privacy | Data isolation, export, deletion and configurable retention. |
| NFR-003 | Reliability | Recoverable writes, error visibility and backup strategy. |
| NFR-004 | Auditability | Immutable or tamper-evident material event history appropriate to the platform. |
| NFR-005 | Accessibility | Keyboard navigation, readable contrast, semantic structure and assistive-technology support. |
| NFR-006 | Usability | Guided first use; no requirement to understand organizational-design jargon. |
| NFR-007 | Portability | Export core records without proprietary lock-in. |
| NFR-008 | Configurability | Custom fields and workflows remain distinguishable from the core schema. |
| NFR-009 | Update safety | Migration tests, backups, rollback and release notes. |
| NFR-010 | Performance | Common dashboards and work queues respond within product-defined service targets. |
| NFR-011 | Observability | Automation failures and integration health are visible. |
| NFR-012 | Jurisdiction labeling | Region-specific content identifies scope and review requirements. |
| 🆕 NFR-013 | Rules traceability | Every rules-engine flag or exception must cite the specific card/rule text that produced it; no unexplained flags. |
| 🆕 NFR-014 | Print/manufacturing fidelity | Color profile, bleed, trim and DPI validation must run and pass before any card file is marked production-ready. |

---

## 12. Permissions and Sensitive Data

| Data class | Examples | Default treatment |
|---|---|---|
| Public | Published offers and public policies | Broad organizational access |
| Internal | Projects, SOPs and ordinary decisions | Role-based access |
| Confidential | Financials, contracts and personnel records | Restricted Role Seats and audit |
| Highly restricted | Credentials, health, beneficiary, tax ID and legal records | Separate vault/reference; minimum necessary access |
| Professional-review | Draft trust, tax, credit and ownership scenarios | Named reviewers; not approved until signed off |
| 🆕 A001 Confidential | Manufacturing quotes, unit costs, licensing terms | Restricted Role Seats (Manufacturing Coordinator, Game Product Manager) and audit |
| 🆕 A001 Professional-review | Trademark/IP readiness records, rights provenance packets | Named reviewers (qualified IP counsel); not approved until signed off |

> **COMMERCIAL SEPARATION TEST** No personal founder record may be used as seed data, demo data or customer-facing example unless it has been independently sanitized and explicitly cleared. Synthetic demonstration data is the default.

---

## 13. Guided Onboarding

1. Create organization and confirm jurisdiction label.
2. Complete founder and business maturity assessment.
3. Create or select the first business.
4. Establish business/personal financial separation checklist.
5. Activate stage-appropriate departments.
6. Confirm Role Seats and current operators.
7. Import only approved records through mapped fields.
8. Configure authority and approval thresholds.
9. Set financial buckets and professional-review contacts.
10. Run a sample handoff and verification gate.
11. Schedule the first weekly executive review.
12. Display the first unresolved decision and one concrete next action.

*🆕 A001: Interactive Products & Games is not part of default onboarding — it activates via FR-002 (progressive module activation) only once a founder's business is identified as a game/TCG venture. Onboarding sequence is otherwise unchanged.*

### First-value criterion

A new customer reaches first value when one real business priority has an accountable Role Seat, controlled next action, governing source, due date and verification gate—and the customer can explain the workflow without assistance.

---

## 14. Core Dashboards

| Dashboard | Minimum contents |
|---|---|
| Founder Command | Priorities, decisions, approvals, exceptions, cash warnings and next actions |
| Business Health | Goals, projects, customers, delivery, risks and stage |
| Team & Role Seats | Operators, vacancies, workload, authority and performance |
| Financial Command | Cash classes, reserves, obligations, debt, credit and capital proposals |
| Wealth & Legacy | Assets, ownership evidence, readiness, succession and education milestones |
| Automation Control | Active workflows, permissions, failures, last run and kill switch |
| Knowledge Control | SOP status, stale sources, decisions and superseded records |
| 🆕 A001 Game & TCG Command | Active game projects and stage, open rules-engine flags, playtest pipeline status, manufacturing/landed-cost exposure, IP-readiness gaps, edition/franchise roadmap |

---

## 15. Analytics and Product Measures

| Category | Measure |
|---|---|
| Activation | Assessment completed; first business created; first governed work item completed |
| Adoption | Weekly executive reviews completed; active Role Seats; controlled handoffs |
| Quality | Verification pass rate; reopened work; missing authority/source fields |
| Portability | Successful operator swaps; time to competent handoff |
| Financial discipline | Reserve coverage entered; capital proposals reviewed; overdue return reviews |
| Risk | Automation failures; restricted-action blocks; data-separation exceptions |
| Legacy readiness | Ownership evidence coverage; professional-review packet completion |
| Retention | Continued use by business maturity and package |
| 🆕 A001 Game commercialization | Games reaching a logged blind-test pass; rules-engine flags resolved vs. open; manufacturing quotes with a complete landed-cost breakdown; trademark-readiness packets completed; expansions shipped that introduce new decisions rather than only numeric escalation |

Metric definitions, consent, event schema and targets require a separate measurement specification before implementation. No vanity metric should substitute for completed governed work or improved decision quality.

---

## 16. Release Plan

| Phase | Deliverable | Exit gate |
|---|---|---|
| 0 — Discovery | Customer interviews, workflow evidence and platform feasibility | Problem and willingness-to-pay evidence |
| 1 — Controlled prototype | Maturity assessment, Role Seats, handoffs and executive review | Internal workflow acceptance |
| 2 — Financial governance | Classification, reserves, capital proposals and credit registry | Professional and safety review |
| 3 — Legacy readiness | Assets, ownership map, readiness and succession preparation | Professional-boundary review |
| 4 — Private beta | Guided onboarding, support, analytics and update process | Beta acceptance and security review |
| 5 — Founder Edition release | Commercial packaging, billing, documentation and support | Launch approval |

**🆕 A001:** Interactive Products & Games is specification-only (§21) and has not been assigned a release phase. Phase assignment is an Unresolved Executive Decision (§19) — it must not be assumed to ride along with any phase above without an explicit decision.

---

## 17. Acceptance Tests

| Test | Pass condition |
|---|---|
| AT-01 | New founder completes onboarding and sees only stage-relevant modules. |
| AT-02 | User creates a Role Seat with authority, outputs, gate and operator. |
| AT-03 | User swaps AI to human; queue and knowledge transfer while access is reauthorized. |
| AT-04 | Restricted AI action pauses for human approval and records the decision. |
| AT-05 | Blocked handoff cannot become VERIFIED without its gate result. |
| AT-06 | Financial dashboard separates reserved, obligated and potentially available cash. |
| AT-07 | Capital proposal cannot reach funded status without thesis, risk and review date. |
| AT-08 | Credit record surfaces rate, due date, guarantee and repayment source. |
| AT-09 | Family transfer requires a classification and review trigger. |
| AT-10 | Ownership map distinguishes documented ownership from a proposed scenario. |
| AT-11 | Professional packet carries a clear "not professional approval" notice. |
| AT-12 | Update simulation preserves customer records and declared customizations. |
| AT-13 | Automation failure appears in exception center with fallback and owner. |
| AT-14 | Customer exports core business, work and financial-governance records. |
| AT-15 | Synthetic demo contains no private OMNISTACK data. |
| 🆕 AT-16 | Rules engine flags a card-text-vs-base-rule contradiction (e.g., an implicit attack-on-entry effect against a "can't attack the turn it enters" base rule) instead of resolving it automatically. |
| 🆕 AT-17 | A TCG project cannot exit concept stage without an answered "what decision does the player make every turn" field. |
| 🆕 AT-18 | A card cannot be marked production-ready without its print-prepress preflight (bleed/trim/safe zone/DPI/color profile) passing. |
| 🆕 AT-19 | A manufacturing capital proposal cannot reach FUNDED without a full landed-cost breakdown (printing + packaging + freight + duties + warehousing + fulfillment + fees + margin + returns). |
| 🆕 AT-20 | A trademark/IP readiness packet carries a clear "not legal approval" notice, matching AT-11's pattern. |
| 🆕 AT-21 | A set cannot be marked publishable while any credited external asset lacks a rights/licensing record. |
| 🆕 AT-22 | A logged blind-playtest session (no designer present) exists before rules status can move to "done." |
| 🆕 AT-23 | A special/collector edition cannot be marked released while the base/standard product SKU is unavailable. |

---

## 18. Dependencies

- Commercial Product Charter approval
- Customer discovery and pricing research
- Platform and integration feasibility study
- Privacy and security architecture
- Legal review of product claims, disclaimers and terms
- Accounting/tax review of financial classifications
- Estate/trust counsel review of readiness boundaries
- Accessibility requirements and testing plan
- Support model and incident escalation
- Trademark and intellectual-property review
- 🆕 A001 **Open gap — flagged, not resolved:** Amendment 001 references pre-existing OMNISTACK creative-pipeline infrastructure (Story Architect, World Architect, Power System Architect, Continuity & Canon Integration, Visual Development/Art Direction, a Publishing department, and a "Generated ≠ canon" Founder rule) as already governing. None of this appears in PRD v0.1. Confirm whether a separate OMNISTACK creative/publishing charter defines it, and if so, attach it here as a dependency; if not, it must be specified from scratch before §21's visual-canon and narrative-integration requirements can be implemented.
- 🆕 A001 Game/TCG manufacturing vendor and print-partner feasibility study
- 🆕 A001 Storefront/platform certification requirements research (PC, console, mobile — subject to change, per FR-050)
- 🆕 A001 Trademark and IP review scoped specifically to game titles, logos and card/rules content (extends the existing trademark/IP dependency above)
- 🆕 A001 Organized-play/tournament-software integration feasibility (if pursued)

---

## 19. Unresolved Executive Decisions

| Decision | Options to evaluate | Required evidence |
|---|---|---|
| Primary platform | Notion-first, custom SaaS, hybrid | Cost, security, update safety, user research |
| Pricing | One-time, subscription, implementation bundle | Willingness to pay and support cost |
| Financial modules | Core inclusion vs premium packaging | Customer value and liability review |
| AI provider strategy | Single provider vs abstraction layer | Quality, cost, privacy and portability |
| Customer segment | Solo founder vs staffed small business first | Pain severity and buying behavior |
| Jurisdiction scope | U.S.-first vs broader generic framework | Professional review and content burden |
| Data integrations | Manual/import first vs live finance connections | Security, support and product necessity |
| 🆕 A001 Interactive Products & Games activation timing | Core inclusion at Founder Edition v1 vs. premium/add-on module | Customer segment fit and support-cost evidence |
| 🆕 A001 Physical manufacturing scope | Fully spec/track only vs. any vendor-integration automation | Liability and automation-guardrail review (per §3's autonomous-action exclusion) |
| 🆕 A001 Digital companion / storefront integration depth | Manual tracking vs. live platform API integration | Security, support and product necessity (mirrors "Data integrations" above) |
| 🆕 A001 Creative-pipeline baseline | Locate/attach an existing OMNISTACK creative/publishing charter vs. specify Story/World/Visual Architect infrastructure fresh | Confirmation from Founder on whether such a charter already exists (see §18 gap) |

**NEXT CONTROLLED ACTION:** Executive review → v0.2 and assigned decisions (including the Amendment 001 decisions above). Product implementation remains unauthorized.

---

## 20. PRD Verification Gate

- ☐ Every requirement traces to the charter.
- ☐ Founder Edition scope excludes unauthorized implementation and money movement.
- ☐ Role Seat portability is testable.
- ☐ Human approvals govern restricted decisions.
- ☐ Financial classifications and capital gates are explicit.
- ☐ Trust-readiness features avoid legal-document generation.
- ☐ Privacy classes and commercial separation are testable.
- ☐ Update safety has an acceptance test.
- ☐ Customer discovery remains a prerequisite to pricing and launch claims.
- ☐ Unresolved executive decisions are visible.
- 🆕 ☐ A001 Interactive Products & Games requirements trace to Amendment 001 and this PRD.
- 🆕 ☐ A001 Rules-engine contradictions are flagged, never silently resolved (FR-034, AT-16).
- 🆕 ☐ A001 Trademark/IP readiness features avoid legal-conclusion generation, mirroring the trust-readiness boundary (FR-045, AT-20).
- 🆕 ☐ A001 Manufacturing landed-cost model is explicit before any funding gate (FR-044, AT-19).
- 🆕 ☐ A001 Collector/special editions cannot gate base-game access (FR-042).
- 🆕 ☐ A001 Founder-locked creative/canon rules for games (§21.7) are visible and distinct from Green-authority architecture work.
- 🆕 ☐ A001 The creative-pipeline dependency gap (§18) is resolved — either an existing charter is attached, or fresh specification is scheduled — before §21's visual-canon and narrative-integration requirements proceed to implementation planning.

---

## 21. Amendment 001 Deep Specification — Interactive Products & Games

**Status:** ADOPTED. Source record preserved at `docs/omnistack/amendments/001-interactive-products-and-games.md`.
**Relationship to §1–§20:** §6, §11, §12, §14, §15, §17–§20 above already fold Amendment 001 into the base PRD's testable requirements. This section is the deep specification behind those entries — the same relationship §8 (Financial Command) and §9 (Wealth, Trust and Legacy) have to the base FR list.
**Effect:** Adds **Interactive Products & Games** as a first-class OMNISTACK capability family, containing two production lanes — **OMNISTACK TCG Builder** and **OMNISTACK Indie Game Designer** — that share world, canon, visual, product, manufacturing, publishing, marketing, legal-review and release infrastructure while remaining separate productions.
**Implementation authority:** Not granted by this amendment.

### 21.1 OMNISTACK TCG Builder

A complete end-to-end Trading Card Game creation, testing, production, commercialization and expansion system — not a card generator. Its job is to help build an actual game.

- **Project creation** — Identity: working title, final title, parent IP, standalone/franchise-connected, intended audience, age rating, competitive/casual/collectible emphasis, physical/digital/hybrid, solo/multiplayer, player count, match duration, complexity target. Commercial model (never auto-selected): booster-based, expandable card game, living-card-game-style, fixed deck, starter-set, draftable, collectible battle game, narrative card game, cooperative, hybrid board/card.
- **Game Design Bible** — core fantasy, player fantasy, victory/loss conditions, turn structure, resource system, card zones, deck construction, hand/draw/mulligan rules, combat/conflict system, timing/priority system, keywords, card types, rarity, factions/colors/affinities, board state, randomness, interaction windows, hidden information, comeback mechanics, snowball risks, match length, complexity budget. Readiness gate: *"What meaningful decision does the player make every turn?"*
- **Card type architecture** — customizable templates (Character, Creature, Unit, Hero, Leader, Champion, Spell, Action, Reaction, Event, Location, Realm, Equipment, Weapon, Armor, Artifact, Relic, Vehicle, Resource, Mission, Quest, Condition, Token, Transformation, Companion, Faction, Structure); each game defines its own taxonomy.
- **Card schema builder** — per-card-type structured fields (e.g., Character: ID, name, set, collector number, faction, cost, type/subtype, keywords, stats, ability/flavor text, rarity, artist, canon status, rules/print version, legal status, visual asset, alt-art variants, errata state); schema may differ completely between games.
- **Rules Engine** — machine-readable rules: legal actions, timing, targeting, costs, triggers, replacement/prevention effects, simultaneous events, zone transitions, state-based checks, victory checks, keyword definitions, exception hierarchy. Doctrine: exceptions must be explicit and traceable; contradictions are flagged, never silently decided (FR-034).
- **Keyword system** — per-keyword record: definition, reminder text, timing, applicable types, stacking behavior, exceptions, first set, rules version, deprecated/renamed flags, localization notes.
- **Faction/color/archetype design** — per faction: strengths, weaknesses, resource behavior, signature/forbidden mechanics, playstyle, tempo/control/risk-reward/card-advantage profiles, lore, visual language. System flags convergence (every faction doing everything) as an anti-pattern.
- **Balance Engine** — per-card: resource efficiency, stats-per-cost, card advantage, tempo, removal efficiency, reach, combo potential, repeatability, tutorability, resilience, recursion, win-rate/pick-rate/inclusion-rate, matchup performance. Flags: under-costed cards, dominant archetypes, non-games, infinite loops, oppressive locks, dead cards, unplayable factions, first-player advantage, excessive variance/tutoring, runaway resource generation. Informs, does not replace, design judgment.
- **Combo & Interaction Detection** — a card-interaction graph surfaces potential infinite loops (e.g., Card A + Card B + Card C creating an unbounded chain) as a dedicated TCG Intelligence function.
- **Deck Builder & Archetype Lab** — construction, sideboards, commanders/leaders, format restrictions/legality, curve analysis, resource distribution, card-type ratios, archetype detection, synergy scoring, test hands, probability, draw odds, mulligan simulation. Reference archetypes (aggro, control, midrange, combo, tempo, ramp, swarm, mill, attrition, toolbox, tribal, alternate win condition) are optional vocabulary.
- **Playtesting System** — per-session: version, decks, players, experience level, winner, turns, duration, first player, cards played/unused, disputes, confusing rules, emotional highs/lows, broken interactions, fairness, fun score, replay intention. Stages: Internal Theory Test → Developer Test → Closed Alpha → Blind Rules Test → Closed Beta → Public Demo → Preproduction Validation. Blind testing is mandatory before rules are "done."
- **Rulebook Builder** — generates Quick Start, Full Rulebook, Comprehensive Rules, Keyword Glossary, FAQ, Errata, Tournament Rules, Organized Play Policy from one governed source.
- **Set Builder & Set Skeleton** — per-set record (code, name, number, release role, story/theme, mechanics introduced/returning, card count, rarity/faction distribution, archetype support, draft environment, chase cards, starter compatibility, collector variants, release date, legality, rotation date). Skeleton allocates rarity/type/faction/cost/mechanic/archetype counts before individual card design.
- **Draft/Limited Environment** — where applicable: archetype pairs/groups, fixing, removal/bomb density, curve availability, combat tricks, signals, synergy requirements, dead picks, pack collation. Constructed and limited balance require separate testing.
- **Rarity System** — evaluated by complexity, splashiness, build-around potential, desired limited frequency, lore prominence, collectibility, printing constraints — not power alone. Reference classes (customizable): Common, Uncommon, Rare, Epic, Legendary, Mythic, Promo.
- **Collector System** — collector numbers, foil/alternate-art/borderless/extended-art variants, serialized cards, promos, convention exclusives, founder editions, artist proofs, signature editions, premium finishes. Must never gate the base player's access to the game.
- **Visual Development integration** — connects to shared Visual Development infrastructure for character/creature/location/artifact art, card frames, symbols, faction marks, icons, backs, packaging, playmats, tokens, rulebook/promotional art. Controlling separation: Visual Asset ≠ Visual Generation ≠ Visual Canon Decision — generated ≠ canon.
- **Card Frame Builder** — controlled templates: title zone, art box, cost, stats, type line, rules box, flavor text, rarity symbol, collector number, copyright/legal lines, artist credit, set symbol, foil indicators, accessibility considerations; safe zones and print-bleed controls required.
- **Print Prepress** — dimensions, bleed, trim, safe zone, DPI, color profile, black treatment, finishing, cardstock, coating, foil layer, spot UV, die cutting, collation, packaging, proof versions. No art proceeds to production without a preflight pass (FR-043, NFR-014).
- **Manufacturing Module** — manufacturer RFQs, MOQ, prototype/unit cost, freight, customs, packaging, warehousing, fulfillment, damage allowance, reprint thresholds, lead time, proof/sample approval, manufacturing agreement, QC. True landed cost = printing + packaging + freight + duties + warehousing + fulfillment + payment fees + distributor/retailer margin + returns/damage (FR-044).
- **Commercialization pipeline** — Concept → Rules Prototype → Playable Alpha → Validated Beta → Product Definition → Brand Clearance → IP/Trademark Review → Manufacturing Feasibility → Pricing → Distribution Strategy → Marketing → Preorders/Crowdfunding (if used) → Production → Launch → Post-launch Support.
- **Trademark & IP Readiness workflow** — organizes title/logo candidates, brand-use evidence, creator/contributor records, work-for-hire/license records, artwork/music provenance, trademark-search prep, classification questions, specimen prep, filing deadlines, renewal calendar, international considerations, domain/handle availability. Never determines registrability or grants legal approval — routes to qualified IP counsel (FR-045, AT-20).
- **Licensing & Rights** — per external contribution (artist, designer, writer, developer, composer, manufacturer, photographer, font, stock asset, software library, licensed IP): owner, license, territory, duration, commercial rights, sublicensing, modification permission, exclusivity, credit requirement. No mystery assets at publication (FR-046, AT-21).
- **Product Family Architecture** — Core Game → Starter Set → Booster Set 1 → Expansion 1 → Expansion 2 → Special Edition → Collector Edition → Tournament Kit → Beginner Product → Premium Decks → Anniversary Release → Crossover Set → Digital Companion. Every product needs an explicit strategic role.
- **Expansion Roadmap** — multi-year planner: narrative arc, mechanics introduced/retired, faction evolution, power/complexity creep, reprints, rotation, accessibility, new-player entry points, collector strategy, organized play, manufacturing windows. Every expansion must create new decisions, not just bigger numbers.
- **Special Editions** — Founder, First, Collector, Deluxe, Anniversary, Convention, Tournament, Art, Foil, Serialized, Retail Exclusive, Kickstarter/Crowdfunding, Regional, Holiday, Crossover. Per edition: product ID, print quantity, contents, differences, legal status, MSRP, manufacturing cost, target audience, release channel.
- **Organized Play** — tournament/casual formats, league system, event kit, judge/rules program, tournament software integration, banned/restricted list, format legality, seasonal rankings, championship structure, promo support. Not mandatory per game; built into the system.
- **Live Game Management** — post-launch (Development → Live Operations): errata, balance changes, bans, restrictions, FAQs, rules revisions, player complaints, metagame data, product availability, reprints, counterfeit reports, community health, upcoming expansions.
- **Digital Companion (optional)** — card database, deck builder, collection tracker, rules search, tournament locator, event registration, account system, QR-linked cards, lore entries, digital redemption, organized-play records. Connects to Website Development & Operations.

### 21.2 OMNISTACK Indie Game Designer

Broader than the TCG lane: tabletop, board, card, RPG, tactical/strategy, digital, visual novel, narrative adventure, platformer, RPG video game, simulation, puzzle, mobile, PC, and console-ready projects where capability allows. Does not assume one development process fits every game.

- **Game Concept Studio** — premise, player fantasy, genre, platform, audience, player count, session length, core/secondary loop, progression, failure/win state, emotional promise, replayability, differentiation. Core-loop test: *"What does the player repeatedly do that is fun?"* — lore/visuals/story alone is not a developed loop.
- **Game Design Document** — high concept, pillars, core gameplay, mechanics, controls, progression, economy, combat, AI behavior, levels, story, characters, world, missions, UI/UX, audio, art direction, accessibility, monetization, platform, technical requirements, analytics, QA, release plan. Every major system has an owner and version.
- **Prototype Workflow** — Paper Prototype → Mechanics Prototype → Graybox → Vertical Slice → Alpha → Beta → Release Candidate → Gold/Launch. Not every game needs every stage.
- **Game Mechanics Lab** — per mechanic: purpose, input, output, player choice, feedback, failure, exploit risk, interaction with other mechanics, difficulty, tutorial requirement, accessibility concern.
- **Narrative game integration** — connects to Story Architect, Writing Architect, Character Architect, World Architect, Power System Architect, Continuity & Canon Integration *(see §18 gap — this connection is specified here but the target infrastructure is not confirmed to exist in this PRD's scope)*. Records: quest, branch, choice, consequence, dialogue, character state, reputation, relationship state, flags, endings, canon status.
- **Level/Mission Design** — per level/mission: objective, starting state, location, required mechanic, enemies/challenges, pacing, reward, failure, tutorial/narrative purpose, secrets, replay hooks, QA state.
- **Economy Design** — sources, sinks, currencies, prices, rewards, crafting, upgrades, inflation, progression gates, grind, premium currency. Flags: infinite farming, broken sinks, useless currencies, exploit loops, grind walls (FR-049).
- **Difficulty System** — challenge curve, enemy scaling, puzzle complexity, resource scarcity, punishment, checkpoints, accessibility options, difficulty modes. Difficulty ≠ inconvenience.
- **Player Experience Intelligence** — maps Learn → Understand → Experiment → Master → Express; flags tutorial overload, information gaps, difficulty spikes, unclear feedback, meaningless choices, repetitive play.
- **Game Art Pipeline** — connects to shared Visual Development for characters, enemies, creatures, environments, props, weapons, UI, icons, animation references, concept/splash/loading art, storyboards. Same doctrine: generated ≠ canon ≠ final production asset.
- **Audio System** — music, ambience, SFX, voice acting, dialogue, licensing, composer, stems, loops, implementation state.
- **Engine/Technology decision** — Unreal, Unity, Godot, web technologies, custom engines, tabletop/manual systems; requirements-driven, not hype-driven.
- **Development Backlog** — epics, features, stories/tasks, bugs, technical debt, content tasks, asset tasks, QA, blockers, milestones; integrates with OMNISTACK handoffs and Role Seats.
- **Version & Build Management** — build number, branch/version, platform, changelog, known bugs, save compatibility, test status, release channel.
- **QA** — functional, gameplay, regression, balance, performance, compatibility, save corruption, controller/input, localization, accessibility, platform requirements, exploit testing.
- **Commercial Indie Game Pipeline** — Idea → Market Validation → Game Design → Prototype → Playtest → Vertical Slice → Budget → IP/Brand Review → Production → Alpha → Beta → Storefront Preparation → Certification (where applicable) → Launch → Patches → DLC/Expansion → Special Editions → Sequels/Franchise.
- **Store & Distribution Readiness** — direct website sales, PC storefronts, console storefronts, mobile app stores, itch/indie marketplaces, retail, crowdfunding, physical game shops, conventions, wholesale. Requirements must be checked at publication time (FR-050).
- **Monetization** — premium purchase, free demo, episodic, DLC, expansion packs, cosmetics, subscriptions, crowdfunding, collector editions, physical/digital bundles. The system never assumes predatory monetization is necessary.
- **Expansion & DLC Planner** — DLC, expansion, sequel, remaster, definitive edition, collector edition, soundtrack, art book, tabletop adaptation, TCG adaptation, novel/comic tie-in — direct interoperability with the broader IP architecture.

### 21.3 Navigation: GAMES module

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

29 named screens across 4 top-level sections plus a dashboard. §4 lists the underlying data entities these screens read/write; §5 lists the Role Seats that own them.

### 21.4 Approval gates & professional-review boundaries

Synthesizes the pipelines in §21.1/§21.2 into explicit stage-transition owners and gate types (parallel to §17's Acceptance Tests, which make several of these gates testable):

| Gate | Applies to | Gate type | Owner |
|---|---|---|---|
| Design readiness (turn-by-turn decision / fun loop) | TCG, Indie Game | Design gate | Lead TCG Designer / Game Designer |
| Rules-engine contradiction flags resolved | TCG | Design gate (never auto-resolved) | Rules Editor |
| Blind playtest pass | TCG, Indie Game | Quality gate | Playtest Coordinator / QA Lead |
| Balance sign-off | TCG | Design gate | Balance Designer |
| Canon Validation | TCG, Indie Game | 🔴 Founder-locked | Founder (see §18 gap on Continuity & Canon Integration) |
| Visual Canon Decision | TCG, Indie Game | 🔴 Founder-locked | Founder (see §18 gap on Visual Development/Art Direction) |
| Brand Clearance | TCG, Indie Game | Professional-review gated | Legal/IP counsel |
| IP / Trademark Review | TCG, Indie Game | 🔒 Professional-review, non-delegable | Qualified external IP counsel |
| Rights provenance complete | TCG, Indie Game | Compliance gate | Game Product Manager / Legal |
| Manufacturing feasibility & preflight pass | TCG, Indie Game (physical SKUs) | Quality/compliance gate | Manufacturing Coordinator |
| Manufacturing agreement / QC sign-off | TCG, Indie Game | Compliance gate | Manufacturing Coordinator + Legal |
| Storefront certification | Indie Game | External platform gate | Game Producer |
| Franchise/expansion "new decisions" check | TCG, Indie Game | 🔴 Founder-locked design gate | Founder + Game Creative Director |
| Launch readiness | TCG, Indie Game | Cross-functional gate | Game Product Manager |
| Software implementation authorization | TCG, Indie Game | 🔴 Founder-locked, separate from this PRD | Founder |

### 21.5 Department architecture

**Interactive Entertainment & Game Products Division** (see §5 for Role Seat rollup):

| Department | Owns |
|---|---|
| TCG Design Department | Rules, cards, sets, decks, balance, playtesting |
| Indie Game Design Department | Mechanics, gameplay systems, GDDs, level/mission design, prototypes |
| Game Production Department | Development coordination, builds, asset integration, QA, milestones |
| Game Product & Manufacturing Department | Physical-game specifications, vendors, quotes, production, packaging |
| Organized Play & Community Department | Tournaments, leagues, judge/rules support, player ecosystem |

Integrates with the base Founder Edition departments (§5) — Executive Operations, Strategy & Research, Revenue & Customer, Operations & Delivery, Finance & Risk, People/Knowledge & Automation — the same way any other department does, plus the creative-infrastructure connections flagged as an open gap in §18.

### 21.6 Role Seats

18 seats (also listed in §5): Game Creative Director, Lead TCG Designer, Card Systems Designer, Set Designer, Balance Designer, Rules Editor, Playtest Coordinator, Game Designer, Systems Designer, Level Designer, Narrative Designer, Game Producer, Technical Game Designer, QA Lead, Game Product Manager, Manufacturing Coordinator, Organized Play Manager, Community Manager. Seats are permanent even if operators change (§7).

### 21.7 Founder-locked rules (games-specific)

1. Playable before printable.
2. Fun before collectibility.
3. Generated art does not become canon or commercial production art merely by existing.
4. No expansion fixes a broken base game.
5. No rarity level exists only to manufacture artificial power.
6. No game mechanic is canon merely because it appears in a prototype.
7. No trademark filing, licensing conclusion, or IP-clearance conclusion is represented as legally approved without qualified review.
8. Every expansion must create meaningful new decisions rather than only numerical escalation.
9. Every commercially released product must have rights provenance for its text, code, art, audio, fonts, branding and licensed assets.
10. The player experience controls game design; lore serves the game when the product is a game.
11. Founder retains final creative, IP, franchise, and canon authority.

### 21.8 Commercial end state

- **TCG Builder target:** a documented, playtested, balanced, rights-cleared, brand-ready, manufacture-ready, commercially packaged game with a sustainable expansion and collector strategy — not "I made some cards."
- **Indie Game Designer target:** a validated game design capable of moving through prototype, production, QA, commercial release, post-launch support, and franchise expansion under controlled ownership — not "I have a game idea."

### 21.9 Controlled amendment disposition

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

### 21.10 Downstream specification sequence

Specification only — authorizes, but does not itself complete, the following:

1. TCG Builder Specification
2. Indie Game Designer Specification
3. Game Data Model Extension
4. Rules/Balance Intelligence Specification
5. Visual/Asset Integration Specification *(blocked on resolving the §18 creative-infrastructure gap)*
6. Commercial Product & Manufacturing Specification
7. IP/Trademark Readiness Specification
8. Organized Play / Live Operations Specification
9. Technical Implementation *(requires separate, explicit implementation authorization — not granted here)*

### 21.11 Handoff record

| Field | Value |
|---|---|
| From | OMNISTACK Founder Amendment Intake |
| To | CC / Product Requirements & Systems Architecture |
| Status | Amendment 001 integrated into Founder Edition PRD v0.2, against the actual v0.1 baseline document |
| Priority | High |
| Authority | Green for specification integration; Red for Founder-locked creative, brand, IP, and canon decisions |
| Action taken | Integrated Amendment 001 as a first-class capability family (Interactive Products & Games) into PRD v0.1's actual structure (Product Boundary, Information Architecture, Departments/Role Seats, Functional Requirements, NFRs, Permissions, Dashboards, Analytics, Release Plan, Acceptance Tests, Dependencies, Unresolved Decisions, Verification Gate), plus a deep specification (§21) parallel to §8/§9. Enumerated every screen (§21.3), data entity (§4), Role Seat (§5, §21.6), approval gate and professional-review boundary (§21.4), and downstream specification (§21.10). |
| Explicitly not done | No software construction. No trademark, copyright, or licensing determination. No Founder-locked creative/canon/IP decision made on the Founder's behalf. No fabrication of the Story/World/Visual Architect infrastructure Amendment 001 assumes — it is flagged as an open gap (§18, §19) instead. |
| Next action | Founder review of this integrated PRD, including resolution of the §18/§19 creative-infrastructure gap and the three new Unresolved Executive Decisions; on approval, begin the downstream specification sequence (§21.10) starting with the TCG Builder Specification and Indie Game Designer Specification. |
