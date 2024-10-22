export interface RecruiterResponse {
  id:      string;
  name:    string;
  company: string;
  user:    {
    id:          string;
    isActivated: string;
    email:       string;
    userName:    string;
  }
}

