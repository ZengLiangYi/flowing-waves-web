document.addEventListener('DOMContentLoaded', function () {
    initializeGrid();
});

function toggleView() {
    const gridView = document.getElementById('grid-view');
    const articleView = document.getElementById('article-view');

    if (gridView.classList.contains('active')) {
        gridView.classList.replace('active', 'inactive');
        articleView.classList.replace('inactive', 'active');
    } else {
        articleView.classList.replace('active', 'inactive');
        gridView.classList.replace('inactive', 'active');
    }
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);

function initializeGrid() {
    const largeGrid = document.getElementById('large-grid');
    const miniGrid = document.getElementById('mini-grid');

    largeGrid.innerHTML = '';
    miniGrid.innerHTML = '';

    largeGrid.classList.remove('wave-detail');
    largeGrid.classList.add('large-grid');

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
        largeText.innerHTML = `<span>STAGE</span><span>${index + 1}</span>`;
        largeBlock.appendChild(largeText);

        largeGrid.appendChild(largeBlock);
    });
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
    const largeGrid = document.getElementById('large-grid');
    const miniGrid = document.getElementById('mini-grid');
    largeGrid.innerHTML = '';
    miniGrid.innerHTML = '';

    largeGrid.classList.remove('large-grid');
    largeGrid.classList.add('wave-detail');

    const waveData = data.find(item => item.id === waveId);

    if (waveData) {
        const imgBlock = document.createElement('img');
        imgBlock.src = waveData.url;
        largeGrid.appendChild(imgBlock);

        const contentBlock = document.createElement('div');
        contentBlock.classList.add('wave-content');

        const contentTop = document.createElement('div');
        contentTop.classList.add('wave-content-top');
        contentTop.innerHTML = `<a class='back-arrow' href='index.html'></a><h3>STAGE 0${waveId.slice(-1)}</h3>`;

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
        textBlock.innerHTML = waveData.description;

        contentBottom.appendChild(colorBlock);
        contentBottom.appendChild(textBlock);

        contentBlock.appendChild(contentBottom);

        largeGrid.appendChild(contentBlock);
    }
}

function showDefaultGrid() {
    // 恢复原有的网格视图
    initializeGrid(); // 假设这是你原有的初始化网格的函数
}