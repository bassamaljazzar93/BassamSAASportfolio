import { Experience, Project, SkillCategory } from './types';

export const CV_DATA = {
  name: "Bassam Walid Aljazzar",
  role: "Lead Mechatronics Engineer",
  summary: "As a Mechatronics Engineer with 8 years of experience, I am an expert in 3D design, complex system analysis, and modifications, and Python development. Contributed to building 'Bu Saif' Humanoid and holder of US Patent 11573635.",
  contact: {
    email: "b_aljazzar@yahoo.com",
    phone: "+971 56 611 3381",
    location: "Abu Dhabi, United Arab Emirates",
    linkedin: "https://www.linkedin.com/in/bassam-aljazzar"
  },
  highlights: [
    { label: "Experience", value: "8+ Years", icon: "history_edu", sub: "100% Project Delivery" },
    { label: "IP Holder", value: "US Patent", icon: "verified_user", sub: "US11573635" },
    { label: "Research", value: "Innovation Lab", icon: "biotech", sub: "MOI Lead" }
  ]
};

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: "Lead Mechatronics Engineer",
    company: "Tatweer Middle East and Africa",
    period: "Jun 2021 - Present",
    location: "Abu Dhabi, UAE",
    description: [
      "Consultant at the Manufacturing Innovation Laboratory at the Ministry of Interior.",
      "Develop innovative solutions for the Ministry's challenges using Python and embedded systems.",
      "Manage cross-functional teams for seamless integration of mechatronic solutions.",
      "Leading technical training workshops for MOI employees."
    ],
    tags: ["Systems Architecture", "Python Dev", "Consulting", "Leadership"]
  },
  {
    id: "2",
    role: "Research Assistant",
    company: "UAE University (CIT)",
    period: "May 2019 - May 2021",
    location: "Al Ain, UAE",
    description: [
      "Lead researcher for the 'Bu Saif' Humanoid Robot project.",
      "Developed affordable 3D printed ventilator prototypes during COVID-19.",
      "Designed the 'Meta Touch' touchless elevator system currently in market.",
      "Contributed to US Patent 11573635 for communication face masks."
    ],
    tags: ["Academic Research", "Prototyping", "Medical Devices", "Robotics"]
  },
  {
    id: "3",
    role: "Mechatronics Engineer",
    company: "Fadel Al Dhaheri General Trading",
    period: "Nov 2018 - Apr 2019",
    location: "Dubai, UAE",
    description: [
      "Maintenance of complex mechanical systems including massage chairs and toy machines.",
      "Board-level electronics repair and diagnostics."
    ],
    tags: ["Maintenance", "Electronics", "Hardware"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "bu-saif-humanoid",
    title: "Bu Saif Humanoid Robot",
    category: "Social Robotics",
    year: "2019-2021",
    description: "A cultural humanoid robot representing the UAE. It features an expressive face, traditional Kandura and Ghutra attire, and an integrated interface system displaying greeting signals like 'Marhaba'. Designed for advanced human-robot interaction and geriatric cognitive assessment.",
    images: [
      "https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/main/images/busaif_3.jpg", 
      "https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/main/images/busaif_2.jpg", 
      "https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/main/images/busaif_1.jpg"
    ], 
    stats: [
      { label: "Platform", value: "Custom Mechatronics" },
      { label: "HRI", value: "NLP & Visual" }
    ],
    tags: ["Humanoid", "CAD/CAM", "Embedded AI", "Social Robotics"]
  },
  {
    id: "meta-touch-system",
    title: "Meta Touch Contactless Interface",
    category: "Industrial Automation",
    year: "2020",
    description: "Revolutionary contactless elevator interface developed during the pandemic. Utilizes an IR sensor matrix mounted on stainless steel panels to detect finger proximity without physical touch, ensuring public safety and hygiene in high-traffic elevators.",
    images: [
      "https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/main/images/metaTouch_1.jpg", 
      "https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/main/images/metaTouch_2.jpg"
    ],
    stats: [
      { label: "Sensors", value: "IR Hover Array" },
      { label: "Material", value: "Stainless Steel" }
    ],
    tags: ["Safety Systems", "IR Sensing", "Patented", "UI/UX"]
  },
  {
    id: "shrimp-locomotion-rover",
    title: "Shrimp Hex-Wheel Rover",
    category: "Terrestrial Robotics",
    year: "2018",
    description: "A high-mobility 6-wheeled rover featuring the 'Shrimp' locomotion mechanism. Designed for extreme terrain navigation with independent suspension and an orange-wheel high-traction system, modeled and analyzed in SolidWorks.",
    images: [
      "https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/main/images/shrimpRover_real.jpg", 
      "https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/main/images/shrimpRover_Sim.png"
    ],
    stats: [
      { label: "Drivetrain", value: "6WD Independent" },
      { label: "CAD Node", value: "SolidWorks Design" }
    ],
    tags: ["Kinematics", "Suspension", "Prototype", "SolidWorks"]
  }
];

export const SKILL_MATRIX: SkillCategory[] = [
  {
    title: "Robotics & Control",
    icon: "smart_toy",
    skills: ["Kinematics", "ROS / ROS2", "SLAM", "Path Planning", "PID Control"]
  },
  {
    title: "Embedded Systems",
    icon: "memory",
    skills: ["PCB Design", "STM32 / ARM", "CAN / SPI / I2C", "FPGA", "RTOS"]
  },
  {
    title: "Software & AI",
    icon: "terminal",
    skills: ["Python (ML)", "C / C++ 20", "MATLAB", "Linux Kernels", "OpenCV"]
  },
  {
    title: "Design & MFG",
    icon: "architecture",
    skills: ["SolidWorks", "Fusion 360", "FEA Analysis", "CNC", "3D Printing"]
  }
];