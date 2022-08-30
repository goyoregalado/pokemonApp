import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import { PokemonDetail } from "../../components/pokemon";

interface Props {
    pokemon: Pokemon;
}

const PokemomPage: NextPage<Props> = ({ pokemon }) => {
    return (<PokemonDetail pokemon={pokemon}/>)
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemonIdList = [...Array(151)].map((value, idx) => (`${ idx + 1 }`));

    return {
        paths: pokemonIdList.map((id) => ({
            params: { id }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    // Esto se utiliza para no tener que tipar todos los params
    const { id } = ctx.params as { id: string };

    return {
        props: {
            pokemon: await getPokemonInfo(id)
        }
    }
    
}


export default PokemomPage