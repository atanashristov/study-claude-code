# Enhancing Skills & Adding Third-Party Skills

## Enhancing Skills

You learned how you can add custom skills.

If you find that your custom skills are not getting used by Claude Code, try tweaking the description of the skill — because it's the title + description that's exposed to Claude Code and that therefore is important for its "automatic discoverability".

You can try adding extra instructions like:

- `"Use this skill to optimize React components and check for the usage of common best practices"`
- `"Gets triggered when writing ANY kind of CSS code"`

If you **don't** want automatic invocation (i.e., if you want to use skills as custom commands only), you can add `disable-model-invocation: true` to the skill metadata (next to `title` and `description`). If you want the opposite (i.e., **only** automatic discoverability, no user invocation) you can add `user-invocable: false`.

You can also restrict which tools Claude Code may use when triggering this skill via the `allowed-tools` metadata. For example, adding `allowed-tools: Read` allows Claude Code to read files but prevents it from editing or creating. You can find a [list of available tools](https://docs.anthropic.com/en/docs/claude-code/skills) in the official documentation.

If your skill should work with extra input (e.g., when building it as a custom command), you can use the special `$ARGUMENTS` placeholder in your skill content.

For example, you could build a specialized code-review skill like this:

**`.claude/skills/code-review/SKILL.md`:**

```markdown
---
name: code-review
description: Review code for bugs, security or performance issues. Use this skill when asked to perform code reviews or after finishing major tasks or after refactoring code.
allowed-tools: Read
---

MODE: $ARGUMENTS

If Mode is one of the following, adjust the review as described:

- MODE == BUGS: Focus ONLY on logical or other bugs.
- MODE == SECURITY: Focus ONLY on security issues.
- MODE == PERFORMANCE: Focus ONLY on performance issues.

MODE can also be set to a combination like "BUGS,SECURITY" etc — perform the combined review in that case.

If MODE is set to anything else or nothing at all, perform a thorough, general code review.

Perform an in-depth code review of the entire codebase.

Carefully and thoroughly explore the codebase file-by-file to find potential issues and improvements.

Don't rush it — instead make sure you fully understand the code structure and architecture.

Create a detailed report of all your findings.
```

> You'll also see a different way of creating custom commands later in the course.

---

## Adding Third-Party Skills

Building custom skills is a powerful ability, because it allows you to really tailor your Claude Code experience and behavior to your specific project requirements and preferences.

But you can also add third-party skills — in addition to your custom skills.

A popular and growing (free!) public skills repository is [skills.sh](https://skills.sh).

There, you find a broad selection of skills you can add to your project. You can install skills from that repository via:

```bash
npx skills add <owner/repo>
```

> Requires Node.js to be installed on your system, since `npx` is a tool installed together with Node.js.

Of course, you can and should explore the skills you install — you can tweak them or remove selected parts as needed.
