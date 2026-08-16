# OMNISTACK Founder Edition PRD v0.1 — Source Transcription (Audit Copy)

> Raw text extraction from the original uploaded file `df748c55-OMNISTACK_Founder_Edition_PRD_v0.1.docx`, preserved verbatim for provenance. Paragraph style tags (e.g. `[Heading1]`, `[ListBullet]`) are from the source document's Word styles. Tabular content is flattened to one cell per line in original document order — reconstructed tables live in `../founder-edition-prd-v0.2.md`, which is the governing document.

---

[Title] OMNISTACK Founder Edition
[Subtitle] Product Requirements Document v0.1
Product owner: Malachi Dawkins — Final Executive Authority
Status: CONTROLLED DRAFT — EXECUTIVE REVIEW REQUIRED
Dependency: OMNISTACK Commercial Product Charter v0.1
Date: August 14, 2026
Implementation authority: NOT GRANTED

[Callout] PRD PURPOSE  Define the smallest commercially credible Founder Edition that proves governed work, Role Seat portability, progressive business maturity, financial command and trust readiness without becoming an unsafe financial or legal execution platform.
[Heading1] 1. Product Overview
OMNISTACK Founder Edition is the first commercial implementation of the OMNISTACK operating standard. It guides a founder through business setup, activates an appropriate operating structure, allows roles to be assigned to humans or AI, controls work through handoffs and approvals, and connects business earnings to disciplined reinvestment and long-term family wealth preparation.
[Heading2] Primary outcome
A founder can operate one business through a recoverable system and prepare to add additional ventures without rebuilding the organization from scratch.
[Heading2] Design doctrine
[ListBullet] Simple at first use; progressively deeper as maturity increases.
[ListBullet] Operator-neutral; responsibilities do not disappear with staffing changes.
[ListBullet] Recommendation before automation; authorization before action.
[ListBullet] Financial education and governance without pretending to replace professionals.
[ListBullet] Customer data separated from product logic and updates.
[ListBullet] Evidence, authority and next action visible on material work.
[Heading1] 2. Personas and Jobs to Be Done
Persona
Condition
Job to be done
Idea-stage founder
Many concepts, limited validation
Choose what deserves time and money
Owner-operator
Business depends on founder memory
Create repeatable operations and financial control
Delegating founder
Hiring employees, contractors or AI help
Transfer work without losing authority or quality
Portfolio builder
Second venture or asset emerging
Separate entities while coordinating capital and services
Legacy-minded owner
Family depends on founder and business
Prepare ownership, education and succession records

[Heading2] Core jobs
[ListBullet] Help me decide whether an idea is worth pursuing.
[ListBullet] Show me what my business needs at its current stage.
[ListBullet] Tell every operator what they own, may decide and must deliver.
[ListBullet] Let me replace an AI role with an employee—or the reverse—without breaking the workflow.
[ListBullet] Show me what cash is committed, available or dangerous to spend.
[ListBullet] Make reinvestment decisions measurable.
[ListBullet] Help me use credit responsibly and understand exposure.
[ListBullet] Help me connect business success to family stability, assets and succession.
[ListBullet] Prepare organized records for my CPA, attorney, lender, insurer and adviser.
[Heading1] 3. Founder Edition Product Boundary
Included
Excluded
Planning, records, dashboards and decision support
Custody or movement of customer funds
Role Seats and operator assignment
Autonomous hiring, firing or compensation changes
Financial classification and scenario planning
Tax returns, legal opinions or investment guarantees
Credit registry and borrowing review
Automated credit applications
Trust-readiness and succession preparation
Trust drafting or universal entity prescriptions
Automation registry and bounded workflow actions
Unlogged or irreversible autonomous actions
Update and add-on framework
Open third-party marketplace in v1

