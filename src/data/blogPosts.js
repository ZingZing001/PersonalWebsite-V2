// Blog posts data - add new posts here
// Posts are sorted by date (newest first) when displayed

const BASE_URL = import.meta.env.BASE_URL;

export const blogPosts = [
  {
    id: 9,
    slug: "from-intern-to-graduate-engineer-learning-java-at-eroad",
    title: "From Intern to Graduate Engineer: Learning Java on the Tax Team",
    date: "2026-06-16",
    excerpt: "A new chapter at EROAD—stepping into a full Graduate Software Engineer role on the Tax team, and trading fast-moving AI prototyping for production Java, Spring Boot, and event-driven systems.",
    tags: ["EROAD", "Career", "Java", "Spring Boot", "Backend"],
    readTime: "7 min read",
    image: `${BASE_URL}blog/InternAtEroad2026.JPG`,
    content: `
## A New Chapter at EROAD

Earlier this year I wrapped up my internship at EROAD. This post is about what came next: stepping into a full **Graduate Software Engineer** role and joining the **Tax team**. New team, new domain, and—maybe the biggest change of all—a new primary language: **Java**.

It's been equal parts exciting and humbling, and I wanted to capture some of what the transition has actually felt like.

## From AI Prototyping to Production Engineering

My internship was a whirlwind of AI agents, Microsoft Copilot Studio, and custom MCP integrations—mostly in the fast-moving world of Node.js and rapid prototyping. The goal there was often to prove an idea quickly: ship a working agent, get feedback, iterate.

The graduate role is a different kind of work, and I mean that in the best way. On the Tax team I'm working in established, production codebases where the bar isn't "does the demo work?" but "will this be correct, reliable, and maintainable for years?" Tax and compliance systems are exactly the kind of place where that mindset matters—numbers have to be *right*, behaviour has to be auditable, and edge cases aren't optional extras.

Moving from "move fast and prototype" to "move carefully and build to last" has been one of the most valuable shifts in how I think as an engineer.

## Learning Java, Coming from JavaScript

Most of my work until now lived in JavaScript and TypeScript. Picking up **Java** as my day-to-day language has been a genuine adjustment—and a really rewarding one.

A few things stood out early:

- **Static typing earns its keep.** Coming from JS, I used to find out about a lot of mistakes at runtime. In Java, the compiler catches whole categories of bugs before the code ever runs. It felt strict at first; now I appreciate it as a safety net.
- **Structure and convention everywhere.** The Java ecosystem has strong, shared conventions for how projects are laid out and how code is organised. That consistency makes a large codebase far easier to navigate than I expected.
- **The JVM is a different world.** Understanding how things run—threads, the build tooling, dependency management—has been its own learning curve, separate from the language syntax.

I'm not going to pretend I've mastered it. But every week the language feels a little less foreign and a little more like a tool I can reason with.

## Getting Comfortable with Spring Boot

The team builds on **Spring Boot**, and learning the framework has been almost as big a task as learning the language itself.

What I've come to appreciate is how much Spring Boot gives you out of the box—configuration, dependency injection, and sensible defaults that let you focus on the actual business logic. The flip side is that there's a lot of "magic" happening behind the scenes, and a chunk of my early learning has been about understanding *why* things work, not just *that* they work. Dependency injection in particular took a few "oh, that's how it fits together" moments before it clicked.

## Thinking in Events

The deepest mental shift has been moving toward **event-driven architecture**.

I was used to a fairly linear model: a request comes in, you do some work, you return a response. On the Tax team, a lot of the system communicates by **publishing and reacting to events**—services emit a message when something happens, and other services react to it asynchronously, decoupled from one another.

It took me a while to stop thinking in straight lines and start thinking in streams. But the benefits became clear quickly: services that don't have to know about each other directly, work that can be processed reliably even under load, and a system that's far more resilient because no single piece is a hard dependency for everything else. Designing and reasoning about asynchronous, decoupled flows is a skill I'm actively building, and it's changing how I see backend systems in general.

## Why the Stakes Sharpen You

During my internship I was part of a P1 billing incident, and that experience taught me how directly architectural decisions can affect real customers and real trust. The Tax team has only deepened that lesson.

When you're working on compliance-critical systems, correctness isn't a "nice to have." A subtle bug isn't just an inconvenience—it can have real consequences. That weight is a good thing for a young engineer to carry early. It pushes you to write better tests, ask more questions, and slow down at exactly the moments where slowing down matters.

## What I'm Taking From It

If my internship was about breadth—AI, automation, exposure to a dozen new tools—this chapter is about **depth**. Going deep on a language, a framework, an architectural style, and a domain, with the time and support to actually get good at them.

Huge thanks again to the people at EROAD who keep making room for me to learn. The values I wrote about as an intern—*We Learn and Grow*, *We Do What's Right*—aren't just slogans on a wall; they're the thing that makes it safe to ask "I don't understand this yet, can you walk me through it?" and to keep growing because of it.

## Looking Ahead

I'm still very much at the start of this. There's a lot of Java, a lot of Spring, and a lot of the tax domain left to learn. But that's exactly why it's exciting—every hard thing here is a hard thing worth getting good at.

Thanks for reading!
    `
  },
  {
    id: 8,
    slug: "building-virtual-johnson-rag-chatbot-architecture",
    title: "Building Virtual Johnson: The Architecture of a RAG Chatbot",
    date: "2026-06-16",
    excerpt: "I built an AI version of myself that lives on this site and answers questions about my work. Here's the full architecture—RAG, embeddings, a Cloudflare Worker, and streaming—and why it costs almost nothing to run.",
    tags: ["AI", "RAG", "Cloudflare Workers", "Architecture", "Project"],
    readTime: "9 min read",
    image: `${BASE_URL}blog/rag-architecture.png`,
    content: `
## Meet "Virtual Johnson"

This site now has an [Ask Me](${BASE_URL}ask-me) page where you can chat with an AI version of me. Ask it about my EROAD work, my projects, my tech stack, or my time at university, and it answers in my voice—grounded in what I've actually written and done.

The fun part isn't the chat box. It's what sits behind it. I wanted the agent to know about *me* specifically, not just sound like a generic assistant. The technique that makes that possible is **RAG—Retrieval-Augmented Generation**. This post walks through the whole architecture, end to end.

## The High-Level Picture

There are three moving pieces:

1. A **React frontend** (the Ask Me page) that streams the conversation.
2. A **Cloudflare Worker** that does the real work—retrieval, prompting, and talking to the language model.
3. A **knowledge base** of my content, pre-processed into embeddings.

\`\`\`text
Browser (React)                Cloudflare Worker (edge)
   |                                  |
   |  POST /chat (messages)           |
   |--------------------------------> |  1. embed the question (Voyage)
   |                                  |  2. find top-3 relevant chunks
   |                                  |  3. build prompt: system + context + history
   |                                  |  4. call the LLM (OpenRouter)
   |   <==== streamed tokens (SSE) ===|  5. stream the answer back
   |                                  |
\`\`\`

No traditional server, no database server to babysit—just an edge function and a JSON file of vectors.

## What Is RAG, and Why Use It?

A language model on its own knows nothing about me. I had two options to fix that:

- **Fine-tune** a model on my data (expensive, slow to update, overkill for a portfolio).
- **Retrieve** the relevant facts at question time and hand them to the model as context.

RAG is the second approach, and it's the right tool here. Instead of baking my life into model weights, I keep my content in a searchable form. When someone asks a question, I find the few most relevant passages and say to the model, in effect: *"Answer as Johnson, using these excerpts."* Updating the agent is then as simple as re-indexing my content—no retraining.

## Step 1: Building the Knowledge Base (Offline)

Before anything goes live, I run a one-off build script that turns my writing into vectors. It pulls from two sources: my **blog posts** and my **CV**.

Each source is split into overlapping ~1,200-character **chunks** (small enough to be specific, with a little overlap so I don't slice a sentence in half). Every chunk is sent to **Voyage AI's \`voyage-3\` model**, which returns a 1,024-dimension **embedding**—a vector that captures the meaning of the text.

\`\`\`javascript
// Each chunk becomes a vector we can search by meaning, not keywords
{
  id: "cv-experience:3:0",
  source: "CV — Experience",
  title: "Graduate Software Engineer at EROAD",
  text: "Designed and built an AI-driven data translation pipeline...",
  embedding: [0.013, -0.041, 0.077, /* ...1024 numbers... */]
}
\`\`\`

The result is a \`knowledge-base.json\` file—42 chunks at the moment—that gets bundled straight into the Worker. No external vector database, no extra network hop at query time. For a knowledge base this size, a plain array in memory is more than fast enough.

## Step 2: Answering a Question (Live)

When a question arrives, the Worker:

1. **Embeds the question** with the same Voyage model, so it lives in the same vector space as my content.
2. **Ranks every chunk** by **cosine similarity** to the question and keeps the top 3.
3. **Builds the prompt**: my system prompt (who "I" am and how to behave) + the retrieved excerpts + the conversation so far.

\`\`\`javascript
// Cosine similarity: how aligned two meaning-vectors are
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
\`\`\`

Only the most relevant slices of my life make it into the prompt, which keeps the model focused and the token bill tiny. The assembled prompt then goes to the language model via **OpenRouter**, using its free model router so the whole thing runs at no cost.

## Step 3: Streaming the Answer

Waiting for a full paragraph to generate feels slow, so the answer is **streamed token by token** using **Server-Sent Events (SSE)**. OpenRouter streams in an OpenAI-compatible format; the Worker translates each delta into a simple event the frontend understands:

\`\`\`text
data: {"type":"text","text":"At EROAD"}
data: {"type":"text","text":" I work"}
data: {"type":"done"}
\`\`\`

The React client reads that stream and appends each token live, rendering Markdown as it goes—so you watch the reply type itself out.

## The Stack (and Why It's Basically Free)

- **Cloudflare Workers** — the backend runs at the edge, close to the user, on a generous free tier.
- **OpenRouter (\`openrouter/free\`)** — routes to free language models, so inference costs nothing.
- **Voyage AI** — embeddings, with a free token allowance that comfortably covers a personal site.
- **Cloudflare KV** — a tiny per-IP rate limiter so nobody can run up abuse.
- **React 19 + Vite** — the frontend, deployed to GitHub Pages.

The entire thing—backend, model, and embeddings—runs at essentially zero ongoing cost.

## A Few Gotchas I Hit

No project ships without a fight. A few that taught me something:

- **CORS on streamed responses.** Tests with \`curl\` passed happily, but the browser blocked replies—because CORS headers have to be on the *streaming* response, not just the preflight. \`curl\` doesn't care about CORS; browsers very much do.
- **Build-time config in CI.** The site deploys through GitHub Actions, which builds from a clean checkout. A locally-set environment variable simply doesn't exist there, so the deployed bundle shipped without the chat URL until I wired it into the workflow.
- **Theme variants.** A light/dark-mode bug taught me that Tailwind's \`dark:\` variant follows the OS by default, not a CSS class—so the toggle and the styles can disagree.

Each of these was invisible in local testing and obvious in production. A good reminder that "works on my machine" and "works deployed" are two different claims.

## What's Next

A few ideas I'm sitting on: pinning a specific model for more consistent answers, adding source citations so you can see which post an answer came from, and expanding the knowledge base as I write more.

For now, the best way to understand it is to use it. Head to the [Ask Me](${BASE_URL}ask-me) page and ask the virtual me something—then come back and picture the retrieval, the prompt, and the stream happening behind each reply.

Thanks for reading!
    `
  },
  {
    id: 7,
    slug: "spotto-hackathon-spendsmash",
    title: "SpendSmash Hackathon: Uncovering Cloud Savings with Spotto",
    date: "2026-01-28",
    excerpt: "Had a great time at the Spotto SpendSmash Hackathon—lots of fun, even more learning, and a front-row seat to how AI can uncover hidden cloud costs.",
    tags: ["Hackathon", "EROAD", "FinOps", "Cloud", "AI"],
    readTime: "5 min read",
    image: `${BASE_URL}blog/SpottoHackathon.JPG`,
    content: `
## SpendSmash: A Fast-Paced Cloud Savings Hackathon

Had a great time at the Spotto Hackathon—there was lots of fun, and even more learning. EROAD partnered with Spotto to run SpendSmash, a fast-paced hackathon focused on one goal: uncovering meaningful cloud savings.

### Seeing Spotto in Action

The biggest highlight for me was seeing Spotto in action. Spotto brings fresh technologies that use AI to help uncover hidden issues early—the kind of problems that can quietly cost companies thousands of dollars each month if they go unnoticed. It was truly eye-catching to witness how it identifies these potential problems and even provides recommendations to assist teams in eliminating them.

### The Competition

Spotto powered the analysis, and six teams—made up of engineers from both EROAD and Spotto—took it from there. The brief wasn't just "find the biggest number." We were asked for creativity:

- The intuitive fixes
- The left-field ideas
- Even changes to business processes that shift spend patterns

### The Results

The results were varied and valuable:

- Some teams found quick, clean wins—precise, well-scoped fixes that could be implemented immediately
- Others brought deeper insights
- One team even built an AI app using Spotto's MCP engine to apply EROAD-specific business context to cost recommendations!

The day wrapped with 3-minute pitches and sharp executive judging from both EROAD and Spotto. Two winning teams took home Sharesies vouchers—a fitting prize for a day spent finding ways to reclaim wasted spend to invest smarter.

### Learning Beyond the Hackathon

On top of the main event, I also learned a lot from our Cloud/Azure Engineer about the state of modern databases and the pain points teams still run into today. These kinds of insights from experienced engineers are invaluable.

### Thank You

Huge thanks to Jay Strydom, Symon Thurlow, and Shaun Webber for the opportunity for us interns at EROAD to learn from real-world problems and understand how Spotto helps identify and reduce them.

Also big thanks to JiYoung Do for the fabulous organisation, Jordan York as the high-energy MC, and David Morton, Juan De Roock, and Jacques Ellis for their support and sponsorship.

To all the teams in Auckland and Manila—and everyone who contributed ideas, time, and energy—thanks again! It was exciting to see these insights and know they'll make their way into production.
    `
  },
  {
    id: 6,
    slug: "eroad-internship-reflections-more-than-just-code",
    title: "EROAD Internship Reflections: More Than Just Code",
    date: "2026-02-03",
    excerpt: "Looking back on my AI & Business Internship at EROAD—the lessons learned, the amazing people, and how this experience shaped me as both a developer and a person.",
    tags: ["Internship", "Career", "EROAD", "Personal Growth"],
    readTime: "8 min read",
    image: `${BASE_URL}blog/InternLunch.JPG`,
    content: `
## Looking Back on an Incredible Journey

As my internship at EROAD comes to an end, I find myself reflecting on what has been one of the most transformative experiences of my career so far. What started on November 26th, 2025 has turned into so much more than just a work placement—it's been a masterclass in professional growth, teamwork, and what it truly means to be part of a great company.

### The People Make the Difference

If there's one thing I'll take away from EROAD, it's the incredible people I've had the privilege to work with. Our manager, Olivier Fransolet, gave us opportunities I never expected as an intern—from attending seminars and conferences to working on real, impactful projects.

But what really stood out was seeing EROAD's core values come to life every single day:

**"We Play as a Team"**

When we were working on a critical P1 issue with tight deadlines, the squad truly came together. Travis and Mike doubled their workload to peer-review solutions, ensuring quality while keeping us moving fast. Ramy supported us by expediting everything outside of development, making our work incredibly smooth.

**"We Learn and Grow"**

Mike exemplified this perfectly. Despite having tens—if not hundreds—of meetings and events to attend, he always made time to help us understand the Power Automate system. He never made us feel like a burden; instead, he treated every question as an opportunity for us to learn.

**"We Get It Done" and "We Do What's Right"**

These values really shone during the billing issue we tackled. Mike would always consult with Ramy, even when time was tight, to ensure the work we were doing was correct. As he put it, we were there to correct data, not generate more problems for others to deal with.

### Beyond Technical Skills

Through this experience, I didn't just learn about Power Automate, AI agents, or enterprise systems. I learned about:

- **Empathy in engineering** - Standing in others' shoes when solving problems
- **The importance of doing things right** - Even under pressure
- **True teamwork** - Where everyone lifts each other up
- **The business side of tech** - Seeing engineering from a different perspective

### Friendships That Last

One unexpected gift from this internship has been the friendships I've made—not just with colleagues, but with fellow interns who I know will be part of my journey for years to come. We went through challenges together, celebrated wins together, and grew together.

![Running the barista station at company BBQ](${BASE_URL}blog/RunningBaristaForCompanyBBQ.JPG)
*Running the barista station at the company BBQ—getting involved in the EROAD community beyond just coding!*

From intern lunches to company BBQs where I got to run the barista station, every event was an opportunity to connect with amazing people. These weren't just networking opportunities—they were genuine moments of fun and connection that made EROAD feel like a second home.

![The 2026 EROAD Intern Team](${BASE_URL}blog/InternAtEroad2026.JPG)
*The 2026 EROAD Intern Team—friends for life!*

### Thank You, EROAD

To everyone at EROAD who made this experience possible—thank you. You've not only helped me become a better developer but a better person. The lessons I've learned here will stay with me throughout my career.

Here's to new beginnings, armed with everything this incredible team has taught me. 🚀
    `
  },
  {
    id: 5,
    slug: "tackling-a-p1-incident-lessons-from-the-trenches",
    title: "Tackling a P1 Incident: Lessons from the Trenches",
    date: "2026-01-20",
    excerpt: "What happens when billing data goes wrong? A deep dive into my experience working on a critical production issue and the valuable lessons learned about system architecture.",
    tags: ["Engineering", "Problem Solving", "EROAD", "Architecture"],
    readTime: "5 min read",
    image: null,
    content: `
## When Things Go Wrong in Production

After completing our work on AI agents, our team was pulled into something completely different—a P1 incident. Customer billing data was incorrect or corrupted, caused by potential data loss in a previous layer of our system.

### The Challenge

This wasn't a simple bug fix. We were dealing with:
- **Corrupted data** affecting real customer bills
- **Multiple system layers** to investigate
- **Tight deadlines** to resolve the issue
- **High stakes** - incorrect billing directly impacts customers

### What I Learned

#### 1. The Importance of System Architecture

This experience gave me a front-row seat to why good architecture matters. When data flows through multiple layers, each layer needs to be reliable. A problem in one layer cascades down, and untangling it becomes exponentially harder.

\`\`\`
Data Flow:
Source → Processing Layer → Billing System → Customer
         ↑
    (Issue originated here)
\`\`\`

#### 2. The Business Side of Engineering

As engineering students, we often focus purely on the technical side—algorithms, data structures, clean code. But this experience showed me the **other side of the business**. When billing is wrong, it's not just a technical bug; it affects customer trust and company reputation.

#### 3. Moving Fast Without Breaking Things

The pressure was on to fix things quickly, but our team never compromised on quality. Every change was reviewed, every solution validated. We were correcting data, not creating more chaos.

### The Power of Automation

One silver lining: the automation solutions we built saved significant time. What could have been weeks of manual data correction became manageable through the tools we developed.

### Key Takeaways

- **Architecture matters** - Invest in it early
- **Data integrity is critical** - Especially for billing systems
- **Teamwork accelerates everything** - Multiple eyes catch more issues
- **Pressure reveals character** - And our team's character was exceptional

This experience was invaluable. It's one thing to learn about production incidents in theory; it's another to be in the trenches solving them.
    `
  },
  {
    id: 4,
    slug: "building-ai-agents-from-conferences-to-production",
    title: "Building AI Agents: From Conferences to Production",
    date: "2026-01-10",
    excerpt: "From chatting with AI to having AI work for us—my journey attending Microsoft Discovery Day and building AI agents for enterprise use.",
    tags: ["AI", "Microsoft Copilot", "Agents", "Software Engineering", "FutureOfWork"],
    readTime: "7 min read",
    image: `${BASE_URL}blog/MicrosoftAIConference.JPG`,
    content: `
## From Chatting with AI to Having AI Work for Us 🖥️

When I started my AI & Business Internship at EROAD, I had no idea I'd be working with cutting-edge technology like Microsoft Copilot agents. Thanks to opportunities provided by my manager Olivier, I got to attend numerous seminars and conferences—both online and in-person—that opened my eyes to what's possible with AI in the enterprise.

### Microsoft Discovery Day: Copilot & Agents

I'm still reflecting on the Microsoft Discovery Day event in Auckland. It was fantastic to meet professionals from diverse fields and hear their unique perspectives on adopting AI Agents.

While we're all getting used to having Copilot as an assistant, the real eye-opener was the deep dive into Agents. We've already moved past the stage of just generating text and images—we're heading towards AI that can autonomously execute complex business processes.

![Microsoft AI Conference networking](${BASE_URL}blog/MicrosoftAiConference2.JPG)
*Networking and learning at the conference—invaluable experiences for any aspiring AI developer.*

### Key Takeaways from the Day

**1. Agents Drive Automation**

By assigning repetitive workflows to Agents, we aren't just saving time—we're fundamentally increasing the productivity capacity of every employee.

**2. Augmentation, Not Replacement**

A key discussion point was that AI isn't about reducing headcount. Companies aren't looking to fire staff; they're looking to supercharge them. The goal is to empower individuals to achieve more than they ever could alone.

**3. Proven Results**

The data is clear—the shift to using AI Agents has already proven to result in significantly higher productivity and output for staff members who embrace the tools.

### From Learning to Building

The real magic happened when we took that knowledge and applied it at EROAD. I had the opportunity to build several agents for different departments:

#### 1. Enterprise System Agent
Built for the Enterprise Systems team to streamline their workflows and automate routine queries.

#### 2. Email Manager Agent
Developed for Mark to help manage and organize email communications more efficiently.

#### 3. Employee Travel Agent
An agent to assist with employee travel arrangements and related queries.

### Applying Software Engineering Principles

What surprised me most was how much my university coursework applied to building AI agents. This wasn't just about prompting—it was real software engineering:

**Requirements Engineering**

We started with thorough requirements gathering. What exactly does the client need? The goal was to understand the true requirements without limiting the scope to just what we initially discussed. This is a common pitfall in software projects—building exactly what was asked for instead of what was actually needed.

**MVP and Prototyping**

\`\`\`
Development Flow:
Requirements → MVP Design → Prototype → User Testing → Feedback → MLP
\`\`\`

After understanding requirements, we designed a Minimum Viable Product (MVP) and built prototypes for testing. This iterative approach allowed us to validate ideas quickly.

**Feedback Loop**

Once we had a working prototype, we brought stakeholders back into the loop. Their feedback helped polish our MVP into a Minimum Lovable Product (MLP)—something users actually enjoy using.

### The Bigger Picture

Building these agents taught me that AI isn't magic—it's engineering. The same principles that make software projects successful apply here:

1. **Understand the problem** before jumping to solutions
2. **Iterate quickly** with feedback loops
3. **Test with real users** early and often
4. **Document everything** for future maintainability

### What's Next?

The AI agent space is evolving rapidly. What we built today will likely look primitive in a year. But the engineering principles? Those are timeless. I'm excited to see where this technology goes and to continue building solutions that make people's work lives easier.

If you're interested in AI agents, my advice: start with the fundamentals of good software engineering. The AI part is just another tool in your toolkit.
    `
  },
  {
    id: 1,
    slug: "building-my-portfolio-with-react",
    title: "Building My Portfolio with React & Vite",
    date: "2026-01-25",
    excerpt: "A deep dive into how I built this portfolio website using React, Vite, and Tailwind CSS. Learn about the design decisions and challenges I faced.",
    tags: ["React", "Vite", "Tailwind CSS", "Portfolio"],
    readTime: "5 min read",
    image: `${BASE_URL}projects/project1.png`,
    content: `
## Why I Built a New Portfolio

As a developer, having a personal portfolio is essential. It's not just a place to showcase projects—it's a reflection of who you are as a developer.

### Tech Stack Choice

I chose **React** with **Vite** for several reasons:
- ⚡ Lightning-fast development experience
- 🔥 Hot Module Replacement (HMR)
- 📦 Optimized production builds

Here's how simple it is to create a component in React:

\`\`\`jsx
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
};
\`\`\`

### Design Philosophy

I wanted something that felt modern and unique. The cosmic theme with the star background creates an immersive experience while keeping the focus on the content.

For the star animation, I used CSS keyframes with \`animation-delay\` for a staggered effect:

\`\`\`css
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.star {
  animation: twinkle 3s ease-in-out infinite;
}
\`\`\`

### Key Features

1. **Snap Scrolling** - Each section takes the full viewport
2. **Dark/Light Mode** - Respects user preferences
3. **Responsive Design** - Works on all devices
4. **Smooth Animations** - Subtle but engaging

The theme toggle uses a simple \`localStorage\` approach:

\`\`\`javascript
const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};
\`\`\`

### Lessons Learned

Building this portfolio taught me a lot about:
- Component composition in React
- CSS animations and transitions
- Accessibility considerations
- Performance optimization

### What's Next?

I plan to continue improving this site by adding:
- A blog section (you're reading it!)
- More interactive elements
- Additional project showcases

Thanks for reading! Feel free to reach out if you have any questions.
    `
  },
  {
    id: 2,
    slug: "my-journey-into-software-development",
    title: "My Journey into Software Development",
    date: "2026-01-20",
    excerpt: "From curious beginner to passionate developer—here's my story of how I discovered my love for coding and the path that led me here.",
    tags: ["Career", "Learning", "Personal"],
    readTime: "7 min read",
    image: null,
    content: `
## The Beginning

Everyone has a different path into software development. Mine started with curiosity and a desire to build things.

### First Steps

I remember writing my first "Hello World" program. It was simple, but the feeling of making a computer do what I wanted was magical.

### The Learning Curve

Learning to code isn't easy. There were moments of frustration, confusion, and doubt. But each challenge overcome made the next one easier.

### Key Milestones

- **First Project**: A simple calculator app
- **First Framework**: Learning React changed everything
- **First Contribution**: Open source contributions
- **First Job**: Turning passion into profession

### Advice for Beginners

If you're just starting out, here's what I wish someone had told me:

1. **Be patient** - Learning takes time
2. **Build projects** - Theory only gets you so far
3. **Join communities** - You're not alone
4. **Embrace failure** - Every bug is a lesson

### Looking Forward

The journey never really ends. There's always more to learn, more to build, and more problems to solve. That's what makes this field so exciting.
    `
  },
  {
    id: 3,
    slug: "top-vscode-extensions-for-developers",
    title: "Top VS Code Extensions Every Developer Needs",
    date: "2026-01-15",
    excerpt: "Boost your productivity with these must-have VS Code extensions. From code formatting to AI assistance, these tools will supercharge your workflow.",
    tags: ["VS Code", "Productivity", "Tools"],
    readTime: "4 min read",
    image: null,
    content: `
## Essential VS Code Extensions

VS Code is already powerful out of the box, but extensions take it to the next level.

### Code Quality

- **ESLint** - Catch errors before they happen
- **Prettier** - Consistent code formatting
- **Error Lens** - Inline error highlighting

### Productivity Boosters

- **GitHub Copilot** - AI-powered code suggestions
- **Auto Rename Tag** - Rename paired HTML tags
- **Path Intellisense** - Autocomplete file paths

### Visual Enhancements

- **Material Icon Theme** - Beautiful file icons
- **One Dark Pro** - Popular dark theme
- **Bracket Pair Colorizer** - Colored matching brackets

### Git Integration

- **GitLens** - Supercharged Git capabilities
- **Git Graph** - Visualize your repository

### Language Specific

- **ES7+ React Snippets** - React code snippets
- **Tailwind CSS IntelliSense** - Tailwind autocomplete

### My Setup

I use a combination of these extensions daily. The key is finding what works for your workflow and not overloading VS Code with too many extensions.

What are your favorite extensions? Let me know!
    `
  },
];

// Helper function to get posts sorted by date (newest first)
export const getSortedPosts = () => {
  return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Helper function to get a post by slug
export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get latest N posts
export const getLatestPosts = (count = 3) => {
  return getSortedPosts().slice(0, count);
};
