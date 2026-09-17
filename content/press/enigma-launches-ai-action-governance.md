---
title: "Foundry360 Launches AI Action Governance Platform to Bring Policy Enforcement to the Moment AI Acts"
description: "New platform provides a runtime governance layer that evaluates AI-mediated actions against enterprise policy, enforces decisions at the request boundary, routes exceptions for human approval, and creates evidence of what was decided and what happened."
date: "2026-09-17"
location: "JACKSONVILLE, FL"
author: "Foundry360"
---

**FOR IMMEDIATE RELEASE**

**JACKSONVILLE, FL, September 17, 2026.** Foundry360 today announced the launch of **Enigma**, an AI Action Governance platform designed to address a growing gap in enterprise AI governance: the distance between having policies for artificial intelligence and actually enforcing those policies when an AI system attempts to take an action.

As organizations move from AI experimentation to increasingly autonomous agents, copilots, and AI-enabled applications, traditional governance approaches can leave a critical question unanswered: **When an AI system is about to act, what determines whether that action should actually be allowed to proceed?**

Enigma is designed to answer that question at runtime.

Rather than focusing solely on AI inventories, risk assessments, governance frameworks, monitoring, or post-event audit, Enigma introduces a governance layer directly into the AI request path. It evaluates the proposed action against enterprise policy and determines whether the action should be allowed, denied, or held for human review. The platform then records the decision and associated evidence, creating a traceable chain from policy to action.

> **“Enterprise AI governance has largely focused on defining policy and understanding risk. The next challenge is enforcing those decisions when AI actually acts,”** said Jason Gelsomino, Founder and CEO of Foundry360. **“Enigma was built around that moment. The objective is not to create another dashboard that tells you what happened after the fact. It is to make policy part of the decision that governs what an AI system is allowed to do.”**

## From AI Governance to AI Action Governance

Enterprise organizations have invested heavily in identity and access management, data security, AI risk management, model governance, monitoring, and compliance programs. These capabilities remain important, but they address different points in the AI lifecycle.

Enigma focuses specifically on the **AI action**.

An AI system may have legitimate access to an application, data source, or tool and still attempt an action that should not proceed under the organization's policies or the circumstances surrounding the request.

For example, an AI agent may be authorized to use a healthcare application but attempt to modify a patient record. A financial services agent may have access to a customer account but attempt an action outside its authorized business purpose. An enterprise copilot may be permitted to work with internal information but attempt to transmit information to an external destination.

The question is not simply whether the AI can access the system.

The question is whether **this particular AI-mediated action should be permitted under the applicable policy and context**.

Enigma is designed to make that decision explicit.

### Enigma's governance model follows a simple progression:

**Bind → Decide → Enforce → Review → Prove**

- **Bind** identifies the application, user, and, where applicable, the AI agent and tool involved in the request.
- **Decide** evaluates the proposed AI action against enterprise policy.
- **Enforce** applies the resulting decision at the Gateway boundary controlled by Enigma.
- **Review** routes actions requiring human judgment to an authorized approver.
- **Prove** creates evidence of the policy decision, enforcement result, and reported outcome.

This creates a governance chain from **Policy → Decision → Action → Evidence → Outcome**.

## Designed for AI Actions, Not Just AI Access

Enigma is intentionally differentiated from traditional access-control and governance technologies.

Identity and access management establishes who or what is authorized to access a resource. Enigma addresses a different question: **whether an AI-mediated action should proceed under the applicable policy and circumstances.**

Similarly, monitoring and observability can provide visibility into activity and outcomes. Enigma is designed to introduce a policy decision into the request path before a governed action proceeds.

This distinction becomes increasingly important as AI systems move beyond generating content and begin interacting with enterprise applications, tools, workflows, and systems of record.

Enigma can govern actions such as:

- Creating or modifying enterprise records
- Executing business operations through AI agents
- Invoking enterprise tools
- Transmitting information
- Performing AI-mediated updates
- Generating content subject to policy controls
- Executing actions that require human authorization
- Interacting with regulated data and systems
- Using models or AI capabilities subject to organizational policy

The platform supports decisions including **ALLOW, ALLOW WITH CONTROLS, REVIEW, and DENY**, allowing organizations to define how different types of AI actions should be handled.

## Human Review Where Policy Requires It

Enigma is also designed for situations where policy should not result in an automatic allow or deny.

When an action requires human judgment, Enigma can place the action into a review state and route it to an authorized approver. The requesting user does not simply approve their own exception.

Once an authorized approver resolves the review, Enigma can resume the governed request subject to the original governance context.

This creates a human-in-the-loop model for consequential AI actions without turning Enigma into a general-purpose workflow platform.

## Evidence From Decision to Outcome

A central component of Enigma is the creation of an evidence trail around governed AI actions.

The platform preserves the policy decision and the relevant governance context, including the application, user, agent, tool, action, and applicable policy information. Enforcement results are associated with the decision, while outcomes can be recorded when the downstream system reports completion.

This provides organizations with a structured record of:

