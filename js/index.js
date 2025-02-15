let elements = null;

function initializeElements() {
    elements = {
        largeGrid: document.getElementById('large-grid'),
        miniGrid: document.getElementById('mini-grid'),
        gridView: document.getElementById('grid-view'),
        articleView: document.getElementById('article-view')
    };

    // 验证所有必需的DOM元素是否存在
    Object.entries(elements).forEach(([key, element]) => {
        if (!element) {
            console.error(`必需的DOM元素 "${key}" 未找到`);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initializeElements();
    initializeGrid();
});

const CONSTANTS = {
    ACTIVE_CLASS: 'active',
    INACTIVE_CLASS: 'inactive',
    WAVE_DETAIL_CLASS: 'wave-detail',
    LARGE_GRID_CLASS: 'large-grid'
};

function toggleView() {
    const { gridView, articleView, miniGrid } = elements;
    miniGrid.innerHTML = '';

    if (gridView.classList.contains(CONSTANTS.ACTIVE_CLASS)) {
        gridView.classList.replace(CONSTANTS.ACTIVE_CLASS, CONSTANTS.INACTIVE_CLASS);
        articleView.classList.replace(CONSTANTS.INACTIVE_CLASS, CONSTANTS.ACTIVE_CLASS);
        data.forEach((item, index) => {
            const miniBlock = document.createElement('img');
            miniBlock.src = item.url;
            miniBlock.alt = `Mini Wave ${index + 1}`;
            miniGrid.appendChild(miniBlock);
        });
    } else {
        handleHashChange()
        articleView.classList.replace(CONSTANTS.ACTIVE_CLASS, CONSTANTS.INACTIVE_CLASS);
        gridView.classList.replace(CONSTANTS.INACTIVE_CLASS, CONSTANTS.ACTIVE_CLASS);
    }
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);

function initializeGrid() {
    const { largeGrid, miniGrid } = elements;

    largeGrid.innerHTML = '';
    miniGrid.innerHTML = '';

    largeGrid.classList.remove(CONSTANTS.WAVE_DETAIL_CLASS);
    largeGrid.classList.add(CONSTANTS.LARGE_GRID_CLASS);

    const fragment = document.createDocumentFragment();
    data.forEach((item, index) => {
        const miniBlock = document.createElement('img');
        miniBlock.src = item.url;
        miniBlock.alt = `Mini Wave ${index + 1}`;
        miniGrid.appendChild(miniBlock);

        const largeBlock = document.createElement('a');
        largeBlock.classList.add('image-container');
        largeBlock.href = `#wave${index + 1}`;

        const largeImg = document.createElement('img');
        largeImg.src = item.url;
        largeImg.alt = `Wave ${index + 1}`;
        largeBlock.appendChild(largeImg);

        const largeText = document.createElement('div');
        largeText.classList.add('image-text');
        largeText.innerHTML = `<span>STAGE</span><span>0${index + 1}</span>`;
        largeBlock.appendChild(largeText);

        fragment.appendChild(largeBlock);
    });
    largeGrid.appendChild(fragment);
}

function handleHashChange() {
    const hash = window.location.hash;
    const waveId = hash.slice(1);

    if (waveId && waveId.startsWith('wave')) {
        showWaveDetail(waveId);
    } else {
        showDefaultGrid();
    }
}

function showWaveDetail(waveId) {
    const { largeGrid, miniGrid } = elements;
    largeGrid.innerHTML = '';
    miniGrid.innerHTML = '';

    largeGrid.classList.remove(CONSTANTS.LARGE_GRID_CLASS);
    largeGrid.classList.add(CONSTANTS.WAVE_DETAIL_CLASS);

    const waveData = data.find(item => item.id === waveId);

    if (waveData) {
        const imgBlock = document.createElement('img');
        imgBlock.src = waveData.url;
        largeGrid.appendChild(imgBlock);

        const contentBlock = document.createElement('div');
        contentBlock.classList.add('wave-content');

        const contentTop = document.createElement('div');
        contentTop.classList.add('wave-content-top');
        contentTop.innerHTML = `<h3>STAGE 0${waveId.slice(-1)}</h3>`;

        contentBlock.appendChild(contentTop);

        const contentBottom = document.createElement('div');
        contentBottom.classList.add('wave-content-bottom');

        const colorBlock = document.createElement('div');
        colorBlock.classList.add('color-block');
        colorBlock.innerHTML = `
            <div>
                <span>${waveData.c1}</span>
                <span>${waveData.c2}</span>
            </div>
            <div>
                <span>${waveData.c3}</span>
                <span>${waveData.c4}</span>
            </div>
        `;

        const textBlock = document.createElement('div');
        textBlock.classList.add('text-block');
        textBlock.innerHTML = waveData.description;

        contentBottom.appendChild(textBlock);
        contentBottom.appendChild(colorBlock);

        contentBlock.appendChild(contentBottom);

        largeGrid.appendChild(contentBlock);
        miniGrid.innerHTML = `
            <div class="back-arrow-container"><a href="#" class="back-arrow"></a></div >
        `;
    }
}

function showDefaultGrid() {
    // 恢复原有的网格视图
    initializeGrid(); // 假设这是你原有的初始化网格的函数
}