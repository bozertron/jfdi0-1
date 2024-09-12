# Context for api/llm/route.ts

## Purpose
This API route handles interactions with different Language Learning Models (LLMs) in the JFDI application. It provides an interface for sending messages to specific LLMs and receiving responses, supporting the AI-driven features of the application.

## Functionality
1. POST: Processes messages sent to different LLMs (Vee, Maestro, Create) and returns their responses.
2. OPTIONS: Provides information about allowed HTTP methods.

## Key Components
1. OpenAI client initialization using the OPENAI_API_KEY environment variable.
2. POST handler for processing LLM interactions.
3. Separate handler functions for each LLM (Vee, Maestro, Create).
4. OPTIONS handler for responding to preflight requests.

## Interactions with Other Files
1. Uses the OpenAI npm package for interacting with the GPT-3.5-turbo model.

## External Service Interactions
1. Communicates with the OpenAI API to generate responses for each LLM.

## Request Handling
1. POST:
   - Expects a JSON body with `llmName` and `message` fields.
   - Routes the request to the appropriate LLM handler based on `llmName`.
   - Returns the generated response from the LLM.

## Error Handling
- Returns appropriate error responses (400 for bad requests, 500 for server errors).
- Logs errors to the console for debugging purposes.

## Security Considerations
- Uses an environment variable (OPENAI_API_KEY) to securely store the OpenAI API key.
- Does not implement authentication or authorization (this should be handled by a middleware).

## Response Format
- Returns JSON responses for both successful operations and errors.
- Uses appropriate HTTP status codes (200 for successful POST, 400 for bad requests, 500 for server errors).

## LLM Specifics
1. Vee: Focused on data analysis and visualization.
2. Maestro: Specialized in project management and workflow optimization.
3. Create: Focused on generating creative content and ideas.

## Notes
- The route uses Next.js 13+ API Routes with the `app` directory structure.
- It leverages the `NextResponse` object for structuring responses.
- The OPTIONS method is implemented to support CORS preflight requests.
- All LLMs currently use the GPT-3.5-turbo model with different system prompts.
- The implementation allows for easy addition of new LLMs or modification of existing ones.

This API route is crucial for the AI-driven features of the JFDI application. It's used by the frontend components (like the LLMInterface) to interact with different AI models, each specializing in specific tasks. The separation of LLMs allows for targeted AI assistance in various aspects of the application, enhancing user productivity and creativity.