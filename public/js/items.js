const form = document.getElementById("itemForm");
    const user_id = localStorage.getItem("id");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

    const formData = new FormData(form);
    formData.append("user_id",user_id);
    formData.append("province_id",1);
    try {
        const response = await fetch("/items/item",{
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log(result);
    } catch(error) {
        console.log(error);
    }
})