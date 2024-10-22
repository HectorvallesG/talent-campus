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

export interface SearchProfileStudentResponse {
  id:       string;
  name:      string;
  lastName:  string;
  faculty:   string;
  specialty: string;
  user: {
    id:       string;
    email: string;
    userName: string;
  }
  profile: null | {
    id: string;
    bio: string;
    city: string;
    career: string;
  }
}