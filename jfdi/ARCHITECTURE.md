# JFDI Project Architecture

This document outlines the structure and organization of the JFDI (Just F***ing Do It) project, a Next.js application with a multi-LLM system for workflow management and task execution.

## Project Structure

```
jfdi/
│
├── app/
│   ├── api/
│   │   ├── companydata/
│   │   │   └── route.ts
│   │   ├── llm/
│   │   │   └── route.ts
│   │   ├── tags/
│   │   │   └── route.ts
│   │   ├── userdata/
│   │   │   └── route.ts
│   │   └── workflows/
│   │       └── route.ts
│   ├── campaigns/
│   │   └── page.tsx
│   ├── fonts/
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── integrations/
│   │   └── page.tsx
│   ├── knowledge/
│   │   └── page.tsx
│   ├── workflows/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── integrations/
│   │   ├── EmailIntegration.tsx
│   │   └── TextIntegration.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MainLayout.tsx
│   │   └── Sidebar.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── tooltip.tsx
│   ├── CampaignManager.tsx
│   ├── Dashboard.tsx
│   ├── DataCompiler.tsx
│   ├── jfdi-hub-updated.tsx
│   ├── KnowledgeBase.tsx
│   ├── LLMInterface.tsx
│   ├── Login.tsx
│   ├── Notification.tsx
│   └── WorkflowCreator.tsx
│
├── contexts/
│   └── AppContext.tsx
│
├── lib/
│   ├── db/
│   │   ├── connection.ts
│   │   ├── sharedSchema.ts
│   │   └── userSchema.ts
│   └── utils.ts
│
├── styles/
│   └── globals.css
│
├── .eslintrc.json
├── .gitignore
├── components.json
├── jfdi0-1.code-workspace
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Key Components and Functionality

1. **Main Application (app/page.tsx)**
   - Renders the main layout and the JfdiHubUpdated component

2. **JfdiHubUpdated (components/jfdi-hub-updated.tsx)**
   - Main component that structures the application UI
   - Includes a sidebar with navigation buttons (Create, Admin, Projects, Maestro)
   - Renders the Dashboard, VeeUI, and MaestroUI components

3. **Dashboard (components/Dashboard.tsx)**
   - Manages personal and shared workflows
   - Provides interfaces for different LLMs (Vee, Maestro, Create)
   - Includes a Data Compiler interface
   - Allows creation and viewing of workflows

4. **LLM Interfaces**
   - VeeUI: Focuses on Time and Communication tasks
   - MaestroUI: Focuses on Execution tasks
   - Create: Focuses on generating creative content and ideas

5. **API Routes (app/api/)**
   - workflows: Manages CRUD operations for workflows
   - llm: Handles LLM interactions using OpenAI's GPT-3.5-turbo model
   - tags: Manages tags for inter-LLM communication
   - userdata: Handles user-specific data
   - companydata: Manages company-wide data

6. **Database Integration (lib/db/)**
   - connection.ts: Manages MongoDB connection
   - sharedSchema.ts: Defines schemas for shared data
   - userSchema.ts: Defines schemas for user-specific data

7. **Context Management (contexts/AppContext.tsx)**
   - Provides application-wide state management, including user authentication

8. **UI Components (components/ui/)**
   - Reusable UI components like buttons, cards, inputs, and tooltips
   - Utilizes shadcn/ui components (as indicated in components.json)

## Technology Stack

- **Framework**: Next.js 14.2.9
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: Custom components and shadcn/ui
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Database**: MongoDB
- **LLM Integration**: OpenAI API (GPT-3.5-turbo model)

## Configuration

- **Next.js**: Configured to listen on all network interfaces (0.0.0.0) on port 3000
- **TypeScript**: Strict mode enabled, using ESNext module system
- **Tailwind**: Custom color scheme and animations
- **Component Aliases**: Defined for easy imports (e.g., @/components, @/lib)
- **Environment Variables**: 
  - MONGODB_URI: For database connection
  - OPENAI_API_KEY: For OpenAI API access

## Key Features

- Multi-LLM system with specialized interfaces (Vee, Maestro, Create)
- Personal and shared workflow management
- Tag-based inter-LLM communication
- Company-wide data compilation
- User authentication and personalized experiences

## LLM Integration

The application uses OpenAI's GPT-3.5-turbo model to power three different LLM personalities:

1. **Vee**: Focused on data analysis and visualization
2. **Maestro**: Specialized in project management and workflow optimization
3. **Create**: Focused on generating creative content and ideas

The `app/api/llm/route.ts` file handles the LLM interactions:
- It uses the OpenAI API client to send requests to the GPT-3.5-turbo model.
- Different system prompts are used for each LLM to specialize their responses.
- The API route accepts POST requests with an LLM name and a message, then returns the model's response.

## Application Flow

1. The application starts at `app/page.tsx`, which renders the `MainLayout` and `JfdiHubUpdated` components.
2. `JfdiHubUpdated` checks for user authentication and renders either the `Login` component or the main application interface.
3. The main interface includes a sidebar for navigation and the main content area.
4. The Dashboard component allows users to switch between different views:
   - Workflow management (creating and viewing personal and shared workflows)
   - LLM interfaces (Vee, Maestro, Create)
   - Data Compiler
5. API routes handle data operations, interacting with the MongoDB database through the defined schemas.
6. LLM interactions are processed through the `/api/llm` route, which communicates with the OpenAI API.

## Deployment and Security

- The application can be deployed on a VM or any environment supporting Node.js and MongoDB.
- For production, the application should be built using `npm run build` and started with `npm start`.
- The OpenAI API key should be kept confidential and stored securely in environment variables.

## Notes

- The project uses a custom color scheme defined in the JfdiHubUpdated component.
- The application is set up for server-side rendering and API routes using Next.js.
- The project structure suggests a modular approach with separate components for different functionalities.

This architecture supports a complex, multi-faceted application that integrates multiple LLMs, workflow management, and data handling within a Next.js framework, leveraging OpenAI's GPT model for advanced AI capabilities.