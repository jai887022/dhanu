import { Project, Exhibition, JournalEntry } from './types';

export const initialProjects: Project[] = [
  {
    id: "quiet-strength",
    title: "Quiet Strength",
    boldTitle: "Strength",
    lightTitle: "Quiet",
    subtitle: "Featured Case Study",
    description: "A visual investigation into structural minimalism across Nordic landscapes and contemporary urban spaces. Focused on the alignment of cold cast concrete and geometry.",
    category: "Nordic Architecture",
    client: "Stockholm Museum",
    service: "Art Direction & Curation",
    year: "2024",
    imagePath: "/src/assets/images/quiet_strength_1781069058486.png",
    indexNum: "01",
    bgHex: "#F5F5F5"
  },
  {
    id: "soft-light",
    title: "Soft Light",
    boldTitle: "Light",
    lightTitle: "Soft",
    subtitle: "Acoustic & Illumination Design",
    description: "Capturing the transient mornings of Stockholm inside a minimal glass-and-timber pavilion. An inquiry into silence, thermal mass, and natural diffusion.",
    category: "Interior Spatial Design",
    client: "Oslo Design Hub",
    service: "Brand Identity, Space Planning",
    year: "2025",
    imagePath: "/src/assets/images/soft_light_1781069072897.png",
    indexNum: "02",
    bgHex: "#EAE6DF"
  },
  {
    id: "raw-forms",
    title: "Raw Forms",
    boldTitle: "Forms",
    lightTitle: "Raw",
    subtitle: "Sculptural Objects Exhibition",
    description: "A series of raw basalt stone, coarse cement, and cast pottery objects engineered with mathematically pure curves under direct solar beams.",
    category: "Industrial Brutalism",
    client: "Helsinki Studio",
    service: "Exhibition & Object Design",
    year: "2026",
    imagePath: "/src/assets/images/raw_forms_1781069088165.png",
    indexNum: "03",
    bgHex: "#E4E5E6"
  }
];

export const initialExhibitions: Exhibition[] = [
  {
    id: "exh-1",
    title: "Form Follows Void",
    subtitle: "Annual Retrospective of Empty Spaces",
    date: "June 15 – July 30, 2026",
    location: "Galleri No. 9, Copenhagen",
    description: "A quiet celebration of the unoccupied plane. Featuring large-scale lithographs, suspended basalt tablets, and light-slit architectural partitions.",
    status: "upcoming",
    curator: "Saskia Vander"
  },
  {
    id: "exh-2",
    title: "Chamber of Shadows",
    subtitle: "Experiential Light Installation",
    date: "September 12 – October 28, 2026",
    location: "Spree Ateliers, Berlin",
    description: "An immersive sequence of dark chambers lit solely by high-contrast solar reflections of Copenhagen's docks. Experience quietude and pure dark space.",
    status: "upcoming",
    curator: "Aris Thorne"
  },
  {
    id: "exh-3",
    title: "Liquid Glass & Raw Iron",
    subtitle: "Danish-Japanese Minimal Syntheses",
    date: "January 04 – February 18, 2026",
    location: "Sento Hall, Kyoto",
    description: "Highlighting standard connections between Japanese tea bowls and Nordic cast-iron stoves. Focused on standard rust textures and glass transparency.",
    status: "completed",
    curator: "Kenzo Shirai"
  }
];

export const initialJournalEntries: JournalEntry[] = [
  {
    id: "j-1",
    title: "The Poetics of the Untouched Column",
    category: "Theory",
    content: "Why does an unadorned surface say more than the most ornate masonry? In contemporary architecture, there is a constant battle against gravity and visual noise. The pillar is no longer a canvas for scrollwork; it is a declaration of presence. By striping back our columns to pure concrete and linear joints, we invite the atmosphere of the day inside. We allow the moving sun to carve the column in shifting shades of grey throughout the hours. This is the quiet dialogue of structural integrity.",
    date: "May 24, 2026",
    readsCount: 142
  },
  {
    id: "j-2",
    title: "On Basalt, Coarse Grout, and Earth Honesty",
    category: "Materials",
    content: "Our studio has recently begun working with raw basalt and unpolished coarse grout. Unlike polished granite, raw basalt retains the memory of the volcanic rupture. It is ancient, cold, and heavy. When grouted with coarse-grain Nordic riversand mixtures, the joint matches the texture of the stone itself. There is no artificial border. In standard Nordic minimalism, the materials are allowed to be honest about their origin, their weight, and their flaws. Cracks are not defects, but the lines where tension finds its rest.",
    date: "April 11, 2026",
    readsCount: 98
  },
  {
    id: "j-3",
    title: "Nordic Light Diffusion Mechanics",
    category: "Aesthetics",
    content: "Nordic winter is characterized by low solar angles. The sun does not peak from overhead; it brushes the ground, throwing elongated paths of amber and frost. Designing for this light requires high-transparency glass coupled with textured timber backplanes. This combinations acts as an acoustic and optic blanket—diffuser grilles scatter the cold glare, while warm cedar ribs catch the remaining amber. Here, minimalism becomes an essential climate blanket rather than a stylistic choice.",
    date: "March 02, 2026",
    readsCount: 215
  }
];
