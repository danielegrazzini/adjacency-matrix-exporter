import {
  addIcon,
  App,
  Modal,
  Notice,
  Plugin,
  TFile,
} from "obsidian";
import { AdjacencyMatrixExporterSettingTab, DEFAULT_SETTINGS } from "./AdjacencyMatrixExporterSettingTab";

export default class AdjacencyMatrixExporter extends Plugin {
  settings: AdjacencyMatrixExporterSettings;

  async onload() {
    console.log("Loading AdjacencyMatrixExporter Maker plugin");

    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

    addIcon(
      "matrix",
      `<defs><style>.cls-1{fill:none;}</style></defs><title>CSV</title><path fill="#FFFFFF" points="28 9 26 22 24 9 22 9 24.516 23 27.484 23 30 9 28 9" d="M87.5 28.125L81.25 68.75L75 28.125L68.75 28.125L76.612 71.875L85.888 71.875L93.75 28.125L87.5 28.125Z"/><path fill="#FFFFFF" d="M56.25 71.875h-18.75v-6.25h18.75v-12.5h-12.5a6.256 6.256 0 0 1 -6.25 -6.25v-12.5a6.256 6.256 0 0 1 6.25 -6.25h18.75v6.25h-18.75v12.5h12.5a6.256 6.256 0 0 1 6.25 6.25v12.5a6.256 6.256 0 0 1 -6.25 6.25Z"/><path fill="#FFFFFF" d="M31.25 71.875H12.5a6.256 6.256 0 0 1 -6.25 -6.25V34.375a6.256 6.256 0 0 1 6.25 -6.25h18.75v6.25H12.5v31.25h18.75Z"/><path id="_Transparent_Rectangle_" data-name="&amp;lt;Transparent Rectangle&amp;gt;" class="cls-1" width="32" height="32" d="M0 0H100V100H0V0z"/>`
    );

    this.addRibbonIcon("matrix", "AdjacencyMatrixExporter", this.openMainModal);

    this.addCommand({
      id: "adjacency-matrix-exporter",
      name: "Open AdjacencyMatrixExporter",
      callback: this.openMainModal,
    });

    this.addSettingTab(new AdjacencyMatrixExporterSettingTab(this.app, this));
  }

  openMainModal = async () => {
    const files: TFile[] = this.app.vault.getMarkdownFiles();

    new MainModal(
      this.app,
      files,
      this.settings
    ).open();
  };

