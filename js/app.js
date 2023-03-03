const loadTools = async (showAll) => {
    spinnerLoader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    loadData = data.data.tools;
    displayTools(data.data.tools, showAll);
}

const displayTools = (tools, showAll) => {
    const toolsContainer = document.getElementById('tool-container');
    toolsContainer.innerHTML = '';
    if (showAll && tools.length > 6) {
        tools = tools.slice(0, 6);
        document.getElementById("btn-show-all").classList.remove("d-none");
    }
    tools.forEach(tool => {
        // console.log(tool)

        const { id, name, features, image, published_in } = tool
        // console.log(features);


        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
        <div class="card p-3 h-100">
        <img style="height: 250px;" class=" rounded-3 " src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h4 class="card-title fw-bolder">Features</h4>
        <ol  class="card-text">${listItemShow(features)}</ol>
        <hr>
        <h4 class="card-title fw-bolder">${name}</h4>

        
        <div class="d-flex justify-content-between">
    <div class="card-text"><i class="fa-solid fa-calendar-days"></i>${published_in}</div>
    <div>
        <button onclick="loadToolsDetail('${id}')" type="button"  class=" btn btn-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#toolDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
      
    </div>
</div>
      </div>
    </div>
       `;


        toolsContainer.appendChild(toolDiv);
        spinnerLoader(false);



    });
};



const listItemShow = (ai) => {
    let itemHtml = '';
    ai.forEach(item => {
        itemHtml += `<li>${item}</li>`

    })
    return itemHtml;
}

const loadToolsDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayToolDetails(data.data)
}
// data.data.accuracy.description
const displayToolDetails = datas => {
    // console.log(datas)
    p = datas.pricing[0].price;
    c = datas.pricing[0].plan;
    // console.log(p);
    // console.log(c);

    const modalDescription = document.getElementById('accuracy-description');
    modalDescription.innerText = datas.accuracy.description;

    const modalPrice0 = document.getElementById('price-modal-0');
    modalPrice0.innerHTML = `
    <span style="color: green;">${p ? p : 'Free of Cost'}</span>
    <span style="color: green;">${c ? c : 'Basic'}</span>
    `

    const modalPrice1 = document.getElementById('price-modal-1');
    modalPrice1.innerHTML = `
    <span style="color: green;">${p ? p : 'Free of Cost'}</span>
    <span style="color: green;">${c ? c : 'Basic'}</span>
    `

    const modalPrice2 = document.getElementById('price-modal-2');
    modalPrice2.innerHTML = `
    <span style="color: green;">${p ? p : 'Free of Cost'}</span>
    <span style="color: green;">${c ? c : 'Basic'}</span>
    `
    // const features = datas.features;
    // console.log(features[1].feature_name)
    // console.log(datas.image_link[0])
    // console.log(datas.image_link[1])
    console.log(datas.input_output_examples[0].input)
    console.log(datas.input_output_examples[0].output)

    const modalImage = document.getElementById("modal-image");
    modalImage.innerHTML = `
    <img src="${datas.image_link[0]}" class="card-img-top" alt="...">
    `;
    const input_output = document.getElementById("modal-input-output");
    input_output.innerHTML = `
    <h5>${datas.input_output_examples[0].input}</h5>
    <p>${datas.input_output_examples[0].output}</p>
    `;









}
const showButtonClick = () => {
    loadTools();
    spinnerLoader
    document.getElementById("btn-show-all").classList.add("d-none");

}

// loader
const spinnerLoader = (value) => {
    const spiner = document.getElementById("loader");
    if (value) {
        spiner.classList.remove("d-none");
    }
    else {
        spiner.classList.add("d-none");

    }
}
// sort by date
const sortDate = () => {
    const all = loadData.sort(function (day1, day2) {
        const date1 = new Date(day1.published_in);
        const date2 = new Date(day2.published_in);
        return date2 - date1;
    });
    displayTools(all);
    document.getElementById("btn-show-all").classList.add("d-none");
}