- What AI action was attempted
- Who and what initiated the action
- Which application, agent, and tool were involved
- Which policy decision applied
- Why the decision was reached
- Whether the request was allowed, denied, or held for review
- Whether human approval was required
- What enforcement occurred at the Enigma boundary
- Whether an outcome was subsequently reported

Enigma distinguishes between what it directly controls at the Gateway boundary and what occurs downstream in an enterprise system. For actions where an external system performs the final side effect, Enigma records that outcome as client-reported evidence rather than representing the external transaction as an action executed directly by Enigma.

That distinction is fundamental to the platform's approach to trustworthy AI governance.

## Built for Regulated and Highly Controlled Environments

Enigma is designed for organizations where AI governance must operate within existing regulatory, security, and operational requirements.

The initial platform includes **Healthcare Policy Packs** that provide policy coverage for healthcare-specific governance requirements, including:

- **HIPAA**
- **42 CFR Part 2**
- **ONC HTI-1**
- **CMS-related policy requirements**

These policy packs are implemented through the same underlying Enigma governance architecture rather than separate governance engines for individual regulations.

The healthcare capabilities are particularly relevant to health systems, payers, life sciences organizations, and healthcare technology companies deploying AI against sensitive data and consequential workflows.

However, healthcare is not a limitation on Enigma's scope.

The underlying platform is designed for **enterprise AI governance across industries**, with policy serving as the mechanism for translating organizational requirements into runtime decisions about AI actions.

As organizations develop industry-specific policies and controls, Enigma's architecture is designed to support those requirements without requiring a separate governance system for every industry or use case.

## Connected and Air-Gapped Deployment

Enigma is designed for environments ranging from connected enterprise deployments to highly controlled and isolated environments.

The platform can operate with enterprise AI infrastructure and can also support local AI runtime scenarios, including air-gapped environments where organizations require greater control over the systems and data involved in AI processing.

This deployment model is particularly relevant for organizations operating under strict security, privacy, intellectual property, or regulatory requirements.

## Governing Agents, Tools, and Actions

As enterprise AI evolves from individual prompts and copilots toward agentic systems, governance becomes increasingly dependent on understanding more than the model itself.

Enigma incorporates the application, user, agent, tool, and action as governance context.

An AI agent may be technically capable of invoking a tool, but capability alone does not determine whether a particular action should proceed.

Enigma evaluates the action in context and applies the organization's policy to the request.

This enables organizations to establish governance around AI-mediated operations without creating a separate policy engine for every agent, tool, or action type.

## A Governance Gateway for the Agentic Enterprise

The emergence of autonomous and semi-autonomous AI systems changes the enterprise control problem.

Traditional applications generally wait for a human to initiate an operation. Agentic systems can reason across multiple steps, invoke tools, access enterprise systems, and initiate actions with varying degrees of autonomy.

That creates a new governance requirement.

Organizations need to understand not only **what AI systems are available**, but also **what those systems are allowed to do when they act**.

Enigma is built around that distinction.

> **“Agent reasons. Policy decides. Gateway enforces.”**

That principle represents the foundation of Enigma's approach to AI Action Governance.

## Enigma's Position in the Enterprise AI Stack

Enigma is not intended to replace identity and access management, enterprise security controls, SIEM platforms, GRC programs, data protection technologies, or model governance.

Instead, Enigma operates at a different point in the control chain.

Organizations can continue using their existing investments in those areas while introducing an additional governance layer focused specifically on AI-mediated actions.

The result is a complementary control model:

**Identity establishes who can act.**

**Enterprise policy establishes what should be permitted.**

**Enigma makes the runtime decision on the AI action.**

**The Gateway enforces that decision at the boundary it controls.**

**Evidence records what was decided, enforced, and reported.**

## From Policy to Proof

The launch of Enigma reflects a broader shift in enterprise AI governance.

As organizations move AI into production, governance cannot stop at policy documents, risk assessments, inventories, or post-event reporting. Those capabilities remain important, but organizations also need a mechanism that connects policy to the actions AI systems attempt to perform.

Enigma was built to provide that connection.

**Enigma governs AI actions from policy to proof.**

### About Enigma

**Enigma** is an AI Action Governance platform from Foundry360 that evaluates AI-mediated actions against enterprise policy, enforces decisions at the request boundary, routes exceptions to authorized approvers, and creates evidence of decisions and reported outcomes.

Enigma supports enterprise AI deployments across industries, with specialized Healthcare Policy Packs for organizations operating under healthcare-specific regulatory requirements. The platform is designed for connected and air-gapped environments and supports governance across applications, users, AI agents, tools, models, and AI-mediated actions.

**Agent reasons. Policy decides. Gateway enforces.**

Learn more at [getenigmaai.com](https://getenigmaai.com).

### About Foundry360

**Foundry360** is a technology and transformation company focused on helping organizations navigate the operational and governance challenges created by artificial intelligence. Foundry360 develops technology and advisory solutions designed to help enterprises move from AI experimentation to controlled, governed, and measurable AI adoption.

**Media Contact**

Foundry360  
Jason Gelsomino, Founder and CEO  
jgelsomino@foundry360.us  
904.210.3388  
[www.foundry360.us](https://www.foundry360.us)
