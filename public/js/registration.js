const form = document.getElementById("signup");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
        return;
    }

    form.classList.add("was-validated");

    const formData = new FormData(form);
    try {
        const response = await fetch("/users/signup", {
            method: "POST",
            body: formData
        });
        const result = await response.json();

        if(result.success){
            sessionStorage.setItem('id', JSON.stringify(result.user.id));
            sessionStorage.setItem('admin', JSON.stringify(result.user.admin));
        }
        window.location.href = result.redirect;

        
    } catch (error) {
        console.log(error);
    }
})