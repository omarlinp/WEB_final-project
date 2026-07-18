const form = document.getElementById("itemUpdateForm");

form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch("/items/update",{
            method:"PUT",
            body:formData
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})