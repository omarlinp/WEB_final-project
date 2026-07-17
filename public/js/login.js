const form = document.getElementById("login");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

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
            if (remember) {
                localStorage.setItem('id', JSON.stringify(result.user.id));
                localStorage.setItem('admin', JSON.stringify(result.user.admin));
            } else {
                sessionStorage.setItem('id', JSON.stringify(result.user.id));
                sessionStorage.setItem('admin', JSON.stringify(result.user.admin));
            }
            window.location.href = result.redirect;
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.log(error);
    }
})

