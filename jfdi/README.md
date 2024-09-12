# JFDI Application

This is a Next.js application that implements a multi-LLM system with shared and personal workflows, tag management, and company-wide data compilation.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)
- OpenAI API key

## Setup

1. Clone the repository to your VM:
   ```
   git clone https://github.com/bozertron/jfdi0-1.git
   cd jfdi0-1
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   MONGODB_URI=mongodb://localhost:27017/jfdi
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   Replace the MongoDB URI with your connection string if it's different, and add your actual OpenAI API key.

4. Start the development server:
   ```
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Accessing the Application

To access the application from other devices on your network:

1. Find your VM's IP address:
   - On Linux/macOS, use `ifconfig` or `ip addr show`
   - On Windows, use `ipconfig`

2. Open a web browser on another device and navigate to `http://<your-vm-ip>:3000`

## Features

- Multi-LLM system (Vee, Maestro, Create)
- Personal and shared workflows
- Tag management for inter-LLM communication
- Company-wide data compilation
- User-specific isolated database

## Directory Structure

- `/app`: Next.js app router
- `/components`: React components
- `/lib`: Utility functions and database schemas
- `/contexts`: React contexts for state management
- `/styles`: Global styles

## API Routes

- `/api/workflows`: Manage personal and shared workflows
- `/api/tags`: Manage tags for inter-LLM communication
- `/api/userdata`: Manage user-specific data
- `/api/companydata`: Manage company-wide data
- `/api/llm`: Interact with LLMs (Vee, Maestro, Create)

## LLM Integration

The application uses OpenAI's GPT model to power three different LLM personalities:

- Vee: Focused on data analysis and visualization
- Maestro: Specialized in project management and workflow optimization
- Create: Focused on generating creative content and ideas

To use these LLMs, ensure you have set the `OPENAI_API_KEY` in your `.env.local` file.

## Development

To add new features or modify existing ones, refer to the component and API route files in the respective directories.

## Deployment

For production deployment, build the application using:

```
npm run build
```

Then start the production server:

```
npm start
```

Ensure your VM's firewall allows incoming connections on port 3000 (or the port you've configured).

## Security Note

Always keep your OpenAI API key confidential. Never commit the `.env.local` file to version control or share it publicly.
