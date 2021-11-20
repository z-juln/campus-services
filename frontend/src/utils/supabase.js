import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
const supabase = createClient("https://avphgsblnrxgwphcuqmj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDM5OTMzMSwiZXhwIjoxOTQ5OTc1MzMxfQ.wBBTMwekOhRM4gG4YvL1hetYU8vfO0VCprQUkmVzE8U")
export default supabase