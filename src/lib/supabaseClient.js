
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svgoyyjhmvwujszzlwcy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Z295eWpobXZ3dWpzenpsd2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NTg3NzIsImV4cCI6MjA2NDEzNDc3Mn0.m1lmfU251Gwzlb3Jbn8XJZup2VlUlDcGw3M6h9rnEac';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
