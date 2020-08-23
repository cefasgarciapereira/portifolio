require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Cefas`,
    description: `Cefas é graduado em Ciência da Computação e atualmente está cursando Mestrado em Engenharia de Software. O foco da sua pesquisa gira em torno da análise de tópicos e comportamento de usuários em redes sociais. Também atuou em trabalhos de design emocional aplicado à computação. Além da vida acadêmica, dedica seu tempo atuando como desenvolvedor, sobretudo em Javascript (React, ReactNative e Node.Js). Atuou como desenvolvedor em empresas, freelancer e também lecionou cursos na área da computação. Habilidades: Desgin, Front-End, Desenvolvimeto, Pesquisa, Aula. `,
    author: `Cefas Garcia Pereira`,
  },
  plugins: [
    `gatsby-plugin-flow`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    {
      resolve: 'gatsby-plugin-module-resolver',
      options: {
        root: './src',
        aliases: {
          'components': './components',
          'containers': './containers',
          'images': './images',
          'state': './state',
          'styles': './styles',
          'utils': './utils',
          static: {
            root: './public',
            alias: './static'
          }
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter`,
        short_name: `Gatsby Starter`,
        start_url: `/`,
        background_color: `black`,
        theme_color: `black`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: "./src/state/store",
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken:process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENV,
      }
    },
  ],
}
