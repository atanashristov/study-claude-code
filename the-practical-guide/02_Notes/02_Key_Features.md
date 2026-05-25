# Clause Code: The practical Guide

## 02. Key Features & Efficiency

### 02.19. Module Introduction

Covers:

- Prompt and Context Engineering
- Plan mode
- Memory Management & CLAUDE.md
- Custom Subagents
- Agent Skills

### 02.20. Making Sense of Prompt and Context Engineering

Building a note-taking app.

The project is utilizing [BETTER-AUTH](https://better-auth.com/).

The work stats with creating a prompt file, a text documents to provide a specification that describes the app.

Step 1: Create a text that describes the app.

Step 2: Give it to Gemini/ChatGPT and ask to create a technical specification.

Step 3: Copy the technical specification into a "SPEC.md" file and add to the project

Step 4: In `claude` tell it to improve the SPEC.md.

```md
We are building an app described in @SPEC.md .
Please format this file as proper markdown.
Also, update the file and update the part that describes the users table and auth-related tables.
We are using better-auth library which uses a certain database structure.
Here is the official better-auth database documentation article:
<better-auth-database-docs>
... paste the article here ...
</better-auth-database-docs>
```

Notes:

- IMPORTANT: Use "@" to point to a file.
- We use that technique to include any relevant file we need in our prompt.

Step 5: Press `SHIFT+TAB` to accept edits, then `ENTER`.

Step 6: Review and change the SPEC.md if and as needed.

### 02.23. Initialize Claude project

We rather add dependencies ourselves instead of using Claude:

```sh
❯ bun add better-auth zod @tiptap/react @tiptap/pm @tiptap/starter-kit @types/bun
bun add v1.3.14 (0d9b296a)

+ @tailwindcss/postcss@4.1.18
+ @types/bun@1.3.14
+ @types/node@20.19.29
+ @types/react@19.2.8
+ @types/react-dom@19.2.3
+ eslint@9.39.2
+ eslint-config-next@16.1.1
+ tailwindcss@4.1.18
+ typescript@5.9.3
+ next@16.1.1
+ react@19.2.3
+ react-dom@19.2.3

installed better-auth@1.6.11
installed zod@4.4.3
installed @types/bun@1.3.14
installed @tiptap/react@3.23.6
installed @tiptap/pm@3.23.6
installed @tiptap/starter-kit@3.23.6

420 packages installed [21.79s]
```

See:

- [Install Tiptap typescript dependencies](https://tiptap.dev/docs/editor/getting-started/install/react#install-tiptap-dependencies)

**Run init:**

Run `/init` for Claude to index the content of the project. It will create `CLAUDE.md` file. The `CLAUDE.md` is loaded in every session and provides memory for the project.

```sh
No CLAUDE.md found. Here's some quick context before we dive in:

  ▎ - CLAUDE.md files give Claude persistent instructions for a project, your personal workflow, or your organization.
  ▎ Claude reads them at the start of every session.
  ▎ - Skills are packaged instructions Claude invokes automatically when a task matches, or that you trigger with a
  ▎ slash command (e.g. /frontend-design, /commit-push-pr).
  ▎ - Hooks allow you to run shell commands automatically on lifecycle events: get notified when Claude is blocked on
  ▎ your input, auto-format after edits, enforce checks before commits — these are deterministic and Claude can't skip
  ▎ them.
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 ☐ File scope

Which CLAUDE.md files should /init set up?

❯ 1. Project CLAUDE.md
     Team-shared instructions checked into source control — architecture, coding standards, common workflows.
  2. Personal CLAUDE.local.md
     Your private preferences for this project (gitignored, not shared) — your role, sandbox URLs, preferred test data,
     workflow quirks.
  3. Both project + personal
     Create both files: shared project instructions and your private personal preferences.
  4. Let Claude decide
     Fastest path — project CLAUDE.md plus whatever skills or hooks fit this repo. No follow-on questions; you'll
     approve everything before it's written.
  5. Type something.
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  6. Chat about this
```

We can add folder specific (nested) `CLAUDE.md` files. They are scoped to their subfolder.

### 02.25. CLAUDE.md vs "Auto Memory"

Recent versions of Claude Code support two different ways of managing general information, instructions & memory:

1. `CLAUDE.md` files (see previous lectures)
2. Auto Memory

**CLAUDE.md:**

`CLAUDE.md` files are maintained by **you**. You put crucial, general information and instructions you want to provide to Claude Code for every session into this file.

You should keep the file focused and concise to avoid cluttering session context with unnecessary information or instructions (which would consume limited context window space and could lead to worse model performance).

**Auto Memory:**

Since version **2.1.59**, Claude Code has an additional, related feature called **"Auto Memory"**.

This feature is also about saving information & instructions and loading them into every new session. But "Auto Memory", as the name suggests, is about Claude Code **autonomously** storing important information or instructions — so for this kind of memory, it's not you, it's Claude Code.

Claude Code stores that information in `MEMORY.md` files at a global path:

```sh
~/.claude/projects/<project>/memory/
```

In addition to the main `MEMORY.md` file, Claude Code may also create topic-specific memory files in that path (per project).

Claude loads **parts** (the first 200 lines of `MEMORY.md`) for every new conversation, and the **entire** memory files for every new session. It is configured to keep those memory files concise — for the same reason as `CLAUDE.md` files.

The idea behind Auto Memory is simply that you don't have to think about everything you want Claude Code to "remember". Instead, it tries to learn from your instructions. For example, it might store:

- Instructions related to an error it made that you called out multiple times
- A certain code style you corrected it to use

You can **disable, enable, and configure** Auto Memory via the `/memory` command inside Claude Code. This command also allows you to browse and edit the memory files belonging to your project (if any exist).

**Summary:**

Auto Memory is **not** a replacement for a customized `CLAUDE.md` file — think of it as an additional aid that can lead to better results.

> If you know about a specific piece of information or instruction you want Claude Code to follow in all your sessions, **don't** hope for it to memorize it — put it into `CLAUDE.md` yourself!

### 02.26. Leveraging Plan Mode

Run `/clear`. The `/clear` command resets the conversation to an empty context, so subsequent prompts start with no prior conversation history. The previous conversation remains on disk and can be returned to by passing its session ID to the `resume option`.

Then write a prompt and switch to `plan mode` by tapping `SHIFT+TAB`:

> Let's start building the application described in @SPEC.MD file.
>
> Start by setting up core route structure. Only add a dummy page on each page. No actual content yet.
>
> Just create all those different page.tsx files for the different application routes. Don't implement authentication yet.

Always start with `plan mode`. Claude will collect information and ask for clarifications.

```sh
Plan: Core Route Structure

 Context

 Fresh Next.js app with only app/page.tsx and app/layout.tsx. Need to scaffold all routes from SPEC.MD §8.1 with dummy
 pages — no logic, no auth yet.

 Routes to Create

 ┌─────────────┬────────────────────────────────────┐
 │    Route    │                File                │
 ├─────────────┼────────────────────────────────────┤
 │ /           │ app/page.tsx — replace boilerplate │
 ├─────────────┼────────────────────────────────────┤
 │ /dashboard  │ app/dashboard/page.tsx             │
 ├─────────────┼────────────────────────────────────┤
 │ /notes/[id] │ app/notes/[id]/page.tsx            │
 ├─────────────┼────────────────────────────────────┤
 │ /p/[slug]   │ app/p/[slug]/page.tsx              │
 ├─────────────┼────────────────────────────────────┤
 │ /login      │ app/(auth)/login/page.tsx          │
 ├─────────────┼────────────────────────────────────┤
 │ /register   │ app/(auth)/register/page.tsx       │
 └─────────────┴────────────────────────────────────┘

...

 Claude has written up a plan and is ready to execute. Would you like to proceed?

 ❯ 1. Yes, and use auto mode
   2. Yes, manually approve edits
   3. No, refine with Ultraplan on Claude Code on the web
   4. Tell Claude what to change
      shift+tab to approve with this feedback

 ctrl-g to edit in  VS Code  · ~/.claude/plans/let-s-start-building-the-goofy-hopper.md
```

We want changes on login and register. Press `4` and tell what we want to change:

> I only want oa single "/authenticate" route which supports only email + password.

Then press `1` to auto-approve the edit mode.
