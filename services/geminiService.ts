import { GoogleGenAI } from "@google/genai";
import { TaskType, type PromptOptions } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define a result type for better error handling
export interface GenerationResult {
    prompt?: string;
    error?: string;
}


const getFormatRequirements = (taskType: TaskType): string => {
  switch (taskType) {
    case TaskType.CODE_GENERATION:
      return "For example, explicitly state the required programming language, any libraries/frameworks, and the expected structure (e.g., a single function, a full class, a command-line script).";
    case TaskType.TEXT_SUMMARIZATION:
      return "For example, specify if the output should be a single paragraph, a series of bullet points, or a numbered list, and define a target length.";
    case TaskType.CREATIVE_WRITING:
      return "For example, define the format (e.g., short story, poem, dialogue script) and any structural requirements like chapter breaks or stanza length.";
    case TaskType.DATA_ANALYSIS_PLAN:
      return "For example, instruct the AI to use markdown and structure the output with specific headings like '1. Hypothesis', '2. Data Requirements', '3. Analysis Steps', '4. Expected Visualizations'.";
    case TaskType.UI_UX_FEEDBACK:
      return "For example, ask for the feedback to be formatted as a table or a list, categorized by specific heuristics (e.g., 'Usability', 'Accessibility', 'Visual Design'), with columns for 'Issue', 'Recommendation', and 'Severity'.";
    case TaskType.CONTENT_CREATION:
      return "For example, specify the format (e.g., blog post with SEO-optimized headings, a tweet thread, an email) and any required elements like a call-to-action or specific hashtags.";
    case TaskType.API_DESIGN:
      return "For example, specify the API style (e.g., REST, GraphQL), data format (JSON), authentication method, and list the key resource endpoints with their HTTP methods (GET, POST, PUT, DELETE) and expected request/response bodies.";
    case TaskType.DATABASE_SCHEMA_DESIGN:
      return "For example, instruct the AI to define tables, columns with data types (e.g., VARCHAR(255), INTEGER, TIMESTAMP), primary keys, foreign keys, and relationships (e.g., one-to-many, many-to-many).";
    case TaskType.SYSTEM_ARCHITECTURE_DESIGN:
        return "For example, ask for the output in markdown, describing the main components (e.g., microservices, database, message queue), their responsibilities, and how they interact. You could also ask for a plantUML or mermaid.js diagram representation.";
    case TaskType.CODE_REVIEW_FEEDBACK:
        return "For example, specify that the feedback should be structured by category (e.g., Readability, Performance, Security), pointing to specific lines of code and providing constructive suggestions for improvement.";
    case TaskType.DEBUGGING_ASSISTANCE:
        return "For example, instruct the AI to analyze a provided code snippet and error message, and to output a list of potential causes followed by step-by-step suggestions for how to fix the issue.";
    case TaskType.E2E_TEST_PLAN:
        return "For example, specify that the plan should be formatted as a series of user stories, with each story having a list of test cases that include a description, steps to reproduce, and expected results.";
    case TaskType.API_TESTING_PLAN:
        return "For example, request a markdown table with columns for 'Test Case', 'Steps', 'Expected Result', and 'Test Type' (e.g., Success, Failure, Security).";
    case TaskType.FRONTEND_ERROR_FIX:
        return "For example, instruct the AI to provide a clear explanation of the bug's root cause, followed by a 'before' and 'after' code block showing the corrected code. Specify the framework (e.g., React, Vue).";
    case TaskType.BACKEND_ERROR_FIX:
        return "For example, instruct the AI to provide a clear explanation of the bug's root cause, followed by a corrected code snippet. Specify the language and framework (e.g., Node.js/Express, Python/Django).";
    default:
      return "For example, explicitly request a format like JSON, markdown, or a bulleted list.";
  }
};

