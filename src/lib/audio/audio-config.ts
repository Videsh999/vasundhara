export interface AmbientTrack {
  id: string;
  name: string;
  category: "Heritage" | "Bespoke" | "General";
  src: string;
  duration?: string;
  defaultVolume: number;
  isDefault: boolean;
  sectionAssociation?: "homepage" | "heritage" | "bespoke" | "collections";
}

export const MOCK_AMBIENT_TRACKS: AmbientTrack[] = [
  {
    id: "track-1",
    name: "Vasundhara Deccani Heritage Sanctuary",
    category: "Heritage",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-relaxation-114986.mp3",
    duration: "3:45",
    defaultVolume: 0.25,
    isDefault: true,
    sectionAssociation: "homepage",
  },
  {
    id: "track-2",
    name: "Private Atelier Solitude",
    category: "Bespoke",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-relaxation-114986.mp3",
    duration: "4:12",
    defaultVolume: 0.20,
    isDefault: false,
    sectionAssociation: "bespoke",
  },
];

export function getDefaultTrack(): AmbientTrack {
  return MOCK_AMBIENT_TRACKS.find((t) => t.isDefault) || MOCK_AMBIENT_TRACKS[0];
}

export function getTrackBySection(section?: string): AmbientTrack {
  if (!section) return getDefaultTrack();
  return (
    MOCK_AMBIENT_TRACKS.find((t) => t.sectionAssociation === section) ||
    getDefaultTrack()
  );
}
