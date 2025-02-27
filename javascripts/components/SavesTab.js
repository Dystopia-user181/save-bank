Vue.component("saves-tab", {
    data() {
        return {
            sortTypes: ["Early to late", "Late to early"],
            sortMode: 0,
            searchThing
    },
    props: {
        selectedCategory: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    computed: {
        hasSaves() {
            return this.saves.length !== 0;
        },
        saves() {
            const saves = this.selectedCategory.saves || [];
            switch (this.sortMode) {
            case 0: return saves.filter(_=>_.name.toLowerCase().includes(searchThing.text.toLowerCase().trim()));
            case 1: return [...saves].reverse().filter(_=>_.name.toLowerCase().includes(searchThing.text.toLowerCase().trim()));
            default: return [];
            }
        }
    },
    methods: {
        toggleSort() {
            this.sortMode ++;
            if (this.sortMode >= this.sortTypes.length) {
                this.sortMode = 0;
            }
        }
    },
    template: `
    <div class="tab file-list">
        <tab-header :title="selectedCategory.name">
            <template #description>
                {{selectedCategory.desc || ""}}
            </template>

            <template #buttons>
                <button v-if="selectedCategory.sort !== false && hasSaves" @click="toggleSort">
                    Ordering: {{sortTypes[sortMode]}}
                </button>
            </template>
        </tab-header>
        <div v-if="!hasSaves && searchThing.text === ''"  class="no-saves">{{selectedCategory.placeholder || "No save file available."}}</div>
        <div v-else>
        <div class="search"><span style="display: flex; align-items: center">
        <svg style="width: 24px; height: 24px; margin-left: 5px" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path style="fill: var(--color)" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
        <span style="height: 30px; width: 1.5px; margin: 0 5px; background-color: var(--color)"></span></span><input placeholder="Search in current tab..." v-model="searchThing.text"></input></div>
        <br><br>
        <save-file
                   v-for="(saveFile, i) in saves"
                   :save-file="saveFile"
                   class="save-file"
                   :class="i % 2 == 1 ? selectedCategory.color + '-background' : ''"
                   :key="i">
        </save-file></div>
    </div>
    `
})
