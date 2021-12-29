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

import * as EditorPanel from './ui/editor/panel.js';
import { renderRoadmap } from './ui/editor/roadmap.js';
import { Milestone } from './core/milestone.js';
import { Roadmap } from './core/roadmap.js';

const alignmentButtonsContainerSelector = '#alignment-control-buttons';
const imageButtonPressedClassName = 'image-button-pressed';

const roadmap = new Roadmap({});

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

function switchTextAlignmentButtonsColorsBySelector(selector, isPressed) {
    const button = document.querySelector(selector);
    const otherButtons = document.querySelectorAll(`a.image-button:not(${selector})`);

    console.log(otherButtons);

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