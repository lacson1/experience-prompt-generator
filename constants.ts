import { Persona, Tone, TaskType, TemplateCategory, PromptTemplate, ExamplePrompt } from './types';

export const PERSONA_OPTIONS: Persona[] = [
  Persona.SOFTWARE_ENGINEER,
  Persona.MARKETING_EXPERT,
  Persona.CREATIVE_WRITER,
  Persona.DATA_SCIENTIST,
  Persona.UX_DESIGNER,
  Persona.LEGAL_ADVISOR,
];

export const TONE_OPTIONS: Tone[] = [
  Tone.PROFESSIONAL,
  Tone.CASUAL,
  Tone.HUMOROUS,
  Tone.INSPIRATIONAL,
  Tone.TECHNICAL,
  Tone.ACADEMIC,
];

export const TASK_TYPE_OPTIONS: TaskType[] = [
  TaskType.CODE_GENERATION,
  TaskType.API_DESIGN,
  TaskType.API_TESTING_PLAN,
  TaskType.DATABASE_SCHEMA_DESIGN,
  TaskType.SYSTEM_ARCHITECTURE_DESIGN,
  TaskType.CODE_REVIEW_FEEDBACK,
  TaskType.DEBUGGING_ASSISTANCE,
  TaskType.FRONTEND_ERROR_FIX,
  TaskType.BACKEND_ERROR_FIX,
  TaskType.E2E_TEST_PLAN,
  TaskType.TEXT_SUMMARIZATION,
  TaskType.CREATIVE_WRITING,
  TaskType.DATA_ANALYSIS_PLAN,
  TaskType.UI_UX_FEEDBACK,
  TaskType.CONTENT_CREATION,
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  // Software Development
  {
    title: "React Component",
    description: "Generate a functional React component with props and state.",
    category: TemplateCategory.SOFTWARE_DEVELOPMENT,
    template: "Create a reusable React component named `[ComponentName]` that functions as a [Component's Purpose, e.g., 'profile card']. It should accept the following props: `[prop1: type]`, `[prop2: type]`. The component should be styled using [Styling Method, e.g., Tailwind CSS] and manage its own state for [stateful logic, e.g., 'a counter'].",
    defaults: {
      persona: Persona.SOFTWARE_ENGINEER,
      tone: Tone.TECHNICAL,
      taskType: TaskType.CODE_GENERATION,
    },
  },
  {
    title: "API Endpoint Docs",
    description: "Create clear and concise documentation for a REST API endpoint.",
    category: TemplateCategory.SOFTWARE_DEVELOPMENT,
    template: "Generate documentation in Markdown for a REST API endpoint that handles [Endpoint's Purpose, e.g., 'fetching user data'].\n\n- **Endpoint Path:** `[e.g., /api/users/{id}]`\n- **HTTP Method:** `[e.g., GET]`\n- **Request Parameters:** `[e.g., id (integer)]`\n- **Success Response (200 OK):** Provide a JSON example.\n- **Error Response (404 Not Found):** Provide a JSON example.",
    defaults: {
      persona: Persona.SOFTWARE_ENGINEER,
      tone: Tone.PROFESSIONAL,
      taskType: TaskType.API_DESIGN,
    },
  },
  {
    title: "API Test Plan",
    description: "Generate a comprehensive test plan for a REST API endpoint.",
    category: TemplateCategory.SOFTWARE_DEVELOPMENT,
    template: "Create a test plan for the API endpoint `[Endpoint Path, e.g., /api/products]`. The endpoint is for `[Purpose, e.g., creating a new product]`. Include test cases for: success scenarios (2xx), client errors (4xx), server errors (5xx), and security checks (e.g., authentication, input validation).",
    defaults: {
        persona: Persona.SOFTWARE_ENGINEER,
        tone: Tone.TECHNICAL,
        taskType: TaskType.API_TESTING_PLAN,
    }
  },
  {
    title: "Frontend Bug Fix",
    description: "Get help diagnosing and fixing a frontend JavaScript error.",
    category: TemplateCategory.SOFTWARE_DEVELOPMENT,
    template: "Analyze the following frontend code snippet and error message to identify the root cause and provide a fix.\n\n- **Framework:** `[e.g., React, Vue, Vanilla JS]`\n- **Error Message:** `[Paste the full error message here]`\n- **Code with the error:**\n```javascript\n[Paste the relevant code block here]\n```",
    defaults: {
        persona: Persona.SOFTWARE_ENGINEER,
        tone: Tone.TECHNICAL,
        taskType: TaskType.FRONTEND_ERROR_FIX,
    }
  },
  {
    title: "Backend Bug Fix",
    description: "Get help diagnosing and fixing a backend code error.",
    category: TemplateCategory.SOFTWARE_DEVELOPMENT,
    template: "Analyze the following backend code snippet and error message to identify the root cause and provide a fix.\n\n- **Language/Framework:** `[e.g., Node.js/Express, Python/Django]`\n- **Error Message:** `[Paste the full error message here]`\n- **Code with the error:**\n```javascript\n[Paste the relevant code block here]\n```",
    defaults: {
        persona: Persona.SOFTWARE_ENGINEER,
        tone: Tone.TECHNICAL,
        taskType: TaskType.BACKEND_ERROR_FIX,
    }
  },
  {
    title: "Git Commit Message",
    description: "Write a conventional commit message for your code changes.",
    category: TemplateCategory.SOFTWARE_DEVELOPMENT,
    template: "Generate a Conventional Commit message for the following changes:\n\n- **Type of change:** [e.g., feat, fix, chore, docs]\n- **Short description:** [A brief summary of the change]\n- **Longer description (optional):** [Provide more context, motivation, and implementation details if necessary]\n- **Breaking Change:** [Yes/No, and if yes, explain the impact]",
    defaults: {
        persona: Persona.SOFTWARE_ENGINEER,
        tone: Tone.PROFESSIONAL,
        taskType: TaskType.TEXT_SUMMARIZATION,
    }
  },
  // Marketing & Content
  {
    title: "Blog Post Outline",
    description: "Structure a compelling blog post with key sections and talking points.",
    category: TemplateCategory.MARKETING,
    template: "Create a detailed outline for a blog post titled '[Blog Post Title]'. The target audience is [Target Audience]. The outline should include:\n\n1.  **Introduction:** A strong hook to grab the reader's attention.\n2.  **Main Sections (3-4):** Each with a clear heading and 3-5 bullet points covering key ideas.\n3.  **Conclusion:** A summary of the main points and a clear call-to-action.",
    defaults: {
      persona: Persona.MARKETING_EXPERT,
      tone: Tone.INSPIRATIONAL,
      taskType: TaskType.CONTENT_CREATION,
    },
  },
  {
    title: "Social Media Ad Copy",
    description: "Generate persuasive ad copy for a social media campaign.",
    category: TemplateCategory.MARKETING,
    template: "Write 3 variations of ad copy for a [Social Media Platform, e.g., Instagram] campaign promoting [Product/Service].\n\n- **Key Benefit:** [The single most important benefit for the customer]\n- **Target Audience:** [Describe the ideal customer]\n- **Call to Action:** [What should the user do? e.g., 'Shop Now', 'Learn More']",
    defaults: {
        persona: Persona.MARKETING_EXPERT,
        tone: Tone.CASUAL,
        taskType: TaskType.CONTENT_CREATION,
    }
  },
  // Creative & Writing
  {
    title: "Character Profile",
    description: "Develop a detailed profile for a fictional character.",
    category: TemplateCategory.CREATIVE,
    template: "Create a detailed character profile for a story. \n\n- **Name:** [Character's Name]\n- **Age:** [Character's Age]\n- **Appearance:** [Key physical features]\n- **Personality:** [List 3-5 key personality traits]\n- **Backstory:** [A brief paragraph about their history]\n- **Motivation:** [What drives them in the story?]",
    defaults: {
      persona: Persona.CREATIVE_WRITER,
      tone: Tone.CASUAL,
      taskType: TaskType.CREATIVE_WRITING,
    },
  },
  // Data & Analysis
  {
    title: "SQL Query Generation",
    description: "Generate a SQL query from a natural language description.",
    category: TemplateCategory.DATA_ANALYSIS,
    template: "Generate a SQL query to [Your Goal, e.g., 'find all users who signed up in the last 30 days and have made at least one purchase'].\n\n- **Tables Available:** `[e.g., users(id, name, signup_date), orders(id, user_id, amount, created_at)]`\n- **Database System:** `[e.g., PostgreSQL, MySQL]`",
    defaults: {
        persona: Persona.DATA_SCIENTIST,
        tone: Tone.TECHNICAL,
        taskType: TaskType.CODE_GENERATION,
    }
  }
];

// FIX: Add EXAMPLE_PROMPTS constant to resolve missing export error.
export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    title: "React Component",
    idea: "Create a reusable React component named `[ComponentName]` that functions as a 'profile card'.",
    persona: Persona.SOFTWARE_ENGINEER,
    tone: Tone.TECHNICAL,
    taskType: TaskType.CODE_GENERATION,
  },
  {
    title: "Blog Post Outline",
    idea: "Create a detailed outline for a blog post titled '[Blog Post Title]'.",
    persona: Persona.MARKETING_EXPERT,
    tone: Tone.INSPIRATIONAL,
    taskType: TaskType.CONTENT_CREATION,
  },
  {
    title: "Character Profile",
    idea: "Create a detailed character profile for a story.",
    persona: Persona.CREATIVE_WRITER,
    tone: Tone.CASUAL,
    taskType: TaskType.CREATIVE_WRITING,
  },
  {
    title: "SQL Query Generation",
    idea: "Generate a SQL query to 'find all users who signed up in the last 30 days'.",
    persona: Persona.DATA_SCIENTIST,
    tone: Tone.TECHNICAL,
    taskType: TaskType.CODE_GENERATION,
  }
];