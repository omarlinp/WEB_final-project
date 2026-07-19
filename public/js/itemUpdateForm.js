const form = document.getElementById("itemUpdateForm");

form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch("/items/update",{
            method:"PUT",
            body:formData
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.redirect) {
            window.location.href = result.redirect;
            return;
        }
        alert(result.message || "Unable to update item.");
    } catch (error) {
        console.error(error);
        alert("Unable to update item right now. Please try again.");
    }
})