import ClipboardJS from 'clipboard';

(function () {
    window.addEventListener('load', () => {
        const clipboards = document.querySelectorAll('.copy-clipboard');

        clipboards.forEach(el => {
            const isToggleTooltip = HSStaticMethods.getClassProperty(el, '--is-toggle-tooltip') !== 'false';

            const clipboard = new ClipboardJS(el, {
                text: trigger => {
                    const clipboardText = trigger.dataset.clipboardText;
                    if (clipboardText) return clipboardText;

                    const clipboardTarget = trigger.dataset.clipboardTarget;
                    const targetElement = document.querySelector(clipboardTarget);

                    return (targetElement.tagName === 'SELECT' || targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')
                        ? targetElement.value
                        : targetElement.textContent;
                }
            });

            clipboard.on('success', () => {
                const defaultElement = el.querySelector('.copy-clipboard-default');
                const successElement = el.querySelector('.copy-clipboard-success');
                const successTextElement = el.querySelector('.copy-clipboard-success-text');
                const successText = el.dataset.clipboardSuccessText || '';
                const tooltip = el.closest('.tooltip');
                const tooltipInstance = HSTooltip.getInstance(tooltip, true);
                let oldSuccessText;

                if (successTextElement) {
                    oldSuccessText = successTextElement.textContent;
                    successTextElement.textContent = successText;
                }

                if (defaultElement && successElement) {
                    defaultElement.style.display = 'none';
                    successElement.style.display = 'block';
                }
                if (tooltip && isToggleTooltip) HSTooltip.show(tooltip);
                if (tooltip && !isToggleTooltip) tooltipInstance.element.popperInstance.update();
                setTimeout(() => {
                    if (successTextElement && oldSuccessText) successTextElement.textContent = oldSuccessText;
                    if (tooltip && isToggleTooltip) HSTooltip.hide(tooltip);
                    if (tooltip && !isToggleTooltip) tooltipInstance.element.popperInstance.update();
                    if (defaultElement && successElement) {
                        successElement.style.display = '';
                        defaultElement.style.display = '';
                    }
                }, 3000);
            });
        });
    });
})();