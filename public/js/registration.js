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
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
})