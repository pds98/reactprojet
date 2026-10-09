import { useState } from 'react';
import Header from './components/Header';
import Recherche from './components/Recherche';
import CarteTechnologie from './components/CarteTechnologie';
import AjouterTechnologie from './components/AjouterTechnologie';
import Video from './components/Video';
import ListeTaches from './components/ListeTaches';
import ListePosts from './components/ListePosts';
import { technologies } from './data/technologies';

const videos = [
    { id: 1, titre: 'Introduction à React', dureeEnSecondes: 210 },
    { id: 2, titre: 'Les props en TypeScript', dureeEnSecondes: 65 },
];

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

            <section className="galerie">
                {technologiesTriees.map((tech) => (
                    <CarteTechnologie key={tech.id} tech={tech} />
                ))}
            </section>

            <section>
                <h2>Ajouter une technologie</h2>
                <AjouterTechnologie />
            </section>

            <section>
                <h2>Vidéos</h2>
                {videos.map((v) => (
                    <Video key={v.id} video={v} />
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
        </main>
    );
}

export default App;