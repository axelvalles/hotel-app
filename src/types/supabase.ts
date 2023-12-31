export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      habitacion: {
        Row: {
          costobase: number
          estado: boolean
          hotelid: number | null
          id: number
          impuestos: number
          numhabitacion: number
          tipohabitacion: string
          ubicacion: string | null
        }
        Insert: {
          costobase: number
          estado: boolean
          hotelid?: number | null
          id?: number
          impuestos: number
          numhabitacion: number
          tipohabitacion: string
          ubicacion?: string | null
        }
        Update: {
          costobase?: number
          estado?: boolean
          hotelid?: number | null
          id?: number
          impuestos?: number
          numhabitacion?: number
          tipohabitacion?: string
          ubicacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "habitacion_hotelid_fkey"
            columns: ["hotelid"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["id"]
          }
        ]
      }
      hotel: {
        Row: {
          descripcion: string
          direccion: string
          estado: boolean
          galeria: string[]
          id: number
          nombre: string
          portada: string
        }
        Insert: {
          descripcion: string
          direccion: string
          estado: boolean
          galeria: string[]
          id?: number
          nombre: string
          portada: string
        }
        Update: {
          descripcion?: string
          direccion?: string
          estado?: boolean
          galeria?: string[]
          id?: number
          nombre?: string
          portada?: string
        }
        Relationships: []
      }
      reserva: {
        Row: {
          ciudaddestino: string
          contactoemergencia: Json
          datospasajero: Json
          estadoreserva: string
          fechaentrada: string
          fechasalida: string
          habitacionid: number | null
          id: number
          numpersonas: number
        }
        Insert: {
          ciudaddestino: string
          contactoemergencia: Json
          datospasajero: Json
          estadoreserva: string
          fechaentrada: string
          fechasalida: string
          habitacionid?: number | null
          id?: number
          numpersonas: number
        }
        Update: {
          ciudaddestino?: string
          contactoemergencia?: Json
          datospasajero?: Json
          estadoreserva?: string
          fechaentrada?: string
          fechasalida?: string
          habitacionid?: number | null
          id?: number
          numpersonas?: number
        }
        Relationships: [
          {
            foreignKeyName: "reserva_habitacionid_fkey"
            columns: ["habitacionid"]
            isOneToOne: false
            referencedRelation: "habitacion"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
