// Contributor credits for the MyLaoSmile mission, grouped by role.
// Kept in a dedicated data module so the roster can be edited without
// touching the Resume component's markup.

export interface ContributorGroup {
  readonly role: string;
  readonly names: readonly string[];
}

// A closing note rendered as a message rather than a named list.
export interface Acknowledgement {
  readonly role: string;
  readonly message: string;
}

export const contributorGroups: readonly ContributorGroup[] = [
  {
    role: "Surgeons",
    names: [
      "Kuek Bak Kim Leslie",
      "Por Yong Chen",
      "Wu Tze Liang Woffles",
      "Michael Hsieh Ku-Hung",
      "Robert Yap Tze Jin",
      "Lim Jue Shuang Gale",
      "Savitha Ramachandran",
      "Cai Zhengyang Elijah",
      "Ang Shu Yan Divya",
      "Lai Yu Ming",
      "Loh Mei Ling",
    ],
  },
  {
    role: "Anaesthetists",
    names: [
      "Lim Hsien Jer",
      "Tan Swee Kim Josephine",
      "Tan Geok Mui",
      "Davies Lucy Jennifer",
      "Rachael Peirera",
      "Claire Ang Sze Teng",
      "Neo Hong Jye",
      "Ng Bang Teen",
      "Philip Tseng Seng Sou",
      "Stephanie Glarbo Jia Xing",
      "Angela Tan Yun June",
      "Yap Si Hui",
      "Chia Xian Qing Pamela",
      "Ma Wai Wai Zaw",
      "Jonathan See",
    ],
  },
  {
    role: "Orthodontist",
    names: ["Catherine Lee Tong How"],
  },
  {
    role: "Nurses",
    names: [
      "Ong ShiHui",
      "Lew Lian Choo",
      "Cassandra Leong",
      "Ho Liping Michelle",
      "Chua Sin Yee",
      "Cordelia Xavier",
      "Ng Sau Foong",
      "Yvonne Yap Yan Yan",
      "Manoranjitham Harikrishnan",
      "Sheena Wong Xiu Wen",
      "Nur Diyana Binte Jamial",
      "Tan Hwee Min",
    ],
  },
  {
    role: "Speech Therapist",
    names: ["Jasmin Teo Lee Ping"],
  },
  {
    role: "Photographer / Web Designer",
    names: ["John Tow"],
  },
];

export const localAcknowledgement: Acknowledgement = {
  role: "Local Nurses and Doctors",
  message:
    "With heartfelt thanks to the local nurses, doctors, and everyone who supported our mission.",
};
