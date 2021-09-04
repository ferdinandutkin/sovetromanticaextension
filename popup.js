
const keys = ["skip_intro", "autoplay_next", "skip_opening_with_hotkey"];

const attach_event_listeners = () => {


    keys.forEach(key => {
        document.getElementById(key).addEventListener("change", function () {
            const value = this.checked;

            chrome.storage.sync.set({[key]: value});

            console.log({[key]: value})
        })
        }
    )

}

const set_current_values = () => {
    chrome.storage.sync.get(keys, result => {

        const set_value = (source, key, def) => document.getElementById(key).checked = source[key] ?? def;

        keys.forEach(key => set_value(result, key, true));


    });
}

const init = () => {

    set_current_values();

    attach_event_listeners();

}

document.addEventListener('DOMContentLoaded', init);