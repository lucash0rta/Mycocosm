// Define the pairs of elements to be handled
const elementPairs = [
    { gif: 'ParisOnlineGif', title: 'mainLogo', customFalloff: true }, // Add custom flag for ParisOnlineGif
    { gif: 'EvanoraGif', title: 'EvanoraTitle' },
    { gif: 'LiliCastiglioniGif', title: 'LiliCastiglioniTitle' },
    { gif: 'SheDiamondGif', title: 'SheDiamondTitle' },
    { gif: 'BarbroMijaGif', title: 'BarbroMijaTitle' },
    { gif: 'BodRushGif', title: 'BodRushTitle' },
    { gif: 'ThanasGif', title: 'ThanasTitle' }
];

/**
 * Calculates the opacity based on the distance from the center.
 *
 * @param {number} distanceFromCenter - The distance from the center point.
 * @param {number} fullOpacityRange - The range where opacity should be 100%.
 * @param {number} falloffRange - The range where opacity falls off to 0%.
 * @returns {number} The calculated opacity, from 0 to 1.
 */
function calculateOpacity(distanceFromCenter, fullOpacityRange, falloffRange) {
    if (distanceFromCenter <= fullOpacityRange) {
        return 1; // Full opacity within the full opacity range
    } else if (distanceFromCenter >= fullOpacityRange + falloffRange) {
        return 0; // No opacity beyond the falloff range
    } else {
        // Linear falloff between full opacity range and falloff range
        return 1 - (distanceFromCenter - fullOpacityRange) / falloffRange;
    }
}

/**
 * Updates the opacity and glow effects for both GIF and title elements.
 *
 * @param {HTMLElement} gifElement - The GIF element to update.
 * @param {HTMLElement} titleElement - The title element to track.
 * @param {number} opacity - The calculated opacity based on distance.
 */
function updateOpacityAndGlow(gifElement, titleElement, opacity) {
    // Update the opacity of the GIF
    gifElement.style.opacity = opacity;

    // Apply intense glow effect to the title element
    applyIntenseGlowEffect(titleElement, opacity);
}

// Function to apply intense glow effect to the title element
function applyIntenseGlowEffect(element, opacity) {
    const baseColor = 'rgba(255, 255, 255, ';
    const maxBlur = 30; // Increased max blur for more intensity
    const glowLayers = 20; // More layers for a more intense glow

    let textShadow = '';
    for (let i = 1; i <= glowLayers; i++) {
        const layerOpacity = opacity * (1 - (i - 1) / glowLayers);
        const blur = (i / glowLayers) * maxBlur;
        textShadow += `0 0 ${blur}px ${baseColor}${layerOpacity}), `;
    }

    // Add a larger, softer outer glow
    textShadow += `0 0 ${maxBlur * 4}px ${baseColor}${opacity * 0.5})`;

    element.style.textShadow = textShadow.trim();

    // Add a subtle text stroke for extra pop in the center
    const strokeOpacity = Math.pow(opacity, 0.5); // Square root for a more dramatic center effect
    element.style.webkitTextStroke = `1px rgba(255, 255, 255, ${strokeOpacity})`;
    element.style.textStroke = `1px rgba(255, 255, 255, ${strokeOpacity})`;
}

// Function to update both the GIF and title based on scroll position
function updateEffects() {
    const windowHeight = window.innerHeight;
    const centerY = windowHeight / 2;
    const fullOpacityRange = 60; // Full opacity range
    const falloffRange = 40; // Falloff range

    elementPairs.forEach(pair => {
        const gifElement = document.getElementById(pair.gif);
        const titleElement = document.getElementById(pair.title);

        if (gifElement && titleElement) {
            const titleRect = titleElement.getBoundingClientRect();
            const elementCenterY = titleRect.top + titleRect.height / 2;
            const distanceFromCenter = Math.abs(elementCenterY - centerY);


            // Default falloff settings
            let fullOpacityRange = 50;
            let falloffRange = 50;

            // Custom falloff for ParisOnlineGif and mainLogo
            if (pair.customFalloff) {
                fullOpacityRange = 200;  // Wider full opacity range for ParisOnlineGif
                falloffRange = 400;      // Wider falloff range for ParisOnlineGif
            }

            // Calculate the opacity based on the distance from the center
            const opacity = calculateOpacity(distanceFromCenter, fullOpacityRange, falloffRange);

            // Update the opacity for both the GIF and title glow
            updateOpacityAndGlow(gifElement, titleElement, opacity);
        }
    });
}

// Add scroll and resize event listeners
window.addEventListener('scroll', updateEffects);
window.addEventListener('resize', updateEffects);

// Initial call to set the initial state
updateEffects();
