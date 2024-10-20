// Theme Type Definition
export type Theme = {
  core_theme: string[];
  genres: string[];
  premise: string;
  conflict: {
    external: string;
    internal: string;
  };
  emotional_arc: string;
  narrative_hooks: string[];
  intended_audience: string;
  episode_themes: {
    episode: number;
    theme: string;
    description: string;
  }[];
};

// World Type Definition
export type World = {
  genre: string[];
  geography: {
    landforms: string[];
    climate: string;
    seasonal_variation: {
      [season: string]: string;
    };
    seasons: string[];
    natural_resources: string[];
    natural_disasters: string[];
  };
  cultural_diversity: {
    cultures: {
      name: string;
      customs: string;
      traditions: string;
    }[];
    languages: {
      [culture: string]: string[];
    };
    social_structures: {
      [culture: string]: string;
    };
    belief_systems: string[];
  };
  attributes: {
    technology_level: string;
    magic_systems: string;
    societal_norms: string;
    economic_systems: string;
    political_structures: string;
    world_states: string;
  };
  year: number;
  key_locations: {
    name: string;
    description: string;
    location: string;
    significance: string;
  }[];
  history: string;
  description: string;
};

// Characters Type Definition
export type Character = {
  name: string;
  attributes: {
    age: number;
    gender: string;
    appearance: string;
  };
  abilities: string[];
  traits: string[];
  backstory: string;
  motivations: string;
};

export type Characters = {
  characters: Character[];
};


// Plot Type Definition
type Dialogue = {
    character: string;
    speaking_to: string[];
    before_action: string;
    line: string;
    after_action: string;
  };
  
  type Act = {
    description: string;
    dialogue: Dialogue[];
    emotional_cues: {
      [character: string]: string;
    };
  };
  
  type Scene = {
    [act: string]: Act;
  };
  
  type Episode = {
    title: string;
    [scene: string]: Scene | string;
  };
  
  export type Plot = {
    [episode: string]: Episode;
  };