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

export function renderRoadmap({ projectName, milestones, colors }) {
  renderProjectNameElement(projectName);
  renderMilestones(milestones);
}

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
  const completionClassName = milestone.isCompleted ? 'completed' : 'uncompleted';

  mileStoneElement.innerHTML = `  
  <div class="far fa-check-circle milestone-mark ${completionClassName}"></div>
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