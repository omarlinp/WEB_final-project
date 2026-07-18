const form = document.getElementById("login");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
        return;
    }

    form.classList.add("was-validated");

    const formData = new FormData(form);
    const data = {
        login: formData.get("login"),
        password: formData.get("password")
    };
    const remember = formData.get("remember");
    try {
        const response = await fetch('/users/login',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json(); 
        if (result.success) {
            window.location.href = result.redirect;
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.log(error);
    }
})

