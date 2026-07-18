const form = document.getElementById("itemForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

    const formData = new FormData(form);
    try {
        const response = await fetch("/items/item",{
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log(result);
    } catch(error) {
        console.log(error);
    }
})