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

const defaultMessageBeforeLeave = 'All unsaved changes will be lost if you leave. Proceed?';

function requestUserConfirmation({ textMessage, onCancel, onConfirm }) {
    const shouldReload = confirm(textMessage);

    if (shouldReload)
        onConfirm();

    if (!shouldReload)
        onCancel();
}

const addEventListenerBySelector = (selector, listenerName, listener) => (
    document.querySelector(selector).addEventListener(listenerName, listener)
);

const replaceIfUndefined = (val, replaceWith) => replaceIf(val, replaceWith, val === undefined);

const replaceIfEmpty = (val, replaceWith) => replaceIf(val, replaceWith, val.trim() === '');

const replaceIf = (val, replaceWith, condition) => condition ? replaceWith : val;

export {
    defaultMessageBeforeLeave,
    requestUserConfirmation,
    addEventListenerBySelector,
    replaceIfUndefined,
    replaceIfEmpty
}