[Heading1] 4. Initial Information Architecture
Object
Required relationships
Critical fields
Account/User
Organizations, memberships
Identity, role, permissions, consent
Organization
Portfolio, businesses, people
Name, maturity, jurisdiction label, settings
Business
Portfolio, departments, goals, finances
Stage, entity status, owner, active modules
Department
Business, Role Seats
Mission, services, leader, activation state
Role Seat
Department, operator, work
Authority, outputs, KPIs, permissions, version
Operator
Role Seats, tasks
Human/AI/contractor type, availability, access
Project/Task
Business, owner, approvals
Status, priority, authority, next action, due date
Handoff
Work item, sender, recipient
Sources, assignment, deliverable, gate, disposition
Decision
Project, evidence, approver
Question, options, rationale, date, impact
SOP/Knowledge
Role Seat, source, version
Owner, status, effective date, supersession
Financial Record
Business, category, period
Class, amount, restriction, source, review
Capital Proposal
Business, financial records
Thesis, risk, payback, approval, actual result
Credit Facility
Business, lender
Limit, balance, rate, guarantee, repayment source
Asset/Ownership Record
Business, person or planned structure
Type, title holder, value source, restrictions
Readiness Item
Owner, professional category
Needed evidence, status, reviewer, expiration
Automation
Trigger, action, Role Seat
Permission, logs, fallback, kill switch, version

[Heading1] 5. Essential Departments and Initial Role Seats
Department
Initial Role Seats
Activation
Executive Operations
Founder/Executive, Chief of Staff, Decision & Handoff Controller
Always
Strategy & Research
Idea Validator, Market Researcher
Idea onward
Revenue & Customer
Offer Architect, Sales/CRM Operator, Customer Experience Operator
Validation/launch
Operations & Delivery
Operations Manager, Project Manager, Quality Reviewer
Launch/operating
Finance & Risk
Financial Controller, Capital Allocation Analyst, Compliance Coordinator
Formation onward
People, Knowledge & Automation
People/Role Seat Manager, Knowledge Manager, Automation Steward
Delegation onward

The Founder Edition may ship with fifteen visible seats and consolidate low-volume responsibilities under the founder. Activation rules must prevent the user from seeing a fictional enterprise bureaucracy before it is useful.
[Heading1] 6. Functional Requirements
ID
Requirement
Acceptance summary
FR-001
Guided maturity assessment
System recommends a stage and explains the evidence; user confirms or overrides.
FR-002
Progressive module activation
Only stage-relevant departments, views and checklists activate by default.
FR-003
Idea portfolio
Capture, score, compare, hold, reject or advance opportunities with evidence.
FR-004
Business creation wizard
Create a business record, separation checklist, goals and launch work queue.
FR-005
Role Seat library
Create, clone and version Role Seats from governed templates.
FR-006
Operator assignment
Assign AI, human, hybrid, contractor or vacant state with effective dates.
FR-007
Operator swap
Transfer queue and controlled knowledge; require access reauthorization and audit record.
FR-008
Work protocol
Create handoffs with required authority, source, deliverable, gate and next action fields.
FR-009
Status control
Enforce authorized transitions and preserve blocked/rejected reasons.
FR-010
Approval gate
Route material decisions to named approvers; AI cannot self-approve restricted classes.
FR-011
Decision register
Record question, options, rationale, evidence, approver and impact.
FR-012
SOP and knowledge control
Version procedures and link them to Role Seats and work.
FR-013
Weekly executive review
Summarize goals, exceptions, cash, decisions, risks and next actions.
FR-014
Financial classification
Classify cash and transfers without treating balances as available profit.
FR-015
Reserve tracking
Track tax, operating, payroll, emergency and designated reserves.
FR-016
Capital proposal
Score reinvestment against return, payback, cash flow, risk and opportunity cost.
FR-017
Investment thesis review
Compare expected and actual results on a required review date.
FR-018
Credit registry
Track utilization, rates, due dates, guarantees, collateral and purpose.
FR-019
Credit-risk flags
Flag missing repayment source, promotional expiration and unsupported borrowing.
FR-020
Business-family transfer record
Require a transfer class, authority, evidence and professional-review trigger.
FR-021
Asset and ownership map
Record legal title as documented and distinguish current from proposed structure.
FR-022
Trust-readiness checklist
Organize questions and evidence for qualified professional review.
FR-023
Succession readiness
Record responsibilities, successor candidates, knowledge gaps and emergency authority.
FR-024
Family education plan
Track age-appropriate competencies without exposing restricted records.
FR-025
Automation registry
Document trigger, permission, action, owner, log, fallback and kill switch.
FR-026
Exception center
Surface blocked work, failed automations, overdue approvals and financial warnings.
FR-027
Export
Export controlled records in common human-readable and machine-readable formats.
FR-028
Update-safe configuration
Separate core schema, customer records and declared customizations.
FR-029
Audit trail
Log material changes to authority, roles, financial records and automations.
FR-030
Professional review routing
Generate a preparation packet without presenting it as professional approval.

