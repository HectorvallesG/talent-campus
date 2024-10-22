export interface StudentResponse {
  id:        string;
  name:      string;
  lastName:  string;
  faculty:   string;
  specialty: string;
  userId:   string;
  user: {
    isActivated: string;
    email:       string;
  }
}