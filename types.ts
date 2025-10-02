
export enum Persona {
  SOFTWARE_ENGINEER = "Software Engineer",
  MARKETING_EXPERT = "Marketing Expert",
  CREATIVE_WRITER = "Creative Writer",
  DATA_SCIENTIST = "Data Scientist",
  UX_DESIGNER = "UX Designer",
  LEGAL_ADVISOR = "Legal Advisor",
}

export enum Tone {
  PROFESSIONAL = "Professional",
  CASUAL = "Casual",
  HUMOROUS = "Humorous",
  INSPIRATIONAL = "Inspirational",
  TECHNICAL = "Technical",
  ACADEMIC = "Academic",
}

export enum TaskType {
  CODE_GENERATION = "Code Generation",
  API_DESIGN = "API Design",
  DATABASE_SCHEMA_DESIGN = "Database Schema Design",
  SYSTEM_ARCHITECTURE_DESIGN = "System Architecture Design",
  CODE_REVIEW_FEEDBACK = "Code Review Feedback",
  DEBUGGING_ASSISTANCE = "Debugging Assistance",
  E2E_TEST_PLAN = "E2E Test Plan",
  TEXT_SUMMARIZATION = "Text Summarization",
  CREATIVE_WRITING = "Creative Writing",
  DATA_ANALYSIS_PLAN = "Data Analysis Plan",
  UI_UX_FEEDBACK = "UI/UX Feedback",
  CONTENT_CREATION = "Content Creation",
}

export interface PromptOptions {
  idea: string;
  persona: Persona;
  tone: Tone;
  taskType: TaskType;
}

export interface PromptHistoryItem extends PromptOptions {
  id: string;
  generatedPrompt: string;
  timestamp: number;
}

export enum TemplateCategory {
  SOFTWARE_DEVELOPMENT = "Software Development",
  MARKETING = "Marketing & Content",
  CREATIVE = "Creative & Writing",
  DATA_ANALYSIS = "Data & Analysis",
}

export interface PromptTemplate {
  title: string;
  description: string;
  category: TemplateCategory;
  template: string; // The idea/prompt text, possibly with placeholders
  defaults: {
    persona: Persona;
    tone: Tone;
    taskType: TaskType;
  };
}
// FIX: Add ExamplePrompt interface
export interface ExamplePrompt {
  title: string;
  idea: string;
  persona: Persona;
  tone: Tone;
  taskType: TaskType;
}
