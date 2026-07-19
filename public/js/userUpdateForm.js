const form = document.getElementById("updateAccount");

form.addEventListener("submit", async (event) =>{
    event.preventDefault();

    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
        return;
    }

    form.classList.add("was-validated");
    const formData = new FormData(form);

    try {
        const response = await fetch("/users/update",{
            method: "PUT",
            body:formData
        })
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error)
    }
})