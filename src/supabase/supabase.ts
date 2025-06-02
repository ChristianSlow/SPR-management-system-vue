import { createClient } from '@supabase/supabase-js'
import { Database } from 'firebase/database'
// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  'https://jbdwlqdondtpiftievdc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZHdscWRvbmR0cGlmdGlldmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4Njg2NzgsImV4cCI6MjA2NDQ0NDY3OH0.DiUnm-O-PE73Grvp7io7FfCuwBcq8BXT5_Qearpgslc',
)
