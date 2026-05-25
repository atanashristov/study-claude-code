# Clause Code: The practical Guide

## 01. Getting Stared

### 01.04. Claude Code in Different Terminals

Which terminal we are using and what are the shortcuts differs based on platform and terminal.

Keyboard shortcuts may vary by platform and terminal. In fullscreen rendering, press `?` in the transcript viewer to see available shortcuts there.

macOS users: Option/Alt key shortcuts (Alt+B, Alt+F, Alt+Y, Alt+M, Alt+P) require configuring Option as Meta in your terminal:

- Apple Terminal: Settings → Profiles → Keyboard → check “Use Option as Meta Key”
- VS Code: set "terminal.integrated.macOptionIsMeta": true in VS Code settings

See:

- [Supported platforms](https://code.claude.com/docs/en/interactive-mode)
- [Terminal instructions](https://code.claude.com/docs/en/terminal-config)

### 01.05. Using Bun

For this course's demo project, we are using the Bun runtime.

```sh
proto global bun latest
proto status -c all
```

See:

- [Bum installation](https://bun.com/docs/installation)

### 01.08. Configuring Claude Code

The configuration can be:

- global
- project
- local

**Global configuration**:

The **global** configuration is stored in folder `~/.claude`.
In there is a `settings.json` file. We can setup some global settings in it. We can also tweak these settings from inside Claude. If we run `/config` it will bring the configuration menu.

Tips:

- If we don't have complex tasks and we want to save tokens, we could turn off the thinking mode. That corresponds to `"alwaysThinkingEnabled" : false` in the `settings.json`.

- Deny reading `.env` files, so it does not have access to sensitive information like secrets, etc.

We can do this by entering in `settings.json`:

```json
"permissions": {
  "deny": [
   "Bash(**/.env)",
   "Read(**/.env)",
   "Write(**/.env)"
  ]
}
```

**Project configuration**:

Create `.claude/settings.json` within the project's folder that holds global settings for this project. It overrides the global setting.

We can also create `.claude/settings.local` within the project's folder. It holds local settings for the project and overrides the global settings and the project's global settings. the idea is hat *it is not checked in to the source control*. The member of the team can override settings locally for their needs.

### 01.09. Choosing AI Models

The `/model` command let's you choose the AI model you want to use.

We can also change the model by using `OPTION + P` on Mac or `ALT+P` on Windows PC.

### 01.10. Understanding Sessions & Context

`/clear` command clears the current session and the context window related to the session.

Session starts with running `claude`. We can also run multiple sessions on the same project, just make sure they don't overstep on the same files.

`/context` command tells us how the context window is being used so far.

`/usage` command shows the remaining usage per the Claude Code plan.

### 01.11. When to Start a new Session & Making Sense of Compaction

The **context window** has a limited size.

When Clade Code runs out of space, it **compacts** the conversation, by **generating a summary** of the conversation. Some details from the conversation will get lost.

`/compact` command is used to trigger compaction manually.

Since compaction WILL lead to loss of information, it's typically a good idea to keep sessions concise and focused. When working on a new feature, you want to use a new session (by starting a new Claude Code instance in a new terminal window, or via the `/clear` command). Also, use `/clear` when Claude Code gets stuck.

### 01.12. Core Features You May Not Know

When we run `claude` it starts the interactive CLI.

We can run Claude by giving it the prompt: `claude "prompt-text-here"`. It will still enter the interactive CLI mode, but will run the prompt right away. Example: `claude "explain this project"`.

We can also run `claude -p "prompt-text-here"` and it will not start the interactive CLI. It will simply print the response on the terminal.

`/resume` command allows us to restore and continue older session. Can be also used after we accidentally closed the session. It will allow us to browse the different sessions and choose which one to select.

Or if we simply want to start Claude Code CLI with the last session that we worked on, we simply run `claude -c`.

### 01.13. Advanced Permissions

Claude code asks for permissions: to edit files, create commits, etc.

"Shift+Tab" switches to accept edit files in your project till end of session.

We can run Claude with accepting all permissions upfront:

```sh
claude --dangerously-skip-permissions
```

### 01.14. Running Claude Code via Docker Sandboxes

Run Claude Code in a Docker sandbox with access to the local project, but not to the entire file system:

```sh
docker sandbox run claude [...params]
```

It runs then by default in the dangerously skip permissions mode.

### 01.15. Using Claude Code's Native Sandboxing

Claude Code has a build in sandbox. Inside a Claude Code session, run the command: `/sandbox`.

It will ask you which sandbox you want: auto-allow or regular permissions. Once we apply, the settings file in `.claude/settings.local.json` will be updated, and Claude will run in sandbox mode in future for the project.

After that we can "safely" run:

```sh
claude --dangerously-skip-permissions
```

See:

- [Claude Code Sandbox](https://code.claude.com/docs/en/sandboxing)

### 01.16. Undoing Actions & Importance of Version Control

Option 1: Use git. Create commit frequently.

**Claude option**: press "Esc" *twice* after a change you are not happy about. You then can rewind the changes to a specific check point or to he beginning of the conversation.

Similarly, this is the command: `/rewind`

### 01.17. Commands, Shortcuts & Settings

**CLI Commands & Flags**:

For all available commands and flags, see the [official docs](https://code.claude.com/docs/en/cli-reference).

`claude` / `claude "my prompt"` => Start a new Claude Code session, optionally with an initial prompt.

`claude -p "my prompt"` => Query Claude Code with "my prompt" and quit session once it's done (no ongoing session).

`claude -c` => Continue most recent session.

`claude --agent DocsExplorer` => Start a new session with a custom agent (instead of the default one). Custom agents will be covered later in the course.

`claude --allowedTools "Read" "Write"` => Skip permission confirmation dialog for specified permissions.

`claude --disallowedTools "Write"` => Disallow certain tools (specified tools are removed from Claude Code's context => it doesn't know about them).

`claude --dangerously-skip-permissions` => Skip ALL permissions confirmation dialogs. Use with great caution!

`claude --append-system-prompt "Always check if redundant code can be deleted"` => Append an instruction to the default system prompt. Can be used as session-specific alternative to instructions placed in CLAUDE.MD (CLAUDE.MD will be covered later).

`claude --model opus` => Sets the default model for the current session. Can be changed in the session via /model, or generally via settings (see below). For valid options, see the official list.

`claude --permission-mode plan` => Start in plan mode (default is "default" mode where Claude Code asks for permissions). For available options, see the official list. "Plan" mode will be covered later.

`claude --remote "Add dark mode"` => Start a remote (web) session (will be covered later in the course).

`claude --system-prompt "You are a React.js expert"` => Replace the entire default system prompt with a custom one.

**Claude Code Interaction**:

When inside a Claude Code session, you can use the following shortcuts for additional control. For all available shortcuts and commands, see the [official docs](https://code.claude.com/docs/en/interactive-mode).

`SHIFT + ENTER` / `OPTION + ENTER` / `CTRL + J` => Enter new line. Exact command depends on platform and terminal software used.

`SHIFT + TAB` => Switch through different modes ("default", "write permissions", "plan").

`CTRL + C` => Cancel current input or generation.

`ESC` => Cancel current generation (can be used to inject a new prompt into an ongoing task).

`ESC + ESC` => Restore the code prior to the last action performed by Claude Code.

`OPTION + P` / `ALT + P` => Switch model. Alternative to /model which can be useful if you already entered a prompt.

`ARROW` keys (left / right / top / down) => Cycle through options or questions (left / right) or past message (up / down).

`CTRL + O` => Toggle verbose output (more / less details).

`CTRL + B` => Move task to background. Important: Claude Code also automatically moves tasks (e.g., exploration tasks) to the background and it's typically quite smart about that.

`CTRL + V` / `CMD + V` / `ALT + V` => Insert text or image into prompt. The exact shortcut depends on your platform and terminal.

`CTRL + O` => Toggle verbose output (more / less details).

**Crucial Commands**:

`/help` => List available commands and get usage help.

`/model` => Choose the active model for the current session.

`/clear` => Clear session context window (i.e., start a new session, effectively).

`/compact` => Compact (summarize) current session context history and clear it thereafter.

`/config` => Open interactive settings menu.

`/context` => View statistics about current context window & context usage.

`/usage` => View current usage for your active plan (i.e., how much usage remains until the next reset). For more details about plans and usage, see the official help pages.

`/init` => Analyze project and create initial CLAUDE.MD file (covered later).

`/mcp` => View and manage installed MCP servers.

`/permissions` => View and update / change permissions.

`/rewind` => Rewind (undo) to earlier point in conversation, same as ESC + ESC.

`/statusline` => Configure the Claude Code status line.

`/teleport` => Resume a remote Claude Code session (covered later).

**Settings**:

You can configure (project-specific) settings also interactively via `/settings`. Or in your global, project-specific or local (non-Git-controlled) `settings.json` files (see past lectures).

For all available settings, see the [official docs](https://code.claude.com/docs/en/settings).

`{ "permissions": {...} }` => Manage permissions for all sessions. See previous lectures and official permissions settings docs.

`{ "model": "opus" }` => Manage default AI model used for new sessions.

`{ "alwaysThinkingEnabled": true }` => Whether to enabled "advanced thinking" mode or not. Is on by default. Turning it off will likely yield worse results.

`{ "hooks": {  } }` => Manage hooks (covered later in the course).

`{ "env": { "IS_DEMO": 1 } }` => Environment variables that will be applied to every session.

![](../03_Resources/01_Getting_Started/claude-code-cli-settings-cheat-sheet.jpg)

### 01.18. Course Resources and Community

Resources to course are [here](https://github.com/academind/claude-code-course-resources).
