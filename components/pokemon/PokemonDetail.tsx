import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react"
import confetti from "canvas-confetti"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import { Pokemon } from "../../interfaces"
import { localFavorites } from "../../utils"
import { Layout } from "../layout"

interface Props {
    pokemon: Pokemon
}
export const PokemonDetail: FC<Props> = ({pokemon}) => {

    const [isInFavorites, setisInFavorites] = useState( localFavorites.existsInFavorites( pokemon.id ))

    const router = useRouter();

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setisInFavorites(!isInFavorites);

        if (!isInFavorites) {
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 100,
                angle: -100,
                origin: {
                    x: 1,
                    y: 0
                }
            });
        }

    }

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={ 12 } sm={ 4 }>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image 
                                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                                alt={ pokemon.name }
                                width="100%"
                                height={ 200 }
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8} >
                    <Card>
                        <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button color='gradient' ghost={ !isInFavorites } onPress={onToggleFavorite}>{ isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}</Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites: </Text>

                            <Container display='flex' direction='row' gap={0}>
                                <Image 
                                    src={ pokemon.sprites.front_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.back_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.front_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.back_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                            </Container>
                        </Card.Body>
                    </Card>  
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
