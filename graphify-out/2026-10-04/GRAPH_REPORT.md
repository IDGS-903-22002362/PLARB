# Graph Report - PLARB  (2026-10-04)

## Corpus Check
- 120 files · ~426,652 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: .css 7, (none) 3, .tsbuildinfo 1)

## Summary
- 889 nodes · 2032 edges · 47 communities (42 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `18eff0c7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sidebar.tsx
- cn
- field.tsx
- rules
- menubar.tsx
- react
- components.json
- combobox.tsx
- package.json
- dependencies
- @testing-library/react
- layout.tsx
- devDependencies
- ascii-ripple.tsx
- bubble.tsx
- input-otp.tsx
- compilerOptions
- @base-ui/react
- context-menu.tsx
- hero-face.test.tsx
- resizable.tsx
- Button
- drawer.tsx
- chart.tsx
- visual-regressions.test.tsx
- item.tsx
- toast.tsx
- SiteShell
- internal-motion.test.tsx
- Evidencia editorial y recursos
- navigation-menu.tsx
- select.tsx
- vite.config.ts
- empty.tsx
- scripts
- lucide-react
- utils.ts
- progress.tsx
- tabs.tsx
- .oxfmtrc.json
- TestIntersectionObserver
- Luis Rosas — Portafolio profesional
- engines
- Skill Registry — PLARB
- alert.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 345 edges
2. `react` - 57 edges
3. `usePreferences()` - 43 edges
4. `@base-ui/react` - 39 edges
5. `c()` - 38 edges
6. `lucide-react` - 30 edges
7. `Button()` - 29 edges
8. `CaseStudy()` - 24 edges
9. `Home()` - 24 edges
10. `uiCopy()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert-dialog.tsx → lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert-dialog.tsx → lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert-dialog.tsx → lib/utils.ts
- `AlertDialogTitle()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert-dialog.tsx → lib/utils.ts
- `AlertDialogDescription()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert-dialog.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (47 total, 5 thin omitted)

### Community 0 - "sidebar.tsx"
Cohesion: 0.07
Nodes (38): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetPortal(), SheetTitle() (+30 more)

### Community 1 - "cn"
Cohesion: 0.06
Nodes (56): Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Attachment(), AttachmentAction(), AttachmentActions(), AttachmentContent() (+48 more)

### Community 2 - "field.tsx"
Cohesion: 0.19
Nodes (11): Field(), FieldContent(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), FieldLegend(), FieldSet() (+3 more)

### Community 3 - "rules"
Cohesion: 0.06
Nodes (33): categories, correctness, env, browser, builtin, node, ignorePatterns, options (+25 more)

### Community 4 - "menubar.tsx"
Cohesion: 0.11
Nodes (31): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuPortal(), DropdownMenuRadioGroup() (+23 more)

### Community 5 - "react"
Cohesion: 0.06
Nodes (87): MissingProject(), Architecture(), NodeIcon(), CaseContents(), sections, CaseStudy(), Heading(), LoyaltyNote() (+79 more)

### Community 6 - "components.json"
Cohesion: 0.07
Nodes (28): aliases, components, hooks, lib, ui, utils, Authorization, iconLibrary (+20 more)

### Community 7 - "combobox.tsx"
Cohesion: 0.11
Nodes (19): ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent(), ComboboxEmpty(), ComboboxGroup(), ComboboxInput() (+11 more)

### Community 8 - "package.json"
Cohesion: 0.07
Nodes (27): name, private, type, version, @cloudflare/vite-plugin, @cloudflare/workers-types, clsx, cmdk (+19 more)

### Community 9 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @base-ui/react, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, @fontsource-variable/dm-sans (+17 more)

### Community 11 - "layout.tsx"
Cohesion: 0.13
Nodes (12): metadata, generateMetadata(), ProjectPage(), Props, personSchema, projectMetadata(), projectOgImage(), siteOrigin (+4 more)

### Community 12 - "devDependencies"
Cohesion: 0.09
Nodes (22): devDependencies, @cloudflare/vite-plugin, @cloudflare/workers-types, jsdom, @openai/sites-vite-plugin, oxfmt, oxlint, oxlint-tsgolint (+14 more)

### Community 13 - "ascii-ripple.tsx"
Cohesion: 0.16
Nodes (17): AsciiRipple, AsciiRippleEdges, AsciiRippleHandle, AsciiRippleProps, buildGrid(), buildSurface(), clamp01(), disturb() (+9 more)

### Community 14 - "bubble.tsx"
Cohesion: 0.38
Nodes (6): Bubble(), BubbleContent(), BubbleGroup(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

### Community 15 - "input-otp.tsx"
Cohesion: 0.33
Nodes (4): InputOTP(), InputOTPGroup(), InputOTPSlot(), input-otp

### Community 16 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 17 - "@base-ui/react"
Cohesion: 0.09
Nodes (20): Badge(), badgeVariants, ButtonGroup(), ButtonGroupText(), buttonGroupVariants, HoverCardContent(), Marker(), MarkerContent() (+12 more)

### Community 18 - "context-menu.tsx"
Cohesion: 0.13
Nodes (10): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+2 more)

### Community 19 - "hero-face.test.tsx"
Cohesion: 0.18
Nodes (6): BlockedAudio, DelayedAudio, disconnect, gainNode(), oscillatorNode(), parameter()

### Community 20 - "resizable.tsx"
Cohesion: 0.40
Nodes (3): ResizableHandle(), ResizablePanelGroup(), react-resizable-panels

### Community 21 - "Button"
Cohesion: 0.06
Nodes (43): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogMedia(), AlertDialogOverlay() (+35 more)

### Community 22 - "drawer.tsx"
Cohesion: 0.17
Nodes (11): DrawerContent(), DrawerContext, DrawerContextProps, DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerPortal() (+3 more)

### Community 23 - "chart.tsx"
Cohesion: 0.20
Nodes (13): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartStyle(), ChartTooltipContent(), getPayloadConfigFromPayload() (+5 more)

### Community 24 - "visual-regressions.test.tsx"
Cohesion: 0.23
Nodes (7): NotFound(), PreferencesProvider(), subscribe(), write(), projectMedia, renderFace(), Gallery()

### Community 25 - "item.tsx"
Cohesion: 0.14
Nodes (16): ButtonGroupSeparator(), FieldSeparator(), Item(), ItemActions(), ItemContent(), ItemDescription(), ItemFooter(), ItemGroup() (+8 more)

### Community 26 - "toast.tsx"
Cohesion: 0.28
Nodes (12): toast, ToastAction(), ToastClose(), ToastContent(), ToastDescription(), Toaster(), ToastIcon(), ToastList() (+4 more)

### Community 27 - "SiteShell"
Cohesion: 0.24
Nodes (4): Portfolio(), SiteShell(), vitest, renderCase()

### Community 28 - "internal-motion.test.tsx"
Cohesion: 0.36
Nodes (5): TransitionLink(), navigateWithTransition(), @testing-library/user-event, originalScrollTo, originalViewTransition

### Community 30 - "Evidencia editorial y recursos"
Cohesion: 0.18
Nodes (10): Backend de lealtad, Club León FC, Enlaces públicos, Evidencia editorial y recursos, Identidad y formación, Imagen social generada, Imágenes, La Guarida (+2 more)

### Community 32 - "navigation-menu.tsx"
Cohesion: 0.24
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuPositioner(), NavigationMenuTrigger() (+1 more)

### Community 33 - "select.tsx"
Cohesion: 0.24
Nodes (9): SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger() (+1 more)

### Community 34 - "vite.config.ts"
Cohesion: 0.25
Nodes (5): @openai/sites-vite-plugin, @tailwindcss/postcss, vinext, vite, localBindingConfig

### Community 37 - "empty.tsx"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 38 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, format, lint, start, test, typecheck

### Community 39 - "lucide-react"
Cohesion: 0.19
Nodes (20): MediaImage(), ProjectVisual(), Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandItem(), CommandList() (+12 more)

### Community 42 - "utils.ts"
Cohesion: 0.09
Nodes (16): AspectRatio(), Checkbox(), InputGroupInput(), InputGroupText(), InputGroupTextarea(), Input(), PopoverContent(), PopoverDescription() (+8 more)

### Community 43 - "progress.tsx"
Cohesion: 0.47
Nodes (5): Progress(), ProgressIndicator(), ProgressLabel(), ProgressTrack(), ProgressValue()

### Community 44 - "tabs.tsx"
Cohesion: 0.40
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 45 - ".oxfmtrc.json"
Cohesion: 0.33
Nodes (5): ignorePatterns, printWidth, $schema, singleQuote, sortPackageJson

### Community 47 - "Luis Rosas — Portafolio profesional"
Cohesion: 0.22
Nodes (8): Comprobación, Contenido y rutas, Decisiones técnicas, Ejecutar, Información pendiente, Luis Rosas — Portafolio profesional, Límite local, Organización

### Community 53 - "Skill Registry — PLARB"
Cohesion: 0.33
Nodes (5): Contract, Loading protocol, Skill Registry — PLARB, Skills, Sources scanned

### Community 54 - "alert.tsx"
Cohesion: 0.40
Nodes (5): Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants

## Knowledge Gaps
- **227 isolated node(s):** `$schema`, `singleQuote`, `printWidth`, `sortPackageJson`, `ignorePatterns` (+222 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 293 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `sidebar.tsx`, `field.tsx`, `menubar.tsx`, `combobox.tsx`, `ascii-ripple.tsx`, `bubble.tsx`, `input-otp.tsx`, `@base-ui/react`, `context-menu.tsx`, `resizable.tsx`, `Button`, `drawer.tsx`, `chart.tsx`, `item.tsx`, `toast.tsx`, `navigation-menu.tsx`, `select.tsx`, `empty.tsx`, `lucide-react`, `utils.ts`, `progress.tsx`, `tabs.tsx`, `alert.tsx`?**
  _High betweenness centrality (0.283) - this node is a cross-community bridge._
- **What connects `$schema`, `singleQuote`, `printWidth` to the rest of the system?**
  _227 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sidebar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06956521739130435 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `sidebar.tsx`, `cn`, `field.tsx`, `menubar.tsx`, `combobox.tsx`, `package.json`, `ascii-ripple.tsx`, `bubble.tsx`, `input-otp.tsx`, `@base-ui/react`, `context-menu.tsx`, `Button`, `drawer.tsx`, `chart.tsx`, `item.tsx`, `toast.tsx`, `internal-motion.test.tsx`, `select.tsx`, `lucide-react`, `utils.ts`, `alert.tsx`?**
  _High betweenness centrality (0.214) - this node is a cross-community bridge._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.05673076923076923 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `lucide-react` to `navigation-menu.tsx`, `cn`, `select.tsx`, `sidebar.tsx`, `menubar.tsx`, `react`, `combobox.tsx`, `package.json`, `utils.ts`, `input-otp.tsx`, `context-menu.tsx`, `Button`, `toast.tsx`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Should `rules` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._