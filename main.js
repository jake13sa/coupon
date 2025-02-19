let inputCount = 1;

        function toggleInput(button) {
            const container = document.getElementById("inputContainer");
            const parentDiv = button.parentElement;
            
            if (button.textContent === "+") {
                inputCount++;
                const newDiv = document.createElement("div");
                newDiv.classList.add("container");
                
                const newInput = document.createElement("input");
                newInput.type = "text";
                newInput.id = `input-${inputCount}`;
                newInput.required = true;
                newInput.placeholder = "Enter CS Code";
                newInput.oninput = function() { removeError(this); };
                
                const newButton = document.createElement("button");
                newButton.textContent = "+";
                newButton.onclick = function() { toggleInput(newButton); };
                
                newDiv.appendChild(newInput);
                newDiv.appendChild(newButton);
                container.appendChild(newDiv);
                
                button.textContent = "-";
            } else {
                container.removeChild(parentDiv);
            }
        }

        async function submitInputs() {
            const couponCode = document.getElementById("coupon-code").value.trim();
            const inputs = document.querySelectorAll(".input-container input");
            let allValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add("error");
                    allValid = false;
                }
            });
            
            if (!couponCode) {
                document.getElementById("coupon-code").classList.add("error");
                allValid = false;
            }
            
            if (!allValid) return;
            
            for (let input of inputs) {
                const payload = {
                    language: "en",
                    server: "32|0|1|IMO: The World of Magic",
                    cs_code: input.value.trim(),
                    coupon: couponCode,
                    additional_info: ""
                };
                
                try {
                    const response = await fetch("https://coupon.withhive.com/32", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });
                    
                    const result = await response.json();
                    console.log("Response for CS Code", input.value, result);
                } catch (error) {
                    console.error("Error submitting CS Code", input.value, error);
                }
            }
        }

        function removeError(input) {
            if (input.value.trim()) {
                input.classList.remove("error");
            }
        }