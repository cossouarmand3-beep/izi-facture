import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = "https://xkedygydiinwxrelwhpr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZWR5Z3lkaWlud3hyZWx3aHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MDYwMDMsImV4cCI6MjEwMzQ4MjAwM30.EkwQIQnEZ2GGXjlWzXYaHZ0xtRNm8Lfh3QGUEHHSNfc";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
