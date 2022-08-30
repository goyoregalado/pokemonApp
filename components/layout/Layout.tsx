
import { FC, PropsWithChildren } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'

import { Navbar } from '../ui';

interface TitleProp {
    title?: string;
}

const origin = (typeof window === 'undefined' ? '' : window.location.origin);

export const Layout:FC<PropsWithChildren & TitleProp> = ({ children, title = 'Pokémon App' }) => {

  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="author" content="Goyo Rega lado"/>
            <meta name="description" content={`Información sobre el pokémon ${title}`}/>
            <meta name="keywords" content={`${title}, pokemon, pokedex`}/>

            <meta property="og:title" content={`Información sobre ${title}`} />
            <meta property="og:description" content={`Esta es la página sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.jpg`} />

        </Head>

        <Navbar />

        <main style={{
          padding: '0px 20px'
        }}>
            { children }
        </main>
    </>
  )
}
