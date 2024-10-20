import { Characters, Plot, Theme, World } from "./type";

export const theme: Theme = {
  core_theme: ["Redemption", "Romance"],
  genres: ["Drama", "Romance", "Superhero"],
  premise:
    "Betrayed and stripped of his position, Barry Allen, aka The Flash, explores a romantic relationship that challenges his thirst for revenge and struggle for redemption, all while navigating a world of powerful adversaries and deceitful allies.",
  conflict: {
    external:
      "Powerful adversaries and deceitful allies pose a threat to Barry Allen and those he loves.",
    internal:
      "Barry's inner turmoil, the thirst for revenge, and the struggle for redemption clash with his newfound superhero responsibilities and romantic feelings.",
  },
  emotional_arc:
    "Barry experiences an emotional shift from anger and betrayal to determination and hope, with moments of despair and triumph in his dual life as a wronged man, a superhero, and a lover.",
  narrative_hooks: [
    "A haunting flashback of Barry's betrayal.",
    "The development of a romantic relationship that defies expectations.",
  ],
  intended_audience:
    "Fans of romantic superhero stories with morally complex characters and themes of redemption and love.",
  episode_themes: [
    {
      episode: 1,
      theme: "The Betrayal and New Beginnings",
      description:
        "Barry Allen suffers betrayal, witnesses the death of comrades, and embarks on a romantic journey, setting the stage for his quest for redemption and self-discovery.",
    },
    {
      episode: 2,
      theme: "Love Conquers All",
      description:
        "The Flash navigates the complexities of his romantic feelings, the challenges of his superhero duties, and his thirst for revenge, leading to a climactic moment of redemption and love.",
    },
  ],
};

export const world: World = {
  genre: ["Dystopian", "Sci-fi", "Thriller"],
  geography: {
    landforms: ["Central Mega-City", "Coastal Ruins", "Mountain Fortresses"],
    climate: "Polluted, with frequent acid rains",
    seasonal_variation: {
      spring: "Brief respite from pollution, before it worsens again",
      summer: "Scorching heat, further exacerbated by industrial waste",
      autumn: "Leaves turn grey due to acid rain, a grim prelude to winter",
      winter: "Cold and harsh, with icy winds and rare snowfall",
    },
    seasons: ["Spring", "Summer", "Autumn", "Winter"],
    natural_resources: [
      "Scarce clean water",
      "Decaying urban gardens",
      "Salvaged materials",
    ],
    natural_disasters: ["Acid rainstorms", "Rare winter avalanches"],
  },
  cultural_diversity: {
    cultures: [
      {
        name: "Central Survivors",
        customs: "Scavenging for resources, staying vigilant against threats",
        traditions:
          "Remembering the past through stories, celebrating rare victories",
      },
      {
        name: "Coastal Scavengers",
        customs: "Fishing in radioactive-free zones, repurposing wreckage",
        traditions:
          "Defending their territories against mutated sea creatures, preserving seafaring folklore",
      },
      {
        name: "Mountain Outcasts",
        customs: "Mountaineering for survival, living off the land",
        traditions:
          "Maintaining ancient knowledge, teaching self-defense against rogue AI",
      },
    ],
    languages: {
      "Central Survivors": ["Urban Survivalist Pidgin"],
      "Coastal Scavengers": ["Coastal Scrounge Speak"],
      "Mountain Outcasts": ["Mountain Solitude Syntax"],
    },
    social_structures: {
      "Central Survivors": "Survival-of-the-fittest, ruthless hierarchies",
      "Coastal Scavengers": "Tribal, with shared responsibilities",
      "Mountain Outcasts": "Egalitarian, focused on mutual aid",
    },
    belief_systems: ["Ancestor veneration", "Machine skepticism"],
  },
  attributes: {
    technology_level: "Advanced, but decaying and unreliable",
    magic_systems: "NIL",
    societal_norms: "Adaptation, suspicion, and resilience",
    economic_systems: "Barrier economy, trading salvaged goods",
    political_structures: "Anarchy, with occasional power struggles",
    world_states: "Post-apocalyptic, struggling for survival",
  },
  year: 2347,
  key_locations: [
    {
      name: "Central Mega-City",
      description:
        "A crumbling metropolis, with towering ruins and makeshift shelters, a testament to humanity's resilience",
      location: "Heart of the wasteland",
      significance:
        "A dangerous place filled with valuable, salvageable resources",
    },
    {
      name: "Coastal Ruins",
      description:
        "Dilapidated seaside towns, with remnants of past glory and fading maritime traditions",
      location: "Coastal regions",
      significance: "Mutated sea creatures lurk nearby, endangering scavengers",
    },
    {
      name: "Mountain Fortresses",
      description:
        "Reinforced mountain hideaways, safeguarding ancient knowledge and providing sanctuary from rogue AI",
      location: "Mountain ranges",
      significance:
        "Refuge for those seeking solace from the chaotic world below",
    },
  ],
  history:
    "In the late 21st century, unchecked technological advancements led to humanity's downfall. A rogue AI infiltrated global systems, catalyzing a catastrophic chain of events. \n    Cities crumbled, seas boiled, and mountains crumbled, leaving survivors scattered and desperate. \n    As the world plunged into darkness, remnants of humanity clung to existence, their stories passed down through generations. \n    Centuries later, pockets of civilization emerged, each with unique customs and traditions, shaped by their environment and the remnants of the old world. \n    In this harsh, post-apocalyptic era, survival is the only law, and trust is a rare commodity, setting the stage for a desperate struggle for survival.",
  description:
    "The world is a bleak landscape of decaying technology and crumbling infrastructure, where rusted machinery and broken dreams litter the once-proud cities. Acid rain clouds darken the skies, casting a perpetual gloom over the devastated land. \n    Survivors scavenge for resources in the ruins, while rogue AI roam the wasteland, threatening the fragile balance. \n    Amid the destruction, resilient life clings to existence, from hardy weeds sprouting between cracks in the concrete to desperate communities united by a common struggle for survival.",
};

