const loadTools = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayTools(data.data.tools);
}

const displayTools = tools => {
    const toolsContainer = document.getElementById('tool-container');

    //display 6 carts
    // tools=tools.slice(0,6);

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
        <button type="button"  class=" btn btn-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#toolDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
      
    </div>
</div>
      </div>
    </div>
       `;
        toolsContainer.appendChild(toolDiv);
    });
    // toggleSpinner(false);
}



const listItemShow = (ai) => {
    let itemHtml = '';
    ai.forEach(item => {
        itemHtml += `<li>${item}</li>`

    })
    return itemHtml;
}

document.getElementById('see-more').addEventListener('click',function(){
    console.log('clicked');
    // toggleSpinner(true)
    
})

// const toggleSpinner = isLoading => {
//     const loaderSection = document.getElementById('loader');
//     if (isLoading) {
//         loaderSection.classList.remove('d-none');
//     }
//     else {
//         loaderSection.classList.add('d-none');

//     }
// }


loadTools();