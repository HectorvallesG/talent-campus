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

export interface StudentSearchResponse {
  id:       string;
  name:     string;
  user: {
    email:    string;
    userName: string;
  }
}