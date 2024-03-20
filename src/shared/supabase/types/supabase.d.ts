export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      review_info: {
        Row: {
          review_content: string | null;
          review_createdat: string;
          review_id: number;
          toilet_clean_rate: number | null;
          toilet_id: number | null;
          toilet_loc_rate: number | null;
          toilet_pop_rate: number | null;
          user_id: string | null;
          user_nickname: string | null;
        };
        Insert: {
          review_content?: string | null;
          review_createdat?: string;
          review_id?: number;
          toilet_clean_rate?: number | null;
          toilet_id?: number | null;
          toilet_loc_rate?: number;
          toilet_pop_rate?: number;
          user_id?: number | null;
          user_nickname?: string | null;
        };
        Update: {
          review_content?: string | null;
          review_createdat?: string;
          review_id?: number;
          toilet_clean_rate?: number | null;
          toilet_id?: number | null;
          toilet_loc_rate?: number;
          toilet_pop_rate?: number;
          user_id?: number | null;
          user_nickname?: string | null;
        };
        Relationships: [];
      };
      toilet_location: {
        Row: {
          toilet_address: string;
          toilet_baby_diaper: string | null;
          toilet_id: number;
          toilet_latitude: number;
          toilet_longitude: number;
          toilet_name: string;
          toilet_opening_hours: string | null;
        };
        Insert: {
          toilet_address?: string | null;
          toilet_baby_diaper?: string | null;
          toilet_id?: number;
          toilet_latitude?: number;
          toilet_longitude?: number;
          toilet_name?: string | null;
          toilet_opening_hours?: string | null;
        };
        Update: {
          toilet_address?: string | null;
          toilet_baby_diaper?: string | null;
          toilet_id?: number;
          toilet_latitude?: number;
          toilet_longitude?: number;
          toilet_name?: string | null;
          toilet_opening_hours?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
