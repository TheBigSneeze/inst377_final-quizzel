import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.https://xmsiiponytehlyzvnore.supabase.co,
  process.env.sb_publishable_FNABY2NIczPlDH8bgyPfOw_3lgK-Rop
);

export default async function handler(req, res) {
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
    const { name, quiz, answer } = req.body;

    const { data, error } = await supabase
      .from('quiz_answers')
      .insert([{ name, quiz, answer }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
