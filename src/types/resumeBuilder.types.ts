export default interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    year: number;
    achievements: string[];
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    duration: {
      start: string;
      end: string;
    };
    responsibilities: string[];
  }>;
}
