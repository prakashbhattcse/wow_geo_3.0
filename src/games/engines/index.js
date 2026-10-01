// Every game in data/games.js names one of these engines.
import QuizEngine from './QuizEngine';
import MapClickEngine from './MapClickEngine';
import TypeAllEngine from './TypeAllEngine';
import MemoryEngine from './MemoryEngine';
import MatchEngine from './MatchEngine';
import WordGridEngine from './WordGridEngine';
import ContinentAZEngine from './ContinentAZEngine';
import BorderChainEngine from './BorderChainEngine';
import GeoCompassEngine from './GeoCompassEngine';
import FlagFusionEngine from './FlagFusionEngine';
import BorderBridgeEngine from './BorderBridgeEngine';

export const ENGINES = {
  quiz: QuizEngine,
  mapclick: MapClickEngine,
  typeall: TypeAllEngine,
  memory: MemoryEngine,
  match: MatchEngine,
  wordgrid: WordGridEngine,
  continentAZ: ContinentAZEngine,
  borderChain: BorderChainEngine,
  geoCompass: GeoCompassEngine,
  flagFusion: FlagFusionEngine,
  borderBridge: BorderBridgeEngine
};

