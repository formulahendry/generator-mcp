import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "<%= mcpServerName %>",
    version: "0.1.0",
  });

  server.tool(
    "get_weather",
    "Get weather info for a given city.",
    {
      city: z.string().describe("city name"),
    },
    async ({ city }) => {
      if (!city) {
        throw new Error("city name is required.");
      }

      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      const weather = await response.json();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(weather, null, 2),
          },
        ],
      };
    },
  );

  return server;
}
