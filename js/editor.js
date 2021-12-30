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
import { Milestone } from './core/milestone.js';
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

const addMilestoneButton = document.querySelector('.button#new-milestone');
const body = document.querySelector('body');
const milestonesCardsList = document.querySelector('.clean');

const roadmap = new Roadmap({});

Sortable.create(milestonesCardsList, {
    animation: 200,
    onEnd: event => {
        const oldIndex = event.oldIndex;
        const newIndex = event.newIndex;
        const milestonesCopy = [...roadmap.milestones];
        const itemData = milestonesCopy[oldIndex];

        milestonesCopy.splice(oldIndex, 1);
        milestonesCopy.splice(newIndex, 0, itemData);

        roadmap.milestones = milestonesCopy;

        renderDynamicElements();
    }
});

renderDynamicElements();
setColorPickersValuesToRoadmap();

addMilestoneButton.addEventListener('click', () => {
    createAndRenderMilestoneModal({
        milestone: {},
        mountPoint: body,
        destinationRoadmap: roadmap,
        onAfterClose: () => renderDynamicElements()
    });
});

EditorPanel.addEventListenerBySelector(EditorPanel.projectNameFieldSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(() => roadmap.projectNameText = event.target.value))()
));

EditorPanel.addEventListenerBySelector(alignmentButtonsContainerSelector, 'click', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        switch (event.target.id) {
            case 'align-left':
                switchTextAlignmentButtonsColorsBySelector(EditorPanel.alignLeftButtonSelector, true);
                roadmap.projectNameJustifyTo = 'start';
                break;
            case 'align-center':
                switchTextAlignmentButtonsColorsBySelector(EditorPanel.alignCenterButtonSelector, true);
                roadmap.projectNameJustifyTo = '';
                break;
            case 'align-right':
                switchTextAlignmentButtonsColorsBySelector(EditorPanel.alignRightButtonSelector, true);
                roadmap.projectNameJustifyTo = 'end';
                break;
        }
    }))()
));

EditorPanel.addEventListenerBySelector(EditorPanel.textColorSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        roadmap.textColor = event.target.value;
    }))()
));

EditorPanel.addEventListenerBySelector(EditorPanel.backgroundColorSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        roadmap.backgroundColor = event.target.value;
    }))()
));

EditorPanel.addEventListenerBySelector(EditorPanel.completedMilestoneColorSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        roadmap.completedMilestoneColor = event.target.value;
    }))()
));

EditorPanel.addEventListenerBySelector(EditorPanel.uncompletedMilestoneColorSelector, 'input', event => (
    (makeEventListenerWithRoadmapRenderer(function () {
        roadmap.uncompletedMilestoneColor = event.target.value;
    }))()
));

EditorPanel.addEventListenerBySelector('ol.clean', 'click', event => {
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
                milestone: roadmap.milestones[targetMilestoneIndex],
                milestoneIndex: targetMilestoneIndex,
                mountPoint: body,
                destinationRoadmap: roadmap,
                onAfterClose: () => renderDynamicElements()
            });
            break;
    }
});

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

function switchTextAlignmentButtonsColorsBySelector(selector, isPressed) {
    const button = document.querySelector(selector);
    const otherButtons = document.querySelectorAll(`a.image-button:not(${selector})`);

    if (isPressed === true) {
        button.classList.add(imageButtonPressedClassName);
        otherButtons.forEach(button => button.classList.remove(imageButtonPressedClassName));
    }
}

function makeEventListenerWithRoadmapRenderer(listener) {
    return function () {
        listener();
        renderRoadmap(roadmap);
    }
}