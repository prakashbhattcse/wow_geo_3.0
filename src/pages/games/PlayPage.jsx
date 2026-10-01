import { useParams } from "react-router-dom";
import { useSeo } from "../../hooks/useSeo";
import { Breadcrumbs, Heading } from "../../components/common";
import { GameList } from "../../components/games";
import { ENGINES } from "../../games/engines";
import { categoryBySlug, gameBySlug, gamesIn } from "../../data/games";
import NotFoundPage from "../NotFoundPage";

import GameEducationalContent from "../../components/games/GameEducationalContent";

export default function PlayPage() {
  const { cat, game: slug } = useParams();
  const game = gameBySlug[slug];
  const c = categoryBySlug[cat];
  useSeo({
    title: game
      ? `${game.name} – free ${c?.name.toLowerCase()} game`
      : "Not found",
    description: game ? `${game.desc} ${game.how}` : "",
  });
  if (!game || game.cat !== cat) return <NotFoundPage />;
  const Engine = ENGINES[game.engine];
  return (
    <>
      <div className="play-head">
        <div className="wrap">
          <Breadcrumbs
            items={[
              ["/games", "Games"],
              [`/games/${cat}`, c.name],
              [null, game.name],
            ]}
          />
          <h1>{game.name}</h1>
          <p className="lead">{game.desc}</p>
        </div>
      </div>
      <div className="wrap play-area">
        <Engine key={slug} game={game} />
        <GameEducationalContent game={game} cat={c} />
      </div>
      <div className="wrap more-games">
        <Heading title={`More ${c.name.toLowerCase()} games`} />
        <GameList games={gamesIn(cat).filter((x) => x.slug !== slug)} />
      </div>
    </>
  );
}
