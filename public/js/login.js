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
    try {
        const response = await fetch('/users/login',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result;
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            result = await response.json();
        } else {
            throw new Error(`Unexpected response type: ${contentType || "unknown"}`);
        }

        if (result.success) {
            window.location.href = result.redirect;
        } else {
            alert(result.message || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Login request failed:", error);
        alert("Unable to sign in right now. Please try again in a moment.");
    }
})

