

const attach_event_listeners = () => {


    document.getElementById("skip_intro").addEventListener("change", function () {
        const skip_intro = this.checked;

        chrome.storage.sync.set({"skip_intro": skip_intro});

        console.log(skip_intro)
    })

    document.getElementById("autoplay_next").addEventListener("change", function () {
        const autoplay_next = this.checked;

        chrome.storage.sync.set({"autoplay_next": autoplay_next});

        console.log(autoplay_next)
    })


    document.getElementById("skip_opening_with_hotkey").addEventListener("change", function () {
        const skip_opening_with_hotkey = this.checked;

        chrome.storage.sync.set({"skip_opening_with_hotkey": skip_opening_with_hotkey});


        console.log(skip_opening_with_hotkey)
    })



}

const set_current_values = () => {
    chrome.storage.sync.get("skip_intro", result => {
        const skip_intro = result.skip_intro ?? true;

        document.getElementById("skip_intro").checked = skip_intro;

        chrome.storage.sync.get("autoplay_next", result => {

            const autoplay_next = result.autoplay_next ?? true;

            document.getElementById("autoplay_next").checked = autoplay_next;

            chrome.storage.sync.get("skip_opening_with_hotkey", result => {

                const skip_opening_with_hotkey = result.skip_opening_with_hotkey ?? true;

                document.getElementById("skip_opening_with_hotkey").checked = skip_opening_with_hotkey;

            })

        })
    });
}

const init = () =>{

    set_current_values();

    attach_event_listeners();

}

document.addEventListener('DOMContentLoaded', init);