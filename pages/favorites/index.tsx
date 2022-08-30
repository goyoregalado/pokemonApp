import { useEffect, useState } from 'react';

import { Card, Container, Grid, Image, Text } from '@nextui-org/react'
import { Layout } from '../../components/layout'
import { NoFavorites } from '../../components/ui'
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';

const FavoritesPage = () => {
    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons());
    }, []);

    return (
        <Layout title='Pokémon favoritos'>
            { 
                favoritePokemons.length === 0 ? (<NoFavorites />) 
                : (
                    <FavoritePokemons pokemons={favoritePokemons} />
                ) 
            }
            
        </Layout>
    )
}

export default FavoritesPage