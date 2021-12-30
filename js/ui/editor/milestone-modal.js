/*
MIT License

Copyright (c) 2021 Timofey Chuchkanov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as Helpers from '../../core/helper-functions.js'
import { Milestone } from '../../core/milestone.js';

export function createAndRenderMilestoneModal({ milestone, mountPoint, destinationRoadmap, onAfterClose }) {
    const milestoneModalRootElement = document.createElement('div');

    const setTextFieldValue = (field, text) => field.value = Helpers.replaceIfUndefined(text, '');
    const setCheckboxValue = (checkbox, isChecked) => checkbox.checked = Helpers.replaceIfUndefined(isChecked, false);

    milestoneModalRootElement.classList.add('milestone-modal');
    milestoneModalRootElement.innerHTML = `
    <form onsubmit="return false;">
        <div class="milestone-modal-content">
            <div class="name-section">
                <label for="milestone-name" class="title">Milestone name</label>
                <input type="text" name="milestone-name" id="milestone-name" required>
            </div>
            <div class="description-section">
                <label for="milestone-description" class="title">Milestone description</label>
                <input type="text" name="milestone-description" id="milestone-description">
            </div>
            <div class="completeness-section">
                <label for="milestone-completeness" class="title">Is completed</label>
                <input type="checkbox" name="milestone-completeness" id="milestone-completeness">
            </div>
            <div class="buttons-section">
                <button class="button button-text-only" id="cancel">Cancel</button>
                <button class="button button-text-only" id="save">Save</button>
            </div>
        </div>
    </form>
    `;

    mountPoint.append(milestoneModalRootElement);

    const milestoneNameField = document.querySelector('input[type="text"]#milestone-name');
    const milestoneDescriptionField = document.querySelector('input[type="text"]#milestone-description');
    const milestoneCompletedCheckbox = document.querySelector('input[type="checkbox"]#milestone-completeness');
    const cancelButton = document.querySelector('.buttons-section button#cancel');
    const saveButton = document.querySelector('.buttons-section button#save');

    setTextFieldValue(milestoneNameField, milestone.name);
    setTextFieldValue(milestoneDescriptionField, milestone.description);
    setCheckboxValue(milestoneCompletedCheckbox, milestone.isCompleted);

    cancelButton.addEventListener('click', event => {
        event.preventDefault();

        milestoneModalRootElement.remove();
    });

    saveButton.addEventListener('click', () => {

        const name = milestoneNameField.value;
        const description = milestoneDescriptionField.value;
        const isChecked = milestoneCompletedCheckbox.checked;

        if (name.trim()) {
            destinationRoadmap.addMilestone(new Milestone({ name, description, isCompleted: isChecked }));
            milestoneModalRootElement.remove();
            onAfterClose();
        }
    });

}