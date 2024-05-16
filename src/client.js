import { createClient } from "@supabase/supabase-js";

export const supabase = createClient( 
    "https://cmptvemfyrbodnzwuaac.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcHR2ZW1meXJib2Ruend1YWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2MTc5NTIsImV4cCI6MjAzMTE5Mzk1Mn0.avN5cXfbb_Moc64cv5_aGeJz3J-JzIPAcxd17q0lEqE"
)