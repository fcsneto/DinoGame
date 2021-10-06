import {log , reStart, onKeyDown} from "./functions.js";
import { jogarNovamente } from "./obj.js"

document.addEventListener('keydown', (event) =>{
    onKeyDown(event);
})

jogarNovamente.addEventListener("click", () => {
    reStart();
});