  onunload() {
    console.log("unloading AdjacencyMatrixExporter Maker plugin");
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

// SECTION Matrix Modal
class MainModal extends Modal {
  private settings: AdjacencyMatrixExporterSettings;
  private files: TFile[] = [];
  private changeSeparatorModalRef: ChangeSeparatorModal;

  constructor(
    app: App,
    files: TFile[],
    settings: AdjacencyMatrixExporterSettings
  ) {
    super(app);
    this.files = files;
    this.settings = settings;
  }

  onOpen() {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    const {contentEl} = this;
    const div1 = document.createElement('div');
    div1.textContent = "a. ABSOLUTE: generates a numerical adjacency matrix, in CSV format, where the weights of the edges are given by the number of connections from one note to another";
    contentEl.appendChild(div1);

    const hr1 = document.createElement('hr');
    contentEl.appendChild(hr1);

    const div2 = document.createElement('div');
    div2.textContent = "b. NORMALIZED: generates a numerical adjacency matrix, in CSV format, where the weight of the edge from note A to note B is divided by the number of total words in note A";
    contentEl.appendChild(div2);

    const hr2 = document.createElement('hr');
    contentEl.appendChild(hr2);
    */
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    this.buildHTML();
  }

  updateSeparatorHTML() {
    document.querySelector('.app-csv-separator-value').textContent = this.settings.csvSeparator;
  }

  buildHTML() {
    // Set Title
    const vaultName: string = this.app.vault.getName();
    this.titleEl.textContent = `Adjacency Matrix Exporter for ${vaultName}`;

    // Create Separator HTML Row
    const separatorRowEl = this.contentEl.createDiv({ cls: "app-csv-separator-row" });
    separatorRowEl.createEl('strong', {
      text: 'Actually the CSV Separator is:   '
    });
    separatorRowEl.createEl('span', {
      cls: 'app-csv-separator-value',
      text: this.settings.csvSeparator
    });
    const changeSeparatorAction = separatorRowEl.createEl('a', {
      text: 'Click here to change it!',
    });
    changeSeparatorAction.addEventListener("click", () => this.openChangeSeparatorModal());

    // Create Actions HTML Row
    const buttonRow = this.contentEl.createDiv({ cls: "app-actions-row" });

    // Export Absolute Button
    const exportCsvButtonAbsolute = buttonRow.createEl("button", {
      text: "Export CSV Absolute Matrix",
    });
    exportCsvButtonAbsolute.addEventListener("click", () => this.exportCsvAbsolute());

    // Export Normalized Button
    const exportCsvButtonNormalized = buttonRow.createEl("button", {
      text: "Export CSV Normalized Matrix",
    });
    exportCsvButtonNormalized.addEventListener("click", () => this.exportCsvNormalized());
  }

  // User can choose the CSV separator 
  openChangeSeparatorModal() {

    // create new instance of separator modal
    this.changeSeparatorModalRef = new ChangeSeparatorModal(this.app, this.settings.csvSeparator, DEFAULT_SETTINGS.csvSeparator);
    
    // on close: save new separator settings and update html
    this.changeSeparatorModalRef.onClose = () => {
      this.settings.csvSeparator = this.changeSeparatorModalRef.getStoredValue() || DEFAULT_SETTINGS.csvSeparator;
      this.updateSeparatorHTML();
    }
    // open separator dialog
    this.changeSeparatorModalRef.open();
  }

  // export Absolute matrix scores as CSV
  exportCsvAbsolute() {
    const app = this.app;
    const settings = this.settings;
    const files = this.files;

    console.log("Save CSV!");

    const symbol = this.settings.csvSeparator;

    const folderPath = settings.folderPath === "" ? "/" : settings.folderPath;
    const now = window.moment().format("YYYY-MM-DD HHmmss");
    const filePath = `${folderPath}/Absolute matrix ${now}.csv`;

    const size = files.length;

    let data = "";

    // print CSV header
    for (let j = size - 1; j >= 0; j--) {
      data += symbol + files[j].basename;
    }
    data += "\n";

    for (let i = size - 1; i >= 0; i--) {
      data += files[i].basename + symbol;
      for (let j = size - 1; j >= 0; j--) {
        const n_links = app.metadataCache.resolvedLinks[files[i].path][files[j].path]
        data += isNaN(n_links) ? 0 : n_links;
        if (j > 0)
          data += symbol;
      }
      data += "\n";
    }
    console.log("Separator used is, " + symbol);
    console.log(data);
    app.vault.create(filePath, data);

    new Notice(`CSV Absolute matrix saved:\n${filePath}`);

  }

  // export Normalized matrix scores as CSV
  // This Matrix is Normalized by the counter word of an origine note 
  // Add a function to calculate the total words in a note!

  exportCsvNormalized() {
    const app = this.app;
    const settings = this.settings;
    const files = this.files;

    console.log("Save CSV!");

    const symbol = this.settings.csvSeparator;

    const folderPath = settings.folderPath === "" ? "/" : settings.folderPath;
    const now = window.moment().format("YYYY-MM-DD HHmmss");
    const filePath = `${folderPath}/Normalized matrix ${now}.csv`;

    const size = files.length;

    new Notice(`CSV Normalized matrix saved:\n${filePath}`);

    console.log("Separator used is, " + symbol);

    // New function that counts the words of the notes
    // done via an async function

    const vault = app.vault;

    async function countWordsInAllNotes(): Promise<number[][]> {

      // I get the list of all notes in the Vault
      const allNotes = vault.getMarkdownFiles();
      const totalNotes = allNotes.length;

      // I sort the notes by file name
      allNotes.sort((a, b) => b.basename.localeCompare(a.basename));

      // I create an array to store the word counts
      const wordCounts: number[][] = [];

      // Loop through each note
      for (const i in allNotes) {
        const note = allNotes[i];
        const content = await vault.cachedRead(note);
        const wordMatches = content.match(/\b\w+\b/g);
        const wordCount = wordMatches ? wordMatches.length : 0;

        // I create an array with the word count and fill it in each column of the row
        wordCounts.push(new Array(totalNotes).fill(wordCount));
      }

      return wordCounts;
    }

    // I print the matrix obtained by dividing the link weights 
    // between notes with the word count of the notes 

    async function main() {

      const wordCountsMatrix = await countWordsInAllNotes();

      ////////////////////////////////////////////////////////////////////////////////////
      /* code that prints the note word count matrix if you make a control on your console
  
      let datawords = "\t";
  
      for (let j = size-1; j >= 0; j--) {
        datawords += "\t" + files[j].basename;
      }
      datawords += "\n";
  
      for (let i = size-1; i >= 0; i--) {
        datawords += files[i].basename + "\t\t";
        for (let j = size-1; j >= 0; j--) {
          const n_words = wordCountsMatrix[i][j];
          datawords += isNaN(n_words) ? 0 : n_words;
          if (j > 0)
            datawords += "\t\t";
        }
        datawords += "\n";
      }
  
      console.log(datawords);
      */
      ///////////////////////////////////////////////////////////////////////////////////

      let data = "";

      // print CSV Normalized matrix header
      for (let j = size - 1; j >= 0; j--) {
        data += symbol + files[j].basename;
      }
      data += "\n";

      for (let i = size - 1; i >= 0; i--) {
        data += files[i].basename + symbol;
        for (let j = size - 1; j >= 0; j--) {
          let n_links = app.metadataCache.resolvedLinks[files[i].path][files[j].path] / (wordCountsMatrix[i][j]);
          data += isNaN(n_links) ? 0 : String(n_links).replace(".",",");
          if (j > 0)
            data += symbol;
        }
        data += "\n";
      }
      console.log(data);
      app.vault.create(filePath, data);
    }

    main();

    // End async function countWordsInAllNotes      

  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}

class ChangeSeparatorModal extends Modal {
  public userInput: HTMLInputElement;
  private currentValue: string;
  private defaultValue: string;

  constructor(app: App, currentValue: string, defaultValue: string) {
    super(app);
    this.currentValue = currentValue;
    this.defaultValue = defaultValue;
  }

  onOpen() {
    this.titleEl.textContent = `Change CSV Separator`

    let content = this.contentEl;
    
    // customize the contents of the user box
    content.innerText = `
        Choose your favourite char to separate .csv data.
        The default char is " ${this.defaultValue} ".
        If you want to change it, insert your char below and press OK.

        
    `;

    // adds an input field
    this.userInput = content.createEl('input', { type: 'text' });
    this.userInput.value = this.currentValue;

    content.appendChild(this.userInput);

    // adds a button to confirm the input
    const confirmButton = content.createEl('button');
    confirmButton.textContent = 'OK';
    confirmButton.onclick = () => this.onConfirm();
    content.appendChild(confirmButton);
  }

  private onConfirm() {

    // I get the value entered by the user
    const userInputValue = this.userInput.value;

    // This is the value to use within 'Export to CSV'
    console.log('Input User: ', userInputValue);
    this.currentValue = this.userInput.value.trim();

    // Closes the box
    this.close();
  }

  getStoredValue(): string | null {
    return this.currentValue;
  }
}
