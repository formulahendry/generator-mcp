import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "<%= mcpServerName %>",
    version: "0.1.0",
  });

  server.tool(
    "<%= toolName %>",
    "description for <%= toolName %>",
    {
      input: z.string().describe("Input")
    },
    async ({ input }) => {
      if (!input) {
        throw new Error("Input is required.");
      }

      return {
        content: [
          {
            type: "text",
            text: "Tool output",
          },
        ],
      };
    },
  );

  return server;
}
