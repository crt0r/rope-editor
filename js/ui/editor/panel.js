const projectNameFieldSelector = 'input#project-name-field';

const alignLeftButtonSelector = '.image-button#align-left';
const alignCenterButtonSelector = '.image-button#align-center';
const alignRightButtonSelector = '.image-button#align-right';

const textColorSelector = 'input#text-color-selector';
const backgroundColorSelector = 'input#background-color-selector';
const completedMilestoneColorSelector = 'input#completed-milestone-color-selector';
const uncompletedMilestoneColorSelector = 'input#uncompleted-milestone-color-selector';

const addEventListenerBySelector = (selector, listenerName, listener) => (
    document.querySelector(selector).addEventListener(listenerName, listener)
);

const getUncompletedMilestoneColor = () => getElementValueBySelector(uncompletedMilestoneColorSelector);

const getCompletedMilestoneColor = () => getElementValueBySelector(completedMilestoneColorSelector);

const getBackgroundColor = () => getElementValueBySelector(backgroundColorSelector);

const getTextColor = () => getElementValueBySelector(textColorSelector);

const getProjectName = () => getElementValueBySelector(projectNameFieldSelector);

const getElementValueBySelector = (selector) => document.querySelector(selector).value;

export {
    projectNameFieldSelector,
    textColorSelector,
    backgroundColorSelector,
    completedMilestoneColorSelector,
    uncompletedMilestoneColorSelector,
    getProjectName,
    getTextColor,
    getBackgroundColor,
    getCompletedMilestoneColor,
    getUncompletedMilestoneColor,
    addEventListenerBySelector,
    alignLeftButtonSelector,
    alignCenterButtonSelector,
    alignRightButtonSelector
};