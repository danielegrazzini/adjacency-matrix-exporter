import {
  App, 
  PluginSettingTab,
  Setting
} from "obsidian";

import AdjacencyMatrixExporterPlugin from "./main";

export const DEFAULT_SETTINGS: AdjacencyMatrixExporterSettings = {
  csvSeparator: '§',
  folderPath: "/",
};

// !SECTION Matrix Modal
// SECTION SettingsTab
export class AdjacencyMatrixExporterSettingTab extends PluginSettingTab {
  plugin: AdjacencyMatrixExporterPlugin;

  constructor(app: App, plugin: AdjacencyMatrixExporterPlugin) {
    super(app, plugin);
    // this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("CSV Separator")
      .setDesc(
        `The value used to separate values between each other. Default separator value is ${DEFAULT_SETTINGS.csvSeparator}.`
      )
      .addText((text) => text
        .setPlaceholder("Separator")
        .setValue(this.plugin.settings.csvSeparator)
        .onChange(async (value) => {
          this.plugin.settings.csvSeparator = value.trim() || DEFAULT_SETTINGS.csvSeparator;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName("Folder path")
      .setDesc(
        `The folder path to save generated .csv files. Default is the current vault relative path ${DEFAULT_SETTINGS.folderPath}.`
      )
      .addText((text) => text
        .setPlaceholder("Folder path")
        .setValue(this.plugin.settings.folderPath)
        .onChange(async (value) => {
          this.plugin.settings.folderPath = value.trim() || DEFAULT_SETTINGS.folderPath;
          await this.plugin.saveSettings();
        })
      );
    // !SECTION Obsidian Settings
  }
}
