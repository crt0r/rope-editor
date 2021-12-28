const projectNameElementName = 'h2';
const projectNameClassName = 'project-name';
const projectNameJustifyClassNamePart = `${projectNameClassName}-justify-`;

const previewCanvasClassName = '.preview-canvas';

export function renderRoadmap({ projectName, milestones, colors }) {
  renderProjectNameElement(projectName);
}

function renderProjectNameElement(projectName) {
  const projectNameElement = document.querySelector(`${previewCanvasClassName} ${projectNameElementName}`);
  const justifyToClass = projectNameJustifyClassNamePart + projectName.justifyTo;

  projectNameElement.innerText = projectName.text;
  projectNameElement.classList.value =
    `${projectNameClassName}${projectName.justifyTo.length ? ' ' + justifyToClass : ''}`;
}
