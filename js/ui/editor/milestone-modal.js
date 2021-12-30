import * as Helpers from '../../core/helper-functions.js'
import { Milestone } from '../../core/milestone.js';

export function createAndRenderMilestoneModal({ milestone, mountPoint, destinationRoadmap, onAfterClose }) {
    const milestoneModalRootElement = document.createElement('div');

    const setTextFieldValue = (field, text) => field.value = Helpers.replaceIfUndefined(text, '');
    const setCheckboxValue = (checkbox, isChecked) => checkbox.checked = Helpers.replaceIfUndefined(isChecked, false);

    milestoneModalRootElement.classList.add('milestone-modal');
    milestoneModalRootElement.innerHTML = `
    <form>
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

    saveButton.addEventListener('click', event => {
        event.preventDefault();

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