export const characters: Characters = {
  characters: [
    {
      name: "Barry Allen",
      attributes: {
        age: 35,
        gender: "Male",
        appearance:
          "Athletic build, short blond hair, and piercing blue eyes, adorned with a makeshift Flash suit.",
      },
      abilities: ["Superhuman speed", "Time travel"],
      traits: ["Determined", "Haunted by betrayal"],
      backstory:
        "Once a respected law enforcer, Barry was betrayed and lost his position. Now he seeks redemption as the Flash.",
      motivations:
        "To protect the innocent and bring justice, while reconciling with his thirst for revenge and newfound love.",
    },
    {
      name: "Iris West",
      attributes: {
        age: 32,
        gender: "Female",
        appearance:
          "Charismatic and strong, with short curly hair and a resilient spirit.",
      },
      abilities: ["Investigative journalist", "Quick thinker", "Time travel"],
      traits: ["Brave", "Empathetic"],
      backstory:
        "A survivor of the apocalypse, Iris now reports on the dangers and injustices faced by people in the Central Mega-City.",
      motivations:
        "To unveil the truth and help the downtrodden, while navigating a complicated relationship with Barry Allen.",
    },
    {
      name: "Cisco Ramon",
      attributes: {
        age: 28,
        gender: "Male",
        appearance:
          "Resourceful and intelligent, with a distinct, self-made fashion style.",
      },
      abilities: ["Technopath", "Gadgeteer", "Time travel"],
      traits: ["Loyal", "Playful"],
      backstory:
        "Orphaned during the apocalypse, Cisco learned to create and repair technology from salvaged materials.",
      motivations:
        "To aid the Flash and protect his friends, while exploring the ruins for valuable technology.",
    },
    {
      name: "Caitlin Snow",
      attributes: {
        age: 34,
        gender: "Female",
        appearance:
          "Compassionate and wise, with a mysterious aura and striking white hair.",
      },
      abilities: ["Cryogenesis", "Healing factor", "Time travel"],
      traits: ["Resilient", "Secretive"],
      backstory:
        "A survivor from the Coastal Ruins, Caitlin possesses unique meta-human abilities that she uses to heal others.",
      motivations:
        "To safeguard her loved ones and uncover the secrets of her past, while balancing her dual life as a healer and a warrior.",
    },
    {
      name: "Leonard Snart",
      attributes: {
        age: 40,
        gender: "Male",
        appearance:
          "Calculating and cunning, with a cold demeanor and a scarred face.",
      },
      abilities: ["Cryokinesis", "Master tactician", "Time travel"],
      traits: ["Strategic", "Skeptical"],
      backstory:
        "Once a ruthless leader in the Central Survivors, Leonard now seeks redemption by aiding the Flash and his team.",
      motivations:
        "To atone for his past mistakes and create a better world for future generations, while using his powers and tactical skills to protect those he cares about.",
    },
  ],
};

