import type { Context, Config } from "@netlify/functions";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

interface RequestBody {
  url: string;
}

interface ResponseBody {
  markdown: string;
  title: string;
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { url } = await req.json() as RequestBody;

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "URL is required" }),
      };
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const title = dom.window.document.title.trim() || "Untitled Page";
    const markdown = `[${title}](${url})`;

    return new Response(JSON.stringify({ markdown, title } as ResponseBody), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Failed to process URL" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};