"use strict";

Vue.component("custom-saves", {
    template: `
    <div>
        <category-header>
            Custom Saves
            <template v-slot:description>
                Quota: <span :class="{'warning': customSaves.length >= 10}">{{customSaves.length}} / 10</span>
            </template>
            <template v-slot:button>
                <button class="add-save-btn" v-if="customSaves.length < 10" @click="edit(-1)">
                    Add new save
                </button>
            </template>
        </category-header>
        <div v-for="(saveFile, i) in customSaves"
            :class="i % 2 == 1 ? 'custom-background' : ''">
            <custom-save :saveFile="saveFile" @delete="deleteFile(i)">
            </custom-save>
        </div>
    </div>
    `,
    data() {
        return {
            saveIndex: 0, // used for counting saves created
            customSaves: [],
            fields: ["Name", "Desc", "Data"],
            currentFileIndex: -1
        }
    },
    computed: {
        inputHeader() {
            let index = this.currentFileIndex;
            let saves = this.customSaves;
            if (index < 0 || index >= saves.length) {
                return "Enter save info:"
            }
            return "Edit save info:"
        },
        inputDefault() {
            let index = this.currentFileIndex;
            let saves = this.customSaves;
            if (index < 0 || index >= saves.length) {
                return null;
            }
            return saves[index];
        },
        currentSaveName() {
            let save = this.customSaves[this.currentFileIndex] || {name: null};
            return save.name;
        }
    },
    methods: {
        submit(save) {
            let oldSave = this.inputDefault;
            if (oldSave === null) {
                if (save.name.replace(/\s/g, "") == "") {
                    save.name = "Save #" + (this.saveIndex + 1)
                    this.saveIndex ++;
                }
                this.customSaves.push(save)
            } else {
                for (let attr in save) {
                    oldSave[attr] = save[attr];
                }
            }
            this.save();
            this.close('.custom-save-input-modal');
        },
        edit(i) {
            this.currentFileIndex = i;
            this.open('.custom-save-input-modal');
        },
        copy(save) {
            this.$emit('copy-file', save);
        },
        downloadFile(save) {
            this.$emit('download-file', save);
        },
        deleteFile(i) {
            this.customSaves.splice(i, 1);
            this.save();
        },
        open(c) {
            let element = this.$el.querySelector(c)
            element.style.display = "flex";
            let body = document.querySelector("body")
            body.style.overflowY = "hidden";
        },
        close(c) {
            let element = this.$el.querySelector(c)
            element.style.display = "none";
            let body = document.querySelector("body")
            body.style.overflowY = "scroll";
        },
        save() {
            let data = {
                index: this.saveIndex,
                saves: this.customSaves
            }
            localStorage.setItem("saveBankCustomSaves", JSON.stringify(data));
        }
    },
    mounted() {
        let saves = localStorage.getItem("saveBankCustomSaves");
        if (String(saves) !== "undefined" && String(saves) !== "null") {
            let data = JSON.parse(saves);
            if (Array.isArray(data.saves)) {
                for (let save of data.saves) {
                    this.customSaves.push(save);
                }
            }
            if (isNumber(data.index)) {
                this.saveIndex = data.index;
            }
        }
    }
})
