interface HeaderProps {
    titre: string;   // obligatoire, doit être une chaîne
    phrase: string;  // obligatoire, doit être une chaîne
}


function Header({ titre, phrase }: HeaderProps) {
    return (
        <header>
            <h1>{titre}</h1>
            <p>{phrase}</p>
        </header>
    );
}

export default Header;