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

const previewCanvasClassName = '.preview-canvas';

const projectNameElementName = 'h2';
const projectNameClassName = 'project-name';
const projectNameJustifyClassNamePart = `${projectNameClassName}-justify-`;

const milestonesContainerClassName = 'project-milestones';
const milestoneElementClassName = 'milestone';

const createMilestoneMarkSelectorWithParentPseudoClass = (pseudoClass) => (
    `.milestone${pseudoClass} .milestone-mark`
);

export function renderRoadmap({ projectName, milestones, colors }) {
    const connectionElement = document.querySelector('connection');

    if (projectName)
        renderProjectNameElement(projectName);

    if (milestones)
        renderMilestones(milestones);

    if (!connectionElement)
        $(createMilestoneMarkSelectorWithParentPseudoClass(':first-child'))
            .connections({ to: `${createMilestoneMarkSelectorWithParentPseudoClass(':last-child')}` });

    setRoadmapColors(colors);
}

function setRoadmapColors({ textColor, backgroundColor, completedMilestoneColor, uncompletedMilestoneColor }) {
    const projectNameElement = document.querySelector(projectNameElementName);
    const previewCanvas = document.querySelector(previewCanvasClassName);
    const previewCanvasPElements = document.querySelectorAll('.milestone-info p');
    const previewCanvasMilestoneIcons = document.querySelectorAll('.milestone-mark');
    const previewCanvasCompletedMilestoneIcons = document.querySelectorAll('.milestone-mark.completed');
    const previewCanvasUncompletedMilestoneIcons = document.querySelectorAll('.milestone-mark.uncompleted');
    const previewCanvasMilestoneConnectonElement = document.querySelector('connection');

    if (previewCanvas)
        setElementBackgroundColor(previewCanvas, backgroundColor);

    if (projectNameElement)
        setElementColor(projectNameElement, textColor);

    if (previewCanvasMilestoneConnectonElement)
        setElementBorderColor(previewCanvasMilestoneConnectonElement, textColor);

    previewCanvasPElements.forEach((element) => setElementColor(element, textColor));
    previewCanvasMilestoneIcons
        .forEach((element) => setElementBackgroundColor(element, backgroundColor));
    previewCanvasCompletedMilestoneIcons
        .forEach((element) => setElementColor(element, completedMilestoneColor));
    previewCanvasUncompletedMilestoneIcons
        .forEach((element) => setElementColor(element, uncompletedMilestoneColor));
}

const setElementBorderColor = (element, colorStr) => element.style.borderColor = colorStr;

const setElementBackgroundColor = (element, colorStr) => element.style.backgroundColor = colorStr;

const setElementColor = (element, colorStr) => element.style.color = colorStr;

function renderProjectNameElement(projectName) {
    const projectNameElement = document.querySelector(`${previewCanvasClassName} ${projectNameElementName}`);
    const justifyToClass = projectNameJustifyClassNamePart + projectName.justifyTo;

    projectNameElement.innerText = projectName.text;
    projectNameElement.classList.value =
        `${projectNameClassName}${projectName.justifyTo.length ? ' ' + justifyToClass : ''}`;
}

function renderMilestones(milestones) {
    const milestonesContainer = document.querySelector(`.${milestonesContainerClassName}`);
    const milestonesElements = milestones.map(createMilestoneElement);
    const milestonesHtmlString = milestonesElements.reduce((htmlStr, nextElement) => htmlStr + nextElement.outerHTML, '');

    milestonesContainer.innerHTML = milestonesHtmlString;
}

function createMilestoneElement(milestone) {
    const mileStoneElement = createElementWithClassList('div', milestoneElementClassName);
    const completionClasses = milestone.isCompleted === true ? {
        completionClassName: 'completed', icon: 'fa-check-circle'
    } : {
        completionClassName: 'uncompleted', icon: 'fa-circle'
    };

    mileStoneElement.innerHTML = `  
    <div class="far ${completionClasses.icon} milestone-mark ${completionClasses.completionClassName}"></div>
    <div class="milestone-info">
        <p class="milestone-name">${milestone.name}</p>
        <p class="milestone-description">${milestone.description}</p>
    </div>
    `;

    return mileStoneElement;
}

function createElementWithClassList(elementName, ...classList) {
    const element = createElement(elementName);

    element.classList.add(...classList);

    return element;
}

const createElement = (elementName) => document.createElement(elementName);