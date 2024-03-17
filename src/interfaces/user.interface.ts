
// Purpose: Interface for the Query Function.
export class ProspectQuery {
  location?: string;
  phone?: string;
  size?: number;
  page?: number;
  last_name?: string;
  first_name?: string;
  start_date?: Date | string;
  end_date?: Date | string;
}