[Heading1] 7. Role Seat Specification
Field group
Required fields
Identity
Name, department, purpose, version, effective date
Accountability
Responsibilities, outcomes, KPIs, reporting cadence
Authority
May decide, must escalate, prohibited actions, approval thresholds
Work contract
Inputs, outputs, service level, handoff rules, verification gates
Capability
Required skills, tools, model/certification requirements, training
Access
Systems, data classes, permission scope, expiry and approver
Continuity
SOPs, sources, active queue, backup operator, offboarding checklist
Operator
Type, identity, start/end dates, availability and performance status

[Heading2] Operator swap workflow
Freeze new assignments if the role is sensitive.
Inventory active work, deadlines, approvals and access.
Select and qualify the replacement operator.
Reauthorize permissions; do not copy credentials.
Transfer controlled SOPs, sources, decisions and work queue.
Run a supervised sample assignment.
Verify output against the same gate used for the previous operator.
Close old access and record the effective transfer.
[Heading1] 8. Financial Command Requirements
[Heading2] Cash allocation
The system must support configurable allocation buckets for taxes, operating expenses, payroll, owner compensation, reserves, profit distributions, debt reduction, growth, equipment, marketing, employee development, intellectual property, asset acquisition, family wealth goals and giving. It must not ship with universal percentages presented as correct for every business.
[Heading2] Capital proposal states
DRAFT → EVIDENCE NEEDED → PROFESSIONAL REVIEW (when triggered) → APPROVAL → FUNDED → IN EXECUTION → RETURN REVIEW → CLOSED / CORRECTIVE ACTION
[Heading2] Financial guardrails
[ListBullet] No bank or brokerage credentials stored in plain text.
[ListBullet] No automatic transfer in v1.
[ListBullet] No borrowing recommendation without repayment source and downside disclosure.
[ListBullet] No transfer to family categorized as a generic expense.
[ListBullet] No “profit” label derived solely from account balance.
[ListBullet] No trust or tax recommendation presented as approved without professional sign-off.
[ListBullet] All projections label assumptions and are distinguishable from actuals.
[Heading1] 9. Wealth, Trust and Legacy Requirements
Capability
Founder Edition behavior
Boundary
Asset inventory
Record asset type, title evidence, restrictions and review date
No appraisal
Ownership map
Show documented current ownership and separately model proposals
No legal conclusion
Trust readiness
Collect goals, questions and required documents
No trust drafting
Succession
Map emergency and long-term control responsibilities
No legal transfer
Family governance
Mission, meetings, education and participation rules
No forced family policy
Professional packet
Export organized questions and records for review
Not proof of professional approval

[Heading2] Age-appropriate family learning
The system may track competencies such as saving, budgeting, work, ownership, taxes, credit, investing, business operations, risk, philanthropy and stewardship. Access to underlying family or company records must be permissioned separately from the learning plan.
[Heading1] 10. Automation and AI Requirements
Control
Requirement
Identity
Every automated action identifies the responsible Role Seat and automation version.
Permission
Actions operate under least privilege and within declared data classes.
Review
Restricted decisions pause for named human approval.
Evidence
Recommendations preserve sources, assumptions and confidence.
Logging
Trigger, input, output, failure and correction are recorded.
Fallback
A manual process exists for critical workflows.
Kill switch
Authorized user can suspend an automation immediately.
Portability
Core workflows are not irreversibly tied to one AI provider.
Privacy
Customer data is not repurposed for another customer or the commercial master.

