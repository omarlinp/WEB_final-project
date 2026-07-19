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
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.redirect) {
            window.location.href = result.redirect;
            return;
        }
        alert(result.message || "Unable to update account.");
    } catch (error) {
        console.error(error)
        alert("Unable to update account right now. Please try again.");
    }
})