
(function flexible (window, document) {
    let docEl = document.documentElement;
    let dpr = window.devicePixelRatio || 1;

    // adjust body font size
    function setBodyFontSize () {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px';
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit () {
        if (docEl.clientWidth < 768) {
            let rem = docEl.clientWidth / 10;
            docEl.style.fontSize = rem + 'px';
        } else {
            let rem = 100;
            docEl.style.fontSize = rem + 'px';
        }
    }

    setRemUnit();

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    });

    // detect 0.5px supports
    if (dpr >= 2) {
        let fakeBody = document.createElement('body');
        let testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody);
    }
}(window, document));

//获取系统默认字体大小
//designWidth 设计稿的宽度
//rem2px 设计稿宽度下，1rem的宽度
// function adapt(designWidth, rem2px) {
//     let d = window.document.createElement('div');
//     d.style.width = '1rem';
//     d.style.display = "none";
//     let head = window.document.getElementsByTagName('head')[0];
//     head.appendChild(d);
//     let defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
//     return defaultFontSize;
// }
//
// !(function(doc, win, designWidth, rem2px) {
//     let docEl = doc.documentElement;
//     let defaultFontSize = adapt(designWidth, rem2px);
//     let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
//     let recalc = function() {
//         let clientWidth = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
//
//         if (!clientWidth) {return;}
//         if (clientWidth < 750) {
//             docEl.style.fontSize = clientWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
//
//         } else {
//             docEl.style.fontSize = '625%';
//         }
//     };
//     if (!doc.addEventListener) {return;}
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
//
// })(document, window, 750, 100);