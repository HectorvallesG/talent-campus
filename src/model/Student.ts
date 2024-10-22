export interface StudentResponse {
  id:        string;
  name:      string;
  lastName:  string;
  faculty:   string;
  specialty: string;
  user: {
    id:          string;
    isActivated: string;
    email:       string;
  }
}