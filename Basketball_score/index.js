

let score = {
    home:0,
    guest:0
}

let buttons = document.querySelectorAll(".plus");

buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        let team = button.getAttribute("data-team");
        let point =Number(button.getAttribute("data-score"));
        
        
        score[team] += point;
        
        document.getElementById(`Score-${team}`).textContent = score[team];
        const homeContainer = document.getElementById("Score-homec");
        const guestContainer = document.getElementById("Score-guestc");

        // Reset highlights
        homeContainer.classList.remove("highlight");
        guestContainer.classList.remove("highlight");

        // Add highlight to team with higher score
        if (score.home > score.guest) {
            homeContainer.classList.add("highlight");
        } else if (score.guest > score.home) {
            guestContainer.classList.add("highlight");
        }
    })
})