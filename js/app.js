const loadTools = async (t) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayTools(data.data.tools);
}

const displayTools = tools => {
    const toolsContainer = document.getElementById('tool-container');

    // //display 6 cards
    // if (tools.length > 6) {
    //     tools = tools.slice(0, 6);
    //     const showAll = document.getElementById('see-more')
    //     showAll.classList.remove('d-none');
    // }
    // else {
    //     showAll.classList.add('d-none');

    // }

    tools.forEach(tool => {

        const { id, name, features, image, published_in } = tool

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
    });
    toggleSpinner(false);
    // hideSeeMore()
}
const processt=(datalimit)=>{
    toggleSpinner(true);
    loadTools();
}


const listItemShow = (ai) => {
    let itemHtml = '';
    ai.forEach(item => {
        itemHtml += `<li>${item}</li>`

    })
    return itemHtml;
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    console.log('clicked');
    toggleSpinner(true);
    processt(6);
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');

    }
}


const loadToolsDetail=async id =>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayToolDetails(data.data)
}
// data.data.accuracy.description
const displayToolDetails=tool=>{
    console.log(tool);
    const modalDescription=document.getElementById('accuracy-description');
    modalDescription.innerText=tool.accuracy.description

}

loadTools();