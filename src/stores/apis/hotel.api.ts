import { HotelEntity } from "@/types/entities";
import { createSupabaseClient } from "@/utils/supabase/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getAllHotel: builder.query<HotelEntity[], void>({
      queryFn: async () => {
        const supabase = await createSupabaseClient();
        const { data, error } = await supabase.from("hotel").select("*");

        if (error) {
          throw error;
        }

        return { data };
      },
    }),
  }),
});

export const { useGetAllHotelQuery } = hotelApi;
