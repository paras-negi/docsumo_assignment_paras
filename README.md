# Review Screen

- The project is made using Vite and React

- No third party libraries are being used.

- The website main page is kept under `pages` folder which has only one file `home.js`

- The components used for building the webpage are placed in the `components` folder.

- The API dumps are placed in the `db` folder and are imported statically in the `AppContext.js` page.

- The styling is done on `Sass` or `SCSS`.

- The `SCSS` code is written under style folder having `main.scss` as the main file importer and all the other styls has been written in `base.scss`, `document.scss`, `header.scss` and `sidebar.scss`. Each file is dedicated to the corresponding component.

- The App state is managed by Context `AppContext.jsx`. So that there is a common controller for payloads and methods.

- The project is hosted on Netlify and can be found at: [docsumo_assignment_paras](https://ds-assignment-paras.netlify.app/);

- The Performance of the Webpage page on Lighthouse is 98-100.

- Run the App by:
    -- npm i
    -- npm run dev



Note: There are 3 API dumps provided for the task, however I haven't used bbox api as mentioned in the assignment doc, as the other api dumps served the purpose of the assignment aptly.