import util from "../util.js";
import tooltipButton from "./TooltipButton.js";

export default {
    components: {
        tooltipButton
    },
    props: {
        saveFile: Object
    },
    methods: {
        copyText() {
            util.copyText(this.saveFile.data);
        },
        exportFile() {
            const filename = `${this.saveFile.name}.txt`;
            const text = this.saveFile.data;
            util.download(filename, text);
        }
    },
    template: `
    <div class="file-con">
        <div class="file-text-con">
            <div class="file-name">{{saveFile.name}}</div>
            <div class="pre-formatted file-desc">{{saveFile.desc || "No description provided."}}</div>
        </div>
        <div class="file-btn-con">
            <tooltip-button class="file-btn" tooltip="Copied!" @click="copyText">
                Copy to Clipboard
            </tooltip-button>
            <button class="file-btn" @click="exportFile">
                Export as .txt
            </button>
            <slot name="extra-buttons"/>
        </div>
    </div>
    `
};