[Heading1] 11. Nonfunctional Requirements
ID
Category
Requirement
NFR-001
Security
Least privilege, secure authentication, encryption and sensitive-action reauthentication.
NFR-002
Privacy
Data isolation, export, deletion and configurable retention.
NFR-003
Reliability
Recoverable writes, error visibility and backup strategy.
NFR-004
Auditability
Immutable or tamper-evident material event history appropriate to the platform.
NFR-005
Accessibility
Keyboard navigation, readable contrast, semantic structure and assistive-technology support.
NFR-006
Usability
Guided first use; no requirement to understand organizational-design jargon.
NFR-007
Portability
Export core records without proprietary lock-in.
NFR-008
Configurability
Custom fields and workflows remain distinguishable from the core schema.
NFR-009
Update safety
Migration tests, backups, rollback and release notes.
NFR-010
Performance
Common dashboards and work queues respond within product-defined service targets.
NFR-011
Observability
Automation failures and integration health are visible.
NFR-012
Jurisdiction labeling
Region-specific content identifies scope and review requirements.

[Heading1] 12. Permissions and Sensitive Data
Data class
Examples
Default treatment
Public
Published offers and public policies
Broad organizational access
Internal
Projects, SOPs and ordinary decisions
Role-based access
Confidential
Financials, contracts and personnel records
Restricted Role Seats and audit
Highly restricted
Credentials, health, beneficiary, tax ID and legal records
Separate vault/reference; minimum necessary access
Professional-review
Draft trust, tax, credit and ownership scenarios
Named reviewers; not approved until signed off

[Callout] COMMERCIAL SEPARATION TEST  No personal founder record may be used as seed data, demo data or customer-facing example unless it has been independently sanitized and explicitly cleared. Synthetic demonstration data is the default.
[Heading1] 13. Guided Onboarding
Create organization and confirm jurisdiction label.
Complete founder and business maturity assessment.
Create or select the first business.
Establish business/personal financial separation checklist.
Activate stage-appropriate departments.
Confirm Role Seats and current operators.
Import only approved records through mapped fields.
Configure authority and approval thresholds.
Set financial buckets and professional-review contacts.
Run a sample handoff and verification gate.
Schedule the first weekly executive review.
Display the first unresolved decision and one concrete next action.
[Heading2] First-value criterion
A new customer reaches first value when one real business priority has an accountable Role Seat, controlled next action, governing source, due date and verification gate—and the customer can explain the workflow without assistance.
[Heading1] 14. Core Dashboards
Dashboard
Minimum contents
Founder Command
Priorities, decisions, approvals, exceptions, cash warnings and next actions
Business Health
Goals, projects, customers, delivery, risks and stage
Team & Role Seats
Operators, vacancies, workload, authority and performance
Financial Command
Cash classes, reserves, obligations, debt, credit and capital proposals
Wealth & Legacy
Assets, ownership evidence, readiness, succession and education milestones
Automation Control
Active workflows, permissions, failures, last run and kill switch
Knowledge Control
SOP status, stale sources, decisions and superseded records

[Heading1] 15. Analytics and Product Measures
Category
Measure
Activation
Assessment completed; first business created; first governed work item completed
Adoption
Weekly executive reviews completed; active Role Seats; controlled handoffs
Quality
Verification pass rate; reopened work; missing authority/source fields
Portability
Successful operator swaps; time to competent handoff
Financial discipline
Reserve coverage entered; capital proposals reviewed; overdue return reviews
Risk
Automation failures; restricted-action blocks; data-separation exceptions
Legacy readiness
Ownership evidence coverage; professional-review packet completion
Retention
Continued use by business maturity and package