const getExampleForTaskType = (taskType: TaskType): string => {
  switch (taskType) {
    case TaskType.CODE_GENERATION:
      return "Here is an example for a simple Python function:\n```python\ndef add(a, b):\n    \"\"\"This function adds two numbers.\"\"\"\n    return a + b\n```";
    case TaskType.TEXT_SUMMARIZATION:
      return "For example, if summarizing a news article, the output might look like this:\n- **Main Point:** [Briefly state the main point]\n- **Key Detail:** [Highlight a key supporting detail]\n- **Conclusion:** [Summarize the conclusion or outcome]";
    case TaskType.CREATIVE_WRITING:
      return "For example, a dialogue script might follow this format:\n**CHARACTER 1:** (Action) [Dialogue]\n**CHARACTER 2:** (Action) [Dialogue]";
    case TaskType.DATA_ANALYSIS_PLAN:
      return "For instance, the plan should follow this structure:\n**1. Hypothesis**\n> The new ad campaign will increase user sign-ups by 15%.\n\n**2. Data Requirements**\n- User sign-up data from the last 6 months.\n- Ad campaign performance metrics (impressions, clicks).";
    case TaskType.UI_UX_FEEDBACK:
      return "An example of the feedback format using a markdown table:\n| Category    | Issue                                | Recommendation                            | Severity |\n|-------------|--------------------------------------|-------------------------------------------|----------|\n| Usability   | The 'Save' button is hard to find.   | Relocate the button to the top-right.     | High     |";
    case TaskType.CONTENT_CREATION:
      return "For instance, a tweet thread might be structured like this:\n**Tweet 1/3:** [Hook and main idea]\n**Tweet 2/3:** [Supporting detail or data point]\n**Tweet 3/3:** [Conclusion and call-to-action] #Hashtag1 #Hashtag2";
    case TaskType.API_DESIGN:
      return "An example for a REST API endpoint:\n**Endpoint:** `/users/{id}`\n**Method:** `GET`\n**Response (200 OK):**\n```json\n{\n  \"id\": \"user-123\",\n  \"username\": \"alex\",\n  \"email\": \"alex@example.com\"\n}\n```";
    case TaskType.DATABASE_SCHEMA_DESIGN:
      return "An example for a `posts` table in SQL:\n```sql\nCREATE TABLE posts (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    user_id INT,\n    title VARCHAR(255) NOT NULL,\n    body TEXT,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (user_id) REFERENCES users(id)\n);\n```";
    case TaskType.SYSTEM_ARCHITECTURE_DESIGN:
        return "An example description for a simple microservice:\n**Service: Authentication Service**\n- **Responsibility:** Manages user registration, login, and token generation.\n- **Dependencies:** User Database.\n- **API:** Exposes `/login`, `/register` endpoints.";
    case TaskType.CODE_REVIEW_FEEDBACK:
        return "An example of a code review comment:\n- **File:** `utils.js`, Line 25\n- **Issue:** The function uses a synchronous file read which can block the event loop.\n- **Suggestion:** Refactor to use `fs.promises.readFile` for asynchronous operation.";
    case TaskType.DEBUGGING_ASSISTANCE:
        return "An example of a debugging request structure:\n**Error:** `TypeError: Cannot read properties of undefined (reading 'map')`\n**Code Snippet:**\n```javascript\nfunction renderItems(items) {\n  return items.map(item => `<li>${item.name}</li>`);\n}\n```\n**Problem:** The error occurs when `items` is not an array.";
    case TaskType.E2E_TEST_PLAN:
        return "An example of a test case:\n**User Story:** As a user, I want to log in to my account.\n**Test Case 1.1:** Successful Login\n- **Steps:**\n  1. Navigate to the login page.\n  2. Enter valid credentials.\n  3. Click 'Submit'.\n- **Expected Result:** User is redirected to the dashboard.";
    case TaskType.API_TESTING_PLAN:
        return "An example test case for an API endpoint:\n| Test Case          | Steps                                     | Expected Result                        | Test Type |\n|--------------------|-------------------------------------------|----------------------------------------|-----------|\n| Valid Login        | POST /login with correct user/pass        | 200 OK with auth token                 | Success   |";
    case TaskType.FRONTEND_ERROR_FIX:
        return "An example of a fix for a React state issue:\n**Explanation:** The error is caused by directly mutating the state. React state should be immutable.\n**Before:**\n```javascript\nconst handleAddItem = () => {\n  items.push('new item');\n  setItems(items);\n}\n```\n**After:**\n```javascript\nconst handleAddItem = () => {\n  setItems([...items, 'new item']);\n}\n```";
    case TaskType.BACKEND_ERROR_FIX:
        return "An example of a fix for an unhandled promise in Node.js:\n**Explanation:** The database query is asynchronous but lacks `await` and error handling.\n**Before:**\n```javascript\napp.get('/users/:id', (req, res) => {\n  const user = db.users.find(req.params.id);\n  res.json(user);\n});\n```\n**After:**\n```javascript\napp.get('/users/:id', async (req, res) => {\n  try {\n    const user = await db.users.find(req.params.id);\n    if (!user) return res.status(404).send('User not found.');\n    res.json(user);\n  } catch (error) {\n    res.status(500).send('Server Error');\n  }\n});\n```";
    default:
      return "For example, if JSON is requested:\n```json\n{\n  \"key\": \"value\",\n  \"another_key\": 123\n}\n```";
  }
};


