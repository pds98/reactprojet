import { useState } from 'react';
import Header from './components/Header';
import CarteTechnologie from './components/CarteTechnologie';
import Recherche from './components/Recherche';
import { technologies } from './data/technologies';
import ListePosts from './components/ListePosts';
import ListeTaches from './components/ListeTaches';
import AjouterTechnologie from './components/AjouterTechnologie';

function App() {
  const [recherche, setRecherche] = useState('');
  const [triCroissant, setTriCroissant] = useState(true);

  const technologiesFiltrees = technologies.filter((tech) =>
      tech.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  const technologiesTriees = [...technologiesFiltrees].sort((a, b) =>
      triCroissant ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom)
  );

  const nbCartes = technologiesTriees.length;

  return (
      <main>
        <Header
            titre="TechTrends — Galerie des tendances"
            phrase="Recherchez une technologie"
        />

        <Recherche valeur={recherche} onChange={setRecherche} />

        <button onClick={() => setTriCroissant(!triCroissant)}>
          Trier ({triCroissant ? 'A → Z' : 'Z → A'})
        </button>

        <p>{nbCartes} technologie(s) affichée(s)</p>

        <section>
          {technologiesTriees.map((tech) => (
              <CarteTechnologie key={tech.id} tech={tech} />
          ))}
        </section>

        <section>
          <h2>Mes tâches</h2>
          <ListeTaches />
        </section>

        <section>
          <h2>Derniers articles</h2>
          <ListePosts />
        </section>

          <section>
              <h2>Ajouter une technologie</h2>
              <AjouterTechnologie />
          </section>



      </main>
  );
}

export default App;