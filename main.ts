import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import * as gh from 'gh'
import * as octicons from '@primer/octicons';
import { IconSelector } from 'icons';

interface Settings {
	pat: string;
}

const DEFAULT_SETTINGS: Settings = {
	pat: ''
}

export default class GhPlugin extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownPostProcessor(async (element, context) => {
			const links = element.findAll("a");
			for (const link of links) {
				const text = link.innerText.trim();
				if (text.startsWith("https://github.com/")) {
					const urlData = gh.matchIssueOrPRUrl(text)
					if (urlData){
						const type = urlData.type == "pull" ? "pulls" : "issues"
						const data = await gh.fetchIssueOrPR(urlData.nwo, type, urlData.number, this.settings.pat)
						if (data && data.title){
							const iconName = (new IconSelector).getIcon(data, type)
							const svg = octicons[iconName].toSVG({ class: `icon ${iconName}` })

							const html = `<div>${svg} <a style="text-decoration: none" href="${text}">${data.title}<span style="font-weight: 300; color: grey;">&nbsp;${urlData.nwo}#${data.number}</span></a></div>`
							const doc = new DOMParser().parseFromString(html, 'text/html');
	
							link.replaceWith(doc.body.firstChild || text);
						}
					}
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SettingTab extends PluginSettingTab {
	plugin: GhPlugin;

	constructor(app: App, plugin: GhPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('PAT')
			.setDesc('Token with access to the repos you need link expansion for')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.pat)
				.onChange(async (value) => {
					this.plugin.settings.pat = value;
					await this.plugin.saveSettings();
				}));
	}
}
