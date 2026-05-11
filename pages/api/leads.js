import { getSupabaseClient } from "../../lib/supabase";

export default async function handler(req, res) {
  try {
    const supabase = getSupabaseClient();

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("leads")
        .select("id, name, email, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ leads: data });
    }

    if (req.method === "POST") {
      const { name, email } = req.body;

      const { data, error } = await supabase
        .from("leads")
        .insert([{ name, email }])
        .select("id, name, email")
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ lead: data });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
