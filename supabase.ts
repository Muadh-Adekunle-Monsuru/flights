import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	'https://lqxvylyrpzykhbukksei.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeHZ5bHlycHp5a2hidWtrc2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MTc2NDksImV4cCI6MjAyNzk5MzY0OX0.B1bxjk0wYMcJRJwJ92iK_PGg_sB8F8CWwrcdLJtQAJA'
);
