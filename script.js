document.addEventListener("DOMContentLoaded", function() {
    const formElements = document.querySelectorAll("#pais, #tipo-curso, #curso, #estado, #cidade");
    const chooseCourseBtn = document.getElementById("chooseCourseBtn");
    const contactBtn = document.getElementById("contactBtn");
    const courseContent = document.getElementById("courseContent");

    const courseDescriptions = {
        "administracao": "descricao_administracao.html",
        "direito": "descricao_direito.html",
        "contabilidade": "descricao_contabilidade.html",
        "engenharia": "descricao_engenharia.html",
        "medicina": "descricao_medicina.html",
        "enfermagem": "descricao_enfermagem.html",
        "informatica": "descricao_informatica.html",
        "arquitetura": "descricao_arquitetura.html",
        "psicologia": "descricao_psicologia.html",
        "educacao": "descricao_educacao.html"
    };

    function checkFormCompletion() {
        let allFilled = true;
        formElements.forEach(element => {
            if (!element.value) {
                allFilled = false;
            }
        });
        if (allFilled) {
            chooseCourseBtn.classList.remove("hidden");
            contactBtn.classList.remove("hidden");
        } else {
            chooseCourseBtn.classList.add("hidden");
            contactBtn.classList.add("hidden");
        }
    }

    async function updateCourseContent() {
        const selectedCourse = document.getElementById("curso").value;
        if (selectedCourse && courseDescriptions[selectedCourse]) {
            try {
                const response = await fetch(courseDescriptions[selectedCourse]);
                if (response.ok) {
                    const htmlContent = await response.text();
                    courseContent.innerHTML = htmlContent;
                    courseContent.classList.remove("hidden");
                } else {
                    courseContent.innerHTML = "Erro ao carregar o conteúdo do curso.";
                    courseContent.classList.remove("hidden");
                }
            } catch (error) {
                courseContent.innerHTML = "Erro ao carregar o conteúdo do curso.";
                courseContent.classList.remove("hidden");
            }
        } else {
            courseContent.classList.add("hidden");
        }
    }

    formElements.forEach(element => {
        element.addEventListener("change", checkFormCompletion);
    });

    document.getElementById("curso").addEventListener("change", updateCourseContent);

    chooseCourseBtn.addEventListener("click", updateCourseContent);

    checkFormCompletion(); // Verificação inicial caso os campos estejam pré-preenchidos
});


//slides

let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    document.getElementById('slider1').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});
