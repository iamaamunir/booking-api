export interface CreateBookingRequest {
  property_id: string;
  user_name: string;
  start_date: string;
  end_date: string;
}

export interface CreateBookingResponse {
  id: string;
  user_name: string;
  start_date: string;
  end_date: string;
  created_at: Date;
  property_id: string;
}
