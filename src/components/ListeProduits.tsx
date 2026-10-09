import { useEffect, useState } from 'react';
//import Video from './components/Video';


// ⚠️ À aligner avec src/models/produit.ts de ton API

interface Produit

{
    id: number;
    nom: string;
    prix: number;
    stock: number;
    categorie: string;
}

const API_URL = 'http://localhost:3000/api/produits';

function ListeProduits() {
    const [produits, setProduits] = useState<Produit[]>([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState('');

    useEffect(() => {
        let annule = false;

        async function charger() {
            try {
                const reponse = await fetch(API_URL);
                if (!reponse.ok) {
                    throw new Error('Réponse du serveur incorrecte : ' + reponse.status);
                }
                const donnees: Produit[] = await reponse.json();
                if (!annule) {
                    setProduits(donnees);
                    setChargement(false);
                }
            } catch (e) {
                if (!annule) {
                    setErreur(e instanceof Error ? e.message : 'Erreur inconnue');
                    setChargement(false);
                }
            }
        }

        charger();
        return () => {
            annule = true;
        };
    }, []);

    if (chargement) return <p>Chargement des produits…</p>;
    if (erreur) return <p role="alert" style={{ color: '#c62828' }}>Erreur : {erreur}</p>;
    if (produits.length === 0) return <p>Aucun produit.</p>;

    return (
        <ul>
            {produits.map((p) => (
                <li key={p.id}>
                    <strong>{p.nom}</strong> — {p.prix.toFixed(2)} $
                </li>
            ))}
        </ul>
    );
}

export default ListeProduits;