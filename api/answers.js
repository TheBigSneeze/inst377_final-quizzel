import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('quiz_answers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { name, quiz, score } = req.body;

      const { data, error } = await supabase
        .from('quiz_answers')
        .insert([{ name, quiz, score }]);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