Metric definitions, consent, event schema and targets require a separate measurement specification before implementation. No vanity metric should substitute for completed governed work or improved decision quality.

[Heading1] 16. Release Plan
Phase
Deliverable
Exit gate
0 — Discovery
Customer interviews, workflow evidence and platform feasibility
Problem and willingness-to-pay evidence
1 — Controlled prototype
Maturity assessment, Role Seats, handoffs and executive review
Internal workflow acceptance
2 — Financial governance
Classification, reserves, capital proposals and credit registry
Professional and safety review
3 — Legacy readiness
Assets, ownership map, readiness and succession preparation
Professional-boundary review
4 — Private beta
Guided onboarding, support, analytics and update process
Beta acceptance and security review
5 — Founder Edition release
Commercial packaging, billing, documentation and support
Launch approval

[Heading1] 17. Acceptance Tests
Test
Pass condition
AT-01
New founder completes onboarding and sees only stage-relevant modules.
AT-02
User creates a Role Seat with authority, outputs, gate and operator.
AT-03
User swaps AI to human; queue and knowledge transfer while access is reauthorized.
AT-04
Restricted AI action pauses for human approval and records the decision.
AT-05
Blocked handoff cannot become VERIFIED without its gate result.
AT-06
Financial dashboard separates reserved, obligated and potentially available cash.
AT-07
Capital proposal cannot reach funded status without thesis, risk and review date.
AT-08
Credit record surfaces rate, due date, guarantee and repayment source.
AT-09
Family transfer requires a classification and review trigger.
AT-10
Ownership map distinguishes documented ownership from a proposed scenario.
AT-11
Professional packet carries a clear “not professional approval” notice.
AT-12
Update simulation preserves customer records and declared customizations.
AT-13
Automation failure appears in exception center with fallback and owner.
AT-14
Customer exports core business, work and financial-governance records.
AT-15
Synthetic demo contains no private OMNISTACK data.

[Heading1] 18. Dependencies
[ListBullet] Commercial Product Charter approval
[ListBullet] Customer discovery and pricing research
[ListBullet] Platform and integration feasibility study
[ListBullet] Privacy and security architecture
[ListBullet] Legal review of product claims, disclaimers and terms
[ListBullet] Accounting/tax review of financial classifications
[ListBullet] Estate/trust counsel review of readiness boundaries
[ListBullet] Accessibility requirements and testing plan
[ListBullet] Support model and incident escalation
[ListBullet] Trademark and intellectual-property review
[Heading1] 19. Unresolved Executive Decisions
Decision
Options to evaluate
Required evidence
Primary platform
Notion-first, custom SaaS, hybrid
Cost, security, update safety, user research
Pricing
One-time, subscription, implementation bundle
Willingness to pay and support cost
Financial modules
Core inclusion vs premium packaging
Customer value and liability review
AI provider strategy
Single provider vs abstraction layer
Quality, cost, privacy and portability
Customer segment
Solo founder vs staffed small business first
Pain severity and buying behavior
Jurisdiction scope
U.S.-first vs broader generic framework
Professional review and content burden
Data integrations
Manual/import first vs live finance connections
Security, support and product necessity

NEXT CONTROLLED ACTION: Executive review → v0.2 and assigned decisions. Product implementation remains unauthorized.

[Heading1] 20. PRD Verification Gate
[ListBullet] ☐ Every requirement traces to the charter.
[ListBullet] ☐ Founder Edition scope excludes unauthorized implementation and money movement.
[ListBullet] ☐ Role Seat portability is testable.
[ListBullet] ☐ Human approvals govern restricted decisions.
[ListBullet] ☐ Financial classifications and capital gates are explicit.
[ListBullet] ☐ Trust-readiness features avoid legal-document generation.
[ListBullet] ☐ Privacy classes and commercial separation are testable.
[ListBullet] ☐ Update safety has an acceptance test.
[ListBullet] ☐ Customer discovery remains a prerequisite to pricing and launch claims.
[ListBullet] ☐ Unresolved executive decisions are visible.