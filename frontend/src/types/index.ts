// export interface Experience {
//   id: number;
//   title: string;
//   location_tag: string;
//   description: string;
//   price: number;
//   image_url: string;
// }

export interface Experience {
  id: number;
  title: string;
  location_tag: string;
  description: string;
  price: number;
  image_url: string;
}

export interface Slot {
  id: number;
  slot_date: string;
  start_time: string;
  slots_left: number;
}

export interface ExperienceDetails {
  details: Experience;
  slots: Slot[];
}

export interface BookingPayload {
    slot_id: number;
    user_name: string;
    user_email: string;
    promo_code?: string;
    final_price: number;
}