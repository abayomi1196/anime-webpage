This project was created with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and the [`Anime List Graphql API`](https://studio.apollographql.com/graph/My-Graph-mrsvd/explorer?variant=current).

## Getting Started

First, install node_modules and then run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


#### Project Architecture

```
  ┣ components
  ┣ context
  ┣ graphql
  ┣ pages
  ┣ public
  ┣ styles
  ┗ utils
```

The description of each folder in the project architecture is given below:

- `components`: contains stateful reusable components. Each component has a root folder (pascal cased) which houses the component file and the other associated files. For example, the structure for a `Card` component would be:

  ```
    card
    ┣ Card.js
    ┗ Card.module.css
  ```

- `context`: contains some application state, which was setup with the React `createContext` hook, allows sharing of data between components without unneccesary prop drilling and eliminates the need for external state management libraries.

- `graphql`: contain graphql queries, may also house mutations in future iterations.

- `pages`: Contain functional top level components that are responsible for generating the view for any given route, a sample structure would look like: 

    ```
      pages
      ┣ anime
      ┃ ┗ [id].js - dynamic page where details are statically generated
      ┣ _app.js 
      ┗ index.js
    ```

- `public`: Contains static assets i.e images.

- `styles`: Contain global and page level styles defined using `CSS Modules`

- `utils`: Contains reusable functions.

