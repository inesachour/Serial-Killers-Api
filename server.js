import express from "express";
import env from "dotenv";
import { createClient } from "@supabase/supabase-js";

const app = express();

env.config();

const supabase = createClient(process.env.PROJECT_URL, process.env.API_KEY);

app.listen(process.env.PORT || 3000, () => {
  console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
});

// Get all serial killers
app.get("/serialkillers", async (_, response) => {
  try {
    const { data, error } = await supabase.from("serial killers").select();
    console.log(data);
    return response.send(data);
  } catch (error) {
    return response.send({ error });
  }
});

// Get serial killer by Name
app.get("/serialkillers/name/:name", async (req, response) => {
  try {
    const { name } = req.params;
    const { data, error } = await supabase
      .from("serial killers")
      .select()
      .ilike("name", `%${name}%`); // Case-insensitive partial match

    if (error) throw error;
    if (data.length === 0) return response.status(404).json({ error: "Not found" });

    return response.json(data);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});