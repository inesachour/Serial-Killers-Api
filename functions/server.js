import express from "express";
import serverless from "serverless-http";
import env from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
env.config();

const supabase = createClient(process.env.PROJECT_URL, process.env.API_KEY);

// Modify routes to include /api prefix
app.get("/api/serialkillers", async (_, response) => {
  try {
    const { data, error } = await supabase.from("serial killers").select();
    console.log(data);
    return response.send(data);
  } catch (error) {
    return response.status(500).send({ error });
  }
});

app.get("/api/serialkillers/name/:name", async (req, response) => {
  try {
    const { name } = req.params;
    const { data, error } = await supabase
      .from("serial killers")
      .select()
      .ilike("name", `%${name}%`);

    if (error) throw error;
    if (data.length === 0) return response.status(404).json({ error: "Not found" });

    return response.json(data);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

// Export handler for Netlify
export const handler = serverless(app);