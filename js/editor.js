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

import { renderRoadmap, setRoadmapColors } from './ui/editor/roadmap.js';

const createMilestoneMarkSelectorWithParentPseudoClass = (pseudoClass) => (
    `.milestone${pseudoClass} .milestone-mark`
);

renderCanvas();

function renderCanvas() {
    renderRoadmap({
        projectName: {
            text: 'Example ProjectName',
            justifyTo: 'start'
        },
        milestones: [
            {
                name: 'First Milestone',
                description: 'Just a short example',
                isCompleted: true
            },
            {
                name: 'Second Milestone',
                description: 'Some text here',
                isCompleted: false
            },
            {
                name: 'Third Milestone',
                description: 'More text here',
                isCompleted: false
            }
        ]
    });

    $(createMilestoneMarkSelectorWithParentPseudoClass(':first-child'))
        .connections({ to: `${createMilestoneMarkSelectorWithParentPseudoClass(':last-child')}` });

    setRoadmapColors({
        textColor: '#fff',
        backgroundColor: '#000',
        completedMilestoneColor: '',
        uncompletedMilestoneColor: 'grey'
    }, document.querySelector('connection'));
}
