import * as Helpers from './core/helper-functions.js';
import * as RopeStorage from './data/storage.js';

const filePickerSelector = '#file-picker';

const filePickerElement = document.querySelector(filePickerSelector);

Helpers.addEventListenerBySelector(filePickerSelector, 'change', () => {
    const fileReader = new FileReader();

    fileReader.onload = () => RopeStorage.setUploadedRoadmap(fileReader.result);
    fileReader.readAsText(filePickerElement.files[0]);

    window.location.assign('editor.html');
})

Helpers.addEventListenerBySelector('a#open-existing-project', 'click', () => {
    filePickerElement.click();
});