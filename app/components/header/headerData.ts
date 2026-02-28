// Search Data
export interface SearchType {
  href: string;
  title: string;
}

export const searchLinks: SearchType[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Contacto",
    href: "/contacto",
  },
];

// Message/Notification Data
export interface MessageType {
  title: string;
  avatar: string;
  subtitle: string;
}

export const messagesData: MessageType[] = [
  {
    avatar: "/images/profile/user-2.jpg",
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: "/images/profile/user-3.jpg",
    title: "New message",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: "/images/profile/user-4.jpg",
    title: "Bianca sent payment",
    subtitle: "Check your earnings",
  },
  {
    avatar: "/images/profile/user-5.jpg",
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
  {
    avatar: "/images/profile/user-6.jpg",
    title: "John received payment",
    subtitle: "$230 deducted from account",
  },
];

// Profile Dropdown Data
export interface ProfileType {
  title: string;
  icon: string;
  subtitle: string;
  url: string;
}

export const profileData: ProfileType[] = [
  {
    icon: "solar:user-bold-duotone",
    title: "My Profile",
    subtitle: "Account settings",
    url: "#",
  },
  {
    icon: "solar:notes-bold-duotone",
    title: "My Notes",
    subtitle: "My Daily Notes",
    url: "#",
  },
  {
    icon: "solar:list-check-line-duotone",
    title: "My Tasks",
    subtitle: "To-do and Daily tasks",
    url: "#",
  },
];

// Language Data
export interface LanguageType {
  flagname: string;
  icon: string;
  value: string;
}

export const languagesData: LanguageType[] = [
  {
    flagname: "English (UK)",
    icon: "/images/flag/icon-flag-en.svg",
    value: "en",
  },
  {
    flagname: "中国人 (Chinese)",
    icon: "/images/flag/icon-flag-cn.svg",
    value: "ch",
  },
  {
    flagname: "français (French)",
    icon: "/images/flag/icon-flag-fr.svg",
    value: "fr",
  },
  {
    flagname: "عربي (Arabic)",
    icon: "/images/flag/icon-flag-sa.svg",
    value: "ar",
  },
];
