---
title: Post with a pretty long name to test components
description: Post with a pretty long description to test components
date: '2026-02-09'
categories:
    - sveltekit
    - svelte
published: true
---

## Markdown

Hey Friends 3! 👋

```css
@layer components {
  .icon-bar {
    @apply menu menu-horizontal text-3xl;

    svg {
      @apply transition-[scale] duration-500;
    }

    * {
      @variant hover {
        svg {
          @apply scale-112 animate-wiggle
        }
      }
    }
  }

  .name {
    @apply
      bg-linear-to-r
      from-primary
      to-accent
      text-transparent
      bg-clip-text
      text-shadow-[0_7px_20px_var(--color-primary)]
  }
}
```