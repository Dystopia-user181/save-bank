import util from "../util.js";
import confirmationModal from "./ConfirmationModal.js";

export default {
    component: {
        confirmationModal
    },
    data() {
        return {
            themes: ["Dark", "Light"],
            showWipeDataModal: false
        }
    },
    methods: {
        hasCustomSaves() {
            return this.data.customSaves.length !== 0;
        },
        switchTheme() {
            this.data.settings.theme ++;
            if (this.data.settings.theme >= themes.length) {
                this.data.settings.theme = 0;
            }
            util.setTheme(this.data.settings.theme);
        },
        reset() {
            localStorage.removeItem("saveBankData");
            location.reload();
        }
    },
    props: {
        data: Object
    },
    template: `
    <div class="tab settings-tab">
        <tab-header title="Settings"/>

        <button @click="switchTheme">
            Theme: {{themes[data.settings.theme]}}
        </button>

        <button v-if="hasCustomSaves" @click="$emit('zip-save')">
            (Legacy) Export custom saves
        </button>

        <button class="warning" @click="showWipeDataModal = true">
            Wipe all user data
        </button>

        <confirmation-modal v-if="showWipeDataModal" @yes="reset" @no="showWipeDataModal = false">
            <template #header>
                <span class="warning">Wipe all user data</span>
            </template>

            Are you sure you want to wipe all user data? <span class="warning">This cannot be undone!</span>
        </confirmation-modal>
    </div>
    `
};
