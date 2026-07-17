const form = document.getElementById("signup");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

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