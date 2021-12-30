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

import { createAndRenderMilestoneModal } from './ui/editor/milestone-modal.js';
import * as Helpers from './core/helper-functions.js';
import * as EditorPanel from './ui/editor/panel.js';
import { renderRoadmap } from './ui/editor/roadmap.js';
import { Roadmap } from './core/roadmap.js';
import { createMilestoneCard } from './ui/editor/milestone-card.js';

const roadmapDefaults = {
    textColor: '#783844',
    backgroundColor: '#fffced',
    completedMilestoneColor: '#5a803e',
    uncompletedMilestoneColor: '#889e78'
}

const alignmentButtonsContainerSelector = '#alignment-control-buttons';
const imageButtonPressedClassName = 'image-button-pressed';

const body = document.querySelector('body');
const milestonesCardsList = document.querySelector('.clean');

// We use this initially empty roadmap to hold the data that a user adds dynamically.
const roadmap = new Roadmap({});

window.onbeforeunload = (event) => event.returnValue = Helpers.defaultMessageBeforeLeave;

Sortable.create(milestonesCardsList, {
    animation: 200,
    onEnd: reorderRoadmapMilestones
});

function reorderRoadmapMilestones(event) {
    const oldIndex = event.oldIndex;
    const newIndex = event.newIndex;
    const milestonesCopy = [...roadmap.milestones];
    const itemData = milestonesCopy[oldIndex];

    milestonesCopy.splice(oldIndex, 1);
    milestonesCopy.splice(newIndex, 0, itemData);

    roadmap.milestones = milestonesCopy;

    renderDynamicElements();
}

renderDynamicElements();
setColorPickersValuesToRoadmap();

Helpers.addEventListenerBySelector('.button#new-milestone', 'click', () => {
    createAndRenderMilestoneModal({
        milestoneToOpenModalWith: {},
        mountPoint: body,
        destinationRoadmap: roadmap,
        onAfterClose: () => renderDynamicElements()
    });
});

Helpers.addEventListenerBySelector(EditorPanel.projectNameFieldSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(() => roadmap.projectNameText = event.target.value))()
));

Helpers.addEventListenerBySelector(alignmentButtonsContainerSelector, 'click', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        switch (event.target.id) {
            case 'align-left':
                switchTextAlignmentButtonsColorsBySelector(EditorPanel.alignLeftButtonSelector);
                roadmap.projectNameJustifyTo = 'start';
                break;
            case 'align-center':
                switchTextAlignmentButtonsColorsBySelector(EditorPanel.alignCenterButtonSelector);
                roadmap.projectNameJustifyTo = '';
                break;
            case 'align-right':
                switchTextAlignmentButtonsColorsBySelector(EditorPanel.alignRightButtonSelector);
                roadmap.projectNameJustifyTo = 'end';
                break;
        }
    }))()
));

Helpers.addEventListenerBySelector(EditorPanel.textColorSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        roadmap.textColor = event.target.value;
    }))()
));

Helpers.addEventListenerBySelector(EditorPanel.backgroundColorSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        roadmap.backgroundColor = event.target.value;
    }))()
));

Helpers.addEventListenerBySelector(EditorPanel.completedMilestoneColorSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        roadmap.completedMilestoneColor = event.target.value;
    }))()
));

Helpers.addEventListenerBySelector(EditorPanel.uncompletedMilestoneColorSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        roadmap.uncompletedMilestoneColor = event.target.value;
    }))()
));

Helpers.addEventListenerBySelector('ol.clean', 'click', event => {
    const targetId = event.target.id;
    const targetParent = event.target.parentNode;
    const targetMilestoneIndex = targetParent.dataset['index'];

    let milestoneAction = '';

    if (targetId === 'remove' || targetId === 'edit')
        milestoneAction = targetId;

    switch (milestoneAction) {
        case 'remove':
            roadmap.removeMilestoneAt(targetMilestoneIndex);
            renderDynamicElements()
            break;
        case 'edit':
            createAndRenderMilestoneModal({
                milestoneToOpenModalWith: roadmap.milestones[targetMilestoneIndex],
                editableMilestoneIndex: targetMilestoneIndex,
                mountPoint: body,
                destinationRoadmap: roadmap,
                onAfterClose: () => renderDynamicElements()
            });
            break;
    }
});

Helpers.addEventListenerBySelector('#download-project', 'click', event => {
    const roadmapJSONBlob = createRoadmapJSONBlob(roadmap.toJSONString());
    const projectFileURL = createURLForBlob(roadmapJSONBlob);

    event.target.href = projectFileURL;
    event.target.download = 'roadmap.rope';
});

function createURLForBlob(blob) { return window.URL.createObjectURL(blob); }

function createRoadmapJSONBlob(roadmapJSONStr) { return new Blob([roadmapJSONStr], { type: 'application/json' }); }

function renderDynamicElements() {
    renderRoadmap(roadmap);
    renderRoadmapMilestones(roadmap);
}

function renderRoadmapMilestones(roadmap) {
    const mountPoint = document.querySelector('ol.clean');
    let cardIndex = 0;

    mountPoint.innerHTML = '';
    roadmap.milestones.forEach(milestone => {
        mountPoint.append(createMilestoneCard(milestone.name, cardIndex));
        cardIndex++;
    });
}

function setColorPickersValuesToRoadmap() {
    const getColorPickerBySelector = (selector) => document.querySelector(selector);

    const textColorPicker = getColorPickerBySelector(EditorPanel.textColorSelector);
    const backgroundColorPicker = getColorPickerBySelector(EditorPanel.backgroundColorSelector);
    const completedMilestoneColorPicker = getColorPickerBySelector(EditorPanel.completedMilestoneColorSelector);
    const uncompletedMilestoneColorPicker = getColorPickerBySelector(EditorPanel.uncompletedMilestoneColorSelector);

    textColorPicker.value = Helpers.replaceIfEmpty(roadmap.textColor, roadmapDefaults.textColor);
    backgroundColorPicker.value = Helpers.replaceIfEmpty(roadmap.backgroundColor, roadmapDefaults.backgroundColor);
    completedMilestoneColorPicker.value =
        Helpers.replaceIfEmpty(roadmap.completedMilestoneColor, roadmapDefaults.completedMilestoneColor);
    uncompletedMilestoneColorPicker.value =
        Helpers.replaceIfEmpty(roadmap.uncompletedMilestoneColor, roadmapDefaults.uncompletedMilestoneColor);
}

function switchTextAlignmentButtonsColorsBySelector(selector) {
    const button = document.querySelector(selector);
    const otherButtons = document.querySelectorAll(`a.image-button:not(${selector})`);

    button.classList.add(imageButtonPressedClassName);
    otherButtons.forEach(button => button.classList.remove(imageButtonPressedClassName));
}

function makeEventListenerWithRoadmapRenderer(listener) {
    return function () {
        listener();
        renderRoadmap(roadmap);
    }
}