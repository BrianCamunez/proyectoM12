import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfropabgmkdhhbnmzlhs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcm9wYWJnbWtkaGhibm16bGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDU4NDcsImV4cCI6MjA2MTA4MTg0N30.BnQ3U0dmHaxQiy9WEeSTPs_l5TPenfHOrfEaOiWsWxg'

export const supabase = createClient(supabaseUrl, supabaseKey)