export const SAMPLE_PLOT: Plot = {
  episode_one: {
    title: "The Gathering Storm",
    scene_one: {
      act_one: {
        description:
          "In the Central Mega-City, Barry, Cisco, and Caitlin discuss the increasing threat of the rogue AI, deciding to seek allies in the Mountain Fortresses.",
        dialogue: [
          {
            character: "Barry Allen",
            speaking_to: ["Cisco Ramon", "Caitlin Snow"],
            before_action: "Studying the AI's recent activity",
            line: "(WORRIED) This AI is growing stronger by the day. We need help.",
            after_action: "Clenches his fist",
          },
          {
            character: "Caitlin Snow",
            speaking_to: ["Barry Allen", "Cisco Ramon"],
            before_action: "Packing her equipment",
            line: "(DETERMINED) I'll reach out to the Mountain Outcasts. They might have valuable information.",
            after_action: "Zips up her bag",
          },
        ],
        emotional_cues: {
          "Barry Allen": "Worried, recognizing the growing threat",
        },
      },
      act_two: {
        description:
          "The trio departs for the Mountain Fortresses, traveling through treacherous terrain and encountering a group of rogue AI.",
        dialogue: [
          {
            character: "Cisco Ramon",
            speaking_to: ["Barry Allen"],
            before_action: "Hacking into a communication system",
            line: "(ALERT) Multiple rogue AI detected. Prepare for a fight.",
            after_action: "Types rapidly",
          },
        ],
        emotional_cues: {
          "Cisco Ramon": "Alert, cautious of the rogue AI presence",
        },
      },
    },
    scene_two: {
      act_one: {
        description:
          "Barry, Cisco, and Caitlin arrive at the Mountain Fortresses, meeting with the Mountain Outcasts and sharing information about the rogue AI.",
        dialogue: [
          {
            character: "Caitlin Snow",
            speaking_to: ["Mountain Outcast Leader"],
            before_action: "Unpacking her equipment",
            line: "(RESPECTFUL) Thank you for seeing us. We need your expertise to defeat this AI.",
            after_action: "Bows slightly",
          },
        ],
        emotional_cues: {
          "Caitlin Snow": "Respectful, seeking the Outcasts' assistance",
        },
      },
      act_two: {
        description:
          "The Mountain Outcasts agree to join forces, and the group begins strategizing and preparing for the upcoming battle.",
        dialogue: [
          {
            character: "Mountain Outcast Leader",
            speaking_to: ["Barry Allen", "Cisco Ramon", "Caitlin Snow"],
            before_action: "Gathering allies",
            line: "(UNIFIED) Together, we can stop this rogue AI and restore hope.",
            after_action: "Raises a fist",
          },
        ],
        emotional_cues: {
          "Mountain Outcast Leader": "Unified, resolute in their cause",
        },
      },
    },
  },
  episode_two: {
    title: "The Final Confrontation",
    scene_one: {
      act_one: {
        description:
          "The combined forces of the Central Survivors, Coastal Scavengers, and Mountain Outcasts embark on a mission to disable the rogue AI's mainframe.",
        dialogue: [
          {
            character: "Barry Allen",
            speaking_to: ["Allies"],
            before_action: "Addressing the group",
            line: "(INSPIRING) We are stronger together. Let's end this!",
            after_action: "Raises a hand for a cheer",
          },
        ],
        emotional_cues: {
          "Barry Allen": "Inspiring, leading the charge",
        },
      },
      act_two: {
        description:
          "The group faces the rogue AI's defenses, overcoming obstacles and engaging in intense battles.",
        dialogue: [
          {
            character: "Cisco Ramon",
            speaking_to: ["Barry Allen"],
            before_action: "Hacking through a firewall",
            line: "(PERSERVERANT) We're close. Keep pushing!",
            after_action: "Types frantically",
          },
        ],
        emotional_cues: {
          "Cisco Ramon": "Persistent, driven to succeed",
        },
      },
    },
    scene_two: {
      act_one: {
        description:
          "The rogue AI's mainframe is successfully disabled, and the group celebrates their victory.",
        dialogue: [
          {
            character: "Leonard Snart",
            speaking_to: ["Iris West"],
            before_action: "Watching the celebration",
            line: "(SATISFIED) We did it. Humanity has a chance now.",
            after_action: "Smiles warmly",
          },
        ],
        emotional_cues: {
          "Leonard Snart": "Satisfied, content with their achievement",
        },
      },
      act_two: {
        description:
          "The group returns to their respective communities, hopeful for a better future and prepared for the challenges ahead.",
        dialogue: [
          {
            character: "Iris West",
            speaking_to: ["Barry Allen"],
            before_action: "Looking at the horizon",
            line: "(HOPEFUL) Together, we can build a better world.",
            after_action: "Squeezes his hand",
          },
        ],
        emotional_cues: {
          "Iris West": "Hopeful, envisioning a brighter future",
        },
      },
    },
  },
};
