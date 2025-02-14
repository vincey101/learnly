// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 1;
    let points = 0;
    const totalQuestions = 2;

    // Elements
    const multipleChoice = document.getElementById('multipleChoice');
    const dragDrop = document.getElementById('dragDrop');
    const continueBtn = document.getElementById('continueBtn');
    const feedback = document.getElementById('feedback');
    const pointsDisplay = document.getElementById('points');
    const currentQuestionDisplay = document.getElementById('currentQuestion');

    // Add back button element
    const backButton = document.querySelector('button.text-gray-600');

    // Landing page elements
    const landingPage = document.getElementById('landingPage');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizSection = document.getElementById('quizSection');

    // Multiple Choice Setup
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', handleMultipleChoice);
    });

    // Drag and Drop Setup
    const draggables = document.querySelectorAll('.draggable');
    const dropzones = document.querySelectorAll('.dropzone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('dragend', dragEnd);
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', dragOver);
        dropzone.addEventListener('drop', drop);
    });

    // Multiple Choice Handler
    function handleMultipleChoice(e) {
        const selectedOption = e.currentTarget;
        const isCorrect = selectedOption.querySelector('span').nextSibling.textContent.trim() === 'Paris';

        // Remove any previous styling
        options.forEach(opt => {
            opt.classList.remove('border-red-500', 'border-green-500', 'bg-red-50', 'bg-green-50');
        });

        if (isCorrect) {
            selectedOption.classList.add('border-green-500', 'bg-green-50');
            showFeedback(true, 'Correct! Paris is the capital of France.');
            points += 10;
            pointsDisplay.textContent = points;
        } else {
            selectedOption.classList.add('border-red-500', 'bg-red-50');
            showFeedback(false, 'Incorrect. Try again!');
        }
    }

    // Drag and Drop Handlers
    function dragStart(e) {
        e.target.classList.add('opacity-50');
        e.dataTransfer.setData('text/plain', e.target.dataset.term);
    }

    function dragEnd(e) {
        e.target.classList.remove('opacity-50');
    }

    function dragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('bg-purple-100');
    }

    function drop(e) {
        e.preventDefault();
        const dropzone = e.currentTarget;
        dropzone.classList.remove('bg-purple-100');
        
        const draggedTerm = e.dataTransfer.getData('text/plain');
        const isCorrectMatch = dropzone.dataset.match === draggedTerm;

        if (isCorrectMatch) {
            dropzone.classList.add('bg-green-100');
            points += 10;
            pointsDisplay.textContent = points;
            showFeedback(true, 'Correct match!');
        } else {
            dropzone.classList.add('bg-red-100');
            showFeedback(false, 'Incorrect match. Try again!');
        }
    }

    // Feedback Handler
    function showFeedback(isSuccess, message) {
        feedback.classList.remove('hidden', 'bg-red-100', 'bg-green-100');
        feedback.classList.add(isSuccess ? 'bg-green-100' : 'bg-red-100');
        feedback.innerHTML = `
            <div class="flex items-center">
                <svg class="h-5 w-5 ${isSuccess ? 'text-green-500' : 'text-red-500'} mr-2" fill="currentColor" viewBox="0 0 20 20">
                    ${isSuccess 
                        ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd">'
                        : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd">'}
                    </path>
                </svg>
                <p class="${isSuccess ? 'text-green-700' : 'text-red-700'}">${message}</p>
            </div>
        `;
    }

    // Continue Button Handler
    continueBtn.addEventListener('click', () => {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            currentQuestionDisplay.textContent = currentQuestion;
            multipleChoice.classList.add('hidden');
            dragDrop.classList.remove('hidden');
            feedback.classList.add('hidden');
        }
    });

    // Back Button Handler
    backButton.addEventListener('click', () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            currentQuestionDisplay.textContent = currentQuestion;
            
            if (currentQuestion === 1) {
                dragDrop.classList.add('hidden');
                multipleChoice.classList.remove('hidden');
            }
            
            feedback.classList.add('hidden');
            dropzones.forEach(dropzone => {
                dropzone.classList.remove('bg-green-100', 'bg-red-100', 'bg-purple-100');
            });
            draggables.forEach(draggable => {
                draggable.classList.remove('opacity-50');
            });
        } else {
            quizSection.classList.add('hidden');
            landingPage.classList.remove('hidden');
            
            currentQuestion = 1;
            points = 0;
            pointsDisplay.textContent = points;
            currentQuestionDisplay.textContent = currentQuestion;
            feedback.classList.add('hidden');
            
            options.forEach(opt => {
                opt.classList.remove('border-red-500', 'border-green-500', 'bg-red-50', 'bg-green-50');
            });
            
            dragDrop.classList.add('hidden');
            multipleChoice.classList.remove('hidden');
        }
    });

    // Start Quiz Handler
    startQuizBtn.addEventListener('click', () => {
        landingPage.classList.add('hidden');
        quizSection.classList.remove('hidden');
    });
}); 