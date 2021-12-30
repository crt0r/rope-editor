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

import * as Helpers from './helper-functions.js';

export class Roadmap {
    constructor({
        projectName,
        justifyProjectNameTo,
        milestones,
        textColor,
        backgroundColor,
        completedMilestoneColor,
        uncompletedMilestoneColor
    }) {
        this.projectName = {
            text: Helpers.replaceIfUndefined(projectName, ''),
            justifyTo: Helpers.replaceIfUndefined(justifyProjectNameTo, '')
        };
        this.milestones = Helpers.replaceIfUndefined(milestones, []);
        this.colors = {
            textColor: Helpers.replaceIfUndefined(textColor, ''),
            backgroundColor: Helpers.replaceIfUndefined(backgroundColor, ''),
            completedMilestoneColor: Helpers.replaceIfUndefined(completedMilestoneColor, ''),
            uncompletedMilestoneColor: Helpers.replaceIfUndefined(uncompletedMilestoneColor, '')
        };
    }

    get uncompletedMilestoneColor() {
        return this.colors.uncompletedMilestoneColor;
    }

    get completedMilestoneColor() {
        return this.colors.completedMilestoneColor;
    }

    get backgroundColor() {
        return this.colors.backgroundColor;
    }

    get textColor() {
        return this.colors.textColor;
    }

    get projectNameJustifyTo() {
        return this.projectName.justifyTo;
    }

    get projectNameText() {
        return this.projectName.text;
    }

    set uncompletedMilestoneColor(colorStr) {
        this.colors.uncompletedMilestoneColor = colorStr;
    }

    set completedMilestoneColor(colorStr) {
        this.colors.completedMilestoneColor = colorStr;
    }

    set backgroundColor(colorStr) {
        this.colors.backgroundColor = colorStr;
    }
    
    set textColor(colorStr) {
        this.colors.textColor = colorStr;
    }

    set projectNameJustifyTo(justifyTo) {
        this.projectName.justifyTo = justifyTo;
    }

    set projectNameText(name) {
        this.projectName.text = name;
    }

    addMilestone(milestone) {
        this.milestones.push(milestone);
    }
}