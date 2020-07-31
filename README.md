<h1 align="center">
    <img alt="gaia" src="https://res.cloudinary.com/dy7l1wk3y/image/upload/v1596217412/gaia_capa_Prancheta_1_bg0zbd.png" />
    <br>
    <br>
    Gaia
    <br>
</h1>

<h4 align="center">
  This project developed to solve part of the problems caused by natural disasters, initially dealing with floods.
</h4>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Team-5-GaIA/server-GaIA.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Team-5-GaIA/server-GaIA.svg">

  <a href="https://www.codacy.com/app/Team-5-GaIA/server-GaIA?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Team-5-GaIA/server-GaIA&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy grade" src="https://api.codacy.com/project/badge/Grade/691b85e51bf240b997ae6ff82ea41590">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Team-5-GaIA/server-GaIA.svg">
  <a href="https://github.com/Team-5-GaIA/server-GaIA/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Team-5-GaIA/server-GaIA.svg">
  </a>

  <a href="https://github.com/Team-5-GaIA/server-GaIA/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/Team-5-GaIA/server-GaIA.svg">
  </a>

  <a href="https://github.com/Team-5-GaIA/server-GaIA/blob/master/LICENSE">
    <img alt="GitHub License" src="https://img.shields.io/github/license/Team-5-GaIA/server-GaIA.svg">
  </a>
</p>

<p align="center">
  <a href="#octocat-the-project">The project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## About

**Project to improve assistance and assistance to the population.**
> **Gaia**, a system that serves the society of a certain region that is about to be affected by floods, requests quick help to civil defense informing their current situation, avoiding possible overloads in distress call centers as well. Also developed to assist the civil defense, the system also positions victims' data in real-time on a map and a Dashboard, classifying them by criticality to improve the performance of care and help the population. Here, it uses:
> - Typescript and Javascript
> - Node
> - React
> - Geolocation
> - IBM Cloud
> - IBM Watson Assistant
> - IBM Natural Language Undestanding
>
> From there, more functionality will come.

---

## :octocat: The Project

You can verify in other repository with the front-end project. [Here](https://github.com/Team-5-GaIA/web-GaIA)

## :rocket: Technologies

This project was developed at the [Team 5 - gaia](https://github.com/Team-5-GaIA) with the following technologies:

> - [NodeJS](https://nodejs.org)
> - [ExpressJS](https://expressjs.com/)
> - [IBM Watson Assistant](https://cloud.ibm.com/docs/assistant/getting-started.html#gettingstarted)
> - [VS Code](https://code.visualstudio.com/)
> - And another bunch of packages...

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v12.18][nodejs] or higher + [Yarn v1.22][yarn] or higher installed on your computer and the [gaia](https://github.com/Team-5-GaIA/server-GaIA).

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Team-5-GaIA/server-GaIA.git

# Go into the repository
$ cd server-GaIA

# Install dependencies for the backend
$ yarn

# Run the backend server
$ yarn start
```

In assistant file put your credentials:

```javascript
...
const service = new AssistantV2({
  version: '[assistant version]',
  authenticator: new IamAuthenticator({
    apikey: '[assistant apikey]',
  }),
  url: '[assistant url]',
});

const assistantId = '[assistant id]';
...
```

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/Team-5-GaIA/server-GaIA/blob/master/LICENSE) for more information.

---

Made with by **Team 5 - gaia** :wave:

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
