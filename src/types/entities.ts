import { Database } from "./supabase";

export type HotelEntity = Database["public"]["Tables"]["hotel"]["Row"];
