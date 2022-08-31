import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { pokeApi } from '../../api';
import { PokemonDetail } from '../../components/pokemon';
import { Pokemon, PokemonListResponse, SmallPokemon } from '../../interfaces';
import { getPokemonInfo } from '../../utils';

interface Props {
    pokemon: Pokemon;
}
const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {
  return (
    <PokemonDetail pokemon={pokemon}/>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemonNames: string[] = data.results.map((pokemon: SmallPokemon, idx: number) => (pokemon.name));

    return {
        paths: pokemonNames.map((name) => ({
            params: { name }
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    // Esto se utiliza para no tener que tipar todos los params
    const { name } = ctx.params as {name: string};

    const pokemon = await getPokemonInfo(name);

    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon
        },
        revalidate: 86400 // 60 * 60 * 24 seconds
    }
}

export default PokemonByNamePage;