import * as Helpers from './core/helper-functions.js';
import * as RopeStorage from './data/storage.js';

const filePickerSelector = '#file-picker';

const filePickerElement = document.querySelector(filePickerSelector);

Helpers.addEventListenerBySelector(filePickerSelector, 'change', () => {
    const fileReader = new FileReader();

    fileReader.onload = () => RopeStorage.setUploadedRoadmap(fileReader.result);
    fileReader.readAsText(filePickerElement.files[0]);

    /*
    [BLINK-HISTORY#1-1]
    The second part of this fix is located in the "editor.js" file and marked as "[BLINK-HISTORY#1-2]".

    This fix allows Blink-based browsers to navigate backward in the tab's history stack.
    If things like location.href or location.assign() are used, when the user uses the "Back" button, such browsers navigate
    to the previous page (index.html) and after that immediately return to the editor.html page.
    
    Pushing to the history stack doesn't trigger page loading. To load the page, a manual reload is needed.
    */
    history.pushState(null, 'Rope Editor', '/editor.html');
    location.reload();
})

Helpers.addEventListenerBySelector('a#open-existing-project', 'click', () => {
    filePickerElement.click();
});