// script.js
// ===== GLOBAL VARIABLES =====
// These variables are in the global scope and can be accessed from any function
const animatedElement = document.getElementById('animatedElement');
const shapeSelect = document.getElementById('shapeSelect');
const animationSelect = document.getElementById('animationSelect');
const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');
const applyBtn = document.getElementById('applyBtn');
const resetBtn = document.getElementById('resetBtn');
const triggerModal = document.getElementById('triggerModal');
const modal = document.getElementById('animationModal');
const closeModal = document.getElementById('closeModal');

// ===== FUNCTION DEFINITIONS =====

/**
 * Changes the shape of the animated element based on user selection
 * @param {string} shape - The shape to change to ('box', 'circle', or 'triangle')
 * @returns {boolean} - Returns true if shape was changed successfully
 */
function changeShape(shape) {
    // Remove all shape classes
    animatedElement.classList.remove('box', 'circle', 'triangle');
    
    // Add the selected shape class
    animatedElement.classList.add(shape);
    
    // Update element ID for CSS targeting
    animatedElement.id = 'animatedElement';
    
    return true;
}

/**
 * Applies the selected animation to the element
 * @param {string} animation - The animation class to apply
 * @param {number} speed - The animation speed multiplier
 * @returns {boolean} - Returns true if animation was applied successfully
 */
function applyAnimation(animation, speed) {
    // First remove any existing animation classes
    const animationClasses = ['bounce', 'pulse', 'spin', 'shake', 'rainbow'];
    animatedElement.classList.remove(...animationClasses);
    
    // Apply the selected animation
    animatedElement.classList.add(animation);
    
    // Set the animation speed
    animatedElement.style.animationDuration = `${speed}s`;
    
    return true;
}

/**
 * Resets all animations and reverts to default state
 * @returns {boolean} - Returns true after reset is complete
 */
function resetAnimations() {
    // Remove all animation classes
    const animationClasses = ['bounce', 'pulse', 'spin', 'shake', 'rainbow'];
    animatedElement.classList.remove(...animationClasses);
    
    // Reset to default box shape
    changeShape('box');
    
    // Reset animation speed
    animatedElement.style.animationDuration = '1s';
    speedRange.value = 1;
    speedValue.textContent = '1x';
    
    // Reset select boxes to default values
    shapeSelect.value = 'box';
    animationSelect.value = 'bounce';
    
    return true;
}

/**
 * Shows the modal with animation
 * @param {number} duration - How long to show the modal in milliseconds
 * @returns {Promise} - A promise that resolves when the modal is shown
 */
function showModal(duration = 3000) {
    return new Promise((resolve) => {
        modal.classList.add('active');
        
        // Auto-hide after duration if provided
        if (duration) {
            setTimeout(() => {
                hideModal();
                resolve();
            }, duration);
        } else {
            resolve();
        }
    });
}

/**
 * Hides the modal with animation
 * @returns {boolean} - Returns true when modal is hidden
 */
function hideModal() {
    modal.classList.remove('active');
    return true;
}

/**
 * Updates the speed display value based on range input
 * @param {number} value - The speed value from the range input
 * @returns {string} - The formatted speed value
 */
function updateSpeedValue(value) {
    const speedText = `${value}x`;
    speedValue.textContent = speedText;
    return speedText;
}

// ===== EVENT LISTENERS =====

// Apply animation when the apply button is clicked
applyBtn.addEventListener('click', () => {
    // These variables are in the local function scope
    const selectedShape = shapeSelect.value;
    const selectedAnimation = animationSelect.value;
    const selectedSpeed = parseFloat(speedRange.value);
    
    // Call our functions with parameters
    changeShape(selectedShape);
    applyAnimation(selectedAnimation, 1/selectedSpeed);
    
    // Show confirmation modal
    showModal(2500);
});

// Reset animations when the reset button is clicked
resetBtn.addEventListener('click', () => {
    resetAnimations();
});

// Show modal when the trigger button is clicked
triggerModal.addEventListener('click', () => {
    showModal();
});

// Close modal when the close button is clicked
closeModal.addEventListener('click', () => {
    hideModal();
});

// Update speed display when range input changes
speedRange.addEventListener('input', () => {
    // This variable is in the local function scope
    const speed = parseFloat(speedRange.value);
    updateSpeedValue(speed);
});

// Close modal when clicking outside modal content
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

// ===== INITIALIZATION =====
// Set initial speed display value
updateSpeedValue(parseFloat(speedRange.value));