export const generateExperiencedPrompt = async (options: PromptOptions): Promise<GenerationResult> => {
  const { idea, persona, tone, taskType } = options;
  const formatSuggestion = getFormatRequirements(taskType);
  const example = getExampleForTaskType(taskType);

  const metaPrompt = `
    You are a world-class expert prompt engineer with decades of experience crafting highly effective prompts for advanced large language models.
    Your task is to take a user's simple idea and transform it into a detailed, structured, and powerful prompt.

    The user's core idea is: "${idea}"

    You must enhance this idea into a master prompt by incorporating the following attributes:
    1.  **Persona:** The AI should adopt the persona of a ${persona}.
    2.  **Tone:** The response should be in a ${tone} tone.
    3.  **Task:** The primary goal is ${taskType}.

    Construct a new prompt that includes these elements:
    -   **Role & Goal:** Clearly define the AI's role and its primary objective.
    -   **Context:** Provide necessary background or context for the task.
    -   **Step-by-Step Instructions:** Give clear, actionable steps if the task is complex.
    -   **Output Format Requirements:** This is crucial. Create a dedicated section in the prompt that explicitly defines the desired output format. For a "${taskType}" task, this section must be very specific. ${formatSuggestion}
    -   **Example:** Provide a small, clear example of the desired output format or style to reinforce the format requirements. ${example}
    -   **Constraints & Rules:** Define any other boundaries or negative constraints (e.g., "do not use jargon", "avoid discussing topic X").
    -   **Encourage Depth:** Ask for detailed, well-reasoned, and comprehensive output.

    Your final output MUST be only the generated prompt text, without any introductory phrases like "Here is the prompt:" or any other conversational filler. Just the prompt itself.
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: metaPrompt,
        config: {
            temperature: 0.7,
            topP: 0.95,
        }
    });
    
    return { prompt: response.text };
  } catch (error) {
    console.error("Error generating prompt with Gemini API:", error);
    if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('api key not valid') || errorMessage.includes('403')) {
            return { error: 'Invalid API Key. Please ensure your API key is correctly configured and has the necessary permissions.' };
        }
        if (errorMessage.includes('resource has been exhausted') || errorMessage.includes('429')) {
            return { error: 'Rate limit exceeded. You have made too many requests in a short period. Please wait a moment and try again.' };
        }
        if (errorMessage.includes('500') || errorMessage.includes('503') || errorMessage.includes('server error')) {
            return { error: 'The AI service is currently experiencing issues on its end. Please try again in a few minutes.' };
        }
        return { error: 'Could not connect to the AI service. Please check your network connection and try again.' };
    }
    return { error: "An unknown error occurred. Please try again later." };
  }
};