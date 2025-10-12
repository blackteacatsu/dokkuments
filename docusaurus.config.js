// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity: "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  //enable mermaid integration in Docusaurus
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  title: 'Dokkumentation Page for Hydrometeorology Tools',
  tagline: 'Created in Baltimore, Maryland',
  favicon: 'img/university_shield_blue.ico',

  // Set the production url of your site here
  url: 'https://github.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/dokkuments/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'blackteacatsu', // Usually your GitHub org/user name.
  projectName: 'dokkuments', // Usually your repo name.
  deploymentBranch:'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          remarkPlugins: [remarkMath],
          rehypePlugins:[rehypeKatex],
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
            //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
            //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Amazon HydroViewer',
        logo: {
          alt: 'My Site Logo',
          src: 'img/university.shield.blue.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://eps.jhu.edu/',
            label: 'eps@JHU',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Links to Pages',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/category/tutorial---getting-started',
              },
              {
                label: 'Documentations',
                to: '/docs/category/documentations'
              }
            ],
          },
          {
            title: 'External Sites',
            items: [
              {
                label: 'SERVIR Amaonia',
                href: 'https://servir.alliancebioversityciat.org/',
              },
              {
                label: 'USAID',
                href: 'https://www.usaid.gov/',
              },
              {
                label: 'CIAT',
                href: 'https://alliancebioversityciat.org/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Built using Docusauras',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Built with Docusaurus. Copyright © ${new Date().getFullYear()} The Amazon Hydrometeorology Tool. Made with &#128151 on &#127758 ! `, // 
      },
      mermaid:{
        theme: {light: "neutral", dark: "dark"}
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        // the application id provided by algolia
        appId: "YFTWNPIRND",
        // public api key
        apiKey: "41bdcc3f79c84f2217e38c6e1ced98b6",
        indexName: "blackteacatsuio",
        // contextual search enabled
        contextualSearch: true,
        // optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",
        // replaceSearchResultPathname: {from: "/", to:"/docs/"},
        // whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,
      },
    }),
};

export default config;
