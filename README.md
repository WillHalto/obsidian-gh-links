# Obsidian GitHub Links
A simple expander for GitHub links in Obsidian. A pasted GitHub issue or PR url will be expanded into a simple `<title><repo>#<number>` format when rendered. 


With this plugin:
<img width="1123" alt="image" src="https://github.com/user-attachments/assets/09f77fbf-e907-4e26-8109-e9716898ac6a">

Without this plugin:
<img width="1042" alt="image" src="https://github.com/user-attachments/assets/4cb62ced-b02c-4346-b6e8-4b09908c829f">


NOTE this is implemented as a markdown post-processor which means the link expansion only takes place in [reading mode](https://help.obsidian.md/Editing+and+formatting/Edit+and+preview+Markdown#Editor+views). This works well with the Kanban plugin: https://github.com/mgmeyers/obsidian-kanban as the cards are rendered in reading mode.

## Setup
1. Install the plugin. You can do that via Obsidian, or you can just copy over `main.js`, `styles.css`, `manifest.json` to your vault at VaultFolder/.obsidian/plugins/obsidian-gh-links/.
2. Enable the plugin via Communty plugins settings
<img width="1022" alt="image" src="https://github.com/user-attachments/assets/8fbe05a5-8c95-4570-bc2d-ebef3bee492a">
3. Open the plugin settings and enter a GitHub Personal Access Token(https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). Make sure the token has access to the repos you'll be pasting links from!
4. Enjoy your link expansion 😄

