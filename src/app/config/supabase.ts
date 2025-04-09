
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'http://191.252.203.134:8000'
const supabaseKey = process.env.SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase